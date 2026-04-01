import { WeRoadResponse, WeRoadTour } from "@/types";

const BASE_WEROAD_URL =
  "https://www.weroad.it/viaggi/ghana-africa-che-si-vive-tra-coste-foreste-e-villaggi/";

export function buildTourUrl(tourId: string): string {
  return `${BASE_WEROAD_URL}${tourId}`;
}

export async function fetchTours(): Promise<WeRoadTour[]> {
  const response = await fetch("/api/weroad-tours", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Errore nel caricamento degli itinerari");
  const json: WeRoadResponse = await response.json();
  return json.data ?? [];
}

export async function fetchTravel(): Promise<any> {
  const response = await fetch("/api/weroad-travel", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Errore nel caricamento dell'itinerario");
  const json = await response.json();
  return json.data;
}