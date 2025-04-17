export const Park = {
    Header: function ParkHeader() {
        return (
            <div className='w-[350px] h-[155px] bg-main-300 rounded-[16px] mb-[55px] flex flex-col items-center justify-center'>
                <h1 className='text-[48px] text-main-500 m-0'>Efteling</h1>
                <h2 className='text-[20px]'>Kaatsheuvel Noord-Brabant</h2>
            </div>
        );
    },
    
    SectionHeader: function SectionHeader({ title, count, subtitle }: { title: string, count: number, subtitle?: string }) {
        return (
            <div className="w-full flex flex-col items-center mb-6">
                <div className="w-[350px] h-[100px] bg-main-200 rounded-[16px] flex flex-col items-center justify-center">
                    <h2 className="text-[32px] text-main-500 m-0">{title}</h2>
                    <p className="text-[16px]">{count} {subtitle || 'items'} gevonden</p>
                </div>
            </div>
        );
    },
    
    LoadingState: function LoadingState() {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main-500"></div>
                <p className="ml-4 text-lg">Loading Efteling data...</p>
            </div>
        );
    },
    
    ErrorState: function ErrorState({ error }: { error: string }) {
        return (
            <div className="text-lg text-center py-8">
                <h1 className='text-red-700 text-3xl font-bold'>Something went wrong</h1>
                <p className='text-red-800 mb-4'>Error loading data: {error}</p>
                <p>Please make sure you have a stable connection to the internet</p>
            </div>
        );
    }
};



