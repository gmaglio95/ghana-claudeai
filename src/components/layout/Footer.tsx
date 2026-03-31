import Link from "next/link";

const footerLinks = [
  { label: "Home",      href: "/" },
  { label: "Blog",      href: "/blog" },
  { label: "Galleria",  href: "/galleria" },
  { label: "Itinerari", href: "/itinerari" },
];

export default function Footer() {
  return (
    <footer className="bg-ghana-green py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <span className="font-headline text-ghana-gold text-lg font-bold">
          Ghana Travel 🇬🇭
        </span>

        {/* Links */}
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

        {/* Copyright */}
        <p className="font-body text-text-secondary text-sm">
          © {new Date().getFullYear()} Ghana Travel
        </p>
      </div>
    </footer>
  );
}