import Link from "next/link";

export default function FloatingCTA() {
  return (
    <Link
      href="https://www.weroad.it/viaggi/ghana-africa-che-si-vive-tra-coste-foreste-e-villaggi/"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-4 z-50
        bg-ghana-red text-white
        font-headline font-bold text-sm
        px-5 py-3 rounded-btn
        shadow-hover
        hover:scale-105 hover:brightness-110
        transition-all duration-300
        md:bottom-8 md:right-8 md:text-base md:px-6 md:py-4
      "
    >
      Scopri su WeRoad →
    </Link>
  );
}