import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-blue-700 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-blue-100 text-lg max-w-md mb-10 leading-relaxed">
              No hidden fees, no subscription. Pay once for institutional-grade quality delivered to your door.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-blue-200" />
                <span className="font-medium text-blue-50">Free Shipping Nationwide</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-blue-200" />
                <span className="font-medium text-blue-50">Premium PVC Material</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-blue-200" />
                <span className="font-medium text-blue-50">QR Code Verification Support</span>
              </li>
            </ul>
          </div>

          {/* Right Pricing Card */}
          <div className="w-full lg:w-[450px]">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl relative">
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-md">
                  Popular
                </span>
              </div>
              
              <div className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-4">
                Professional Grade
              </div>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-extrabold text-blue-700">₹330</span>
                <span className="text-gray-500 font-medium">/ card</span>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-colors shadow-md mb-4 text-lg">
                Get Started Now
              </button>
              
              <p className="text-center text-xs text-gray-400 font-medium">
                Inclusive of taxes and shipping
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
