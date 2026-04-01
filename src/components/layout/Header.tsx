"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "Blog",       href: "/blog" },
  { label: "Itinerario", href: "/itinerario" },
  { label: "Partenze",   href: "/partenze" },
  { label: "Galleria",   href: "/galleria" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ghana-green shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🪃</span>
          <span className="font-headline text-ghana-gold text-xl font-bold tracking-wide">
            Ghana Travel
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-text-primary hover:text-ghana-gold transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Apri menu"
        >
          <span className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-dark-bg z-40 flex flex-col items-center justify-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-headline text-3xl text-text-primary hover:text-ghana-gold transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}