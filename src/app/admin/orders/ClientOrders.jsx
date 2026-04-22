"use client";

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Download, FileText, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export default function ClientOrders({ initialOrders, initialError }) {
//   const { data: session, status } = useSession();
  const [orders, setOrders] = useState(initialOrders || []);
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

//   useEffect(() => {
  //     if (status === 'authenticated') {
  //       fetchOrders();
  //     }
  //   }, [status]);

  // Reset to page 1 when search, sort, or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, itemsPerPage]);

  // Filter and sort orders
  const filteredAndSortedOrders = orders
    .filter(order => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        order.customerInfo?.fullName?.toLowerCase().includes(query) ||
        order.customerInfo?.phone?.toLowerCase().includes(query) ||
        order.shippingAddress?.city?.toLowerCase().includes(query) ||
        order.shippingAddress?.state?.toLowerCase().includes(query) ||
        order.shippingAddress?.pincode?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'oldest':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case 'name-asc':
          return (a.customerInfo?.fullName || '').localeCompare(b.customerInfo?.fullName || '');
        case 'name-desc':
          return (b.customerInfo?.fullName || '').localeCompare(a.customerInfo?.fullName || '');
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const paginatedOrders = filteredAndSortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const togglePrinted = async (orderId, currentPrinted) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, printed: !currentPrinted }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, printed: !currentPrinted } : order
        ));
        toast.success(`Order marked as ${!currentPrinted ? 'printed' : 'not printed'}`);
      }
    } catch (err) {
      console.error("Failed to update printed status");
      toast.error("Failed to update printed status");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const isPDF = (key) => key && key.toLowerCase().endsWith('.pdf');
  const getPreviewUrl = (key) => key ? `/api/download?key=${key}` : '';

  const handleDownload = (key, type) => {
    const url = getPreviewUrl(key);
    if (url) {
      toast.success(`Downloading ${type}...`);
      const a = document.createElement('a');
      a.href = url;
      a.download = key.split('/').pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

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
            className="bg-red-600 text-white cursor-pointer px-6 py-2 rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
          >
            Sign Out
          </button>
        </div>

        {/* Search and Sort Controls */}
        <div className="bg-white rounded-2xl text-black p-4 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, phone, city, state, or pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
             
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-black">
                {filteredAndSortedOrders.length} of {orders.length} orders
              </span>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-black">Show:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={500}>500</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-black">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
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
         ) : filteredAndSortedOrders.length === 0 ? (
           <div className="bg-white p-8 rounded-2xl shadow-sm text-center text-gray-500">
             No orders match your search criteria.
           </div>
) : (
            <div>
            <div className="space-y-6">
             {paginatedOrders.map((order) => (
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

                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Printed</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={order.printed || false}
                        disabled={updatingOrderId === order._id}
                        onChange={() => togglePrinted(order._id, order.printed)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {updatingOrderId === order._id ? 'Updating...' : (order.printed ? 'Yes' : 'No')}
                      </span>
                    </label>
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
                          <button 
                            onClick={() => handleDownload(order.rcImages.frontKey, 'Front RC')}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs font-bold flex items-center gap-1"
                          >
                            <Download size={14} /> Download
                          </button>
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
                          <button 
                            onClick={() => handleDownload(order.rcImages.backKey, 'Back RC')}
                            className="text-blue-600 cursor-pointer hover:text-blue-800 text-xs font-bold flex items-center gap-1"
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

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8">
                <div className="text-sm text-black">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} className="text-black" />
                  </button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium ${
                        currentPage === idx + 1
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-200 hover:bg-gray-50 text-black'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} className="text-black" />
                  </button>
                </div>
              </div>
            )}
            </div>
        )}
      </div>
    </main>
  );
}
