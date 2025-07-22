import { AlignRight, Clock4, Copy, Download, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import AudioPlayer from "./audio-player";
import type { FileData } from "@/types/HarfListResponse";
import { formatDuration } from "@/utils/formatDuration";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { copySegmentsToClipboard } from "@/utils/formatSegmentsForCopy";
import { toast } from "sonner";


export default function FileDetails({ fileData, startOver }: {
    fileData: FileData[],
    startOver?: (reset: "voice" | "file" | "link" | "none") => void
}) {
    const handleCopySegments = () => {
        if (fileData[0]?.segments && fileData[0]?.segments.length > 0) {
            copySegmentsToClipboard(fileData[0]?.segments, fileData[0]?.filename);
        } else {
            toast.error('هیچ متن گفتاری برای این فایل موجود نیست');
        }
    };
    const handleDownload = async () => {
        // const fileUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}${insuranceDetails?.contract_file}`;
        const fileUrl = `${fileData[0]?.media_url}`;
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
                fileData[0]?.media_url?.split("/").pop() || "file";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            toast.error("دانلود فایل با خطا مواجه شد.");
        }
    };

    return (
        <section className="w-full pt-[22px]  px-[14px]">
            <Tabs defaultValue="text" dir="rtl">
                <TabsList className="bg-white border-b w-full justify-between rounded-b-[0px] pb-3.5">
                    <div>
                        <TabsTrigger value="text" className="pb-[17px] data-[state=active]:bg-white shadow-none data-[state=active]:border-b-black rounded-b-[0px]  " >
                            <AlignRight />
                            متن ساده
                        </TabsTrigger>
                        <TabsTrigger value="speach" className="pb-[17px]  shadow-none data-[state=active]:border-b-black  data-[state=active]:border-b rounded-b-[0px] ">
                            <Clock4 />
                            متن زمان‌بندی شده
                        </TabsTrigger>
                    </div>
                    <div className="flex justify-center items-center gap-x-1">
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
                        <Button onClick={() => startOver?.("none")} className="rounded-[20px] bg-[#118AD3] text-white" variant={"outline"} >
                            <RefreshCw />
                            شروع دوباره
                        </Button>
                    </div>
                </TabsList>
                <TabsContent value="text">
                    <ScrollArea className="h-[300px]  font-iranyekan-light text-black p-4" dir="rtl">
                        {
                            fileData[0]?.segments.map((seg) => (
                                <p key={`${seg.start}-${seg.end}`}>{seg.text}</p>
                            ))
                        }
                    </ScrollArea>
                    <div className="flex justify-center items-center w-full">
                        <AudioPlayer src={fileData[0]?.media_url} />
                    </div>
                </TabsContent>
                <TabsContent value="speach">
                    <ScrollArea className="h-[300px]  font-iranyekan-light text-black p-4" dir="rtl">
                        <section className="w-full ">
                            {fileData[0]?.segments.map((seg) => (
                                <div key={`${seg.start}-${seg.end}`} className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                    <div className="gap-x-[17px] flex justify-center items-center">
                                        <span>{formatDuration(seg.start)}</span>
                                        <span>{formatDuration(seg.end)}</span>
                                    </div>
                                    <span>{seg.text}</span>
                                </div>
                            ))}
                        </section>
                    </ScrollArea>
                    <div className="flex justify-center items-center w-full">
                        <AudioPlayer src={fileData[0]?.media_url} />
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    )
}
