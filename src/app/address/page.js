"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StepProgress from "@/components/StepProgress";
import OrderSummary from "@/components/OrderSummary";
import HelpCard from "@/components/HelpCard";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

export default function AddressPage() {
  const router = useRouter();
  const { checkoutData, updateAddress } = useCheckout();
  
  const [formData, setFormData] = useState(checkoutData.address);

  useEffect(() => {
    // Protect route: redirect if files are missing
    if (!checkoutData.files.front || (checkoutData.files.front.type !== "application/pdf" && !checkoutData.files.back)) {
      router.replace("/upload");
      return;
    }
    setFormData(checkoutData.address);
  }, [checkoutData.files, checkoutData.address, router]);
  
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [formError, setFormError] = useState("");

  const handleProceed = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      setFormError("Please fill in all address fields to proceed.");
      return;
    }
    setFormError("");
    updateAddress(formData);
    router.push("/payment");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Pincode validation and API call
    if (name === "pincode" && value.length === 6 && /^\d+$/.test(value)) {
      fetchPincodeDetails(value);
    }
  };

  const fetchPincodeDetails = async (pincode) => {
    setLoadingPincode(true);
    setPincodeError("");
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data && data[0] && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setFormData(prev => ({
          ...prev,
          city: postOffice.District,
          state: postOffice.State
        }));
      } else {
        setPincodeError("Invalid Pincode");
        setFormData(prev => ({ ...prev, city: "", state: "" }));
      }
    } catch (err) {
      setPincodeError("Failed to fetch location");
    } finally {
      setLoadingPincode(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <StepProgress 
          step={2} 
          totalSteps={3} 
          title="Where should we send your craft?" 
          percentage={66} 
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          
          {/* Left Column: Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
              <form className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 block">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Johnathan Doe" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 block">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 (000) 000-0000" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 block">House No. / Street / Apartment</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Studio 42, Precision Heights" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 block">Pincode / Zip</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="pincode"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="500001" 
                        className={`w-full bg-gray-50 border ${pincodeError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-gray-400`}
                      />
                      {loadingPincode && (
                        <div className="absolute right-3 top-3.5 w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>
                    {pincodeError && <p className="text-xs text-red-500 mt-1">{pincodeError}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 block">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Hyderabad" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 block">State / Province</label>
                    <input 
                      type="text" 
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Telangana" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Security Note */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 mt-8 mb-4">
                  <ShieldCheck className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    Your personal details are encrypted and securely stored. We only use this information for delivery purposes.
                  </p>
                </div>

                {formError && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium mb-4">
                    {formError}
                  </div>
                )}

                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={handleProceed}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 w-full md:w-auto inline-flex items-center justify-center gap-2"
                  >
                    Proceed to Payment
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="w-full lg:w-1/3 space-y-6">
            <OrderSummary />
            <HelpCard />
          </div>

        </div>
      </div>
    </main>
  );
}
