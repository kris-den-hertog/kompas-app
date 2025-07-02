'use client';

import { useEffect, useState } from "react";
import {
  fetchParkSchedule,
  ScheduleDate,
  formatTime,
  translateScheduleType
} from "../utils/parktimeUtils";
import { motion } from "framer-motion";

type TodayProps = {
  parkId: string;
};

export default function Today({ parkId }: TodayProps) {
  const [todaySchedule, setTodaySchedule] = useState<ScheduleDate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        setLoading(true);
        const data = await fetchParkSchedule(parkId);
        const todayStr = new Date().toISOString().split("T")[0];
        const todayData = data.find((day) => day.date === todayStr);
        setTodaySchedule(todayData || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load schedule.");
      } finally {
        setLoading(false);
      }
    };

    if (parkId) {
      getSchedule();
    }
  }, [parkId]);

  if (error) return <div className="liquid-glass py-2 px-8 rounded-full flex items-center justify-center"><p className="text-center text-red-800">Openingstijden niet beschikbaar</p></div>;
  if (!todaySchedule) return null;

  const isOperating =
    todaySchedule.type.toLowerCase() === "operating" &&
    todaySchedule.openingTime !== todaySchedule.closingTime;

  return (
    <a href={`/${parkId}/openingstijden`}>
      <motion.div
        initial={{ scale: 0}} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        className="flex justify-center mt-4"
      >
        <div className="liquid-glass py-2 px-8 rounded-full flex items-center justify-center">
          <span className="text-center">
            {isOperating
              ? `vandaag open: ${formatTime(todaySchedule.openingTime)} – ${formatTime(todaySchedule.closingTime)}`
              : translateScheduleType(todaySchedule.type)}
          </span>
        </div>
      </motion.div></a>
  );
}
