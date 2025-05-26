'use client'

import { ServiceScheduleItem } from "@/app/types/service-schedule-response";
import { dateFormatter } from "@/lib/date-formatter";
import { useGetSchedule } from "@/services/productService";
import { useEffect, useState } from "react";
import { Pagination } from "../pagination/pagination";

const SectionServiceSchedule = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [startDate, setStartDate] = useState<Date | string | null>(null);
    const [endDate, setEndDate] = useState<Date | string | null>(null);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const startDate = new Date(e.target.value);

        if (e.target.value === '') {
            setStartDate(null);
            return;
        }

        if (isNaN(startDate.getTime())) {
            console.error("Invalid date format");
            return;
        }
        setCurrentPage(1);
        setStartDate(startDate.toISOString());
    }
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = new Date(e.target.value);

        if (e.target.value === '') {
            setEndDate(null);
            return;
        }

        if (isNaN(endDate.getTime())) {
            console.error("Invalid date format");
            return;
        }
        setCurrentPage(1);
        setEndDate(endDate.toISOString());
    }
    const { data: schedule, isLoading: isLoading, isError: isError } = useGetSchedule(currentPage, startDate ? startDate : '', endDate ? endDate : '');

    const paginator = schedule?.data?.paginator || null;

    useEffect(() => {
        if (!paginator) return;

        const backendPageCount = paginator.pageCount ?? 1;

        if (totalPage !== backendPageCount) {
            setTotalPage(backendPageCount);
        }

    }, [paginator, currentPage, totalPage]);

    useEffect(() => {
        if (!schedule?.data.docs) return;

    }, [schedule]);
    return (
        <div className="w-full mt-3">
            <div className="w-full flex flex-col sm:flex-row items-start gap-x-3 gap-y-2">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="startDate">Jadwal Pesanan Mulai</label>
                    <input type="datetime-local" name="startDate" id="startDate" className="max-w-[12rem] border p-1 bg-white rounded-md" onChange={handleStartDateChange} />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="startDate">Jadwal Pesanan Selesai</label>
                    <input type="datetime-local" name="startDate" id="startDate" className="max-w-[12rem] border p-1 bg-white rounded-md" onChange={handleEndDateChange} />
                </div>
                <div></div>
            </div>

            {/* mobile view */}
            <div className="block md:hidden w-full mt-3">
                {
                    isLoading ? (
                        // mobile skeleton loader
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="animate-pulse flex flex-col p-1 bg-gray-100 rounded-md shadow-md border border-gray-100 mb-1">
                                <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
                                <div className="h-5 w-40 bg-gray-300 rounded mb-2" />
                                <div className="h-4 w-60 bg-gray-200 rounded mb-1" />
                                <div className="h-4 w-64 bg-gray-200 rounded" />
                            </div>
                        ))
                    ) : !isError && schedule?.data?.docs?.length > 0 && (
                        schedule.data.docs.map((item: ServiceScheduleItem, idx: number) => (
                            <div key={item._id} className="flex flex-col p-1 b-white rounded-md shadow-md border border-gray-100 mb-1">
                                <p className="font-semibold text-gray-600"># {(paginator.currentPage - 1) * paginator.limit + idx + 1}</p>
                                <p className="font-bold text-base">Nama pelanggan: <span className="font-bold">{item.user.name}</span></p>
                                <p className="text-sm">Jadwal: <span>{dateFormatter(item.reservationDate)}</span></p>
                                <p className="text-sm">Estimasi selesai: <span>{dateFormatter(item.estimatedFinishDatePerTransaction)}</span></p>
                            </div>
                        ))
                    )
                }

            </div>

            {/* desktop view */}
            <div className="hidden md:block w-full overflow-x-auto mt-3">
                {
                    isLoading ? (
                        <table className="table-fixed w-full text-sm sm:text-base border">
                            <thead>
                                <tr className="bg-gold-100">
                                    <th className="hidden sm:table-cell p-2 w-10">No</th>
                                    <th className="p-2 w-48">Nama Pelanggan</th>
                                    <th className="hidden sm:table-cell p-2 w-48">Layanan</th>
                                    <th className="p-2 w-36">Jadwal</th>
                                    <th className="p-2 w-28">Status</th>
                                    <th className="p-2 w-36">Estimasi Selesai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse border-t text-center">
                                        <td className="hidden md:table-cell p-2"><div className="h-4 w-6 bg-gray-300 mx-auto rounded" /></td>
                                        <td className="p-2"><div className="h-4 w-24 bg-gray-300 mx-auto rounded" /></td>
                                        <td className="hidden sm:table-cell p-2"><div className="h-4 w-28 bg-gray-300 mx-auto rounded" /></td>
                                        <td className="p-2"><div className="h-4 w-20 bg-gray-300 mx-auto rounded" /></td>
                                        <td className="p-2"><div className="h-4 w-14 bg-gray-300 mx-auto rounded" /></td>
                                        <td className="p-2"><div className="h-4 w-28 bg-gray-300 mx-auto rounded" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : !isError && schedule?.data?.docs?.length > 0 && (
                        <table className="table-fixed w-full text-sm sm:text-base border">
                            <thead>
                                <tr className="bg-gold-100">
                                    <th className="hidden sm:table-cell p-2 w-10">No</th>
                                    <th className="p-2 w-48">Nama Pelanggan</th>
                                    <th className="hidden sm:table-cell p-2 w-48">Layanan</th>
                                    <th className="p-2 w-36">Jadwal</th>
                                    <th className="p-2 w-28">Status</th>
                                    <th className="p-2 w-36">Estimasi Selesai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    schedule.data.docs.map((item: ServiceScheduleItem, idx: number) => (
                                        <tr key={item._id} className="text-center border-t">
                                            <td className="hidden md:table-cell p-2">{(paginator.currentPage - 1) * paginator.limit + idx + 1}</td>
                                            <td className="p-2">{item.user.name}</td>
                                            <td className="hidden sm:table-cell p-2">{item.product.name}</td>
                                            <td className="p-2">{dateFormatter(item.reservationDate)}</td>
                                            <td className="p-2">{item.serviceStatus}</td>
                                            <td className="p-2">{dateFormatter(item.estimatedFinishDatePerTransaction)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
            {
                !isLoading && !isError && schedule?.data?.docs.length === 0 && (
                    <div className="flex items-center justify-center w-full min-h-[20rem]">
                        <p className="text-gray-400 text-center text-lg">Tidak ada data jadwal layanan</p>
                    </div>
                )
            }
            {
                !isError && !isLoading && schedule?.data && (
                    <Pagination
                        totalPage={schedule?.data?.paginator?.pageCount}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                        paginator={paginator}
                    />
                )
            }
        </div>
    )
}
export default SectionServiceSchedule;
