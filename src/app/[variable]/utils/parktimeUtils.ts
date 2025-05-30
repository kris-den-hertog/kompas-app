export interface ScheduleDate {
  date: string;
  type: string;
  openingTime: string;
  closingTime: string;
  specialSchedule?: string;
}

export async function fetchParkSchedule(parkId: string): Promise<ScheduleDate[]> {
  try {
    const response = await fetch(`https://api.themeparks.wiki/v1/entity/${parkId}/schedule`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error fetching schedule: ${response.status}`);
    }

    const data = await response.json();

    if (data?.schedule) {
      return data.schedule;
    } else {
      console.error("Unexpected data structure:", data);
      throw new Error("Invalid schedule data structure from API");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

export function formatTime(dateTimeStr: string): string {
  if (!dateTimeStr) return "Onbekend";

  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return "Ongeldige tijd";

  return new Intl.DateTimeFormat("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function translateScheduleType(type: string): string {
  const map: { [key: string]: string } = {
    CLOSED: "Gesloten",
    OPERATING: "Open",
    REFURBISHMENT: "Onderhoud",
    PRIVATE_EVENT: "Privé-evenement",
  };
  return map[type.toUpperCase()] || type;
}
