import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    promoDiscount,
    cartTotal,
    promoCode,
    applyPromoCode,
    setIsCheckoutOpen,
    setSelectedCategory,
    setCurrentPage
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoMessage({ text: 'Promo applied: 10% off!' });
    } else {
      setPromoMessage({ text: 'Invalid code. Try "MATCHA10" or "COUTURE15"', error: true });
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1F301D] border-l border-[#385532] shadow-2xl flex flex-col text-[#F3F8F2]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#2D4529] flex items-center justify-between bg-[#192717]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF6B81]" />
              <h2 className="font-serif-luxury text-xl font-semibold text-[#FF6B81]">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-semibold text-[#A5C8A1] tabular-nums">
                ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-md text-[#C7DEC4] hover:text-[#FFA4B2] hover:bg-[#2A3F26] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#263C23] border border-[#3C5B37] flex items-center justify-center text-[#A5C8A1] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl font-semibold text-[#FFA4B2] mb-2">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#C7DEC4] max-w-xs mb-6">
                  Explore our handcrafted kurtis, lehangas, frocks, maternal wear, and accessories.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                    setSelectedCategory('all');
                    const shopEl = document.getElementById('shop-section');
                    if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 bg-[#CC2240] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#A8132D] transition-colors cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-[#182617] rounded-lg border border-[#345230] shadow-md"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded bg-[#162215] shrink-0 border border-[#2D4529]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-luxury text-sm font-semibold text-[#F3F8F2] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#7DAA78] hover:text-[#FFA4B2] p-0.5 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#A5C8A1] mt-0.5">
                        <span>Size: <strong className="text-[#F3F8F2]">{item.selectedSize}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>{item.product.colorName}</span>
                      </div>
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2D4529]">
                      <div className="flex items-center border border-[#3E5C38] rounded bg-[#20311E]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#C7DEC4] hover:bg-[#2A3F26]"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-[#F3F8F2]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#C7DEC4] hover:bg-[#2A3F26]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#FF6B81] tabular-nums font-mono">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#2D4529] bg-[#192717] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#A5C8A1]" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. MATCHA10)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-[#243521] border border-[#3E5C38] rounded text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81] uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#2D4528] hover:bg-[#385532] text-[#F3F8F2] text-xs font-semibold rounded border border-[#4E7649] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.error ? 'text-[#FFA4B2]' : 'text-[#A5C8A1] font-medium'}`}>
                    {promoMessage.text}
                  </p>
                )}
                {promoCode && (
                  <div className="flex items-center justify-between text-xs text-[#A5C8A1] bg-[#223520] px-2.5 py-1 rounded border border-[#385532]">
                    <span className="flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3 text-[#A5C8A1]" />
                      Code &apos;{promoCode}&apos; Applied
                    </span>
                    <span className="font-semibold text-[#FF6B81]">-₹{promoDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#C7DEC4] pt-2 border-t border-[#2D4529]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#FFA4B2] font-medium">
                    <span>Discount</span>
                    <span className="tabular-nums font-mono">-₹{promoDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Couture Delivery</span>
                  <span className="text-[#A5C8A1] font-semibold uppercase tracking-wider text-[10px]">
                    Free
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#F3F8F2] pt-2 border-t border-[#2D4529]">
                  <span>Total Amount</span>
                  <span className="text-[#FF6B81] tabular-nums font-mono font-bold">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 bg-[#CC2240] hover:bg-[#A8132D] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Payment Methods Info */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#A5C8A1]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A5C8A1]" />
                <span>Pay via Cash on Delivery (COD) or Instant UPI</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
