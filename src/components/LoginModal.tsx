import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, User, Mail, Phone, Package, ArrowRight, Sparkles, CheckCircle2, LogOut } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    user,
    login,
    logout,
    orders,
    setIsOrdersViewOpen
  } = useShop();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [trackOrderId, setTrackOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    login(name, email, phone);
  };

  const handleTrackDirectOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackOrderId.trim()) return;
    setIsLoginModalOpen(false);
    setIsOrdersViewOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-[#FAFBF9] rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D1E0CA] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-[#3B5532] hover:text-[#8E1528] hover:bg-[#F4F7F2] transition-colors"
          aria-label="Close login modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-b from-[#E7EFE3]/80 to-[#FAFBF9] border-b border-[#D1E0CA] text-center">
          <div className="w-12 h-12 rounded-full bg-[#3B5532] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Sparkles className="w-6 h-6 text-[#D1E0CA]" />
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#8E1528]">
            ashdediva&apos;s label
          </h2>
          <p className="text-xs uppercase tracking-widest text-[#4E6F43] font-semibold mt-1">
            Client Portal & Order Access
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          
          {user ? (
            /* Logged in state view */
            <div className="space-y-5">
              <div className="p-4 bg-[#F4F7F2] rounded-lg border border-[#D1E0CA] text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B5532] bg-[#E7EFE3] px-2.5 py-0.5 rounded-full mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4E6F43]" />
                  <span>Authenticated Patron</span>
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#8E1528]">
                  Welcome back, {user.name}
                </h3>
                <p className="text-xs text-[#4E6F43]">{user.email} · {user.phone}</p>
              </div>

              {/* View Orders Action */}
              <div className="p-4 bg-white rounded-lg border border-[#D1E0CA] flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-[#242A24] flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#8E1528]" />
                    <span>My Past & Active Orders</span>
                  </h4>
                  <p className="text-[11px] text-[#4E6F43] mt-0.5">
                    {orders.length} orders on file with ashdediva
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsOrdersViewOpen(true);
                  }}
                  className="px-3 py-1.5 bg-[#3B5532] hover:bg-[#293B23] text-white text-xs font-semibold rounded transition-colors"
                >
                  View Orders
                </button>
              </div>

              {/* Continue Shopping button */}
              <button
                onClick={() => {
                  setIsLoginModalOpen(false);
                  const el = document.getElementById('shop-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 bg-[#8E1528] hover:bg-[#741221] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore Shop By Category</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Sign out */}
              <button
                onClick={logout}
                className="w-full text-center text-xs text-[#8FAA83] hover:text-[#8E1528] flex items-center justify-center gap-1 pt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out from Device</span>
              </button>
            </div>
          ) : (
            /* Login & Registration Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <p className="text-xs text-[#4E6F43] text-center leading-relaxed">
                Enter your details to track orders, pre-fill instant COD/UPI checkout, and access exclusive couture drops.
              </p>

              {errorMsg && (
                <div className="p-2.5 bg-[#FDF2F4] border border-[#F7D0D8] text-[#8E1528] text-xs rounded-md">
                  {errorMsg}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3B5532] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8FAA83] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asmitha Nalla"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D1E0CA] rounded-md focus:outline-none focus:border-[#4E6F43]"
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3B5532] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8FAA83] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D1E0CA] rounded-md focus:outline-none focus:border-[#4E6F43]"
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3B5532] mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8FAA83] absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D1E0CA] rounded-md focus:outline-none focus:border-[#4E6F43]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#8E1528] hover:bg-[#741221] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer pt-2.5"
              >
                <span>Continue & Explore Category Collections</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Guest Explore option */}
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(false)}
                className="w-full text-center text-xs text-[#4E6F43] hover:text-[#8E1528] underline underline-offset-4 pt-1"
              >
                Skip for now & browse as guest
              </button>

              {/* Track existing order section */}
              <div className="pt-4 border-t border-[#E7EFE3]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#3B5532] mb-2 text-center">
                  Have an existing Order ID?
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={trackOrderId}
                    onChange={(e) => setTrackOrderId(e.target.value)}
                    placeholder="e.g. ADL-2026-8942"
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#D1E0CA] rounded-md uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleTrackDirectOrder}
                    className="px-3 py-1.5 bg-[#E7EFE3] hover:bg-[#D1E0CA] text-[#3B5532] text-xs font-semibold rounded border border-[#B3CBA9] transition-colors"
                  >
                    Track
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
