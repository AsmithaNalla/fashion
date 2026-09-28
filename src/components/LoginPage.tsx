import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  User,
  Mail,
  Phone,
  Package,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  Truck,
  CreditCard,
  LogOut
} from 'lucide-react';
import { heroImg } from '../data/products';

export const LoginPage: React.FC = () => {
  const {
    user,
    login,
    logout,
    orders,
    setCurrentPage,
    setSelectedCategory,
    setIsOrdersViewOpen
  } = useShop();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    login(name, email, phone);
    setCurrentPage('shop');
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackOrderId.trim()) return;

    const matched = orders.find(
      (o) => o.id.toLowerCase() === trackOrderId.trim().toLowerCase()
    );
    if (matched) {
      setTrackResult(`Order ${matched.id}: ${matched.orderStatus}. Total ₹${matched.total.toLocaleString('en-IN')}`);
      setIsOrdersViewOpen(true);
    } else {
      setTrackResult(`Order "${trackOrderId.trim().toUpperCase()}" is currently in artisan processing.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#243521] text-[#F3F8F2] flex flex-col justify-between">
      
      {/* Top Brand Banner */}
      <div className="bg-[#1C2C1A] border-b border-[#345230] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-tight text-[#FF6B81]">
              ashdediva&apos;s label
            </span>
            <span className="block text-[10px] tracking-[0.28em] uppercase text-[#A5C8A1] font-medium">
              Exclusive Women&apos;s Wear · Client Portal
            </span>
          </div>

          <button
            onClick={() => setCurrentPage('shop')}
            className="text-xs text-[#C7DEC4] hover:text-[#FFA4B2] flex items-center gap-1.5 transition-colors cursor-pointer border border-[#3E6139] px-3 py-1.5 rounded bg-[#2D4328]"
          >
            <span>Skip to Shop by Category</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Login / Patron Access Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 w-full">
        
        {/* Editorial Greeting Header in Red Cherry */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#A5C8A1] bg-[#1E2E1B] px-3 py-1 rounded-full border border-[#385532]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B81]" />
            <span>Patron Authentication & Exclusive Access</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-medium tracking-tight text-[#FF6B81] leading-tight">
            Welcome to ashdediva&apos;s label
          </h1>
          <p className="text-xs sm:text-sm text-[#C7DEC4] font-light max-w-xl mx-auto">
            Please enter your patron details to unlock personal bespoke fittings, save your measurement profile, and explore our handcrafted traditional kurtis, lehangas, bridal atelier, and exclusive accessories.
          </p>
        </div>

        {/* Two-Column Grid: Left Visual / Right Login Form & Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Brand Card */}
          <div className="lg:col-span-5 bg-[#1F301D] rounded-xl border border-[#385532] overflow-hidden shadow-2xl p-6 space-y-6">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#345230]">
              <img
                src={heroImg}
                alt="ashdediva's couture exclusive collections"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#C7DEC4] font-semibold">
                  Haute Couture 2026
                </span>
                <p className="font-serif-luxury text-lg font-semibold text-[#FFA4B2]">
                  Exquisite Traditional Lehangas & Kurtis
                </p>
              </div>
            </div>

            {/* Highlights list */}
            <div className="space-y-3 text-xs text-[#C7DEC4]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#A5C8A1] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F3F8F2]">Exclusive Collections:</strong> Traditional kurtis, short kurtis, frocks, long frocks, and bridal lehangas.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#A5C8A1] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F3F8F2]">Seasonal & Maternity:</strong> Spring wear, summer mulmul, and bump-friendly maternal couture.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#A5C8A1] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F3F8F2]">Payment Freedom:</strong> Cash on Delivery (COD) or Instant verified UPI (GPay, PhonePe, Paytm).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#A5C8A1] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F3F8F2]">Complimentary Custom Stitching:</strong> Made to measure at zero extra cost.
                </span>
              </div>
            </div>

            {/* Quick Category Chips Preview */}
            <div className="pt-2 border-t border-[#2D4529]">
              <p className="text-[11px] font-semibold text-[#A5C8A1] uppercase tracking-wider mb-2">
                Available to Explore After Sign-In:
              </p>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {[
                  'Kurtis',
                  'Short Kurtis',
                  'Frocks',
                  'Long Frocks',
                  'Lehangas',
                  'Spring Wear',
                  'Summer Wear',
                  'Bridal',
                  'Maternal',
                  'Traditional Jewellery',
                  'Western Accessories',
                  'Footwear'
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-[#2A3F26] text-[#C7DEC4] border border-[#3E5C38]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Login & Order Access Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Box 1: Patron Sign In / Register Card */}
            <div className="bg-[#1F301D] rounded-xl border border-[#385532] shadow-2xl p-6 sm:p-8 space-y-6">
              
              <div className="border-b border-[#2D4529] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif-luxury text-2xl font-semibold text-[#FF6B81]">
                    {user ? 'Patron Profile & Quick Pass' : 'Patron Sign In / Registration'}
                  </h2>
                  <p className="text-xs text-[#A5C8A1] mt-0.5">
                    {user
                      ? `You are logged in as ${user.name}`
                      : 'Provide your details to initiate your couture journey'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#2A4027] border border-[#3F5E3A] flex items-center justify-center text-[#FF6B81]">
                  <Lock className="w-5 h-5" />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-[#6B0819]/40 border border-[#A8132D] text-[#FFA4B2] text-xs rounded-md">
                  {errorMessage}
                </div>
              )}

              {user ? (
                /* Authenticated State in Login Page */
                <div className="space-y-4">
                  <div className="p-4 bg-[#263C23] rounded-lg border border-[#3C5B37] text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#A5C8A1]">Client Name:</span>
                      <strong className="text-[#F3F8F2] text-sm">{user.name}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#A5C8A1]">Email Address:</span>
                      <span className="text-[#F3F8F2]">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#A5C8A1]">Phone Number:</span>
                      <span className="text-[#F3F8F2]">{user.phone}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => setCurrentPage('shop')}
                      className="flex-1 py-3.5 px-6 bg-[#CC2240] hover:bg-[#A8132D] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Explore Shop by Category</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={logout}
                      className="py-3 px-4 bg-[#2A3E26] hover:bg-[#344D30] text-[#FFA4B2] text-xs font-medium rounded-md border border-[#3D5A38] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Switch Account</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Unauthenticated Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#7DAA78] absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Asmitha Nalla"
                        className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email address field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#7DAA78] absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="patron@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone number field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#7DAA78] absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit CTA: Log In and Proceed to Shop by Category */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 bg-[#CC2240] hover:bg-[#A8132D] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>Save Details & Enter Shop by Category</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Guest bypass */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPage('shop')}
                      className="text-xs text-[#A5C8A1] hover:text-[#FFA4B2] underline underline-offset-4 cursor-pointer"
                    >
                      Continue browsing as guest without signing in
                    </button>
                  </div>

                </form>
              )}

            </div>

            {/* Box 2: Order Lookup & Tracking Card */}
            <div className="bg-[#1F301D] rounded-xl border border-[#385532] shadow-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#FF6B81] border-b border-[#2D4529] pb-3">
                <Package className="w-5 h-5 text-[#FF6B81]" />
                <h3 className="font-serif-luxury text-xl">
                  Order Tracking & History
                </h3>
              </div>

              <p className="text-xs text-[#C7DEC4]">
                Already placed an order? Enter your Order ID below or review your order milestones.
              </p>

              <form onSubmit={handleTrackOrder} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#7DAA78] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={trackOrderId}
                    onChange={(e) => setTrackOrderId(e.target.value)}
                    placeholder="Enter Order ID (e.g. ADL-2026-8942)"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#345230] hover:bg-[#42693E] text-white text-xs font-semibold rounded-md border border-[#4E7649] transition-colors cursor-pointer"
                >
                  Track Order
                </button>
              </form>

              {trackResult && (
                <div className="p-3 bg-[#263C23] border border-[#3E6139] text-[#C7DEC4] text-xs rounded-md">
                  {trackResult}
                </div>
              )}

              {orders.length > 0 && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOrdersViewOpen(true)}
                    className="w-full py-2.5 bg-[#2B4027] hover:bg-[#344E30] text-[#F3F8F2] text-xs font-medium rounded-md border border-[#3D5B39] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-[#FF6B81]" />
                    <span>View All {orders.length} Active / Past Orders</span>
                  </button>
                </div>
              )}
            </div>

            {/* Box 3: Trust & Assurance */}
            <div className="grid grid-cols-2 gap-3 text-xs text-[#A5C8A1]">
              <div className="p-3 bg-[#1C2C1A] rounded-lg border border-[#2D4529] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#FF6B81] shrink-0" />
                <span>Cash on Delivery (COD) or Instant UPI</span>
              </div>
              <div className="p-3 bg-[#1C2C1A] rounded-lg border border-[#2D4529] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#A5C8A1] shrink-0" />
                <span>Express Insured Delivery Across India</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Subtle Footer */}
      <div className="bg-[#1C2C1A] border-t border-[#345230] py-4 text-center text-xs text-[#7DAA78]">
        <p>&copy; {new Date().getFullYear()} ashdediva&apos;s label · Haute Couture Women&apos;s Wear · Matcha & Cherry Theme</p>
      </div>

    </div>
  );
};
