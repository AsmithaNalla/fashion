import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  Printer,
  ShoppingBag
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const {
    isOrdersViewOpen,
    setIsOrdersViewOpen,
    orders,
    setSelectedCategory,
    setCurrentPage
  } = useShop();

  if (!isOrdersViewOpen) return null;

  const handlePrint = (orderId: string) => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#1F301D] text-[#F3F8F2] rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#385532] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#2D4529] flex items-center justify-between bg-[#182617]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#FF6B81]" />
            <div>
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#FF6B81]">
                My Orders & Tailoring Status
              </h2>
              <p className="text-xs text-[#A5C8A1]">
                Track order milestones, view invoices, and manage delivery details
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOrdersViewOpen(false)}
            className="p-1.5 rounded-md text-[#C7DEC4] hover:text-[#FFA4B2] hover:bg-[#2A3F26] cursor-pointer"
            aria-label="Close orders view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders Content */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6 bg-[#1F301D]">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#263C23] text-[#A5C8A1] border border-[#3C5B37] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#FFA4B2]">
                No orders placed yet
              </h3>
              <p className="text-xs text-[#C7DEC4] max-w-sm mx-auto leading-relaxed">
                Explore our traditional kurtis, bridal lehangas, frocks, maternal wear, and curated accessories. Orders can be paid with Cash on Delivery or Instant UPI.
              </p>
              <button
                onClick={() => {
                  setIsOrdersViewOpen(false);
                  setCurrentPage('shop');
                  setSelectedCategory('all');
                  const el = document.getElementById('shop-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#CC2240] hover:bg-[#A8132D] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-md transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order) => {
              const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={order.id}
                  className="bg-[#182617] rounded-lg border border-[#345230] p-5 shadow-md space-y-4 text-xs"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2D4529] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#FF6B81]">
                          {order.id}
                        </span>
                        <span className="text-xs bg-[#243B21] text-[#A5C8A1] border border-[#3B5935] font-semibold px-2 py-0.5 rounded">
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#A5C8A1] mt-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Placed on {orderDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handlePrint(order.id)}
                        className="px-3 py-1.5 text-xs text-[#C7DEC4] hover:text-[#FFA4B2] hover:bg-[#20311E] rounded border border-[#3E5C38] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Receipt</span>
                      </button>
                      <span className="text-base font-bold text-[#FF6B81] font-mono tabular-nums">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Order Tracking Progress Bar */}
                  <div className="py-2">
                    <p className="text-xs font-semibold text-[#A5C8A1] uppercase tracking-wider mb-2">
                      Fulfillment Milestones:
                    </p>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      <div className="p-2 bg-[#233820] rounded text-[#FFA4B2] font-semibold border border-[#3E5C38]">
                        <CheckCircle className="w-3.5 h-3.5 mx-auto mb-1 text-[#FF6B81]" />
                        <span>Order Confirmed</span>
                      </div>
                      <div className="p-2 bg-[#1C2C1A] rounded text-[#A5C8A1] font-medium border border-[#2D4529]">
                        <Clock className="w-3.5 h-3.5 mx-auto mb-1 text-[#7DAA78]" />
                        <span>Artisan Tailoring</span>
                      </div>
                      <div className="p-2 bg-[#1C2C1A] rounded text-[#7DAA78] font-medium border border-[#2D4529]">
                        <Package className="w-3.5 h-3.5 mx-auto mb-1 text-[#7DAA78]" />
                        <span>Dispatched</span>
                      </div>
                      <div className="p-2 bg-[#1C2C1A] rounded text-[#7DAA78] font-medium border border-[#2D4529]">
                        <Truck className="w-3.5 h-3.5 mx-auto mb-1 text-[#7DAA78]" />
                        <span>Doorstep Delivery</span>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2.5 pt-1">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 bg-[#20311E] rounded border border-[#2D4529]"
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-12 h-14 object-cover rounded bg-[#162215] border border-[#2D4529]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif-luxury text-sm font-semibold text-[#F3F8F2] truncate">
                            {item.productName}
                          </p>
                          <p className="text-xs text-[#A5C8A1]">
                            Size: <span className="font-semibold text-[#FFA4B2]">{item.size}</span> · Quantity: {item.quantity}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-[#FF6B81] font-mono tabular-nums">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Customer, Shipping, and Payment Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#C7DEC4] pt-2 border-t border-[#2D4529]">
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-[#FFA4B2] mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FF6B81]" />
                        <span>Delivery Address:</span>
                      </div>
                      <p>{order.customerName}</p>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                      <p className="text-[11px] text-[#A5C8A1]">Phone: {order.customerPhone}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-[#FFA4B2] mb-1">
                        <CreditCard className="w-3.5 h-3.5 text-[#FF6B81]" />
                        <span>Payment Mode:</span>
                      </div>
                      <p className="font-medium text-[#F3F8F2]">
                        {order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Instant UPI Payment'}
                      </p>
                      <p className="text-[11px] text-[#A5C8A1]">Status: {order.paymentStatus}</p>
                      {order.upiTransactionId && (
                        <p className="text-[11px] font-mono text-[#A5C8A1]">
                          Ref: {order.upiTransactionId}
                        </p>
                      )}
                      <p className="text-[11px] text-[#FF6B81] font-semibold mt-1">
                        Est. Delivery: {order.estimatedDeliveryDate}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
