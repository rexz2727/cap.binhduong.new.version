"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/nav";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded hover:bg-police-red-dark transition-colors"
        aria-label="Mở menu"
      >
        <div className="w-5 h-0.5 bg-white mb-1" />
        <div className="w-5 h-0.5 bg-white mb-1" />
        <div className="w-5 h-0.5 bg-white" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-police-red shadow-lg py-2 z-50">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-white hover:bg-police-red-dark transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
