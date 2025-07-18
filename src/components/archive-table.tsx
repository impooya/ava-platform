import type { FileData } from "@/types/HarfListResponse"
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Copy, Download, File, Mic, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { format } from 'date-fns-jalali';
import { formatDuration } from "@/utils/formatDuration";
import { useState } from "react";
import UploadingFile from "./uploading-file";

const columns: ColumnDef<FileData>[] = [
    {
        id: "icon",
        cell: () => (
            <div className="mb-2 w-[40px] h-[40px] flex justify-center items-center text-white rounded-full bg-[#40C6B8] px-[10px] py-[10px]">
                <Mic />
            </div>
        )
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
        cell: () => {
            return (
                <div>
                    <Button className="hover:text-[#07B49B]" variant={"ghost"} size={"icon"}>
                        <Download width={17} height={17} />
                    </Button>
                    <Button className="hover:text-[#07B49B]" variant={"ghost"} size={"icon"}>
                        <File width={17} height={17} className="hover:text-[#07B49B]" />
                    </Button>
                    <Button className="hover:text-[#07B49B]" variant={"ghost"} size={"icon"}>
                        <Copy width={17} height={17} />
                    </Button>
                    <Button className="hover:text-white hover:bg-[#DC3545] rounded-full" variant={"ghost"} size={"icon"}>
                        <Trash2 width={17} height={17} />
                    </Button>
                </div>
            )
        },
    },
]

const files: FileData[] = [{
    id: 70223,
    url: ".mp4",
    duration: "0:01:8.000",
    processed: "2025-07-18T11:03:33.529091",
    segments: [
        {
            start: "0:00:0.150",
            end: "0:00:7.980",
            text: "رحمان رحیم سلام عرض می کنم خدا قوت میگم به مهندس احمدی آذر"
        },
        {
            start: "0:00:8.250",
            end: "0:00:11.820",
            text: "تا الان در خدمت تیم بودن به عنوان سرپرست و"
        },
        {
            start: "0:00:11.910",
            end: "0:00:17.940",
            text: "به دلایل مشکلات شخصی نتونستن تیم را همراهی بکنند و من در خدمت تیم هستم"
        },
        {
            start: "0:00:18.420",
            end: "0:00:22.530",
            text: "الحمدلله رب العالمین شرایط تیم شرایط خوبی هست و"
        },
        {
            start: "0:00:23.130",
            end: "0:00:26.250",
            text: "تا الان هم ما سه تا بازی تدارکاتی داشتیم"
        },
        {
            start: "0:00:26.820",
            end: "0:00:34.800",
            text: "فردا هم انشالله صبح یک تمرین توپی و وزنه و بعدازظهر هم یه بازی تدارکاتی دیگه با تیم استرالیا انجام میدیم"
        },
        {
            start: "0:00:34.800",
            end: "0:00:37.860",
            text: "هر چی بتونیم بازی بیشتری انجام بدیم قطعا"
        },
        {
            start: "0:00:37.920",
            end: "0:00:41.160",
            text: "هماهنگی تیم بهتر خواهد شد و"
        },
        {
            start: "0:00:41.190",
            end: "0:00:43.860",
            text: "انشالله با یک روحی"
        },
        {
            start: "0:00:43.920",
            end: "0:00:51.900",
            text: "بالاتری به مسابقات پایین میذاریم از مردم عزیزم میخوام که تیم ملی جوانان تمام تیم هامون رو دعا بکنیم"
        },
        {
            start: "0:00:51.900",
            end: "0:00:55.500",
            text: "و انشالله بتونیم با دست پر از اینجا"
        },
        {
            start: "0:00:56.040",
            end: "0:01:1.710",
            text: ""
        }
    ],
    filename: "jzgWN_cf7ffa2fbdcc04590d3cd449e5b7e2382be65d6c_n_240.mp4"
},
{
    id: 70224,
    url: ".mp4",
    duration: "0:01:8.000",
    processed: "2025-07-18T11:03:33.529091",
    segments: [
        {
            start: "0:00:0.150",
            end: "0:00:7.980",
            text: "رحمان رحیم سلام عرض می کنم خدا قوت میگم به مهندس احمدی آذر"
        },
        {
            start: "0:00:8.250",
            end: "0:00:11.820",
            text: "تا الان در خدمت تیم بودن به عنوان سرپرست و"
        },
        {
            start: "0:00:11.910",
            end: "0:00:17.940",
            text: "به دلایل مشکلات شخصی نتونستن تیم را همراهی بکنند و من در خدمت تیم هستم"
        },
        {
            start: "0:00:18.420",
            end: "0:00:22.530",
            text: "الحمدلله رب العالمین شرایط تیم شرایط خوبی هست و"
        },
        {
            start: "0:00:23.130",
            end: "0:00:26.250",
            text: "تا الان هم ما سه تا بازی تدارکاتی داشتیم"
        },
        {
            start: "0:00:26.820",
            end: "0:00:34.800",
            text: "فردا هم انشالله صبح یک تمرین توپی و وزنه و بعدازظهر هم یه بازی تدارکاتی دیگه با تیم استرالیا انجام میدیم"
        },
        {
            start: "0:00:34.800",
            end: "0:00:37.860",
            text: "هر چی بتونیم بازی بیشتری انجام بدیم قطعا"
        },
        {
            start: "0:00:37.920",
            end: "0:00:41.160",
            text: "هماهنگی تیم بهتر خواهد شد و"
        },
        {
            start: "0:00:41.190",
            end: "0:00:43.860",
            text: "انشالله با یک روحی"
        },
        {
            start: "0:00:43.920",
            end: "0:00:51.900",
            text: "بالاتری به مسابقات پایین میذاریم از مردم عزیزم میخوام که تیم ملی جوانان تمام تیم هامون رو دعا بکنیم"
        },
        {
            start: "0:00:51.900",
            end: "0:00:55.500",
            text: "و انشالله بتونیم با دست پر از اینجا"
        },
        {
            start: "0:00:56.040",
            end: "0:01:1.710",
            text: ""
        }
    ],
    filename: "jzgWN_cf7ffa2fbdcc04590d3cd449e5b7e2382be65d6c_n_240.mp4"
}
];

function ArchiveTable() {
    const [expandedRows, setExpandedRows] = useState({});
    console.log(expandedRows)

    const table = useReactTable({
        data: files,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            expanded: expandedRows,
        },
        onExpandedChange: setExpandedRows,

    })

    return (
        <Table dir="rtl">
            <TableHeader dir="rtl" className="text-right">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow dir="rtl" key={headerGroup.id} className="!border-b-[0px]">
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead dir="rtl" key={header.id} className="text-right pb-[35px] text-black text-base">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody dir="rtl">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <>
                            <TableRow
                                className={` cursor-pointer hover:bg-gray-50`}
                                dir="rtl"
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                onClick={() => row.toggleExpanded()}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell className=" py-7 font-iranyekan-light text-black" dir="rtl" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>

                            {row.getIsExpanded() && (
                                <TableRow dir="rtl" className="!border-b-[0px]">
                                    <TableCell colSpan={columns.length} className="p-0" dir="rtl">
                                        <div className="bg-gray-50 p-4 border-gray-200">
                                            <div className="space-y-3">

                                                <div className="text-wrap">

                                                    <UploadingFile />
                                                </div>

                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            داده ای یافت نشد
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default ArchiveTable