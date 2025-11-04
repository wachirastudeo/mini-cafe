
import React from 'react';
import { View } from '../types';
import { MenuIcon } from './icons/MenuIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { ReceiptIcon } from './icons/ReceiptIcon';

interface BottomNavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  cartItemCount: number;
  hasActiveOrder: boolean;
}

const NavButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
    badgeCount?: number;
}> = ({ icon, label, isActive, onClick, badgeCount }) => {
    const activeClass = 'text-amber-600';
    const inactiveClass = 'text-gray-500';
    
    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? activeClass : inactiveClass} hover:text-amber-500`}>
            <div className="relative">
                {icon}
                {badgeCount && badgeCount > 0 && (
                     <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                        {badgeCount}
                    </span>
                )}
            </div>
            <span className={`text-xs mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
        </button>
    );
};


const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView, cartItemCount, hasActiveOrder }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-t-lg z-20">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        <NavButton 
            icon={<MenuIcon className="w-6 h-6" />}
            label="เมนู"
            isActive={currentView === View.MENU}
            onClick={() => setCurrentView(View.MENU)}
        />
        <NavButton 
            icon={<ShoppingCartIcon className="w-6 h-6" />}
            label="ตะกร้า"
            isActive={currentView === View.CART}
            onClick={() => setCurrentView(View.CART)}
            badgeCount={cartItemCount}
        />
        <NavButton 
            icon={<ReceiptIcon className="w-6 h-6" />}
            label="ออเดอร์"
            isActive={currentView === View.TRACKER}
            onClick={() => setCurrentView(View.TRACKER)}
            badgeCount={hasActiveOrder ? '!' : 0}
        />
      </div>
    </div>
  );
};

export default BottomNav;
