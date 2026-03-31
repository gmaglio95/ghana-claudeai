import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";

const categoriaColore: Record<string, string> = {
  "Travel Tips":    "bg-ghana-green text-ghana-gold",
  "Cultura Locale": "bg-dark-card text-ghana-gold",
  "Volontariato":   "bg-ghana-red text-white",
};

// Genera i meta tag dinamici per ogni articolo
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const articolo = articles.find((a) => a.slug === params.slug);
  if (!articolo) return {};
  return {
    title: `${articolo.titolo} | Ghana Travel`,
    description: articolo.metaDescription,
  };
}

// Pre-genera tutte le rotte statiche
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default function ArticoloPage({
  params,
}: {
  params: { slug: string };
}) {
  const articolo = articles.find((a) => a.slug === params.slug);
  if (!articolo) notFound();

  // Articoli correlati (stessa categoria, escluso quello corrente)
  const correlati = articles
    .filter((a) => a.categoria === articolo.categoria && a.slug !== articolo.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">

      {/* Hero articolo */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={articolo.img}
          alt={articolo.altImg}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-10 max-w-4xl mx-auto w-full left-0 right-0">
          <span className={`inline-block text-xs font-body font-bold px-3 py-1 rounded-full mb-4 w-fit ${categoriaColore[articolo.categoria]}`}>
            {articolo.categoria}
          </span>
          <h1 className="font-headline text-3xl md:text-5xl font-bold text-white leading-tight">
            {articolo.titolo}
          </h1>
        </div>
      </div>

      {/* Contenuto */}
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Intro */}
        <p className="font-body text-text-secondary text-lg md:text-xl leading-relaxed mb-10 border-l-4 border-ghana-gold pl-6">
          {articolo.anteprima}
        </p>

        {/* Corpo articolo */}
        {articolo.contenuto ? (
          <div
            className="prose prose-invert prose-lg max-w-none font-body"
            dangerouslySetInnerHTML={{ __html: articolo.contenuto }}
          />
        ) : (
          // Placeholder finché non scriviamo i contenuti veri
          <div className="space-y-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-ghana-gold mb-4">
                Un viaggio che inizia dalla curiosità
              </h2>
              <p className="font-body text-text-secondary leading-relaxed">
                Il Ghana è uno di quei posti che ti cambia senza che te ne accorga.
                Non succede in modo drammatico, non c'è un momento preciso in cui
                puoi dire "ecco, è qui che è cambiato tutto". Succede lentamente,
                nei piccoli momenti: una chiacchierata con un venditore di mercato,
                il rumore dei tamburi che arriva da lontano, un tramonto sulla costa
                atlantica che tinge tutto di rosso e oro.
              </p>
            </div>

            {/* Immagine 1 */}
            <div className="rounded-img overflow-hidden">
              <Image
                src={articolo.img}
                alt={articolo.altImg}
                width={800}
                height={450}
                className="w-full object-cover"
              />
              <p className="font-body text-text-secondary text-sm mt-2 italic">
                {articolo.altImg}
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-ghana-gold mb-4">
                Perché il Ghana è diverso
              </h2>
              <p className="font-body text-text-secondary leading-relaxed">
                Quello che rende il Ghana unico in Africa occidentale è la sua
                stabilità politica, la sua apertura ai visitatori e — soprattutto
                — la sua autenticità. Non è un paese costruito per il turismo.
                È un paese che vive, che lavora, che celebra, e che ti invita a
                farne parte. L'accoglienza ghanese non è performativa: è genuina,
                calda, immediata.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-ghana-gold mb-4">
                Cosa porta a casa chi ci va
              </h2>
              <p className="font-body text-text-secondary leading-relaxed">
                Chi torna dal Ghana raramente parla solo di posti. Parla di persone.
                Del ragazzo che li ha aiutati a trovare il mercato giusto, della
                famiglia che li ha invitati a pranzo, dei bambini che correvano
                accanto al tro-tro. Il Ghana entra dentro in un modo che pochi
                altri posti riescono a fare. E questo è esattamente il motivo per
                cui vale la pena andarci.
              </p>
            </div>
          </div>
        )}

        {/* CTA WeRoad */}
        <div className="mt-14 bg-ghana-green rounded-card p-8 text-center">
          <p className="font-body text-text-secondary mb-2">
            Hai voglia di vivere questa esperienza?
          </p>
          <h3 className="font-headline text-2xl font-bold text-ghana-gold mb-6">
            Scopri l'itinerario in Ghana su WeRoad
          </h3>
          <Link
            href="/itinerari"
            className="inline-block bg-ghana-red text-white font-headline font-bold px-8 py-4 rounded-btn hover:scale-105 hover:brightness-110 transition-all duration-300 shadow-hover"
          >
            Vedi le date disponibili →
          </Link>
        </div>

        {/* Articoli correlati */}
        {correlati.length > 0 && (
          <div className="mt-16">
            <h3 className="font-headline text-2xl font-bold text-white mb-8">
              Potrebbe interessarti anche
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {correlati.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group bg-dark-card rounded-card overflow-hidden border border-dark-border hover:border-ghana-gold hover:shadow-hover transition-all duration-300"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={rel.img}
                      alt={rel.altImg}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-headline text-sm font-bold text-white group-hover:text-ghana-gold transition-colors duration-200 line-clamp-2">
                      {rel.titolo}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Torna al blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="font-body text-text-secondary hover:text-ghana-gold transition-colors duration-200 text-sm"
          >
            ← Torna al blog
          </Link>
        </div>

      </div>
    </div>
  );
}