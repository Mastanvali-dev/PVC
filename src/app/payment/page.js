"use client";

import Navbar from "@/components/Navbar";
import CheckoutSteps from "@/components/CheckoutSteps";
import PaymentMethodList from "@/components/PaymentMethodList";
import OrderSummary from "@/components/OrderSummary";
import { Shield, ShieldCheck, FileKey2 } from "lucide-react";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

export default function PaymentPage() {
  const { checkoutData, clearCheckout } = useCheckout();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Protect route: redirect if address is missing
    if (!checkoutData.address.fullName || !checkoutData.address.phone) {
      router.replace("/address");
    }
  }, [checkoutData.address, router]);

  const handlePay = async () => {
    setIsProcessing(true);

    try {
      // STEP 1: Create Razorpay Order
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 33000, currency: "INR" }),
      });

      const data = await res.json();

      if (!data.orderId) {
        throw new Error(data.error || "Failed to create order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "PVC CARD CATALOGUE",
        description: "Premium PVC RC Card",
        order_id: data.orderId,

        // ✅ FIXED HANDLER
        handler: async function (response) {
          setIsProcessing(true);

          try {
            // 🔴 STEP 2: VERIFY PAYMENT FIRST
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
              throw new Error("Payment verification failed");
            }

            const frontKey = checkoutData.files.frontKey || "";
            const backKey = checkoutData.files.backKey || "";

            // 🟢 STEP 4: SAVE ORDER
            const orderPayload = {
              customerInfo: {
                fullName: checkoutData.address.fullName,
                phone: checkoutData.address.phone,
              },
              shippingAddress: {
                address: checkoutData.address.address,
                city: checkoutData.address.city,
                state: checkoutData.address.state,
                pincode: checkoutData.address.pincode,
              },
              rcImages: { frontKey, backKey },
              paymentInfo: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                amount: 33000,
                status: "Success",
              },
            };

            const saveRes = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderPayload),
            });

            if (!saveRes.ok) {
              const errorData = await saveRes.json().catch(() => ({}));
              throw new Error(errorData.error || "Failed to save order to Database.");
            }

            const saveData = await saveRes.json();

            // Navigate to success page. We will clear the checkout state there.
            router.push(`/success?orderId=${saveData.orderId}`);

          } catch (err) {
            console.error(err);
            alert(err.message || "Payment failed or verification error");
          } finally {
            setIsProcessing(false);
          }
        },

        // ❌ HANDLE FAILURE (you ignored this before)
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },

        prefill: {
          name: checkoutData.address.fullName || "",
          contact: checkoutData.address.phone || "",
        },

        theme: {
          color: "#2563EB",
        },
      };

      const paymentObject = new window.Razorpay(options);

      // ❗ ADD FAILURE LISTENER
      paymentObject.on("payment.failed", function (response) {
        console.error("Payment Failed:", response);
        alert("Payment failed. Try again.");
        setIsProcessing(false);
      });

      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert(
        error.message ||
        "Error initiating payment. Check Razorpay keys."
      );
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 flex flex-col">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CheckoutSteps currentStep={3} />

        <div className="flex flex-col lg:flex-row gap-8 mt-2">
          <div className="w-full lg:w-2/3">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                Secure Checkout
              </h1>
              <p className="text-gray-600">
                Choose your preferred payment method.
              </p>
            </div>

            <PaymentMethodList />

            <div className="flex items-center justify-center gap-6 mt-12 text-gray-400 text-xs font-bold uppercase">
              <div className="flex items-center gap-1.5">
                <Shield size={14} />
                SSL Encrypted
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} />
                Secure Checkout
              </div>
              <div className="flex items-center gap-1.5">
                <FileKey2 size={14} />
                PCI Compliant
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-6">
            <OrderSummary showPayButton={true} onPay={handlePay} />
          </div>
        </div>
      </div>
    </main>
  );
}