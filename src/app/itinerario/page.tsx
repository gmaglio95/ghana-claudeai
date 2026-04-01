"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchTravel } from "@/lib/weroad";

function MoodBar({ label, level, max = 5 }: { label: string; level: number; max?: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-xs text-text-secondary w-16 shrink-0">{label}</span>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-2 rounded-full transition-all ${
              i < level ? "bg-ghana-gold" : "bg-dark-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DifficultyBadge({ rating }: { rating: string }) {
  const map: Record<string, { label: string; color: string }> = {
    LOW:    { label: "🟢 Bassa",  color: "bg-green-900 text-green-300" },
    MEDIUM: { label: "🟡 Media",  color: "bg-yellow-900 text-yellow-300" },
    HIGH:   { label: "🔴 Alta",   color: "bg-red-950 text-ghana-red" },
  };
  const d = map[rating] ?? { label: rating, color: "bg-dark-card text-text-secondary" };
  return (
    <span className={`inline-block text-xs font-body font-bold px-3 py-1 rounded-full ${d.color}`}>
      {d.label}
    </span>
  );
}

function StageCard({ stage, index }: { stage: any; index: number }) {
  const img = stage.previewCardImage?.desktop;
  return (
    <div className="flex gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-ghana-gold flex items-center justify-center font-headline font-bold text-dark-bg text-sm shrink-0">
          {index + 1}
        </div>
        <div className="w-0.5 bg-dark-border flex-1 mt-2" />
      </div>

      <div className="bg-dark-card rounded-card border border-dark-border overflow-hidden mb-6 flex-1">
        {img && (
          <div className="relative h-48 md:h-56 overflow-hidden">
            <Image
              src={img.imageUrl}
              alt={img.altText ?? stage.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-mono text-xs text-ghana-gold mb-1">
                Notte a {stage.nightLocationDescription ?? "—"}
              </p>
              <h3 className="font-headline text-lg md:text-xl font-bold text-white leading-tight">
                {stage.title}
              </h3>
            </div>
          </div>
        )}

        <div className="p-5 md:p-6">
          {!img && (
            <h3 className="font-headline text-lg font-bold text-ghana-gold mb-3">
              {stage.title}
            </h3>
          )}

          <div className="flex flex-wrap gap-3 mb-4">
            {stage.moods.natureLevel > 0 && (
              <span className="text-xs font-body text-text-secondary border border-dark-border px-2 py-0.5 rounded-full">
                🌿 Natura {stage.moods.natureLevel}/5
              </span>
            )}
            {stage.moods.cultureLevel > 0 && (
              <span className="text-xs font-body text-text-secondary border border-dark-border px-2 py-0.5 rounded-full">
                🎭 Cultura {stage.moods.cultureLevel}/5
              </span>
            )}
            {stage.moods.historyLevel > 0 && (
              <span className="text-xs font-body text-text-secondary border border-dark-border px-2 py-0.5 rounded-full">
                🏛️ Storia {stage.moods.historyLevel}/5
              </span>
            )}
            {stage.moods.relaxLevel > 0 && (
              <span className="text-xs font-body text-text-secondary border border-dark-border px-2 py-0.5 rounded-full">
                😌 Relax {stage.moods.relaxLevel}/5
              </span>
            )}
          </div>

          <div className="space-y-5">
            {stage.subStages.map((sub: any) => (
              <div key={sub.id}>
                <h4 className="font-headline text-base font-bold text-white mb-2">
                  {sub.title}
                </h4>
                {sub.description && (
                  <div
                    className="font-body text-text-secondary text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sub.description }}
                  />
                )}
                {sub.info && (
                  <div
                    className="mt-3 pt-3 border-t border-dark-border font-body text-xs text-text-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sub.info }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ title, body }: { title: string; body: string }) {
  return (
    <details className="group bg-dark-card border border-dark-border rounded-card overflow-hidden">
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-headline font-bold text-white hover:text-ghana-gold transition-colors duration-200">
        <span>{title}</span>
        <span className="text-ghana-gold group-open:rotate-180 transition-transform duration-200 ml-4 shrink-0">
          ▼
        </span>
      </summary>
      <div
        className="px-5 pb-5 font-body text-text-secondary text-sm leading-relaxed border-t border-dark-border pt-4"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </details>
  );
}

export default function ItinerarioPage() {
  const [travelData, setTravelData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTravel()
      .then(setTravelData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-ghana-gold border-t-transparent rounded-full animate-spin" />
        <p className="font-body text-text-secondary">Caricamento itinerario...</p>
      </div>
    );
  }

  // Errore
  if (error || !travelData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-body text-text-secondary text-lg mb-6">
            {error ?? "Impossibile caricare l'itinerario al momento."}
          </p>
          <Link
            href="https://www.weroad.it/viaggi/ghana-africa-che-si-vive-tra-coste-foreste-e-villaggi/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ghana-red text-white font-headline font-bold px-6 py-3 rounded-btn hover:brightness-110 transition-all duration-300"
          >
            Vai direttamente su WeRoad →
          </Link>
        </div>
      </div>
    );
  }

  const travel = travelData.travel;
  const faq = travelData.faq;
  const heroImg = travel.gallery?.list?.[0];
  const mapImg = travel.itineraryMapImage;

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative h-96 md:h-[520px] overflow-hidden">
        {heroImg && (
          <Image
            src={heroImg.imageUrl}
            alt={heroImg.altText ?? "Ghana itinerario"}
            fill
            className="object-cover object-center"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-12 max-w-5xl mx-auto w-full left-0 right-0">
          <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-3">
            Itinerario completo · {travel.numberOfDays} giorni
          </p>
          <h1 className="font-headline text-3xl md:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl">
            {travel.title}
          </h1>
          <div className="flex flex-wrap gap-3 items-center">
            <DifficultyBadge rating={travel.physicalRating} />
            <span className="font-mono text-xs text-text-secondary border border-dark-border px-3 py-1 rounded-full">
              ✈️ Partenza da {travel.airports.inboundDepartureCity}
            </span>
            <span className="font-mono text-xs text-text-secondary border border-dark-border px-3 py-1 rounded-full">
              🏁 Ritorno a {travel.airports.outboundArrivalCity}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* DESCRIZIONE + MOODS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-4">
              Il viaggio
            </p>
            <div
              className="font-body text-text-secondary leading-relaxed text-base space-y-4"
              dangerouslySetInnerHTML={{ __html: travel.itineraryDescription }}
            />
          </div>

          <div className="bg-dark-card rounded-card border border-dark-border p-6 h-fit">
            <p className="font-body text-ghana-gold text-xs uppercase tracking-widest mb-5">
              Atmosfera del viaggio
            </p>
            <div className="space-y-3 mb-6">
              <MoodBar label="Natura"  level={travel.moods.natureLevel} />
              <MoodBar label="Relax"   level={travel.moods.relaxLevel} />
              <MoodBar label="Cultura" level={travel.moods.cultureLevel} />
              <MoodBar label="Storia"  level={travel.moods.historyLevel} />
              <MoodBar label="Party"   level={travel.moods.partyLevel} />
            </div>
            <div className="border-t border-dark-border pt-4 space-y-3">
              <p className="font-body text-xs text-text-secondary">
                📅 Prima data:{" "}
                <span className="text-white font-bold">
                  {travel.firstTour?.startingDate ?? "—"}
                </span>
              </p>
              <p className="font-body text-xs text-text-secondary">
                💰 A partire da:{" "}
                <span className="text-ghana-gold font-bold">
                  €{travel.bestTour?.price?.EUR}
                </span>
                {travel.bestTour?.basePrice?.EUR && (
                  <span className="line-through text-text-secondary ml-2">
                    €{travel.bestTour.basePrice.EUR}
                  </span>
                )}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-text-secondary">🎯 Difficoltà:</span>
                <DifficultyBadge rating={travel.physicalRating} />
              </div>
            </div>
          </div>
        </div>

        {/* MAPPA */}
        {mapImg && (
          <div className="mb-16">
            <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-6">
              Mappa del percorso
            </p>
            <div className="relative rounded-card overflow-hidden border border-dark-border">
              <Image
                src={mapImg.imageUrl}
                alt={mapImg.altText ?? "Mappa itinerario Ghana"}
                width={1200}
                height={600}
                className="w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* TAPPE */}
        <div className="mb-16">
          <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-2">
            Programma giorno per giorno
          </p>
          <h2 className="font-headline text-3xl font-bold text-white mb-10">
            Le tappe del viaggio
          </h2>
          <div>
            {travel.stages.map((stage: any, i: number) => (
              <StageCard key={stage.id} stage={stage} index={i} />
            ))}
          </div>
        </div>

        {/* INCLUSO / NON INCLUSO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-dark-card rounded-card border border-dark-border p-6">
            <h3 className="font-headline text-xl font-bold text-ghana-gold mb-5">
              ✅ Cosa è incluso
            </h3>
            <ul className="space-y-3">
              {travel.whatsIncluded.list.map((item: any) => (
                <li key={item.id} className="flex gap-3">
                  <span className="text-ghana-gold mt-0.5 shrink-0">→</span>
                  <span
                    className="font-body text-text-secondary text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-dark-card rounded-card border border-dark-border p-6">
            <h3 className="font-headline text-xl font-bold text-text-secondary mb-5">
              ❌ Non incluso
            </h3>
            <ul className="space-y-3">
              {travel.whatsNotIncluded.list.map((item: any) => (
                <li key={item.id} className="flex gap-3">
                  <span className="text-ghana-red mt-0.5 shrink-0">×</span>
                  <span className="font-body text-text-secondary text-sm leading-relaxed">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-dark-border">
              <h4 className="font-headline text-base font-bold text-ghana-gold mb-2">
                💰 Cassa comune
              </h4>
              <p className="font-body text-text-secondary text-sm leading-relaxed">
                {travel.moneyPot.description}
              </p>
            </div>
          </div>
        </div>

        {/* GALLERIA */}
        {travel.gallery?.list?.length > 0 && (
          <div className="mb-16">
            <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-2">
              Galleria
            </p>
            <h2 className="font-headline text-3xl font-bold text-white mb-8">
              Il Ghana in immagini
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {travel.gallery.list.map((foto: any) => (
                <div
                  key={foto.id}
                  className="relative aspect-square rounded-img overflow-hidden group"
                >
                  <Image
                    src={foto.imageUrl}
                    alt={foto.altText ?? "Ghana foto"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {faq && (
          <div className="mb-16">
            <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-2">
              Domande frequenti
            </p>
            <h2 className="font-headline text-3xl font-bold text-white mb-8">
              Tutto quello che vuoi sapere
            </h2>
            <div className="space-y-3">
              {[...faq.travels, ...faq.destination.slice(0, 5)].map((q: any) => (
                <FaqItem key={q.id} title={q.title} body={q.body} />
              ))}
            </div>
          </div>
        )}

        {/* CTA FINALE */}
        <div className="bg-ghana-green rounded-card p-10 text-center">
          <p className="font-body text-text-secondary mb-2">
            Hai letto tutto e vuoi partire?
          </p>
          <h3 className="font-headline text-3xl font-bold text-ghana-gold mb-3">
            Scegli la tua data
          </h3>
          <p className="font-body text-text-secondary mb-8 max-w-xl mx-auto">
            A partire da{" "}
            <strong className="text-ghana-gold">
              €{travel.bestTour?.price?.EUR}
            </strong>{" "}
            (volo escluso). Prima partenza il {travel.firstTour?.startingDate}.
          </p>
          <Link
            href="/partenze"
            className="inline-block bg-ghana-red text-white font-headline font-bold px-10 py-5 rounded-btn hover:scale-105 hover:brightness-110 transition-all duration-300 shadow-hover text-lg"
          >
            Vedi le prossime partenze →
          </Link>
        </div>

      </div>
    </div>
  );
}