
import React from 'react';
import { Icons } from '../constants';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 h-28 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <div className="flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-3">
              <span className="text-3xl lg:text-4xl font-black text-[#2d3a54] tracking-tight uppercase">Steps to Hebrew</span>
              <div className="bg-[#4b9eff] w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-blue-100">
                <div className="w-5 h-5 border-2 border-white rounded-full"></div>
              </div>
            </div>
            <div className="text-[12px] tracking-[0.45em] font-black text-[#4b9eff] uppercase mt-[-4px]">עִבְרִית צַעַד אַחַר צַעַד</div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="hidden sm:flex items-center gap-2 cursor-pointer text-[#2d3a54] hover:text-blue-600 font-black text-xl transition-all group">
            <span>Log in</span>
            <div className="rotate-180 group-hover:translate-x-1 transition-transform">
              <Icons.Login />
            </div>
          </div>
          <button className="bg-[#ffcc00] text-black px-10 py-4 rounded-[24px] font-black text-xl shadow-[0_8px_20px_rgba(255,204,0,0.4)] hover:bg-[#ffd633] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(255,204,0,0.5)] transition-all active:scale-95">
            Signup
          </button>
          
          {/* Mobile Filter Toggle */}
          <button 
            onClick={onToggleSidebar} 
            className="lg:hidden p-4 bg-[#f1f5f9] text-[#2d3a54] rounded-2xl hover:bg-white transition-all border border-transparent hover:border-gray-200"
            aria-label="Toggle filters"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
