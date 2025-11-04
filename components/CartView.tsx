import React from 'react';
import { CartItem } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { MinusIcon } from './icons/MinusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onPlaceOrder: () => void;
  isPlacingOrder: boolean;
}

const CartView: React.FC<CartViewProps> = ({ cartItems, onUpdateQuantity, onPlaceOrder, isPlacingOrder }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-semibold text-gray-700">ตะกร้าของคุณว่างเปล่า</h2>
        <p className="text-gray-500 mt-2">เพิ่มเมนูอร่อยๆ ลงในตะกร้าได้เลย!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">ตะกร้าสินค้าของคุณ</h2>
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
            {cartItems.map(item => (
                <div key={item.cartItemId} className="p-4 flex items-start space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-md object-cover"/>
                    <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        {(item.selectedTemperature || item.selectedSweetness) && (
                          <p className="text-sm text-gray-500">
                            {item.selectedTemperature}{item.selectedTemperature && item.selectedSweetness ? ', ' : ''}{item.selectedSweetness}
                          </p>
                        )}
                        <p className="text-amber-700 font-medium mt-1">{item.price}฿</p>
                    </div>
                    <div className="flex items-center space-x-3 shrink-0">
                        <button onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"><MinusIcon className="w-4 h-4 text-gray-600"/></button>
                        <span className="font-bold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"><PlusIcon className="w-4 h-4 text-gray-600"/></button>
                    </div>
                    <div className="font-bold text-lg text-right w-20 shrink-0">
                        {item.price * item.quantity}฿
                    </div>
                    <button onClick={() => onUpdateQuantity(item.cartItemId, 0)} className="text-gray-400 hover:text-red-500 transition shrink-0"><TrashIcon className="w-5 h-5"/></button>
                </div>
            ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center text-xl font-bold">
                <span>ยอดรวม</span>
                <span>{totalPrice}฿</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">ราคารวมภาษีมูลค่าเพิ่มแล้ว</p>
            <button 
                onClick={onPlaceOrder} 
                disabled={isPlacingOrder}
                className="w-full mt-6 bg-amber-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-amber-600 transition-colors disabled:bg-amber-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isPlacingOrder ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังดำเนินการ...
                  </>
                ) : 'ยืนยันการสั่งซื้อและชำระเงิน'}
            </button>
        </div>
    </div>
  );
};

export default CartView;