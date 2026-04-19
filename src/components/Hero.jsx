import { ArrowRight, FileText, CheckCircle2, Shield, Zap, Car, QrCode } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-[#f8fafc] py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-8 z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Convert your RC<br />
              into a <span className="text-blue-600">durable<br />PVC card</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Upload your RC, we print and deliver to your home with surgical precision and premium finish. Experience the boutique atelier of professional printing.
            </p>
            
            <div className="flex items-center gap-6">
              <Link href="/upload" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-full font-medium transition-colors shadow-md flex items-center gap-2">
                <ArrowRight size={20} />
                Upload RC Card
              </Link>
              
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=11" alt="User 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=12" alt="User 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-800 z-10">
                    5k+
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent blur-3xl rounded-full opacity-50 -z-10 transform scale-150"></div>
            
            {/* CSS for 3D flip and glare */}
          <style>{`
            .perspective-1000 { perspective: 1000px; }
            .preserve-3d { transform-style: preserve-3d; }
            .backface-hidden { backface-visibility: hidden; }
            .rotate-y-180 { transform: rotateY(180deg); }
            
            @keyframes auto-flip {
              0% { transform: rotateY(0deg) rotateZ(1deg); }
              40% { transform: rotateY(0deg) rotateZ(1deg); }
              50% { transform: rotateY(180deg) rotateZ(-1deg); }
              90% { transform: rotateY(180deg) rotateZ(-1deg); }
              100% { transform: rotateY(360deg) rotateZ(1deg); }
            }
            .animate-auto-flip {
              animation: auto-flip 14s infinite ease-in-out;
            }
            
            @keyframes auto-glare {
              0%, 10% { left: -100%; opacity: 0; }
              15% { opacity: 1; }
              30%, 100% { left: 200%; opacity: 0; }
            }
            .animate-auto-glare {
              animation: auto-glare 7s infinite linear;
            }
          `}</style>

          <div className="w-full max-w-[500px] aspect-[1.58] perspective-1000 mx-auto lg:ml-auto">
            <div className="relative w-full h-full preserve-3d animate-auto-flip shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl">
              
              {/* Front Face */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border border-gray-300 flex flex-col overflow-hidden bg-white">
                {/* Header: Blue gradient */}
                <div className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white text-center py-2 relative border-b border-blue-900 shadow-sm">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/50 flex items-center justify-center bg-blue-900/30">
                    <div className="w-3.5 h-3.5 bg-yellow-400 rounded-sm transform rotate-45 border border-yellow-200"></div>
                  </div>
                  <div className="text-[9px] font-bold tracking-[0.2em] leading-tight text-blue-100">UNION OF INDIA</div>
                  <div className="text-[13px] font-extrabold tracking-[0.1em] leading-tight drop-shadow-md">TRANSPORT DEPARTMENT</div>
                </div>
                
                {/* Body: Holographic gradient */}
                <div className="flex-1 bg-gradient-to-br from-blue-50 via-yellow-50 to-blue-50 p-4 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                    <Shield size={160} />
                  </div>

                  <div className="flex justify-between items-start mb-3 relative z-10">
                    {/* Chip */}
                    <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 border border-yellow-700/50 shadow-inner flex flex-wrap gap-[1px] p-[2px]">
                      <div className="w-full h-[3px] bg-yellow-800/30 rounded-full"></div>
                      <div className="w-[45%] h-full bg-yellow-800/30 rounded-l-full"></div>
                      <div className="w-[45%] h-full bg-yellow-800/30 rounded-r-full ml-auto"></div>
                      <div className="w-full h-[3px] bg-yellow-800/30 rounded-full mt-auto"></div>
                    </div>
                    {/* Hologram */}
                    <div className="w-10 h-10 rounded bg-gradient-to-tr from-pink-300 via-cyan-300 to-yellow-300 shadow-sm opacity-90 border border-white/80 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.5)_2px,rgba(255,255,255,0.5)_4px)]"></div>
                      <Shield size={18} className="text-white drop-shadow-md" />
                    </div>
                  </div>

                  <div className="text-center mb-4 relative z-10">
                    <div className="text-[10px] font-bold text-blue-800 uppercase tracking-widest mb-0.5">Certificate of Registration</div>
                    <div className="text-base font-extrabold text-gray-900 tracking-[0.15em] font-mono bg-white/50 inline-block px-3 py-1 rounded shadow-sm border border-gray-200/50">MH 12 AB 1234</div>
                  </div>

                  {/* Data Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 z-10 relative px-2">
                    <div>
                      <div className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Owner Name</div>
                      <div className="text-[10px] font-bold text-gray-900 truncate">JOHN DOE</div>
                    </div>
                    <div>
                      <div className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">S/W/D of</div>
                      <div className="text-[10px] font-bold text-gray-900 truncate">JAMES DOE</div>
                    </div>
                    <div>
                      <div className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Date of Regn</div>
                      <div className="text-[10px] font-bold text-gray-900">12/05/2021</div>
                    </div>
                    <div>
                      <div className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Valid Upto</div>
                      <div className="text-[10px] font-bold text-gray-900">11/05/2036</div>
                    </div>
                    <div>
                      <div className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Chassis No</div>
                      <div className="text-[10px] font-bold text-gray-900 font-mono tracking-tight truncate">MA1234567890ABCDE</div>
                    </div>
                    <div>
                      <div className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Engine No</div>
                      <div className="text-[10px] font-bold text-gray-900 font-mono tracking-tight truncate">ENG123456789</div>
                    </div>
                    <div>
                      <div className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Class / Maker</div>
                      <div className="text-[10px] font-bold text-gray-900 truncate">LMV / HONDA CITY</div>
                    </div>
                    <div>
                      <div className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Fuel / CC</div>
                      <div className="text-[10px] font-bold text-gray-900">PETROL / 1498 CC</div>
                    </div>
                  </div>

                  <div className="animate-auto-glare absolute top-0 -left-[100%] w-[150%] h-[150%] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[30deg] pointer-events-none z-20"></div>
                </div>
              </div>

              {/* Back Face */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border border-gray-300 flex flex-col overflow-hidden rotate-y-180 bg-white">
                <div className="w-full h-10 bg-gray-800 mt-5 mb-3 shadow-sm"></div>
                
                <div className="flex-1 p-5 bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-start gap-5 mb-5 z-10 relative">
                    <div className="space-y-3 flex-1">
                      <div className="bg-white/80 p-2 rounded border border-gray-200">
                        <div className="text-[7px] text-gray-500 font-bold uppercase tracking-wider mb-1">Address</div>
                        <div className="text-[9px] font-bold text-gray-800 leading-tight">123, BAKER STREET, APARTMENT 4B,<br/>PUNE CITY, MAHARASHTRA 411001</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 px-1">
                        <div>
                          <div className="text-[7px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Color</div>
                          <div className="text-[9px] font-bold text-gray-800">RADIANT RED</div>
                        </div>
                        <div>
                          <div className="text-[7px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Seating Cap</div>
                          <div className="text-[9px] font-bold text-gray-800">5</div>
                        </div>
                        <div>
                          <div className="text-[7px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Unladen Wt</div>
                          <div className="text-[9px] font-bold text-gray-800">1150 KG</div>
                        </div>
                        <div>
                          <div className="text-[7px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Financier</div>
                          <div className="text-[9px] font-bold text-gray-800 truncate">HDFC BANK LTD</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[84px] h-[84px] bg-white border border-gray-300 rounded-lg p-1.5 flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <QrCode className="text-gray-900 w-full h-full" />
                    </div>
                  </div>

                  <div className="mt-auto flex justify-between items-end border-t border-gray-300 pt-3 z-10 relative">
                    <div className="text-[7.5px] leading-relaxed text-gray-500 text-justify w-[65%] pr-4">
                      This registration certificate is issued by the transport department. If found, please return to the nearest police station or RTO. Unauthorized duplication is strictly prohibited.
                    </div>
                    <div className="text-center w-[35%]">
                      <div className="font-serif italic text-xl text-blue-900 opacity-80 -mb-1 transform -rotate-2">J.Doe</div>
                      <div className="text-[7px] font-bold text-gray-500 border-t border-gray-400/50 pt-1 mt-1 inline-block">ISSUING AUTHORITY</div>
                    </div>
                  </div>
                  
                  <div className="animate-auto-glare absolute top-0 -left-[100%] w-[150%] h-[150%] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[30deg] pointer-events-none z-20" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>

            </div>
          </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
