import React, { useState, useMemo } from 'react';
import { CartItem, Order, MenuItem, View, OrderStatus } from './types';
import Header from './components/Header';
import MenuList from './components/MenuList';
import CartView from './components/CartView';
import OrderTracker from './components/OrderTracker';
import BottomNav from './components/BottomNav';
import { submitOrderToBackend } from './services/api';

// Define a type for the options to make it cleaner
type AddToCartOptions = {
  temperature?: 'ร้อน' | 'เย็น';
  sweetness?: string;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.MENU);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleAddToCart = (item: MenuItem, quantityToAdd: number, options: AddToCartOptions) => {
    const cartItemId = `${item.id}-${options.temperature || ''}-${options.sweetness || ''}`;

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.cartItemId === cartItemId);

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.cartItemId === cartItemId
            ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
            : cartItem
        );
      }
      
      const newCartItem: CartItem = {
        ...item,
        quantity: quantityToAdd,
        cartItemId: cartItemId,
        selectedTemperature: options.temperature,
        selectedSweetness: options.sweetness,
      };
      return [...prevCart, newCartItem];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    setIsPlacingOrder(true);
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: OrderStatus.RECEIVED,
      timestamp: new Date(),
      userId: 'user-12345',
    };
    
    try {
      const result = await submitOrderToBackend(newOrder);
      if (result.success) {
        setCurrentOrder(newOrder);
        setCart([]);
        setCurrentView(View.TRACKER);
      } else {
        alert('เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่อีกครั้ง');
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const renderView = () => {
    switch (currentView) {
      case View.CART:
        return (
          <CartView 
            cartItems={cart} 
            onUpdateQuantity={handleUpdateQuantity} 
            onPlaceOrder={handlePlaceOrder}
            isPlacingOrder={isPlacingOrder}
          />
        );
      case View.TRACKER:
        return currentOrder ? (
            <OrderTracker order={currentOrder} setOrder={setCurrentOrder} />
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <h2 className="text-2xl font-semibold text-gray-700">ไม่มีรายการสั่งซื้อล่าสุด</h2>
                <p className="text-gray-500 mt-2">กลับไปที่เมนูเพื่อเริ่มสั่งอาหารและเครื่องดื่มของคุณ</p>
                <button 
                    onClick={() => setCurrentView(View.MENU)}
                    className="mt-6 bg-amber-500 text-white font-bold py-2 px-6 rounded-full hover:bg-amber-600 transition-colors"
                >
                    ดูเมนู
                </button>
            </div>
        );
      case View.MENU:
      default:
        return <MenuList 
                  onAddToCart={handleAddToCart} 
                  onUpdateQuantity={handleUpdateQuantity} 
                  cart={cart}
                />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 pb-24 sm:px-6 lg:px-8">
        {renderView()}
      </main>
      <BottomNav 
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartItemCount={totalCartItems}
        hasActiveOrder={!!currentOrder && currentOrder.status !== OrderStatus.COMPLETED}
      />
    </div>
  );
};

export default App;