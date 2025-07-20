import type { FileData } from "@/types/HarfListResponse"
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AlignRight, ChevronLeft, ChevronRight, Clock4, Copy, Download, File, Mic, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { format } from 'date-fns-jalali';
import { formatDuration } from "@/utils/formatDuration";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import AudioPlayer from "./audio-player";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className="hover:text-[#07B49B]" variant={"ghost"} size={"icon"}>
                                <Download width={17} height={17} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent
                            side="bottom"
                            className="bg-white  text-[#000000B2] font-iranyekan-light shadow-lg rounded-[10px] px-4 py-2 border border-gray-100"
                        >
                            <p>3.7 مگابایت</p>
                        </TooltipContent>
                    </Tooltip>
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

    const table = useReactTable({
        data: files,
        rowCount: files.length,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        state: {
            expanded: expandedRows,
        },
        onExpandedChange: setExpandedRows,

    })

    return (
        <>
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
                                    className={`border-b-[0px] cursor-pointer   even:bg-[#FEFEFE] even:shadow-2xl rounded-2xl`}
                                    dir="rtl"
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => row.toggleExpanded()}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className=" py-7 font-iranyekan-light text-black bg-white" dir="rtl" key={cell.id} >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>

                                {row.getIsExpanded() && (
                                    <TableRow dir="rtl" className="!border-b-[0px] bg-white">
                                        <TableCell colSpan={columns.length} className="p-0 bg-white" dir="rtl">
                                            <div className="bg-gray-50 p-4 border-[#00BA9F] border rounded-[10px] ">
                                                <section className="w-full pt-[22px]  px-12">
                                                    <Tabs defaultValue="text" dir="rtl">
                                                        <TabsList className="bg-white  w-full  flex justify-start items-start  rounded-b-[0px] pb-3.5">
                                                            <div className="border-b">
                                                                <TabsTrigger value="text" className="pb-[17px] data-[state=active]:bg-white shadow-none data-[state=active]:border-b-black rounded-b-[0px]  " >
                                                                    <AlignRight />
                                                                    متن ساده
                                                                </TabsTrigger>
                                                                <TabsTrigger value="speach" className="pb-[17px]  shadow-none data-[state=active]:border-b-black  data-[state=active]:border-b rounded-b-[0px] ">
                                                                    <Clock4 />
                                                                    متن زمان‌بندی شده
                                                                </TabsTrigger>
                                                            </div>
                                                        </TabsList>
                                                        <TabsContent value="text">
                                                            <ScrollArea className="h-[300px] text-wrap font-iranyekan-light text-black p-4" dir="rtl">
                                                                [با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]
                                                                [با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]
                                                                [با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---] کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---] [ابو][---] [با] و و و و و [او]
                                                            </ScrollArea>
                                                            <div className="flex justify-center items-center w-full">
                                                                <AudioPlayer />
                                                            </div>
                                                        </TabsContent>
                                                        <TabsContent value="speach">
                                                            <ScrollArea className="h-[300px]  font-iranyekan-light text-black p-4" dir="rtl">
                                                                <section className="w-full ">
                                                                    <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                                                        <div className="gap-x-[17px] flex justify-center items-center">
                                                                            <span>00:03</span>
                                                                            <span>00:00</span>
                                                                        </div>
                                                                        <span>[با]</span>
                                                                    </div>
                                                                    <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                                                        <div className="gap-x-[17px] flex justify-center items-center">
                                                                            <span>00:03</span>
                                                                            <span>00:00</span>
                                                                        </div>
                                                                        <span>[با]</span>
                                                                    </div>
                                                                    <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                                                        <div className="gap-x-[17px] flex justify-center items-center">
                                                                            <span>00:03</span>
                                                                            <span>00:00</span>
                                                                        </div>
                                                                        <span>[با]</span>
                                                                    </div>
                                                                    <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                                                        <div className="gap-x-[17px] flex justify-center items-center">
                                                                            <span>00:03</span>
                                                                            <span>00:00</span>
                                                                        </div>
                                                                        <span>[با]</span>
                                                                    </div>
                                                                    <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                                                        <div className="gap-x-[17px] flex justify-center items-center">
                                                                            <span>00:03</span>
                                                                            <span>00:00</span>
                                                                        </div>
                                                                        <span>[با]</span>
                                                                    </div>
                                                                    <div className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                                                        <div className="gap-x-[17px] flex justify-center items-center">
                                                                            <span>00:03</span>
                                                                            <span>00:00</span>
                                                                        </div>
                                                                        <span>[با]</span>
                                                                    </div>
                                                                </section>
                                                            </ScrollArea>
                                                            <div className="flex justify-center items-center w-full">
                                                                <AudioPlayer />
                                                            </div>
                                                        </TabsContent>
                                                    </Tabs>
                                                </section>


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
            <div className="flex justify-center items-center gap-x-3">
                <Button size={"icon"} variant={"ghost"}>
                    <ChevronRight />
                </Button>
                <div className="flex justify-center items-center gap-x-3">
                    <Button size={"icon"} variant={"secondary"} className="text-sm rounded-full bg-[#07B49B] text-white hover:text-[#07B49B]">1</Button>
                    <Button size={"icon"} variant={"secondary"} className="text-sm rounded-full bg-[#07B49B] text-white hover:text-[#07B49B]">1</Button>
                    <Button size={"icon"} variant={"secondary"} className="text-sm rounded-full bg-[#07B49B] text-white hover:text-[#07B49B]">1</Button>
                    <Button size={"icon"} variant={"secondary"} className="text-sm rounded-full bg-[#07B49B] text-white hover:text-[#07B49B]">1</Button>
                    <Button size={"icon"} variant={"secondary"} className="text-sm rounded-full bg-[#07B49B] text-white hover:text-[#07B49B]">1</Button>
                </div>
                <Button size={"icon"} variant={"ghost"}>
                    <ChevronLeft />
                </Button>
            </div>
        </>
    )
}

export default ArchiveTable