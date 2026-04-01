import Link from "next/link";

const footerLinks = [
  { label: "Home",       href: "/" },
  { label: "Blog",       href: "/blog" },
  { label: "Itinerario", href: "/itinerario" },
  { label: "Partenze",   href: "/partenze" },
  { label: "Galleria",   href: "/galleria" },
];

export default function Footer() {
  return (
    <footer className="bg-ghana-green py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-headline text-ghana-gold text-lg font-bold">
          Ghana Travel 🇬🇭
        </span>
        <nav className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-ghana-gold hover:text-white transition-colors duration-200 text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="font-body text-text-secondary text-sm">
          © {new Date().getFullYear()} Ghana Travel
        </p>
      </div>
    </footer>
  );
}