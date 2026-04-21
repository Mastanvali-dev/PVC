"use client";

import { useEffect, useState } from "react";
import { Download, FileText, ImageIcon, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.error || "Failed to fetch orders");
        }
      } catch (err) {
        setError("Network error while fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDownload = async (url, type) => {
    if (!url) return;
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `rc-card-${type}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download:", err);
      alert("Failed to download the file.");
    }
  };

  const isPDF = (key) => key && key.toLowerCase().endsWith('.pdf');

  const getPreviewUrl = (key) => key ? `/api/download?key=${key}` : '';

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Customer Orders</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl font-medium">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center text-gray-500">
            No orders found.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-8">
                
                {/* Details Section */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Customer Details</h3>
                    <p className="text-lg font-bold text-gray-900">{order.customerInfo?.fullName}</p>
                    <p className="text-gray-600 font-medium">{order.customerInfo?.phone}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Shipping Address</h3>
                    <p className="text-gray-800">
                      {order.shippingAddress?.address}<br/>
                      {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Payment Status</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.paymentInfo?.status || "Success"}
                    </span>
                    <span className="text-xs text-gray-500 ml-3">₹{order.paymentInfo?.amount ? order.paymentInfo.amount / 100 : "N/A"}</span>
                  </div>
                </div>

                {/* Files Section */}
                <div className="flex-1 bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Uploaded Documents</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Front Image/PDF */}
{order.rcImages?.frontKey && (
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                        <div className="flex-1 flex items-center justify-center bg-gray-100 min-h-[120px] p-4 relative group">
                           {isPDF(order.rcImages.frontKey) ? (
                             <FileText className="text-gray-400" size={48} />
                           ) : (
                             // eslint-disable-next-line @next/next/no-img-element
                             <img 
                               src={getPreviewUrl(order.rcImages.frontKey)} 
                               alt="Front RC" 
                               className="max-h-full object-contain"
                             />
                           )}
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                               onClick={() => handleDownload(getPreviewUrl(order.rcImages.frontKey), 'front')}
                               className="bg-white text-gray-900 p-2 rounded-full hover:scale-110 transition-transform"
                               title="Download Original"
                             >
                               <Download size={20} />
                             </button>
                           </div>
                        </div>
                        <div className="p-3 bg-white border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-600">Front Side</span>
                          <button 
                            onClick={() => handleDownload(getPreviewUrl(order.rcImages.frontKey), 'front')}
                            className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1"
                          >
                            <Download size={14} /> Download
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Back Image/PDF */}
{order.rcImages?.backKey && (
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                        <div className="flex-1 flex items-center justify-center bg-gray-100 min-h-[120px] p-4 relative group">
                           {isPDF(order.rcImages.backKey) ? (
                             <FileText className="text-gray-400" size={48} />
                           ) : (
                             // eslint-disable-next-line @next/next/no-img-element
                             <img 
                               src={getPreviewUrl(order.rcImages.backKey)} 
                               alt="Back RC" 
                               className="max-h-full object-contain"
                             />
                           )}
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                               onClick={() => handleDownload(getPreviewUrl(order.rcImages.backKey), 'back')}
                               className="bg-white text-gray-900 p-2 rounded-full hover:scale-110 transition-transform"
                               title="Download Original"
                             >
                               <Download size={20} />
                             </button>
                           </div>
                        </div>
                        <div className="p-3 bg-white border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-600">Back Side</span>
                          <button 
                            onClick={() => handleDownload(getPreviewUrl(order.rcImages.backKey), 'back')}
                            className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1"
                          >
                            <Download size={14} /> Download
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
