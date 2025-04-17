"use client";

import Image from "next/image";
import Searchbar from "@/components/searchbar";

export default function Home() {

  return (<div className="w-[100vw]">
    <div className="h-[100vh] bg-main-100 flex items-center justify-center flex-col">
      <header className="absolute top-[20vh] mr-[28px]">
        <Image
          src="/logo.svg"
          width={180}
          height={30}
          alt="Logo"
          priority
        />
      </header>
      <Searchbar />
      <a href="#info" className="absolute bottom-4 self-center">Meer info v</a>
    </div>

    <div className="bg-main-400">
      <h1 id="info" className="text-[50px] font-milonga text-main-500 pl-3 py-5">welkom bij Kompas!</h1>
      <div className="p-3">
        <h2 className="text-2xl font-bold text-main-500 mb-1">Altijd op de hoogte van de wachttijden!</h2>
      <p className="text-md">Met Kompas zie je in één oogopslag de actuele wachttijden van attracties in parken verspreid 
        over heel Europa. Of je nu een dagje uit plant of ter plekke staat in de rij — wij geven je realtime 
        informatie in een overzichtelijke en gebruiksvriendelijke interface. Geen verrassingen meer, alleen maar 
        slim plannen en meer plezier uit je parkbezoek halen!</p>
      </div>
    
    </div>
  </div>
  );
}