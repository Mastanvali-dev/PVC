"use client";

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Download, FileText } from 'lucide-react';

export default function ClientOrders({ initialOrders, initialError }) {
//   const { data: session, status } = useSession();
  const [orders, setOrders] = useState(initialOrders || []);
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (status === 'authenticated') {
//       fetchOrders();
//     }
//   }, [status]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders', {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        setError(null);
      } else {
        setError(data.error || "Failed to fetch orders");
      }
    } catch (err) {
      setError("Network error while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const isPDF = (key) => key && key.toLowerCase().endsWith('.pdf');
  const getPreviewUrl = (key) => key ? `/api/download?key=${key}` : '';

//   if (status === 'loading') {
//     return (
//       <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
//         <div>Loading...</div>
//       </main>
//     );
//   }

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Customer Orders</h1>
          <button
onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
          >
            Sign Out
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl font-medium">
            {error}
            <button 
              onClick={fetchOrders}
              className="ml-4 bg-blue-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700 ml-2"
            >
              Retry
            </button>
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
                      {order.shippingAddress?.address}<br />
                      {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Payment Status</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.paymentInfo?.status || "Success"}
                    </span>
                    <span className="text-xs text-gray-500 ml-3">₹{order.paymentInfo?.amount ? order.paymentInfo.amount : "N/A"}</span>
                  </div>
                </div>

                {/* Files Section */}
                <div className="flex-1 bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Uploaded Documents</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.rcImages?.frontKey && (
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                        <div className="flex-1 flex items-center justify-center bg-gray-100 min-h-[120px] p-4 relative group">
                          {isPDF(order.rcImages.frontKey) ? (
                            <FileText className="text-gray-400" size={48} />
                          ) : (
                            <img 
                              src={getPreviewUrl(order.rcImages.frontKey)} 
                              alt="Front RC" 
                              className="max-h-full object-contain"
                            />
                          )}
                          <a 
                            href={getPreviewUrl(order.rcImages.frontKey)} 
                            download
                            className="absolute inset-0 bg-black/0 flex items-center justify-center opacity-100 transition-opacity"
                            title="Download"
                          >
                            <Download className="text-white/0" size={20} />
                          </a>
                        </div>
                        <div className="p-3 bg-white border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-600">Front Side</span>
                          <a 
                            href={getPreviewUrl(order.rcImages.frontKey)} 
                            download
                            className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1"
                          >
                            <Download size={14} /> Download
                          </a>
                        </div>
                      </div>
                    )}

                    {order.rcImages?.backKey && (
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                        <div className="flex-1 flex items-center justify-center bg-gray-100 min-h-[120px] p-4 relative group">
                          {isPDF(order.rcImages.backKey) ? (
                            <FileText className="text-gray-400" size={48} />
                          ) : (
                            <img 
                              src={getPreviewUrl(order.rcImages.backKey)} 
                              alt="Back RC" 
                              className="max-h-full object-contain"
                            />
                          )}
                          <a 
                            href={getPreviewUrl(order.rcImages.backKey)} 
                            download
                            className="absolute inset-0 bg-black/0 flex items-center justify-center opacity-100 transition-opacity"
                            title="Download"
                          >
                            <Download className="text-white/0" size={20} />
                          </a>
                        </div>
                        <div className="p-3 bg-white border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-600">Back Side</span>
                          <a 
                            href={getPreviewUrl(order.rcImages.backKey)} 
                            download
                            className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1"
                          >
                            <Download size={14} /> Download
                          </a>
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
