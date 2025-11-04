import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { CartItem, MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface MenuListProps {
  onAddToCart: (item: MenuItem, quantity: number, options: { temperature?: 'ร้อน' | 'เย็น'; sweetness?: string; }) => void;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  cart: CartItem[];
}

type CategoryFilter = 'all' | 'เครื่องดื่ม' | 'ของหวาน';

const MenuList: React.FC<MenuListProps> = ({ onAddToCart, onUpdateQuantity, cart }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'ทั้งหมด' },
    { key: 'เครื่องดื่ม', label: 'เครื่องดื่ม' },
    { key: 'ของหวาน', label: 'ของหวาน' },
  ];

  const filteredItems = MENU_ITEMS.filter(item =>
    activeCategory === 'all' || item.category === activeCategory
  );
  
  // Create a map for quick lookup of quantities for items already in cart.
  // This is more complex now since one menu item can appear multiple times with different options.
  const cartItemMap = cart.reduce((map, cartItem) => {
    if (!map[cartItem.id]) {
        map[cartItem.id] = 0;
    }
    map[cartItem.id] += cartItem.quantity;
    return map;
  }, {} as Record<string, number>);


  return (
    <div>
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
              activeCategory === key
                ? 'bg-amber-800 text-white shadow-md'
                : 'bg-white text-amber-800 hover:bg-amber-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map(item => {
          // We pass the entire cart down so the card can find its specific variations
          const cartItemsForItem = cart.filter(ci => ci.id === item.id);
          return (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              cartItems={cartItemsForItem}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity} 
            />
          )
        })}
      </div>
    </div>
  );
};

export default MenuList;