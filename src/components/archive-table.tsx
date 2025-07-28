import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ChevronLeft, ChevronRight, } from "lucide-react";
import { Button } from "./ui/button";

import React, { useState } from "react";

import axios from 'axios';
import useSWR, { mutate } from 'swr'
import { ArchiveColumns } from "./archive-columns";
import { toast } from "sonner";
import useSWRMutation from 'swr/mutation'
import { ExpandedRowContent } from "./expanded-row-content";

const baseURL = import.meta.env.VITE_API_BASE;
const fetcher = (url: string) =>
    axios(url, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Token a85d08400c622b50b18b61e239b9903645297196"
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

    const { data: files, isLoading } = useSWR(`${baseURL}/requests/`, fetcher)
    const { trigger } = useSWRMutation(`${baseURL}/requests/`, deleteFile, {
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
                                table.getRowModel().rows?.map((row) => (
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
                                                        <ExpandedRowContent row={row} />
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