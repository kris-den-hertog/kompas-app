"use client";
import Nav from './components/nav';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Park } from './components/Park';
import { Navigation } from './components/navigation';
import { ExperienceList } from './components/experiences';
import { Attraction, fetchThemeParkData, categorizeAttractions } from './utils/attractionUtils';

export default function Home() {
    const params = useParams();
    const parkId = params.variable as string;

    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [activeTab, setActiveTab] = useState<'alles' | 'attracties' | 'shows'>('alles');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchThemeParkData(parkId);
                const processedData = categorizeAttractions(data);
                setAttractions(processedData);
                setError(null);
                setLoading(false);

                // Show simple notification
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        loadData();

        const intervalId = setInterval(() => {
            loadData();
        }, 30_000);

        return () => clearInterval(intervalId);
    }, [parkId]);

    const filteredAttractions = attractions.filter(attraction => {
        const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'alles') return matchesSearch;
        if (activeTab === 'attracties') return matchesSearch && attraction.type === 'ATTRACTION';
        if (activeTab === 'shows') return matchesSearch && attraction.type === 'SHOW';

        return matchesSearch;
    });

    const rides = filteredAttractions.filter(item => item.type === 'ATTRACTION');
    const shows = filteredAttractions.filter(item => item.type === 'SHOW');
    const dashURL = parkId + "/dashboard";

    return (
        <main className="container mx-auto min-h-screen py-8 bg-main-100">
            {showNotification && (
                <div className="fixed bottom-5 right-5 z-50 bg-main-500 text-white px-4 py-2 transition-all rounded">
                    Wachttijden opgehaald
                </div>
            )}
          <Nav parkId={parkId} />
            <div className='w-full flex max-xl:flex-col justify-around flex-row items-center mb-10'>




                <Park.Header parkId={parkId} />
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

            {loading && <Park.LoadingState parkId={parkId} />}
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
        </main>
    );
}