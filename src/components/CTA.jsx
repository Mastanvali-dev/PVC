export default function CTA() {
  return (
    <section id="support" className="w-full bg-[#f8fafc] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50 rounded-[2.5rem] p-10 md:p-16 text-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.05)] border border-gray-200/50">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Ready to upgrade your documentation?
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Join over 5,000 professionals who trust PVC CARD CATALOGUE for their essential physical documentation.
        </p>
        <a 
          href="https://wa.me/918179676982?text=Hi!%20I%20have%20a%20question%20about%20the%20PVC%20Card%20Catalogue."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
        >
          Start Conversation
        </a>
      </div>
    </section>
  );
}
