
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`fixed inset-0 z-[2000] bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        className={`fixed top-0 right-0 h-full bg-white transition-transform duration-300 w-[85%] max-w-sm ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-5 right-6 text-4xl text-[#1d2b4f]"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="p-8 pt-20">
          <div className="text-xl font-extrabold text-[#1d2b4f] border-b border-gray-100 pb-4 mb-6">
            👤 Welcome back!
          </div>
          
          <nav className="flex flex-col gap-6">
            <a href="#" className="text-lg font-semibold text-[#1d2b4f] hover:text-[#3b71fe] transition">My Account</a>
            <a href="#" className="text-lg font-semibold text-[#1d2b4f] hover:text-[#3b71fe] transition">Orders</a>
            <a href="#" className="text-lg font-semibold text-[#1d2b4f] hover:text-[#3b71fe] transition">Special Offers</a>
            <a href="#" className="text-lg font-semibold text-[#1d2b4f] hover:text-[#3b71fe] transition">Customer Service</a>
            <a href="#" className="text-lg font-semibold text-[#1d2b4f] hover:text-[#3b71fe] transition">Settings</a>
            <hr className="border-gray-100" />
            <a href="#" className="text-lg font-bold text-[#e91e63] hover:opacity-80 transition">Sign Out</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
