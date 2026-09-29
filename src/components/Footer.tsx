import React from 'react';
import { useShop } from '../context/ShopContext';
import { MainCategory } from '../types';
import { ShieldCheck, Truck, RotateCcw, Heart, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setSelectedCategory,
    setSelectedSubcategory,
    setCurrentPage,
    setIsOrdersViewOpen,
    setIsBespokeModalOpen,
    setIsSizeGuideOpen
  } = useShop();

  const handleNav = (cat: MainCategory, sub = 'all') => {
    setCurrentPage('shop');
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
    const shopEl = document.getElementById('shop-section');
    if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#182617] text-[#F3F8F2] border-t border-[#2D4329]">
      {/* Upper Features Strip */}
      <div className="border-b border-[#2D4329] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xs uppercase tracking-widest text-[#FF6B81] font-semibold flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#A5C8A1]" />
              Express Delivery
            </span>
            <p className="text-xs text-[#C7DEC4]">
              Complimentary insured shipping on all orders across India within 4-5 business days.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xs uppercase tracking-widest text-[#FF6B81] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#A5C8A1]" />
              COD & Instant UPI
            </span>
            <p className="text-xs text-[#C7DEC4]">
              Pay upon doorstep arrival or instantly via any UPI app with QR verification.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xs uppercase tracking-widest text-[#FF6B81] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#A5C8A1]" />
              Bespoke Fit Promise
            </span>
            <p className="text-xs text-[#C7DEC4]">
              Made-to-measure custom stitching and complimentary alterations on all traditional wear.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xs uppercase tracking-widest text-[#FF6B81] font-semibold flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-[#A5C8A1]" />
              7-Day Exchanges
            </span>
            <p className="text-xs text-[#C7DEC4]">
              Effortless size swaps and dedicated concierge service via WhatsApp and phone.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="font-serif-luxury text-2xl font-bold tracking-tight text-[#FF6B81]">
            ashdediva&apos;s label
          </h3>
          <p className="text-xs text-[#C7DEC4] leading-relaxed max-w-sm">
            Exclusive women&apos;s haute couture atelier celebrating traditional Indian heritage, handloom weaves, and contemporary feminine silhouettes. Dedicated to timeless craftsmanship and artisanal luxury.
          </p>
          <div className="text-xs text-[#A5C8A1] space-y-1">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B81]" />
              <span>Flagship Atelier: Road No. 36, Jubilee Hills, Hyderabad</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#FF6B81]" />
              <span>Concierge: +91 98765 43210</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#FF6B81]" />
              <span>orders@ashdediva.com</span>
            </p>
          </div>
        </div>

        {/* Traditional Couture Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-serif-luxury text-base font-semibold text-[#FF6B81]">
            Traditional Categories
          </h4>
          <ul className="space-y-2 text-xs text-[#C7DEC4]">
            <li>
              <button onClick={() => handleNav('traditional', 'kurtis')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Handcrafted Kurtis
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('traditional', 'short-kurtis')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Peplum & Short Kurtis
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('traditional', 'frocks')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Anarkali & Flared Frocks
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('traditional', 'long-frocks')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Floor-Length Long Frocks
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('traditional', 'lehangas')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Heirloom Silk Lehangas
              </button>
            </li>
          </ul>
        </div>

        {/* Specialty Edits Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-serif-luxury text-base font-semibold text-[#FF6B81]">
            Exclusive Collections
          </h4>
          <ul className="space-y-2 text-xs text-[#C7DEC4]">
            <li>
              <button onClick={() => handleNav('bridal')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Bridal Atelier & Trousseau
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('spring-wear')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Spring Wear Organzas & Co-ords
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('summer-wear')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Summer Breathable Mulmul
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('maternal-wear')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Maternal & Nursing Friendly Wear
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('traditional-accessories')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Traditional Chains & Earrings
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('western-accessories')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Western Designer Clutches & Belts
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('footwear')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Handcrafted Juttis & Mules
              </button>
            </li>
          </ul>
        </div>

        {/* Patron Care & Orders */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-serif-luxury text-base font-semibold text-[#FF6B81]">
            Client Portal
          </h4>
          <ul className="space-y-2 text-xs text-[#C7DEC4]">
            <li>
              <button onClick={() => setCurrentPage('login')} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Patron Sign In / Profile
              </button>
            </li>
            <li>
              <button onClick={() => setIsOrdersViewOpen(true)} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Track My Orders
              </button>
            </li>
            <li>
              <button onClick={() => setIsBespokeModalOpen(true)} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Custom Tailoring Request
              </button>
            </li>
            <li>
              <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-[#FFA4B2] transition-colors cursor-pointer">
                Size Chart & Guide
              </button>
            </li>
            <li>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-n8n-chat'))}
                className="hover:text-[#FFA4B2] transition-colors cursor-pointer flex items-center gap-1 text-[#FFA4B2]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B81]" />
                <span>Live n8n Stylist Concierge</span>
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright & Trust Bar */}
      <div className="border-t border-[#2D4329] py-6 px-4 text-center text-xs text-[#7DAA78]">
        <p className="flex items-center justify-center gap-1">
          <span>&copy; {new Date().getFullYear()} ashdediva&apos;s label. All rights reserved. Handcrafted with</span>
          <Heart className="w-3 h-3 text-[#FF6B81] fill-[#FF6B81]" />
          <span>for the modern diva.</span>
        </p>
      </div>
    </footer>
  );
};
