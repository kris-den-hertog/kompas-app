import { Attraction } from '../utils/attractionUtils';
import { motion } from "framer-motion";
import { Park } from './Park';

export const ExperienceCard = {
    Attraction: function AttractionCard({ attraction }: { attraction: Attraction }) {
        const formatWaitTime = () => {
            if (attraction.status === "CLOSED") {
                return "Gesloten";
            } else if (attraction.queue?.STANDBY?.waitTime !== undefined &&
                attraction.queue.STANDBY.waitTime !== null) {
                return `± ${attraction.queue.STANDBY.waitTime} min`;
            } else {
                return "";
            }
        };

        const formatLastUpdated = () => {
            if (attraction.lastUpdated) {
                const date = new Date(attraction.lastUpdated);
                return `${date.toISOString().split('T')[0]} ${date.toTimeString().substring(0, 5)}`;
            }
            return "Onbekend";
        };
        const isStaleUpdate = (): boolean => {
            if (!attraction.lastUpdated || attraction.status !== "OPERATING") return false;
            const lastUpdatedDate = new Date(attraction.lastUpdated);
            const now = new Date();
            const diffInMs = now.getTime() - lastUpdatedDate.getTime();
            const diffInHours = diffInMs / (1000 * 60 * 60);

            return diffInHours > 10;
        };

        const fadeInUp = {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: "easeOut" },
            viewport: { once: true, margin: "-100px" }
        };

        return (
            <motion.section 
          {...fadeInUp}
        >
            <div className="p-4 shadow-sm bg-white rounded-lg overflow-hidden relative">
                <div className="h-[45px] flex items-center justify-between">
                    <span className="text-xl text-main-500">{attraction.name}</span>
                    <div className="flex flex-col items-end">
                        <span
                            className={`
                                text-white px-2 py-1 rounded text-sm w-fit whitespace-nowrap inset-shadow-sm
                                ${formatWaitTime() === "" ? "bg-none" : "bg-mattOrange"}
                            `}
                        >
                            {formatWaitTime()}
                        </span>
                        {attraction.queue?.SINGLE_RIDER?.waitTime !== undefined &&
                            attraction.queue.SINGLE_RIDER.waitTime !== null && (
                                <span className="text-[15px] text-mattOrange">
                                    single rider: {attraction.queue.SINGLE_RIDER.waitTime} min
                                </span>
                            )}
                    </div>
                </div>

                <div className="absolute left-0 bottom-0 w-full h-24 bg-offWhite"></div>

                <div className="relative mt-7">
                    <div className="flex justify-between mb-4">
                        <span className="font-medium">Status:</span>
                        <span
                            className={`text-sm ${attraction.status === "OPERATING"
                                ? "text-green-800"
                                : attraction.status === "DOWN"
                                    ? "text-red-800"
                                    : "text-gray-800"
                                }`}
                        >
                            {attraction.status === "OPERATING" ? "IN BEDRIJF" :
                                attraction.status === "DOWN" ? "STORING" :
                                    attraction.status === "CLOSED" ? "GESLOTEN" :
                                        attraction.status}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-medium">Laatste update:</span>
                        <span className="text-sm">
                            {formatLastUpdated()}
                        </span>
                    </div>

                    {isStaleUpdate() && (
                        <div className="mt-3 p-3 bg-yellow-100 text-yellow-800 text-sm rounded absolute bottom-1">
                            ⚠️ Deze wachttijd is lang niet meer geupdate en is waarschijnlijk niet meer accuraat
                        </div>
                    )}
                </div>
            </div>
            </motion.section>
        );
    },

    Show: function ShowCard({ show }: { show: Attraction }) {
        return (
            <div className="p-4 shadow-sm bg-white rounded-lg border-l-4 border-main-500">
                <h2 className="text-xl text-main-500 mb-2">{show.name}</h2>

                <div className="flex justify-between">
                    <span className="font-medium">Shows:</span>
                    <span className="font-medium">
                        {show.status === "OPERATING" ? "Speelt vandaag" : "Geen geplande shows"}
                    </span>
                </div>
            </div>
        );
    }
};

const getWaitTime = (attraction: Attraction): number => {
    if (attraction.status === "CLOSED" || attraction.status === "DOWN") {
        return -1;
    }

    const waitTime = attraction.queue?.STANDBY?.waitTime;
    return waitTime !== undefined && waitTime !== null ? waitTime : 0;
};

const sortByWaitTime = (attractions: Attraction[]): Attraction[] => {
    return [...attractions].sort((a, b) => {
        const waitTimeA = getWaitTime(a);
        const waitTimeB = getWaitTime(b);

        if (waitTimeA === -1 && waitTimeB === -1) {
            return 0;
        } else if (waitTimeA === -1) {
            return 1;
        } else if (waitTimeB === -1) {
            return -1;
        }

        return waitTimeB - waitTimeA;
    });
};

export const ExperienceList = {
    Attractions: function AttractionsList({ attractions }: { attractions: Attraction[] }) {
        const sortedAttractions = sortByWaitTime(attractions);

        return (
            <div className="mb-12">
                <Park.SectionHeader
                    title="Attracties"
                    count={sortedAttractions.length}
                    subtitle="Attracties"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                    {sortedAttractions.map((attraction) => (
                        <ExperienceCard.Attraction key={attraction.id} attraction={attraction} />
                    ))}
                </div>
            </div>
        );
    },

    Shows: function ShowsList({ shows }: { shows: Attraction[] }) {
        return (
            <div className="mb-12">
                <Park.SectionHeader
                    title="Shows"
                    count={shows.length}
                    subtitle="Shows"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                    {shows.map((show) => (
                        <ExperienceCard.Show key={show.id} show={show} />
                    ))}
                </div>
            </div>
        );
    }
};
