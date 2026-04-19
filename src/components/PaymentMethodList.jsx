"use client";

import { ShieldCheck } from "lucide-react";

export default function PaymentMethodList() {
  return (
    <div className="space-y-4">
      {/* Razorpay Method */}
      <div className="border-2 rounded-3xl p-6 border-blue-600 bg-blue-50/30 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Razorpay Secure Checkout</h3>
              <p className="text-sm text-gray-600 mt-1">Pay seamlessly via UPI, Cards, NetBanking, or Wallets.</p>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-blue-600 bg-white">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-200/50 flex items-center text-sm text-gray-600 font-medium">
          <p>You will be securely redirected to the Razorpay gateway to complete your transaction.</p>
        </div>
      </div>
    </div>
  );
}
