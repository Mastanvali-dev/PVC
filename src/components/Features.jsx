import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <ShieldCheck size={24} className="text-blue-600" />,
      title: "Secure Payment",
      description: "Encrypted transactions processed with banking-grade security protocols for your peace of mind."
    },
    {
      icon: <Truck size={24} className="text-blue-600" />,
      title: "Fast Delivery",
      description: "Direct-to-door shipping within 3-5 business days across all major metropolitan areas."
    },
    {
      icon: <BadgeCheck size={24} className="text-blue-600" />,
      title: "Premium Quality",
      description: "High-definition thermal printing on industrial-grade PVC with anti-scratch coating."
    }
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
