'use client'

import { dateFormatter } from "@/lib/date-formatter";
import { useEffect, useState } from "react";

const CountdownTimer = ({ eventDateProps }: { eventDateProps: string }) => {
    const [eventDate, setEventDate] = useState(eventDateProps);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0")

        return `${hours}:${minutes}:${seconds}`
    }

    useEffect(() => {
        const date = new Date(eventDateProps);
        if (eventDateProps && !isNaN(date.getTime())) {
            setEventDate(eventDateProps);

            const interval = setInterval(() => {
                const now = new Date().getTime();
                const eventTime = new Date(eventDateProps).getTime();
                const diff = eventTime - now;

                setTimeRemaining(diff > 0 ? diff : 0);

                if (diff <= 0) clearInterval(interval);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [eventDateProps]);

    if (!eventDate || timeRemaining === null) {
        return (
            <div className="w-full p-4 bg-white shadow rounded-md text-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-full p-4 bg-white shadow rounded-md text-center items-center justify-center flex flex-col gap-y-1">
            <div className="text-xl font-semibold mb-2">Lakukan pembayaran dalam</div>
            <div className={`w-[12rem] rounded-md text-center my-3 text-2xl font-medium ${timeRemaining <= 0 ? "text-red-500" : "text- bg-red-400 p-2"}`}>
                {timeRemaining > 0 ? formatTime(timeRemaining) : "Expired"}
            </div>
            <div className="text-sm">Tanggal jatuh tempo</div>
            <div className="text-xl font-semibold">{dateFormatter(eventDate)}</div>
        </div>
    )
}

export default CountdownTimer;