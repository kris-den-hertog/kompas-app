'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    fetchParkSchedule,
    ScheduleDate,
    formatTime,
    formatDateLabel,
    translateScheduleType,
} from "../utils/parktimeUtils";
import { themeParks } from "@/components/themeparks";
import Nav from "../components/nav";
import { Milonga } from "next/font/google";
import { motion } from "framer-motion";

const milongaFont = Milonga({
    weight: "400",
    subsets: ["latin"],
});


export default function ParkTimes() {
    const params = useParams();
    const parkId = params.variable as string;

    const [scheduleData, setScheduleData] = useState<ScheduleDate[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getSchedule = async () => {
            try {
                const data = await fetchParkSchedule(parkId);
                setScheduleData(data);
            } catch (err) {
                setError("Failed to load park schedule.");
                console.error(err);
            }
        };

        if (parkId) {
            getSchedule();
        }
    }, [parkId]);

    const park = themeParks.find((park) => park.id === parkId);
    const displayName = park?.name || parkId;

    return (
        <div className="bg-main-100 min-h-screen w-full py-8">
            <Nav parkId={parkId} />
            <div className="mx-auto px-6 text-center">
                <div
                    className="w-[350px] h-[155px] bg-main-300 rounded-[16px] mb-[55px] mt-[50px] mx-auto flex flex-col items-center justify-center text-center"
                >
                    <h1 className={`${milongaFont.className} text-[35px] text-main-500 m-0`}>
                        {displayName} Openingstijden
                    </h1>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                {scheduleData ? (
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-[850px] gap-4 mx-auto justify-items-center">
                        {scheduleData.slice(0, 7).map((day) => {

                            const displayText =
                                day.type.toLowerCase() === "operating" &&
                                    day.openingTime !== day.closingTime
                                    ? `${formatTime(day.openingTime)} – ${formatTime(day.closingTime)}`
                                    : translateScheduleType(day.type);


                            return (
                                <motion.div 
                                initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.05 }}
                                key={day.date} 
                                className="liquid-glass p-3 rounded-[30px] shadow-sm w-[150px] h-[150px] min-[450px]:w-[200px] min-[450px]:h-[200px] flex items-center justify-center flex-col">
                                    <strong>{formatDateLabel(day.date)}</strong> {displayText}
                                    {day.specialSchedule && (
                                        <div className="text-xs italic mt-1">{day.specialSchedule}</div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    !error && <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

