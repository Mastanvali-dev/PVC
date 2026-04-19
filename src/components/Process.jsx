export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Upload RC",
      description: "Snap a clear photo or upload your digital RC document safely."
    },
    {
      number: "02",
      title: "Address Details",
      description: "Provide your delivery information and select your preferred finish."
    },
    {
      number: "03",
      title: "Doorstep Delivery",
      description: "Receive your premium PVC card in a tamper-proof envelope."
    }
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold text-orange-600 tracking-widest uppercase mb-4 block">The Process</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Three steps to precision
            </h2>
          </div>
          <p className="text-gray-600 max-w-sm text-sm md:text-base">
            We've streamlined the complex task of card printing into a simple three-step digital experience.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gray-200 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col relative bg-[#f8fafc]">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-blue-600 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-8 mx-auto md:mx-0">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center md:text-left">{step.title}</h3>
                <p className="text-gray-600 text-center md:text-left text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
