import { Car, Lock } from "lucide-react";

export default function OrderSummary({ showPayButton = false, onPay }) {
  return (
    <div className="bg-[#f8fafc] rounded-3xl p-6 md:p-8 w-full border border-gray-100/50 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
      
      {/* Item details */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300 shadow-sm relative overflow-hidden">
          {/* Placeholder for uploaded image */}
          <Car size={16} className="text-gray-400 absolute opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Premium PVC Elite</h4>
          <p className="text-xs text-gray-500 mb-1">Standard Conversion • Premium Finish</p>
          <p className="text-sm font-bold text-blue-600">2 Units</p>
        </div>
      </div>
      
      <div className="w-full h-px bg-gray-200 mb-6"></div>
      
      {/* Pricing breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold text-gray-900">₹330.00</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-blue-600">Calculated at next step</span>
        </div>
      </div>
      
      <div className="w-full h-px bg-gray-200 mb-6"></div>
      
      <div className="flex justify-between items-center mb-8">
        <span className="font-bold text-gray-900 text-lg">Total</span>
        <span className="font-extrabold text-blue-700 text-2xl">₹330.00</span>
      </div>

      {showPayButton && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <button 
            onClick={onPay}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 mb-4"
          >
            <Lock size={18} />
            Pay ₹330.00
          </button>
          <p className="text-[10px] text-gray-400 text-center leading-relaxed px-2">
            By clicking pay, you agree to our Terms of Service and Privacy Policy. Your transaction is secure and encrypted.
          </p>
        </div>
      )}
    </div>
  );
}
