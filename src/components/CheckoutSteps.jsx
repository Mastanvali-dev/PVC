import Link from "next/link";

export default function CheckoutSteps({ currentStep }) {
  const steps = [
    { num: 1, label: "Shipping", href: "/upload" },
    { num: 2, label: "Review", href: "/address" },
    { num: 3, label: "Payment", href: "/payment" },
  ];

  return (
    <div className="flex items-center gap-4 mb-10 text-sm font-semibold">
      {steps.map((step, index) => {
        const isActive = currentStep === step.num;
        const isPast = currentStep > step.num;
        
        return (
          <div key={step.num} className="flex items-center gap-3">
            {isPast || isActive ? (
              <Link href={step.href} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs 
                  ${isActive ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-800"}`}
                >
                  {step.num}
                </div>
                <span className={`hidden sm:inline ${isActive ? "text-blue-900" : "text-gray-600"}`}>
                  {step.label}
                </span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-gray-100 text-gray-400"
                >
                  {step.num}
                </div>
                <span className="hidden sm:inline text-gray-400">
                  {step.label}
                </span>
              </div>
            )}
            
            {index < steps.length - 1 && (
              <div className="w-8 md:w-16 h-[1px] bg-gray-200"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
