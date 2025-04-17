export interface QueueTime {
    waitTime: number | null;
    status?: string;
}

export interface Queue {
    STANDBY?: QueueTime;
    SINGLE_RIDER?: QueueTime;
    FAST_PASS?: QueueTime;
}

export interface Attraction {
    entityType: string;
    id: string;
    name: string;
    status: "OPERATING" | "DOWN" | "CLOSED" | "REFURBISHMENT" | string;
    queue?: Queue;
    lastUpdated?: string;
    type?: "ATTRACTION" | "SHOW";
}

export interface ThemeParkApiResponse {
    liveData: Attraction[];
}

export async function fetchThemeParkData(parkId: string): Promise<Attraction[]> {
    try {
        const response = await fetch(`https://api.themeparks.wiki/v1/entity/${parkId}/live`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.liveData) {
            return data.liveData;
        } else {
            console.error("Unexpected data structure:", data);
            throw new Error("Received invalid data structure from API");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        throw err;
    }
}

export function categorizeAttractions(data: Attraction[]): Attraction[] {
    return data.map(item => {
        const type = item.entityType === 'SHOW' ? 'SHOW' : 'ATTRACTION';
        
        return {
            ...item,
            type: type
        };
    });
}