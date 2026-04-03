import { MetadataRoute } from "next";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ghana-claudeai.vercel.app";

  const articoli = articles.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl,                    priority: 1.0,  changeFrequency: "weekly" as const },
    { url: `${baseUrl}/blog`,          priority: 0.9,  changeFrequency: "weekly" as const },
    { url: `${baseUrl}/itinerario`,    priority: 0.9,  changeFrequency: "daily" as const },
    { url: `${baseUrl}/partenze`,      priority: 0.9,  changeFrequency: "daily" as const },
    { url: `${baseUrl}/galleria`,      priority: 0.6,  changeFrequency: "monthly" as const },
    ...articoli,
  ];
}