import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { MinusIcon } from './icons/MinusIcon';
import { PlusIcon } from './icons/PlusIcon';
import { CloseIcon } from './icons/CloseIcon';

interface CustomizationModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, options: { temperature?: 'ร้อน' | 'เย็น'; sweetness?: string; }) => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({ item, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedTemp, setSelectedTemp] = useState<'ร้อน' | 'เย็น' | undefined>(item.temperatureOptions?.[0]);
  const [selectedSweetness, setSelectedSweetness] = useState<string | undefined>(item.sweetnessOptions?.[0]);

  useEffect(() => {
    // Reset state when item changes
    setQuantity(1);
    setSelectedTemp(item.temperatureOptions?.[0]);
    setSelectedSweetness(item.sweetnessOptions?.[0]);
  }, [item]);

  if (!isOpen) return null;

  const handleAddToCartClick = () => {
    onAddToCart(item, quantity, {
      temperature: selectedTemp,
      sweetness: selectedSweetness
    });
    onClose();
  };

  const renderOptionGroup = (
    title: string, 
    options: readonly string[] | undefined, 
    selectedValue: string | undefined, 
    setter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    if (!options || options.length === 0) return null;
    return (
      <div className="mt-4">
        <h4 className="font-semibold text-gray-700">{title}</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {options.map(option => (
            <button
              key={option}
              onClick={() => setter(option)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-200 ${
                selectedValue === option
                  ? 'bg-amber-800 text-white border-amber-800'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-amber-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b relative">
            <h3 className="text-xl font-bold text-center text-gray-800">{item.name}</h3>
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {renderOptionGroup('เลือกประเภท', item.temperatureOptions, selectedTemp, setSelectedTemp)}
          {renderOptionGroup('ระดับความหวาน', item.sweetnessOptions, selectedSweetness, setSelectedSweetness)}
        </div>

        <div className="p-6 mt-auto border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-700">จำนวน</p>
            <div className="flex items-center space-x-3 bg-white border border-gray-300 rounded-full">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 rounded-full hover:bg-gray-100"><MinusIcon className="w-5 h-5 text-gray-600"/></button>
                <span className="font-bold w-8 text-center text-lg">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-2 rounded-full hover:bg-gray-100"><PlusIcon className="w-5 h-5 text-gray-600"/></button>
            </div>
          </div>
          <button
            onClick={handleAddToCartClick}
            className="w-full mt-6 bg-amber-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-amber-600 transition-colors"
          >
            เพิ่มลงตะกร้า - {item.price * quantity}฿
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
