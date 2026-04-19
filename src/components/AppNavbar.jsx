import Link from "next/link";
import { User } from "lucide-react";

export default function AppNavbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform rotate-3">
              {/* Simple logo placeholder to match screenshot */}
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-white"></div>
            </div>
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-gray-900 font-bold text-xl tracking-tight">
                PVC CARD CATALOGUE
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/orders" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              My Orders
            </Link>
            <Link href="/settings" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Settings
            </Link>
            <button className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
               <img src="https://i.pravatar.cc/150?img=68" alt="User Avatar" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
