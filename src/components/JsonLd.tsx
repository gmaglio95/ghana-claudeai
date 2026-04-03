export function ArticleJsonLd({
  titolo,
  descrizione,
  slug,
  img,
}: {
  titolo: string;
  descrizione: string;
  slug: string;
  img: string;
}) {
  const baseUrl = "https://ghana-claudeai.vercel.app";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titolo,
    description: descrizione,
    image: img,
    url: `${baseUrl}/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: "Ghana Travel",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Ghana Travel",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.ico`,
      },
    },
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString(),
    inLanguage: "it-IT",
    about: {
      "@type": "Place",
      name: "Ghana",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GH",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const baseUrl = "https://ghana-claudeai.vercel.app";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ghana Travel",
    url: baseUrl,
    description:
      "Scopri il Ghana: cultura autentica, natura selvaggia e avventure indimenticabili con WeRoad.",
    inLanguage: "it-IT",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TravelJsonLd() {
  const baseUrl = "https://ghana-claudeai.vercel.app";
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "Viaggio in Ghana con WeRoad",
    description:
      "10 giorni tra oceano, foreste e villaggi. Itinerario di gruppo in Ghana con WeRoad.",
    url: `${baseUrl}/itinerario`,
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&auto=format&fit=crop",
    touristType: {
      "@type": "Audience",
      audienceType: "Adventure Travelers",
    },
    offers: {
      "@type": "Offer",
      price: "1200",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: "https://www.weroad.it/viaggi/ghana-africa-che-si-vive-tra-coste-foreste-e-villaggi",
    },
    provider: {
      "@type": "Organization",
      name: "WeRoad",
      url: "https://www.weroad.it",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}