import { Milonga } from 'next/font/google';
import { useState, useEffect } from 'react';
import { themeParks } from './themeparks';

const milongaFont = Milonga({
    weight: '400',
    subsets: ['latin'],
});

export default function Explainer() {
    const [gradientPosition, setGradientPosition] = useState(0);

    useEffect(() => {
        const animationInterval = setInterval(() => {
            setGradientPosition((prevPosition) => (prevPosition + 1) % 150);
        }, 50);

        return () => clearInterval(animationInterval);
    }, []);


    return (<div id="info" className="min-h-screen bg-repeat-x bg-gradient-to-b from-[#CFE8D2] to-[#F4F9F3]">
        <div className="w-full flex justify-center py-[50px]">
            <h1
                className={`${milongaFont.className} text-5xl sm:text-7xl md:text-[90px] font-bold text-main-500 text-center m-4 sm:m-10`}
            >
                Welkom bij Kompas!
            </h1>
        </div>

        <div className="w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            <div className='flex flex-col h-full justify-between gap-6'>
                <div className="bg-white/40 backdrop-blur-sm rounded-[16px] shadow-sm p-6">
                    <h2 className={`${milongaFont.className} text-xl md:text-2xl font-bold text-main-500 mb-3`}>
                        Altijd op de hoogte van de wachttijden!
                    </h2>
                    <p className="text-md text-main-700">
                        Met Kompas zie je in één oogopslag de actuele wachttijden van attracties in parken verspreid
                        over heel Europa. Of je nu een dagje uit plant of ter plekke staat in de rij — wij geven je
                        realtime informatie in een overzichtelijke en gebruiksvriendelijke interface. Geen verrassingen
                        meer, alleen maar slim plannen en meer plezier uit je parkbezoek halen!<br />
                    </p><br/>
                    <h2 className={`${milongaFont.className} text-xl md:text-2xl font-bold text-main-500 mb-3`}>
                        Update: Versie 1.0
                    </h2>
                    <p>
                        Kompas versie 1.0, we zijn klaar voor release!
                        <br/><br/>
                        Dit is er nieuw:<br/>
                        Parkeerhulp toegevoegd.<br/>
                        Dashboard toegevoegd<br/>
                        UI en UX geupdate<br/>
                    </p>
                </div>

                <div className="bg-white/40 backdrop-blur-sm rounded-[16px] shadow-sm p-6">
                    <h2 className={`${milongaFont.className} text-xl md:text-2xl font-bold text-main-500 mb-3`}>
                        Hoe werkt Kompas?
                    </h2>
                    <p className="text-md text-main-700">
                        Kompas verzamelt actuele wachttijden van attractieparken verspreid over heel Europa en zet deze
                        in een overzichtelijke pagina. Zo kun je snel zien waar het druk is en waar niet. De gegevens
                        worden real-time opgehaald via de API's van{' '}
                        <a href="https://themeparks.wiki/" target="_blank" className="underline text-blue-600 hover:text-blue-800">
                            Themeparks Wiki
                        </a>.
                    </p>
                </div>
            </div>
            <div className="bg-white/40 backdrop-blur-sm h-[100%] rounded-[16px] shadow-sm p-6 ">
                <h2 className={`${milongaFont.className} text-3xl md:text-4xl font-bold text-main-500 mb-3`}>
                    Ondersteunde parken
                </h2>
                <p className="text-xl text-main-700 mt-[30px]">
                    Kompas ondersteund de volgende parken:
                </p>
                <div className='h-[450px] overflow-y-scroll bg-main-300 p-4 rounded-xl mt-[30px]'>
                    {themeParks.map(park => (
                        <li key={park.id} className="mb-1">
                            <a href={park.id} className='text-main-500 text-xl hover:underline'>{park.name}</a>
                        </li>
                    ))}
                </div>
            </div>
        </div>

        <div className="w-full flex justify-center p-4 mt-8">
            <a
                href="#top"
                className="text-main-500 hover:text-main-600 transition-colors duration-300"
            >
                Terug naar boven
            </a>
        </div>
    </div>
    )
}