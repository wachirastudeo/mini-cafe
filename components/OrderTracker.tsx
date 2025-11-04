
import React, { useEffect, useState } from 'react';
import { Order, OrderStatus } from '../types';

interface OrderTrackerProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}

const STATUS_SEQUENCE: OrderStatus[] = [
    OrderStatus.RECEIVED,
    OrderStatus.PREPARING,
    OrderStatus.READY,
    OrderStatus.COMPLETED
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ order, setOrder }) => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(() => STATUS_SEQUENCE.indexOf(order.status));
  
  useEffect(() => {
    if (currentStatusIndex < STATUS_SEQUENCE.length - 2) { // Stop before COMPLETED
      const timer = setTimeout(() => {
        const nextStatusIndex = currentStatusIndex + 1;
        setCurrentStatusIndex(nextStatusIndex);
        setOrder(prevOrder => prevOrder ? { ...prevOrder, status: STATUS_SEQUENCE[nextStatusIndex] } : null);
      }, 7000); // 7 seconds per stage
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStatusIndex, setOrder]);

  const getStatusClass = (index: number) => {
    if (index < currentStatusIndex) return 'bg-green-500 text-white';
    if (index === currentStatusIndex) return 'bg-amber-500 text-white animate-pulse';
    return 'bg-gray-200 text-gray-500';
  };
  
  const getConnectorClass = (index: number) => {
    return index < currentStatusIndex ? 'bg-green-500' : 'bg-gray-200';
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center">ติดตามออเดอร์ของคุณ</h2>
      <p className="text-center text-gray-500 mt-2">หมายเลขออเดอร์: <span className="font-semibold text-amber-800">{order.id}</span></p>

      <div className="mt-8">
        <div className="flex items-center">
            {STATUS_SEQUENCE.slice(0, 3).map((status, index) => (
                <React.Fragment key={status}>
                    <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getStatusClass(index)}`}>
                            {index + 1}
                        </div>
                        <p className={`mt-2 text-sm text-center font-medium ${index <= currentStatusIndex ? 'text-gray-800' : 'text-gray-500'}`}>{status}</p>
                    </div>
                    {index < 2 && (
                        <div className={`flex-grow h-1 mx-2 ${getConnectorClass(index)}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">สรุปรายการ</h3>
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between text-gray-700 py-1">
            <span>{item.name} x {item.quantity}</span>
            <span>{item.price * item.quantity}฿</span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 flex justify-between font-bold text-lg">
          <span>ยอดรวม</span>
          <span>{order.total}฿</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
