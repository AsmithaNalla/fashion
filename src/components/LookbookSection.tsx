import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';

import lehangaImg from '../assets/images/category_traditional_lehanga_1790608215265.jpg';
import kurtiImg from '../assets/images/category_spring_summer_kurti_1790608233561.jpg';
import jewelleryImg from '../assets/images/category_traditional_jewellery_1790608246031.jpg';
import footwearImg from '../assets/images/category_footwear_juttis_1790608259961.jpg';

export const LookbookSection: React.FC = () => {
  const { setSelectedCategory, setSelectedSubcategory, setCurrentPage } = useShop();

  const handleCategoryNavigate = (cat: any, sub = 'all') => {
    setCurrentPage('shop');
    setSelectedCategory(cat);
    setSelectedSubcategory(sub);
    const shopEl = document.getElementById('shop-section');
    if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
  };

  const SPOTLIGHTS = [
    {
      title: 'Handcrafted Kurtis & Short Kurtis',
      subtitle: 'Pure Chanderi & Lucknowi Chikankari',
      image: kurtiImg,
      category: 'traditional',
      subcategory: 'kurtis'
    },
    {
      title: 'Heirloom Bridal Lehangas',
      subtitle: 'Zardozi, Resham & Kadwa Brocade',
      image: lehangaImg,
      category: 'traditional',
      subcategory: 'lehangas'
    },
    {
      title: 'Polki Chains & Ruby Jhumkas',
      subtitle: 'Temple Jewellery & Bikaner Kundan',
      image: jewelleryImg,
      category: 'traditional-accessories',
      subcategory: 'all'
    },
    {
      title: 'Hand-Embroidered Juttis & Footwear',
      subtitle: 'Double Memory Foam Comfort',
      image: footwearImg,
      category: 'footwear',
      subcategory: 'all'
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#20311E] border-b border-[#345230]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading in Red Cherry */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B81]" />
            <span>The Couture Lookbook</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#FF6B81] tracking-tight">
            Curated Artisanal Masterpieces
          </h2>
          <p className="text-xs sm:text-sm text-[#C7DEC4] mt-2">
            Every thread woven with love, tradition, and contemporary elegance for the discerning woman.
          </p>
        </div>

        {/* 4-Card Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPOTLIGHTS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryNavigate(item.category, item.subcategory)}
              className="group relative rounded-lg overflow-hidden bg-[#1B291A] border border-[#3E5C38] shadow-lg hover:border-[#FF6B81] transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#162215]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#A5C8A1] font-medium block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif-luxury text-lg font-semibold leading-snug mt-0.5 group-hover:text-[#FFA4B2] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-[#C7DEC4] mt-2 group-hover:translate-x-1 transition-transform">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF6B81]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
