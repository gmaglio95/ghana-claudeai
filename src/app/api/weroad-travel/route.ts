export async function GET() {
  try {
    const response = await fetch(
      "https://api-catalog.weroad.it/travels/ghana-africa-che-si-vive-tra-coste-foreste-e-villaggi/",
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error(`WeRoad API error: ${response.status}`);
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("WeRoad travel fetch error:", error);
    return Response.json(
      { error: "Impossibile caricare l'itinerario." },
      { status: 500 }
    );
  }
}