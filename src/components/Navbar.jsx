"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">

          <div className="flex items-center " >
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="PVC Card Catalogue Logo"
                width={120}
                height={40}
                className="h-8 w-8 mr-2 rounded-full object-cover bg-black"
              />
              <span className="text-blue-700 font-bold text-xl tracking-tight">
                PVC CARD CATALOGUE
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          {isHome && (
            <>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="#products" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                  Products
                </Link>
                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">
                  Pricing
                </Link>
                <Link href="#support" className="text-gray-600 hover:text-gray-900 font-medium">
                  Support
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/upload"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile Button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && isHome && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#products" className="block px-3 py-2 text-blue-600 font-medium">
              Products
            </Link>
            <Link href="#pricing" className="block px-3 py-2 text-gray-600 font-medium">
              Pricing
            </Link>
            <Link href="#support" className="block px-3 py-2 text-gray-600 font-medium">
              Support
            </Link>
            <div className="pt-4 flex flex-col gap-3 px-3">
              <Link
                href="/upload"
                className="bg-blue-600 text-white text-center px-4 py-2 rounded-full font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}