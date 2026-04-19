"use client";

import Navbar from "@/components/Navbar";
import { Check, ReceiptText, Wallet, Truck, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense, useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import autoTable from "jspdf-autotable";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [isClient, setIsClient] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const { clearCheckout } = useCheckout();

  useEffect(() => {
    setIsClient(true);
    if (!orderId) {
      router.replace("/");
    } else {
      // Clear the checkout context once we successfully reach the success page
      clearCheckout();

      // Fetch order details
      fetch(`/api/orders?orderId=${orderId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOrderDetails(data.order);
          }
        })
        .catch(err => console.error("Failed to fetch order details", err));
    }
  }, [orderId, router, clearCheckout]);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text("A5 PVC CARD CATALOGUE", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Order Invoice", 105, 28, { align: "center" });

    // Line
    doc.setDrawColor(200);
    doc.line(14, 35, 196, 35);

    // Order Info
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text(`Order ID: ${orderId}`, 14, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 52);
    doc.text(`Payment Status: Paid via Razorpay`, 14, 59);

    if (orderDetails) {
      const { customerInfo, shippingAddress } = orderDetails;

      // Customer Details (Right Aligned block)
      doc.setFontSize(10);
      doc.setTextColor(50);
      doc.text("Bill To:", 140, 45);

      doc.setFontSize(9);
      doc.setTextColor(80);
      doc.text(`${customerInfo?.fullName || 'N/A'}`, 140, 52);
      doc.text(`${customerInfo?.phone || 'N/A'}`, 140, 57);

      // Multi-line address
      const splitAddress = doc.splitTextToSize(`${shippingAddress?.address || ''}, ${shippingAddress?.city || ''}, ${shippingAddress?.state || ''} - ${shippingAddress?.pincode || ''}`, 60);
      doc.text(splitAddress, 140, 62);
    }

    // Table
    autoTable(doc, {
      startY: 85,
      head: [["Description", "Quantity", "Price", "Total"]],
      body: [
        ["Premium PVC RC Card Conversion", "1", "INR 330.00", "INR 330.00"],
        ["Shipping", "-", "Free", "Free"]
      ],
      foot: [["", "", "Grand Total", "INR 330.00"]],
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] },
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: "bold" }
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for choosing A5 PVC CARD CATALOGUE!", 105, (doc.lastAutoTable?.finalY || 130) + 30, { align: "center" });

    // Save
    doc.save(`invoice-${orderId || 'order'}.pdf`);
  };

  if (!isClient || !orderId) return null;

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Left Column: Success Message & Visual */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shadow-sm">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <Check className="text-white" strokeWidth={3} size={20} />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Order Placed Successfully!
              </h1>
              <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                Thank you for your order. We're getting your craft ready for delivery with the precision it deserves.
              </p>
            </div>

            {/* Product Visual Mockup */}
            <div className="w-full max-w-md aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden mt-8 transform -rotate-1">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>

              {/* Card 1 (Back) */}
              <div className="absolute top-12 right-12 w-[240px] aspect-[1.58] bg-gray-900 rounded-xl shadow-2xl border border-gray-700/50 p-6 flex flex-col justify-between transform rotate-12">
                <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-800 rounded w-full"></div>
                  <div className="h-2 bg-gray-800 rounded w-3/4"></div>
                </div>
              </div>

              {/* Card 2 (Front) */}
              <div className="absolute top-20 left-8 w-[240px] aspect-[1.58] bg-gray-100 rounded-xl shadow-2xl border border-white p-6 flex flex-col justify-between transform -rotate-6">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-8 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 rounded-full border border-gray-300"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Details Card */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Order Details</h2>

              <div className="space-y-8">

                {/* Order ID */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <ReceiptText className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Order ID</p>
                    <p className="text-lg font-extrabold text-gray-900 tracking-tight">{orderId}</p>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Wallet className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Payment Status</p>
                    <div className="flex items-center gap-3">
                      <p className="text-base font-bold text-gray-900">Paid via Razorpay</p>
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Estimate */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Truck className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Delivery Estimate</p>
                    <p className="text-base font-bold text-gray-900">Expected by {deliveryDateStr}</p>
                  </div>
                </div>

              </div>

              <div className="w-full h-px bg-gray-100 my-8"></div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={handleDownloadInvoice}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Download Invoice
                  <Download size={18} />
                </button>
                <Link
                  href="/"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-xl transition-colors flex items-center justify-center text-sm"
                >
                  Back to Home
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
