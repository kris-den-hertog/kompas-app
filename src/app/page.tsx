"use client";

import Image from "next/image";
import Searchbar from "@/components/searchbar";
import Explainer from "@/components/explainer";

export default function Home() {
  return (<div className="w-[100vw]">
    <div id="top" className="h-[100vh] bg-main-100 flex items-center justify-center flex-col">
      <header className="absolute top-[20vh] mr-[28px] text-center">
        <Image
          src="/logo.svg"
          width={180}
          height={30}
          alt="Logo"
          priority
        />
        <p className="text-copper">Versie 1.1</p>
      </header>
      <Searchbar />
      <a href="#info" className="absolute bottom-4 self-center">Meer info</a>
    </div>
    <Explainer />
  </div>
  );
}