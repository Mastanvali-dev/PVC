"use client";

import { Loader2, Circle } from "lucide-react";

export default function Loader({ 
  isVisible = true, 
  message = "Processing...", 
  overlay = true,
  className = "" 
}) {
  if (!isVisible) return null;

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm
      ${overlay ? 'w-full h-full' : ''}
      ${className}
    `}>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl border border-white/50 max-w-sm w-full mx-4 text-center space-y-4">
        {/* Spinner */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <Circle 
              className="w-16 h-16 md:w-20 md:h-20 text-blue-600/20 stroke-[3px] animate-pulse" 
              strokeWidth={3}
            />
            <Loader2 
              className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 text-blue-600 animate-spin stroke-[4px]" 
              strokeWidth={4}
            />
          </div>
        </div>
        
        {/* Message */}
        <div className="space-y-1">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
            {message}
          </h3>
          <p className="text-sm text-gray-500">Please wait while we process your request</p>
        </div>

        {/* Dots animation */}
        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.16s]"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.08s]"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

