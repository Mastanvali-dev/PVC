"use client";

import Navbar from "@/components/Navbar";
import StepProgress from "@/components/StepProgress";
import FileUploadZone from "@/components/FileUploadZone";
import { CreditCard, ScanBarcode, CloudUpload, CheckCircle2, TriangleAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

export default function UploadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkoutData, updateFiles } = useCheckout();

  const [hasExistingFiles, setHasExistingFiles] = useState(false);

  useEffect(() => {
    if (checkoutData.files.frontKey) {
      setFrontFile({ name: checkoutData.files.frontKey, type: 'existing' });
      if (checkoutData.files.backKey) {
        setBackFile({ name: checkoutData.files.backKey, type: 'existing' });
      }
      setHasExistingFiles(true);
      // Auto navigate if on upload page with existing files
      console.log('Upload useEffect: files exist, navigating with flag');
      router.push("/address?fromUpload=true");
    }
  }, [checkoutData.files, router]);

  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleContinue = async () => {
    if (!frontFile) {
      setError("Please upload your RC card document (Front side or a PDF containing both).");
      return;
    }
    if (frontFile.type !== "application/pdf" && frontFile.type !== 'existing' && !backFile) {
      setError("Please upload both the front and back images of your RC card to continue.");
      return;
    }

    if (hasExistingFiles) {
      // Files already uploaded, just navigate
      console.log("FILES EXIST, NAVIGATING WITH FLAG");
      router.push("/address?fromUpload=true");
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("front", frontFile);
      if (backFile && backFile.type !== 'existing') {
        formData.append("back", backFile);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload files");
      }

      updateFiles(data.frontKey, data.backKey || "");
      console.log("Upload success, navigating to address with flag");
      router.push("/address?fromUpload=true");
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <StepProgress
          step={1}
          totalSteps={3}
          title="Upload Registration Card"
          percentage={33}
        />

        {/* Main Card Container */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">

          <p className="text-gray-600 mb-8 max-w-2xl leading-relaxed">
            To begin your precision PVC printing process, please provide high-quality scans or photos of your RC card. Ensure all details are legible.
          </p>

          {/* Upload Zones */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <FileUploadZone
              title="Front Side"
              icon={CreditCard}
              file={frontFile}
              onChange={setFrontFile}
            />
            <FileUploadZone
              title="Back Side"
              icon={ScanBarcode}
              file={backFile}
              onChange={setBackFile}
            />
          </div>

          {/* Upload Both Button */}
          <div className="flex justify-center mb-10">
            <button className="bg-gray-200/60 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors text-sm">
              <CloudUpload size={18} />
              Upload both front and back images
            </button>
          </div>

          {/* Info/Warning Boxes */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="flex-1 bg-gray-50 rounded-2xl p-5 flex items-start gap-3">
              <CheckCircle2 className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-sm text-gray-900 mb-1">Upload clear image</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Ensure all text and numbers are perfectly sharp and readable.
                </p>
              </div>
            </div>

            <div className="flex-1 bg-gray-50 rounded-2xl p-5 flex items-start gap-3">
              <TriangleAlert className="text-orange-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-sm text-gray-900 mb-1">Avoid blur or glare</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Reflections from overhead lights can make important data unreadable.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center border-t border-gray-100 pt-8">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleContinue}
              disabled={isUploading}
              className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-8 rounded-full shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 w-full md:w-auto text-center min-w-[240px] mb-4 ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {hasExistingFiles ? "Files Ready ✓ Continue to Address" : isUploading ? "Uploading..." : "Continue to Step 2"}
            </button>

            <button className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
              Save for later
            </button>
          </div>

        </div>

        {/* Footer Text */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>Your data is protected by bank-grade 256-bit encryption.</p>
          <p>
            Need help? <a href="#" className="text-blue-600 hover:underline">Contact our concierge team</a>
          </p>
        </div>

      </div>
    </main>
  );
}

