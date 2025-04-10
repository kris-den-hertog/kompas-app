"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface QueueTime {
    waitTime: number | null;
    status?: string;
}

interface Queue {
    STANDBY?: QueueTime;
    SINGLE_RIDER?: QueueTime;
    FAST_PASS?: QueueTime;
}

interface Attraction {
    id: string;
    name: string;
    status: "OPERATING" | "DOWN" | "CLOSED" | "REFURBISHMENT" | string;
    queue?: Queue;
    lastUpdated?: string;
}

interface EftelingApiResponse {
    liveData: Attraction[];
}

export default function Home() {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEftelingData = async () => {
            try {
                const response = await fetch('https://api.themeparks.wiki/v1/entity/efteling/live', {
                    cache: 'no-store'
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                // console.log("API data received:", data);

                if (data && data.liveData) {
                    setAttractions(data.liveData);
                } else {
                    console.error("Unexpected data structure:", data);
                    setError("Received invalid data structure from API");
                }

                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchEftelingData();
    }, []);

    const formatWaitTime = (attraction: Attraction) => {
        if (attraction.status === "CLOSED") {
            return "Closed";
        } else if (attraction.queue?.STANDBY?.waitTime !== undefined &&
            attraction.queue.STANDBY.waitTime !== null) {
            return `${attraction.queue.STANDBY.waitTime} mins`;
        } else {
            return "-";
        }
    };

    // Filter attractions based on search term
    const filteredAttractions = attractions.filter(attraction =>
        attraction.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="container mx-auto min-h-[100vh] min-w-[100vw] py-8 bg-main-100">
            <div className='w-full flex flex-col items-center mb-10'>
                <div className='w-[350px] h-[155px] bg-main-300 rounded-[16px] mb-[55px] flex flex-col items-center justify-center'>
                    <h1 className='text-[48px] text-main-500 m-0'>Efteling</h1>
                    <h2 className='text-[20px]'>Kaatsheuvel Noord-Brabant</h2>
                </div>



                <h1 className='text-main-500 text-[40px]'>Attracties</h1>
                <Image
                    src="/divider.svg"
                    width={350}
                    height={50}
                    alt="Decorative divider"
                />
                {/* Search Bar */}

                <div className="relative mt-10">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                        <svg className="w-4 h-4 text-main-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        className="block w-[350px] p-4 pl-10 text-sm rounded-[17px] bg-main-200 border-[1px] border-main-400 focus:ring-main-500 focus:border-main-500"
                        placeholder="Search attractions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>



            {loading && <p className="text-lg">Loading attraction data...</p>}
            {error && (
                <div className="text-lg">
                    <h1 className='text-red-700 text-3xl font-bold'>Something went wrong</h1>
                    <p className='text-red-800'>Error loading data: {error}</p>
                    <p>Please make sure you have a stable connection to the internet</p>
                </div>
            )}

            {!loading && !error && filteredAttractions.length === 0 && (
                <p className="text-center text-lg">No attractions found matching your search.</p>
            )}

            {!loading && !error && filteredAttractions.length > 0 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {filteredAttractions.map((attraction) => (
                            <div key={attraction.id} className="p-4 shadow-sm">
                                <h2 className="text-xl font-semibold mb-2">{attraction.name}</h2>

                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Status:</span>
                                    <span
                                        className={`px-2 py-1 rounded text-sm font-medium ${attraction.status === "OPERATING"
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
                                    <span className="font-medium">Wait Time:</span>
                                    <span
                                        className={`font-medium ${attraction.status === "OPERATING" &&
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
                                        {formatWaitTime(attraction)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}