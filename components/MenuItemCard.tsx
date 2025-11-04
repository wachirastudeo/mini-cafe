import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { MinusIcon } from './icons/MinusIcon';
import CustomizationModal from './CustomizationModal';

interface MenuItemCardProps {
  item: MenuItem;
  cartItems: CartItem[]; // All variations of this item in the cart
  onAddToCart: (item: MenuItem, quantity: number, options: { temperature?: 'ร้อน' | 'เย็น'; sweetness?: string; }) => void;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, cartItems, onAddToCart, onUpdateQuantity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const totalQuantity = cartItems.reduce((sum, current) => sum + current.quantity, 0);

  const hasOptions = !!item.temperatureOptions || !!item.sweetnessOptions;

  const handleAddClick = () => {
    if (hasOptions) {
      setIsModalOpen(true);
    } else {
      // For items with no options, add directly
      const cartItemId = `${item.id}--`; // Simple ID for non-customizable items
      const existingItem = cartItems.find(ci => ci.cartItemId === cartItemId);
      if (existingItem) {
        onUpdateQuantity(cartItemId, existingItem.quantity + 1);
      } else {
        onAddToCart(item, 1, {});
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
        <div className="relative">
          <img className="w-full h-48 object-cover" src={item.imageUrl} alt={item.name} />
          {totalQuantity > 0 && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
              {totalQuantity}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-500 text-sm mt-1 flex-grow">{item.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold text-amber-800">{item.price}฿</span>
            
            <button
              onClick={handleAddClick}
              className="bg-amber-500 text-white rounded-full h-10 px-5 hover:bg-amber-600 transition-colors flex items-center justify-center font-semibold text-sm shadow-sm"
              aria-label={`เพิ่ม ${item.name} ลงในตะกร้า`}
            >
              <PlusIcon className="w-5 h-5 mr-1" />
              <span>{hasOptions ? 'เลือกตัวเลือก' : 'เพิ่ม'}</span>
            </button>
          </div>
        </div>
      </div>

      {hasOptions && isModalOpen && (
        <CustomizationModal
          item={item}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
};

export default MenuItemCard;