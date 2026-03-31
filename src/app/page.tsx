import Link from "next/link";
import Image from "next/image";

const whyGhana = [
  {
    emoji: "🌿",
    titolo: "Natura selvaggia",
    testo: "Dal Kakum National Park con il canopy walk alle spiagge nascoste: il Ghana sorprende ad ogni passo.",
  },
  {
    emoji: "🥁",
    titolo: "Cultura autentica",
    testo: "Mercati vivaci, festival tradizionali, ospitalità unica. Il Ghana ti accoglie come un vecchio amico.",
  },
  {
    emoji: "🤝",
    titolo: "Impatto reale",
    testo: "Viaggia con senso. Volontariato, community building e turismo responsabile nel cuore dell'Africa.",
  },
];

const previewArticoli = [
  {
    slug: "ghana-paese-accoglienza-africana",
    titolo: "Ghana: il paese dell'accoglienza africana",
    anteprima: "Scopri perché il Ghana è la porta d'ingresso all'Africa autentica, dove ogni sorriso racconta una storia.",
    categoria: "Travel Tips",
    img: "https://images.unsplash.com/photo-1580746738099-b2d29c3e8228?w=600&auto=format&fit=crop",
  },
  {
    slug: "mercati-ghana-caos-organizzato",
    titolo: "Mercati del Ghana: caos organizzato e autenticità",
    anteprima: "Colori, profumi e voci che si mescolano in un'esperienza sensoriale unica. Benvenuto nei mercati ghanesi.",
    categoria: "Cultura Locale",
    img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop",
  },
  {
    slug: "volontariato-ghana-fare-la-differenza",
    titolo: "Volontariato in Ghana: fare la differenza veramente",
    anteprima: "Non tutti i viaggi sono uguali. Scopri come il volontariato in Ghana può cambiarti per sempre.",
    categoria: "Volontariato",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop",
  },
];

const previewGalleria = [
  "https://images.unsplash.com/photo-1580746738099-b2d29c3e8228?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop",
];

const categoriaColore: Record<string, string> = {
  "Travel Tips":   "bg-ghana-green text-ghana-gold",
  "Cultura Locale": "bg-dark-card text-ghana-gold",
  "Volontariato":  "bg-ghana-red text-white",
};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&auto=format&fit=crop"
          alt="Paesaggio Ghana - foresta e natura"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay scuro */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Contenuto hero */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="font-body text-ghana-gold text-sm md:text-base uppercase tracking-widest mb-4">
            Viaggia con WeRoad
          </p>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Il Ghana ti aspetta.{" "}
            <span className="text-ghana-gold">Sei pronto?</span>
          </h1>
          <p className="font-body text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Cultura autentica, natura selvaggia, persone straordinarie.
            Un viaggio che non dimenticherai mai.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/itinerari"
              className="bg-ghana-red text-white font-headline font-bold px-8 py-4 rounded-btn hover:scale-105 hover:brightness-110 transition-all duration-300 shadow-hover"
            >
              Vedi gli itinerari →
            </Link>
            <Link
              href="/blog"
              className="border-2 border-ghana-gold text-ghana-gold font-headline font-bold px-8 py-4 rounded-btn hover:bg-ghana-gold hover:text-dark-bg transition-all duration-300"
            >
              Esplora il blog
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary">
          <span className="font-body text-xs uppercase tracking-widest">Scorri</span>
          <div className="w-0.5 h-8 bg-ghana-gold animate-bounce" />
        </div>
      </section>

      {/* PERCHÉ IL GHANA */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-3">
              Perché scegliere il Ghana
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-white">
              Un'Africa che sorprende
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyGhana.map((item) => (
              <div
                key={item.titolo}
                className="bg-dark-card rounded-card p-8 border border-dark-border hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="font-headline text-xl font-bold text-ghana-gold mb-3">
                  {item.titolo}
                </h3>
                <p className="font-body text-text-secondary leading-relaxed">
                  {item.testo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW BLOG */}
      <section className="py-20 px-4 bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-3">
                Dal blog
              </p>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-white">
                Storie dal Ghana
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:block font-body text-ghana-gold hover:text-white transition-colors duration-200 text-sm"
            >
              Tutti gli articoli →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewArticoli.map((articolo) => (
              <Link
                key={articolo.slug}
                href={`/blog/${articolo.slug}`}
                className="group bg-dark-bg rounded-card overflow-hidden border border-dark-border hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={articolo.img}
                    alt={articolo.titolo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className={`inline-block text-xs font-body font-bold px-3 py-1 rounded-full mb-3 ${categoriaColore[articolo.categoria]}`}>
                    {articolo.categoria}
                  </span>
                  <h3 className="font-headline text-lg font-bold text-white mb-2 group-hover:text-ghana-gold transition-colors duration-200">
                    {articolo.titolo}
                  </h3>
                  <p className="font-body text-text-secondary text-sm leading-relaxed line-clamp-2">
                    {articolo.anteprima}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link
              href="/blog"
              className="font-body text-ghana-gold hover:text-white transition-colors duration-200 text-sm"
            >
              Tutti gli articoli →
            </Link>
          </div>
        </div>
      </section>

      {/* PREVIEW GALLERIA */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-ghana-gold text-sm uppercase tracking-widest mb-3">
              Galleria
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-white">
              Il Ghana in immagini
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {previewGalleria.map((src, i) => (
              <div
                key={i}
                className="relative h-56 rounded-img overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`Ghana foto ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/galleria"
              className="inline-block border-2 border-ghana-gold text-ghana-gold font-headline font-bold px-8 py-4 rounded-btn hover:bg-ghana-gold hover:text-dark-bg transition-all duration-300"
            >
              Vedi tutta la galleria →
            </Link>
          </div>
        </div>
      </section>

      {/* BANNER WEROAD */}
      <section className="py-20 px-4 bg-ghana-green">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-ghana-gold mb-6">
            Pronto a partire?
          </h2>
          <p className="font-body text-text-primary text-lg mb-10 max-w-2xl mx-auto">
            Pacchetti da <strong className="text-ghana-gold">€1200</strong> (volo escluso).
            Date disponibili tutto l'anno con WeRoad.
          </p>
          <Link
            href="/itinerari"
            className="inline-block bg-ghana-red text-white font-headline font-bold px-10 py-5 rounded-btn hover:scale-105 hover:brightness-110 transition-all duration-300 shadow-hover text-lg"
          >
            Scopri le date disponibili →
          </Link>
        </div>
      </section>
    </>
  );
}