'use client'

import { themeParks } from "@/components/themeparks";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import { Milonga } from 'next/font/google';

const milongaFont = Milonga({
    weight: '400',
    subsets: ['latin'],
});

export default function Parkeren() {
    const params = useParams();
    const parkId = params.variable as string;

    const park = themeParks.find(park => park.id === parkId);
    const displayName = park?.name || parkId;
    const parkLink = park?.parkLink;

    const [parkingSpot, setParkingSpot] = useState('');
    const [editing, setEditing] = useState(false);
    const [savedSpot, setSavedSpot] = useState<string | null>(null);

    // Load saved parking spot
    useEffect(() => {
        const saved = localStorage.getItem(`parking-${parkId}`);
        if (saved) {
            setSavedSpot(saved);
            setParkingSpot(saved);
            setEditing(false);
        } else {
            setEditing(true);
        }
    }, [parkId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem(`parking-${parkId}`, parkingSpot);
        setSavedSpot(parkingSpot);
        setEditing(false);
    };

    const handleDelete = () => {
        localStorage.removeItem(`parking-${parkId}`);
        setParkingSpot('');
        setSavedSpot(null);
        setEditing(true);
    };

    return (
        <div className="bg-main-100 min-h-screen w-full py-8">
            <Nav parkId={parkId} />
                <div className="max-w-md mx-auto px-6 text-center">
                    <div className='w-[350px] h-[155px] bg-main-300 rounded-[16px] mb-[55px] mt-[50px] mx-auto flex flex-col items-center justify-center text-center'>
                        <h1 className={`${milongaFont.className} text-[35px] text-main-500 m-0`}>
                            Parkeren bij <br /> {displayName}
                        </h1>
                    </div>

                    <p className="text-main-700 text-base mb-6">
                        Wil je aan het eind van je dagje <strong>{displayName}</strong> nog precies weten waar je je auto hebt geparkeerd?
                        Vul hieronder je parkeerlocatie in, sla ‘m op, en zie aan het eind van de dag direct waar je auto staat. Nooit meer zoeken!
                    </p>

                    {!editing && savedSpot ? (
                        <div className="bg-white rounded-xl shadow p-5 mb-10 text-center">
                            <p className="text-main-700 mb-4">Je staat geparkeerd bij: <br /><strong>{savedSpot}</strong></p>
                            <div className="grid grid-cols-2">
                                <button
                                    onClick={() => setEditing(true)}
                                    className="text-sm text-black underline mt-3 block mx-auto"
                                >
                                    Aanpassen
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="text-sm text-red-600 underline mt-3 block mx-auto"
                                >
                                    Verwijderen
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-5 mb-10">
                            <label className="block text-sm font-medium text-main-700 mb-2">Waar sta je geparkeerd?</label>
                            <input
                                type="text"
                                value={parkingSpot}
                                onChange={(e) => setParkingSpot(e.target.value)}
                                placeholder="Bijv. P3, naast de ingang"
                                maxLength={30}
                                className="w-full px-4 py-2 border border-main-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-500 mb-4"
                            />
                            <button
                                type="submit"
                                className="w-full bg-main-500 text-white py-2 rounded-lg hover:bg-main-600 transition"
                            >
                                Opslaan
                            </button>
                        </form>
                    )}

                    {parkLink && (
                        <div className="bg-main-200 rounded-xl p-6 shadow-md text-center">
                            <h2 className="text-xl font-semibold text-main-600 mb-2">Nog geen parkeerticket?</h2>
                            <p className="text-main-700 mb-4">Koop je parkeerticket direct via onderstaande link:</p>
                            <a
                                href={parkLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-main-500 text-white px-6 py-2 rounded-full hover:bg-main-600 transition"
                            >
                                Koop tickets
                            </a>
                        </div>
                    )}
                </div>
        
        </div>
    );
}
