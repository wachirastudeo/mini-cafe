import React from 'react';
import { Order } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onConfirmPayment: () => void;
  isProcessing: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, order, onConfirmPayment, isProcessing }) => {
  if (!isOpen) return null;

  // Using a generic QR code generator API for demonstration
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=promtpay-goes-here-${order.id}`;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm flex flex-col animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b relative">
            <h3 className="text-xl font-bold text-center text-gray-800">สแกนเพื่อชำระเงิน</h3>
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled={isProcessing}>
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="p-6 flex flex-col items-center">
            <p className="text-gray-600">ยอดชำระเงินทั้งหมด</p>
            <p className="text-5xl font-bold text-amber-800 my-2">{order.total} <span className="text-3xl">บาท</span></p>
            <div className="bg-gray-100 p-2 rounded-lg mt-4">
                <img src={qrCodeUrl} alt="QR Code for payment" className="w-48 h-48 md:w-56 md:h-56"/>
            </div>
            <p className="text-xs text-gray-400 mt-2">QR Code นี้เป็นเพียงตัวอย่าง</p>
        </div>

        <div className="p-6 mt-auto border-t bg-gray-50">
          <button
            onClick={onConfirmPayment}
            disabled={isProcessing}
            className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังยืนยัน...
              </>
            ) : 'ชำระเงินเรียบร้อยแล้ว'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;