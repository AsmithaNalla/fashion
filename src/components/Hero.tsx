import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, ShieldCheck, Ruler, Scissors } from 'lucide-react';
import { heroImg } from '../data/products';

export const Hero: React.FC = () => {
  const { setSelectedCategory, setSelectedSubcategory, setIsBespokeModalOpen } = useShop();

  const handleExplore = (cat: any, sub = 'all') => {
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#263823] via-[#2D442A] to-[#263823] py-10 lg:py-16 border-b border-[#385532]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Main Headline in Cherry Red */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quiet kicker with bullet separator */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A5C8A1]">
              <span>Haute Couture 2026</span>
              <span aria-hidden="true">·</span>
              <span>Handcrafted In India</span>
              <span aria-hidden="true">·</span>
              <span>Made To Measure</span>
            </div>

            {/* Main Heading in Radiant Red Cherry Colour */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FF6B81] leading-[1.12] text-balance">
              The Divine Grace of Handcrafted Elegance
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-[#C7DEC4] leading-relaxed max-w-2xl font-light">
              Welcome to <span className="font-semibold text-[#FFA4B2]">ashdediva&apos;s label</span> — an exclusive sanctuary of bespoke women&apos;s wear. Discover royal Banarasi lehangas, handcrafted Lucknowi chikankari kurtis, ethereal floor-length frocks, maternity couture, and heirloom jewels crafted for life&apos;s most cherished celebrations.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleExplore('traditional', 'all')}
                className="px-6 py-3.5 bg-[#CC2240] hover:bg-[#A8132D] text-white text-sm font-medium tracking-wide rounded-md shadow-md transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>Shop Traditional Couture</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleExplore('bridal')}
                className="px-6 py-3.5 bg-[#2E452B] hover:bg-[#385534] text-[#F3F8F2] border border-[#4B6F45] text-sm font-medium tracking-wide rounded-md transition-colors cursor-pointer"
              >
                Bridal Atelier
              </button>

              <button
                onClick={() => setIsBespokeModalOpen(true)}
                className="px-4 py-3.5 text-[#A5C8A1] hover:text-[#FFA4B2] text-sm font-medium tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
              >
                <Scissors className="w-4 h-4 text-[#FF6B81]" />
                <span>Custom Stitching Consultation</span>
              </button>
            </div>

            {/* Reassurance Indicators */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#3B5935] text-xs text-[#A5C8A1]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7DAA78] shrink-0" />
                <span>COD & Instant UPI Accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#7DAA78] shrink-0" />
                <span>Tailored to Your Measurements</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7DAA78] shrink-0" />
                <span>Pure Silks & Hand Embroidery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#3E5C38] bg-[#1F301D]">
              <img
                src={heroImg}
                alt="ashdediva's couture exclusive bridal and traditional royal lehanga collection"
                className="w-full h-[420px] sm:h-[500px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle aesthetic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* In-image caption tag */}
              <div className="absolute bottom-4 left-4 right-4 text-white p-3.5 backdrop-blur-md bg-[#162215]/80 rounded-lg border border-[#3E5C38]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-[#A5C8A1] font-medium">Bespoke Collection</p>
                    <p className="font-serif-luxury text-lg text-[#FFA4B2]">Nayantara Festive Silk & Zardozi</p>
                  </div>
                  <button
                    onClick={() => handleExplore('traditional', 'lehangas')}
                    className="px-3.5 py-1.5 bg-[#CC2240] hover:bg-[#A8132D] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
