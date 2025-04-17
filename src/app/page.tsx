"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [parkSearch, setParkSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (parkSearch.trim()) {
      router.push(`/${parkSearch.trim().toLowerCase()}`);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-main-100 flex items-center justify-center flex-col">
      <header>
        <h1 className="text-4xl mb-8 text-main-500">Kompas</h1>
      </header>
      
      <div className="w-full max-w-md p-6">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="parkSearch" className="text-lg font-medium">
              Zoek een park:
            </label>
            <div className="flex">
              <input
                id="parkSearch"
                type="text"
                value={parkSearch}
                onChange={(e) => setParkSearch(e.target.value)}
                placeholder="efteling, disney-world..."
                className="flex-1 px-4 py-2 bg-main-300 border border-main-500 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-copper"
              />
              <button
                type="submit"
                className="bg-copper text-white px-4 py-2 rounded-r-xl hover:bg-opacity-90 transition-colors"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}