"use client"

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { themeParks } from "@/components/themeparks";

export default function Searchbar() {
  const [parkSearch, setParkSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const suggestionsRef = useRef<HTMLDivElement>(null);


  // Filter suggestions based on input
  const filteredSuggestions = themeParks.filter(park =>
    park.name.toLowerCase().includes(parkSearch.toLowerCase()) ||
    park.id.includes(parkSearch.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (parkSearch.trim()) {
      const selectedPark = themeParks.find(
        park => park.name.toLowerCase() === parkSearch.toLowerCase() ||
          park.id === parkSearch.toLowerCase()
      );

      const routePath = selectedPark ? selectedPark.id : parkSearch.trim().toLowerCase();
      router.push(`/${routePath}`);
    }
  };

  const handleSuggestionClick = (parkId: string) => {
    router.push(`/${parkId}`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

   return( <div className="w-full max-w-md p-6">
        <form onSubmit={handleSearch} className="mb-6 relative">
            <div className="flex flex-col gap-2">
                <label htmlFor="parkSearch" className="text-lg ml-5">
                    Zoek een park:
                </label>
                <div className="flex">
                    <input
                        id="parkSearch"
                        type="text"
                        value={parkSearch}
                        onChange={(e) => setParkSearch(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Efteling, Phantasialand..."
                        className="flex-1 px-4 py-2 bg-main-300 shadow shadow-main-500 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-main-400"
                        autoComplete="off"
                        maxLength={30}
                    />
                    <button
                        type="submit"
                        className="bg-copper text-white shadow shadow-main-500 px-4 py-2 rounded-r-xl hover:bg-opacity-90 transition-colors"
                    >
                        Go
                    </button>
                </div>
            </div>

            
            {showSuggestions && parkSearch.length > 0 && filteredSuggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute z-10 mt-1 w-full bg-main-200 border border-main-400 rounded-xl shadow-lg max-h-64 overflow-y-auto"
                >
                    {filteredSuggestions.map((park) => (
                        <div
                            key={park.id}
                            className="px-4 py-2 cursor-pointer hover:bg-main-300 transition-colors"
                            onClick={() => handleSuggestionClick(park.id)}
                        >
                            {park.name}
                        </div>
                    ))}
                </div>
            )}
        </form>
    </div>
)}