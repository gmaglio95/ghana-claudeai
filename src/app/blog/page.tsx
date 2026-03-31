"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { articles, Article } from "@/data/articles";

type Categoria = "Tutti" | Article["categoria"];

const categorie: Categoria[] = ["Tutti", "Travel Tips", "Cultura Locale", "Volontariato"];

const categoriaColore: Record<string, string> = {
  "Travel Tips":    "bg-ghana-green text-ghana-gold",
  "Cultura Locale": "bg-dark-card text-ghana-gold",
  "Volontariato":   "bg-ghana-red text-white",
};

export default function BlogPage() {
  const [filtro, setFiltro] = useState<Categoria>("Tutti");

  const articoliFiltrati = filtro === "Tutti"
    ? articles
    : articles.filter((a) => a.categoria === filtro);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-3">
            Storie dal Ghana
          </p>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-4">
            Il Blog
          </h1>
          <p className="font-body text-text-secondary text-lg max-w-2xl mx-auto">
            Cultura, avventura e volontariato. Tutto quello che devi sapere
            prima — e dopo — il tuo viaggio in Ghana.
          </p>
        </div>

        {/* Filtri categoria */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categorie.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`flex-shrink-0 font-body font-bold text-sm px-5 py-2.5 rounded-btn transition-all duration-200 ${
                filtro === cat
                  ? "bg-ghana-gold text-dark-bg"
                  : "bg-dark-card text-text-secondary hover:text-white border border-dark-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contatore */}
        <p className="font-body text-text-secondary text-sm mb-8">
          {articoliFiltrati.length} articoli
          {filtro !== "Tutti" && ` in "${filtro}"`}
        </p>

        {/* Grid articoli */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articoliFiltrati.map((articolo) => (
            <Link
              key={articolo.slug}
              href={`/blog/${articolo.slug}`}
              className="group bg-dark-card rounded-card overflow-hidden border border-dark-border hover:border-ghana-gold hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
            >
              {/* Immagine */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={articolo.img}
                  alt={articolo.altImg}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Contenuto */}
              <div className="p-6">
                <span className={`inline-block text-xs font-body font-bold px-3 py-1 rounded-full mb-3 ${categoriaColore[articolo.categoria]}`}>
                  {articolo.categoria}
                </span>
                <h2 className="font-headline text-lg font-bold text-white mb-2 group-hover:text-ghana-gold transition-colors duration-200 line-clamp-2">
                  {articolo.titolo}
                </h2>
                <p className="font-body text-text-secondary text-sm leading-relaxed line-clamp-2">
                  {articolo.anteprima}
                </p>
                <p className="font-body text-ghana-gold text-sm mt-4 group-hover:translate-x-1 transition-transform duration-200">
                  Leggi →
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}