"use client";

import { useState, useEffect } from 'react';
import { Park } from './components/Park';
import { Navigation } from './components/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { ExperienceList } from './components/experiences';
import { Attraction, fetchEftelingData, categorizeAttractions } from './utils/attractionUtils';

export default function Home() {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [activeTab, setActiveTab] = useState<'alles' | 'attracties' | 'shows'>('alles');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchEftelingData();
                const processedData = categorizeAttractions(data);
                setAttractions(processedData);
                setError(null);
                setLoading(false);

                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000); // Hide after 3 sec
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };


        loadData(); // Initial fetch

        const intervalId = setInterval(loadData, 60_000); // Refresh every 60 seconds

        return () => clearInterval(intervalId); // Clean up interval on unmount
    }, []);


    const filteredAttractions = attractions.filter(attraction => {
        const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'alles') return matchesSearch;
        if (activeTab === 'attracties') return matchesSearch && attraction.type === 'ATTRACTION';
        if (activeTab === 'shows') return matchesSearch && attraction.type === 'SHOW';

        return matchesSearch;
    });

    const rides = filteredAttractions.filter(item => item.type === 'ATTRACTION');
    const shows = filteredAttractions.filter(item => item.type === 'SHOW');

    

    return (
        <main className="container mx-auto min-h-screen py-8 bg-main-100">
            <div className='w-full flex flex-col items-center mb-10'>
                <Park.Header />
                <Navigation.Tabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <Navigation.Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    activeTab={activeTab}
                />
            </div>

            {loading && <Park.LoadingState />}
            {error && <Park.ErrorState error={error} />}

            {!loading && !error && filteredAttractions.length === 0 && (
                <p className="text-center text-lg">Geen resultaten gevonden.</p>
            )}

            {!loading && !error && (
                <>
                    {(activeTab === 'alles' || activeTab === 'attracties') && rides.length > 0 && (
                        <ExperienceList.Attractions attractions={rides} />
                    )}

                    {(activeTab === 'alles' || activeTab === 'shows') && shows.length > 0 && (
                        <ExperienceList.Shows shows={shows} />
                    )}
                </>
            )}
            {showToast && (
                <ToastContainer />
            )}
        </main>
    );
}