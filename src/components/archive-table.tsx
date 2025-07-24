import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AlignRight, ChevronLeft, ChevronRight, Clock4 } from "lucide-react";
import { Button } from "./ui/button";
import { formatDuration } from "@/utils/formatDuration";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import AudioPlayer from "./audio-player";
import axios from 'axios';
import useSWR, { mutate } from 'swr'
import { ArchiveColumns } from "./archive-columns";
import { toast } from "sonner";
import useSWRMutation from 'swr/mutation'
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { timeToSeconds } from "@/utils/timeToSeconds";

const fetcher = (url: string) =>
    axios(url, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    }).then((r) => r.data);

const deleteFile = async (url: string, { arg }: { arg: { id: string | number } }) => {
    return axios.delete(`${url}${arg.id}/`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};


function ArchiveTable() {
    const [expandedRows, setExpandedRows] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 4,
    });
    const audioCurrentTime = useSelector((state: RootState) => state.speech.time)
    const audioCurrentId = useSelector((state: RootState) => state.speech.currentPlayingId)
    const { data: files, isLoading } = useSWR(`/api/requests/`, fetcher)
    const { trigger } = useSWRMutation(`/api/requests/`, deleteFile, {
        onSuccess() {
            toast.success("حذف با موفقیت انجام شد")
            mutate(() => true)
        },
        onError(err) {
            toast.error(`${err}`)
        },
    })

    const table = useReactTable({
        data: files ? files.results : [],
        getPaginationRowModel: getPaginationRowModel(),
        columns: ArchiveColumns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: false, // Changed to false for client-side pagination
        rowCount: files?.results?.length ?? 0,
        state: {
            expanded: expandedRows,
            pagination,
        },
        meta: {
            removeRow: (rowId: number | string) => {
                trigger({ id: rowId })
            }
        },
        onExpandedChange: setExpandedRows,
        onPaginationChange: setPagination,
    })


    const generatePageNumbers = () => {
        const totalPages = table.getPageCount();
        const currentPage = table.getState().pagination.pageIndex;
        const pageNumbers = [];

        const maxVisiblePages = 5;
        const startPage = Math.max(0, Math.min(currentPage - 2, totalPages - maxVisiblePages));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages);

        for (let i = startPage; i < endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };
    const isActiveSegment = (segStart: string, segEnd: string, currentTime: number): boolean => {
        const startSeconds = timeToSeconds(segStart);
        const endSeconds = timeToSeconds(segEnd);
        return currentTime >= startSeconds && currentTime <= endSeconds;
    };

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
                    {
                        isLoading ? (
                            <TableRow>
                                <TableCell colSpan={ArchiveColumns.length} className="h-24 text-center">
                                    در حال بارگزاری
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <React.Fragment key={row.id}>

                                        <TableRow
                                            className={`w-full border-b-[0px] cursor-pointer   even:bg-[#FEFEFE]   rounded-2xl`}
                                            dir="rtl"
                                            key={`${row.id}-main`}
                                            data-state={row.getIsSelected() && "selected"}
                                            onClick={() => row.toggleExpanded()}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell className=" py-7 font-iranyekan-light text-black bg-white " dir="rtl" key={cell.id} >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                        {
                                            row.getIsExpanded() && (
                                                <TableRow dir="rtl" key={`${row.id}-expanded`} className="!border-b-[0px] bg-white">
                                                    <TableCell colSpan={ArchiveColumns.length} className="p-0 bg-white" dir="rtl">
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
                                                                        <ScrollArea className="h-[300px] text-wrap font-iranyekan-light text-base text-black p-4" dir="rtl">
                                                                            {row.original.segments.map((seg) => {
                                                                                const isActive = isActiveSegment(seg.start, seg.end, audioCurrentTime);


                                                                                return (
                                                                                    <p
                                                                                        key={`${seg.start}-${seg.end}`}
                                                                                        className={`
                                                                                        ${isActive && row.original.id === Number(audioCurrentId)
                                                                                                ? 'text-[#00B3A1]  font-iranyekan-medium'
                                                                                                : ''
                                                                                            }
                                                                                        transition-all duration-300 mb-2
                                                                                    `}
                                                                                    >
                                                                                        {seg.text}
                                                                                    </p>
                                                                                );
                                                                            })}
                                                                        </ScrollArea>
                                                                        <div className="flex justify-center items-center w-full">
                                                                            <AudioPlayer audioId={`${row.original.id}`} src={row.original.url} thumbColor="#00B3A1" rangeColor="#00B3A1" />
                                                                        </div>
                                                                    </TabsContent>
                                                                    <TabsContent value="speach">
                                                                        <ScrollArea className="h-[300px]  font-iranyekan-light text-black p-4" dir="rtl">
                                                                            <section className="w-full ">
                                                                                {row.original.segments.map((seg) => {
                                                                                    const isActive = isActiveSegment(seg.start, seg.end, audioCurrentTime);
                                                                                    return (
                                                                                        <div key={`${seg.start}-${seg.end}`} className="odd:bg-white even:bg-[#F2F2F2] even:shadow-[#6363630D] rounded-3xl py-[19px] pr-[39px] flex justify-start items-start gap-x-[43px]">
                                                                                            <div className="gap-x-[17px] flex justify-center items-center">
                                                                                                <span className={`
                                                                                             ${isActive
                                                                                                        ? 'text-[#00B3A1]  font-iranyekan-medium'
                                                                                                        : ''
                                                                                                    }
                                                                                            transition-all duration-300`}>{formatDuration(seg.start)}</span>
                                                                                                <span
                                                                                                    className={`
                                                                                                    ${isActive
                                                                                                            ? 'text-[#00B3A1]  font-iranyekan-medium'
                                                                                                            : ''
                                                                                                        }
                                                                                                     transition-all duration-300
                                                                                                `}
                                                                                                >{formatDuration(seg.end)}</span>
                                                                                            </div>
                                                                                            <span className={`
                                                                                                    ${isActive
                                                                                                    ? 'text-[#00B3A1]  font-iranyekan-medium'
                                                                                                    : ''
                                                                                                }
                                                                                                     transition-all duration-300
                                                                                                `}>{seg.text}</span>
                                                                                        </div>)
                                                                                })}
                                                                            </section>
                                                                        </ScrollArea>
                                                                        <div className="flex justify-center items-center w-full">
                                                                            <AudioPlayer audioId={`${row.original.id}`} src={row.original.url} thumbColor="#00B3A1" rangeColor="#00B3A1" />
                                                                        </div>
                                                                    </TabsContent>
                                                                </Tabs>
                                                            </section>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </React.Fragment>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={ArchiveColumns.length} className="h-24 text-center">
                                        داده ای یافت نشد
                                    </TableCell>
                                </TableRow>
                            )
                        )
                    }
                </TableBody>
            </Table >

            {/* Pagination Controls */}
            < div className="flex justify-center items-center gap-x-3 mt-4" >
                {/* Previous Button */}
                < Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => table.previousPage()
                    }
                    disabled={!table.getCanPreviousPage()}
                    className="disabled:opacity-50"
                >
                    <ChevronRight />
                </Button >

                {/* Page Numbers */}
                < div className="flex justify-center items-center gap-x-3" >
                    {
                        generatePageNumbers().map((pageNumber) => (
                            <Button
                                key={pageNumber}
                                size={"icon"}
                                variant={"secondary"}
                                className={`text-sm rounded-full ${table.getState().pagination.pageIndex === pageNumber
                                    ? "bg-[#07B49B] text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-[#07B49B] hover:text-white"
                                    }`}
                                onClick={() => table.setPageIndex(pageNumber)}
                            >
                                {pageNumber + 1}
                            </Button>
                        ))
                    }
                </div >

                {/* Next Button */}
                < Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="disabled:opacity-50"
                >
                    <ChevronLeft />
                </Button >
            </div >

        </>
    )
}

export default ArchiveTable