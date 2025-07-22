import type { FileData } from "@/types/HarfListResponse";
import type { ColumnDef } from "@tanstack/react-table";
import { getFileFormat } from "@/utils/getFileFormat";
import { detectUploadType } from "@/utils/detectUploadType";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { format } from 'date-fns-jalali';
import { Copy, Download, File, Link, Mic, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { formatDuration } from "@/utils/formatDuration";
import { copySegmentsToClipboard } from "@/utils/formatSegmentsForCopy";
import { downloadDocx } from "@/utils/downloadDocx";



export const ArchiveColumns: ColumnDef<FileData>[] = [
    {
        id: "icon",
        cell: ({ row }) => {
            const type = detectUploadType(row.original);
            if (type === "file") {
                return (
                    <div className="mb-2 w-[40px] h-[40px] flex justify-center items-center text-white rounded-full bg-[#118AD3] px-[10px] py-[10px]">
                        <UploadCloud />
                    </div>
                )
            }

            if (type === "voice") {
                return (
                    <div className="mb-2 w-[40px] h-[40px] flex justify-center items-center text-white rounded-full bg-[#40C6B8] px-[10px] py-[10px]">
                        <Mic />
                    </div>
                )
            }
            return (
                <div className="mb-2 w-[40px] h-[40px] flex justify-center items-center text-white rounded-full bg-[#FF1654] px-[10px] py-[10px]">
                    <Link />
                </div>
            )
        }
    },
    {
        accessorKey: "filename",
        header: "نام فایل",
    },
    {
        accessorKey: "processed",
        header: "تاریخ بارگزاری",
        cell: ({ row }) => {
            const date = new Date(row.original.processed);
            return (
                <span>
                    {format(date, 'yyyy/MM/dd')}
                </span>
            )
        }
    },
    {
        accessorKey: "url",
        header: "نوع فایل",
        cell: ({ row }) => {
            const fileFormat = getFileFormat(row.original.url);
            return (
                <span>
                    {fileFormat}
                </span>
            )
        }
    },
    {
        accessorKey: "duration",
        header: "مدت زمان",
        cell: ({ row }) => {
            const duration = row.original.duration;
            return (
                <span>
                    {formatDuration(duration)}
                </span>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const handleDownload = async () => {
                // const fileUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}${insuranceDetails?.contract_file}`;
                const fileUrl = `${row.original.url}`;

                try {
                    const response = await fetch(fileUrl, {
                        // headers: {
                        //     Authorization: `${process.env.NEXT_PUBLIC_BASE_API_TOKEN}`, // اگر نیاز هست
                        // },
                    });

                    if (!response.ok) {
                        throw new Error("خطا در دانلود فایل");
                    }

                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = url;
                    link.download =
                        row.original.filename?.split("/").pop() || "file";
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);
                } catch (error) {
                    console.error(error);
                    toast.error("دانلود فایل با خطا مواجه شد.");
                }
            };

            const handleCopySegments = () => {
                if (row.original.segments && row.original.segments.length > 0) {
                    copySegmentsToClipboard(row.original.segments, row.original.filename);
                } else {
                    toast.error('هیچ متن گفتاری برای این فایل موجود نیست');
                }
            };

            const handleDownloadSegments = () => {
                if (row.original.segments && row.original.segments.length > 0) {
                    downloadDocx(row.original.segments);
                } else {
                    toast.error('هیچ متن گفتاری برای این فایل موجود نیست');
                }
            };


            return (
                <div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={handleDownload} className="hover:text-[#07B49B]" variant={"ghost"} size={"icon"}>
                                <Download width={17} height={17} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent
                            side="bottom"
                            className="bg-white text-[#000000B2] font-iranyekan-light shadow-lg rounded-[10px] px-4 py-2 border border-gray-100"
                        >
                            <p>دانلود فایل</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className="hover:text-[#07B49B]" variant={"ghost"} size={"icon"} onClick={handleDownloadSegments}>
                                <File width={17} height={17} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent
                            side="bottom"
                            className="bg-white text-[#000000B2] font-iranyekan-light shadow-lg rounded-[10px] px-4 py-2 border border-gray-100"
                        >
                            <p>مشاهده فایل word</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleCopySegments}
                                className="hover:text-[#07B49B]"
                                variant={"ghost"}
                                size={"icon"}
                            >
                                <Copy width={17} height={17} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent
                            side="bottom"
                            className="bg-white text-[#000000B2] font-iranyekan-light shadow-lg rounded-[10px] px-4 py-2 border border-gray-100"
                        >
                            <p>کپی متن گفتاری</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                // @ts-expect-error type option not supported by TypeScript typings but works in browser
                                onClick={() => table.options.meta?.removeRow?.(row.original.id)}
                                className="hover:text-white hover:bg-[#DC3545] rounded-full"
                                variant={"ghost"}
                                size={"icon"}
                            >
                                <Trash2 width={17} height={17} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent
                            side="bottom"
                            className="bg-white text-[#000000B2] font-iranyekan-light shadow-lg rounded-[10px] px-4 py-2 border border-gray-100"
                        >
                            <p>حذف فایل</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            )
        },
    },
]