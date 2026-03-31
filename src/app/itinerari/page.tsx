"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WeRoadTour } from "@/types";
import { buildTourUrl, fetchTours } from "@/lib/weroad";

function formatData(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatPrezzo(price: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

const salesStatusMap: Record<string, { label: string; color: string }> = {
  CONFIRMED:        { label: "✅ Confermato",     color: "bg-ghana-green text-ghana-gold" },
  ALMOST_CONFIRMED: { label: "⏳ In conferma",    color: "bg-yellow-900 text-yellow-300" },
  AVAILABLE:        { label: "✅ Disponibile",    color: "bg-ghana-green text-ghana-gold" },
  SOLD_OUT:         { label: "🔴 Esaurito",       color: "bg-red-950 text-ghana-red" },
  CANCELLED:        { label: "⛔ Cancellato",     color: "bg-dark-card text-text-secondary" },
};

function SalesStatusBadge({ status }: { status: string }) {
  const mapped = salesStatusMap[status] ?? { label: status, color: "bg-dark-card text-text-secondary" };
  return (
    <span className={`inline-block text-xs font-body font-bold px-3 py-1 rounded-full ${mapped.color}`}>
      {mapped.label}
    </span>
  );
}

function BookingPillars({ pillars }: { pillars: WeRoadTour["bookingPillars"] }) {
  const items = [
    { active: pillars.freeCancellation,        label: "Cancellazione gratuita" },
    { active: pillars.bookWithDeposit,         label: "Prenota con acconto" },
    { active: pillars.interestFreeInstallments, label: "Rate senza interessi" },
    { active: pillars.flexibleCancellation,    label: "Cancellazione flessibile" },
  ].filter((i) => i.active);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map((item) => (
        <span
          key={item.label}
          className="text-xs font-body text-text-secondary border border-dark-border px-2 py-0.5 rounded-full"
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}

export default function ItinerariPage() {
  const [tours, setTours] = useState<WeRoadTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTours()
      .then(setTours)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-3">
            Parti con WeRoad
          </p>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-4">
            Date disponibili
          </h1>
          <p className="font-body text-text-secondary text-lg max-w-2xl mx-auto">
            Pacchetti da{" "}
            <strong className="text-ghana-gold">€1200</strong> (volo escluso).
            Clicca su una data per prenotare su WeRoad.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-ghana-gold border-t-transparent rounded-full animate-spin" />
            <p className="font-body text-text-secondary">Caricamento itinerari...</p>
          </div>
        )}

        {/* Errore */}
        {error && (
          <div className="bg-dark-card border border-ghana-red rounded-card p-8 text-center">
            <p className="font-body text-text-secondary mb-6">{error}</p>
            <Link
              href="https://www.weroad.it/viaggi/ghana-africa-che-si-vive-tra-coste-foreste-e-villaggi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ghana-red text-white font-headline font-bold px-6 py-3 rounded-btn hover:brightness-110 transition-all duration-300"
            >
              Vai direttamente su WeRoad →
            </Link>
          </div>
        )}

        {/* Nessun tour */}
        {!loading && !error && tours.length === 0 && (
          <div className="text-center py-24">
            <p className="font-body text-text-secondary text-lg mb-6">
              Nessuna data disponibile al momento.
            </p>
            <Link
              href="https://www.weroad.it/viaggi/ghana-africa-che-si-vive-tra-coste-foreste-e-villaggi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ghana-red text-white font-headline font-bold px-6 py-3 rounded-btn hover:brightness-110 transition-all duration-300"
            >
              Controlla su WeRoad →
            </Link>
          </div>
        )}

        {/* Lista tour */}
        {!loading && !error && tours.length > 0 && (
          <div className="flex flex-col gap-4">
            {tours.map((tour, i) => (
              <Link
                key={tour.id}
                href={buildTourUrl(tour.id)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-4 p-6 rounded-card border border-dark-border hover:border-ghana-gold hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300 ${
                  i % 2 === 0 ? "bg-dark-card" : "bg-dark-bg"
                }`}
              >
                {/* Riga 1: stato + durata + partenza */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <SalesStatusBadge status={tour.salesStatus} />
                    <span className="font-mono text-xs text-text-secondary">
                      {tour.travel.numberOfDays} giorni
                    </span>
                    <span className="font-mono text-xs text-text-secondary">
                      Partenza da {tour.travel.startingPlace}
                    </span>
                  </div>
                  {tour.discountPercentage && (
                    <span className="text-xs font-body font-bold bg-ghana-red text-white px-2 py-1 rounded-full">
                      -{tour.discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Riga 2: date + prezzo + CTA */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Date */}
                  <div className="flex flex-wrap gap-8">
                    <div>
                      <p className="font-body text-xs text-text-secondary uppercase tracking-wide mb-0.5">
                        Partenza
                      </p>
                      <p className="font-mono text-white font-bold">
                        {formatData(tour.startingDate)}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-secondary uppercase tracking-wide mb-0.5">
                        Ritorno
                      </p>
                      <p className="font-mono text-white font-bold">
                        {formatData(tour.endingDate)}
                      </p>
                    </div>
                    {tour.seatsToConfirm !== null && (
                      <div>
                        <p className="font-body text-xs text-text-secondary uppercase tracking-wide mb-0.5">
                          Posti da confermare
                        </p>
                        <p className="font-mono text-yellow-300 font-bold">
                          {tour.seatsToConfirm}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Prezzo + CTA */}
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="text-right">
                      {tour.basePrice && (
                        <p className="font-body text-xs text-text-secondary line-through">
                          {formatPrezzo(tour.basePrice.EUR)}
                        </p>
                      )}
                      <p className="font-headline text-2xl font-bold text-ghana-gold">
                        {formatPrezzo(tour.price.EUR)}
                      </p>
                      <p className="font-body text-xs text-text-secondary">
                        Acconto: {formatPrezzo(tour.depositPrice.EUR)}
                      </p>
                    </div>
                    <span className="bg-ghana-red text-white font-headline font-bold text-sm px-5 py-3 rounded-btn group-hover:brightness-110 group-hover:scale-105 transition-all duration-300 whitespace-nowrap">
                      Prenota →
                    </span>
                  </div>
                </div>

                {/* Riga 3: coordinatore + pillars */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-2 border-t border-dark-border">
                  <p className="font-body text-xs text-text-secondary">
                    {tour.coordinator
                      ? `👤 Coordinatore: ${tour.coordinator.firstName} ${tour.coordinator.lastName} · ${tour.coordinator.city ?? ""}`
                      : "👤 Coordinatore da assegnare"}
                  </p>
                  <BookingPillars pillars={tour.bookingPillars} />
                </div>

              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}