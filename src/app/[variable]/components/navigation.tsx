import Image from 'next/image';

export const Navigation = {
    Tabs: function Tabs({ 
        activeTab, 
        setActiveTab 
    }: { 
        activeTab: 'alles' | 'attracties' | 'shows';
        setActiveTab: (tab: 'alles' | 'attracties' | 'shows') => void;
    }) {
        return (
            <>
            <div className='w-[350px] h-[155px] bg-main-300 rounded-[16px] flex flex-col-reverse items-center justify-center max-xl:bg-main-100 max-xl:flex-col'>
                <div className="flex space-x-4 mb-6">
                    <button 
                        className={`px-4 py-2 rounded-lg ${activeTab === 'alles' ? 'bg-main-500 text-white' : 'bg-main-200'}`}
                        onClick={() => setActiveTab('alles')}
                    >
                        Alles
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-lg ${activeTab === 'attracties' ? 'bg-main-500 text-white' : 'bg-main-200'}`}
                        onClick={() => setActiveTab('attracties')}
                    >
                        Attracties
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-lg ${activeTab === 'shows' ? 'bg-main-500 text-white' : 'bg-main-200'}`}
                        onClick={() => setActiveTab('shows')}
                    >
                        Shows
                    </button>
                </div>

                <h1 className='text-main-500 text-[40px]'>
                    {activeTab === 'alles' ? 'Alles' : 
                    activeTab === 'attracties' ? 'Attracties' : 'Shows'}
                </h1>
                <Image
                    src="/divider.svg"
                    width={350}
                    height={50}
                    alt="Decorative divider"
                    className='max-xl:block hidden'
                    priority
                />
                </div>
            </>
        );
    },
    
    Search: function Search({ 
        searchTerm, 
        setSearchTerm, 
        activeTab 
    }: { 
        searchTerm: string; 
        setSearchTerm: (term: string) => void;
        activeTab: 'alles' | 'attracties' | 'shows';
    }) {
        const getPlaceholderText = () => {
            switch (activeTab) {
                case 'attracties': return "Zoek attracties...";
                case 'shows': return "Zoek shows...";
                default: return "Zoek attracties en shows...";
            }
        };

        return (
            <div className="relative w-[350px] h-[155px] bg-main-300 rounded-[16px] flex flex-col-reverse items-center justify-center max-xl:bg-main-100 max-xl:mt-10">
                <div className="absolute inset-y-0 left-7 flex items-center pl-3   pointer-events-none">
                    <svg className="w-4 h-4 text-main-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    className="block max-xl:w-[350px] w-[300px] p-4 pl-10 text-sm rounded-[17px] bg-main-200 border-[1px] border-main-400 focus:ring-main-500 focus:border-main-500"
                    placeholder={getPlaceholderText()}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        );
    }
};