import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      <Pricing />
      <FAQ />
      <CTA />

      {/* Footer */}
      <footer className="w-full bg-[#f8fafc] py-8 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} PVC CARD CATALOGUE. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
