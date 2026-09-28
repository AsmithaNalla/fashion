import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Package, ArrowRight, Printer } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder, setIsOrdersViewOpen, setCurrentPage } = useShop();

  if (!lastPlacedOrder) return null;

  const handleTrack = () => {
    setLastPlacedOrder(null);
    setIsOrdersViewOpen(true);
  };

  const handleContinue = () => {
    setLastPlacedOrder(null);
    setCurrentPage('shop');
    const shopEl = document.getElementById('shop-section');
    if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative bg-[#1F301D] text-[#F3F8F2] rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#385532] p-6 sm:p-8 text-center space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#263C23] text-[#FF6B81] border border-[#3C5B37] flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-[#FF6B81]" />
        </div>

        {/* Heading in Cherry Red */}
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-widest text-[#A5C8A1] font-semibold">
            Payment & Tailoring Confirmed
          </span>
          <h2 className="font-serif-luxury text-3xl font-semibold text-[#FF6B81]">
            Thank You, {lastPlacedOrder.customerName}
          </h2>
          <p className="text-xs text-[#C7DEC4] leading-relaxed">
            Your exclusive order has been received by our master atelier.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-4 bg-[#182617] rounded-lg border border-[#345230] text-left text-xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-[#2D4529] pb-2">
            <span className="text-[#A5C8A1]">Order ID:</span>
            <span className="font-mono font-bold text-[#FF6B81] text-sm">
              {lastPlacedOrder.id}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A5C8A1]">Payment Mode:</span>
            <span className="font-semibold text-[#F3F8F2]">
              {lastPlacedOrder.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Verified UPI Payment'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A5C8A1]">Total Paid / Due:</span>
            <span className="font-mono font-bold text-[#FF6B81]">
              ₹{lastPlacedOrder.total.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A5C8A1]">Est. Delivery Date:</span>
            <span className="font-semibold text-[#F3F8F2]">
              {lastPlacedOrder.estimatedDeliveryDate}
            </span>
          </div>
          <div className="pt-2 border-t border-[#2D4529] text-[11px] text-[#A5C8A1]">
            <span>Shipping to: {lastPlacedOrder.shippingAddress.street}, {lastPlacedOrder.shippingAddress.city}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleTrack}
            className="flex-1 py-3 px-4 bg-[#2D4528] hover:bg-[#385532] text-white text-xs font-semibold uppercase tracking-wider rounded-md border border-[#4E7649] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Package className="w-4 h-4 text-[#FFA4B2]" />
            <span>Track in My Orders</span>
          </button>

          <button
            onClick={handleContinue}
            className="flex-1 py-3 px-4 bg-[#CC2240] hover:bg-[#A8132D] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="text-xs text-[#A5C8A1] hover:text-[#FFA4B2] flex items-center justify-center gap-1 mx-auto underline underline-offset-4 cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Order Receipt</span>
        </button>
      </div>
    </div>
  );
};
