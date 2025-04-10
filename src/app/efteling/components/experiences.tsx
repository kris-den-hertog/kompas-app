import { Attraction } from '../utils/attractionUtils';
import { Park } from './Park';

export const ExperienceCard = {
    Attraction: function AttractionCard({ attraction }: { attraction: Attraction }) {
        const formatWaitTime = () => {
            if (attraction.status === "CLOSED") {
                return "Closed";
            } else if (attraction.queue?.STANDBY?.waitTime !== undefined &&
                attraction.queue.STANDBY.waitTime !== null) {
                return `${attraction.queue.STANDBY.waitTime} mins`;
            } else {
                return "-";
            }
        };

        return (
            <div className="p-4 shadow-sm bg-white rounded-lg">
                <h2 className="text-xl text-main-500 font-semibold mb-2">{attraction.name}</h2>

                <div className="flex justify-between mb-2">
                    <span className="font-medium">Status:</span>
                    <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                            attraction.status === "OPERATING"
                                ? "bg-green-100 text-green-800"
                                : attraction.status === "DOWN"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {attraction.status}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium">Wachtrij:</span>
                    <span
                        className={`font-medium ${
                            attraction.status === "OPERATING" &&
                            attraction.queue?.STANDBY?.waitTime !== undefined &&
                            attraction.queue.STANDBY.waitTime !== null &&
                            attraction.queue.STANDBY.waitTime > 40
                                ? "text-red-600"
                                : attraction.status === "OPERATING" &&
                                  attraction.queue?.STANDBY?.waitTime !== undefined &&
                                  attraction.queue.STANDBY.waitTime !== null &&
                                  attraction.queue.STANDBY.waitTime > 20
                                    ? "text-yellow-600"
                                    : ""
                        }`}
                    >
                        {formatWaitTime()}
                    </span>
                </div>
            </div>
        );
    },
    
    Show: function ShowCard({ show }: { show: Attraction }) {
        return (
            <div className="p-4 shadow-sm bg-white rounded-lg border-l-4 border-main-500">
                <h2 className="text-xl font-semibold mb-2">{show.name}</h2>

                <div className="flex justify-between mb-2">
                    <span className="font-medium">Status:</span>
                    <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                            show.status === "OPERATING"
                                ? "bg-green-100 text-green-800"
                                : show.status === "DOWN"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {show.status}
                    </span>
                </div>

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

// Experience List Components
export const ExperienceList = {
    Attractions: function AttractionsList({ attractions }: { attractions: Attraction[] }) {
        return (
            <div className="mb-12">
                <Park.SectionHeader 
                    title="Attracties" 
                    count={attractions.length} 
                    subtitle="Attracties" 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                    {attractions.map((attraction) => (
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