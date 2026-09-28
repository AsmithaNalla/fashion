import React from 'react';
import { useShop } from '../context/ShopContext';
import { MainCategory, TraditionalSubcategory } from '../types';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CategoryItem {
  id: MainCategory;
  label: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'All Collections' },
  { id: 'traditional', label: 'Traditional Couture' },
  { id: 'spring-wear', label: 'Spring Wear' },
  { id: 'summer-wear', label: 'Summer Wear' },
  { id: 'bridal', label: 'Bridal Atelier' },
  { id: 'maternal-wear', label: 'Maternal Wear' },
  { id: 'traditional-accessories', label: 'Traditional Accessories' },
  { id: 'western-accessories', label: 'Western Accessories' },
  { id: 'footwear', label: 'Footwear' },
];

const TRADITIONAL_SUBCATEGORIES: { id: TraditionalSubcategory; label: string }[] = [
  { id: 'all', label: 'All Traditional' },
  { id: 'kurtis', label: 'Kurtis' },
  { id: 'short-kurtis', label: 'Short Kurtis' },
  { id: 'frocks', label: 'Frocks' },
  { id: 'long-frocks', label: 'Long Frocks' },
  { id: 'lehangas', label: 'Lehangas' },
];

export const CategoryNav: React.FC<{ totalCount: number }> = ({ totalCount }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery
  } = useShop();

  const handleCategorySelect = (catId: MainCategory) => {
    setSelectedCategory(catId);
    setSelectedSubcategory('all');
  };

  return (
    <div id="shop-section" className="pt-10 pb-6 border-b border-[#385532] bg-[#243521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading in Red Cherry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B81]" />
              <span>Curated Catalogue</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#FF6B81] tracking-tight">
              Shop By Category
            </h2>
            <p className="text-xs sm:text-sm text-[#C7DEC4] mt-1">
              Select an exclusive category or explore the full boutique collection.
            </p>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3">
            {searchQuery && (
              <div className="text-xs bg-[#1F301D] text-[#C7DEC4] border border-[#3E5C38] px-3 py-1.5 rounded flex items-center gap-2">
                <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-bold hover:text-[#FFA4B2] cursor-pointer"
                >
                  ×
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 bg-[#1F301D] border border-[#3E5C38] rounded-md px-3 py-1.5 text-xs text-[#C7DEC4]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#A5C8A1]" />
              <label htmlFor="sort-select" className="font-medium">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#F3F8F2] focus:outline-none cursor-pointer font-medium"
              >
                <option value="popular" className="bg-[#1F301D] text-[#F3F8F2]">Most Popular</option>
                <option value="price-low" className="bg-[#1F301D] text-[#F3F8F2]">Price: Low to High</option>
                <option value="price-high" className="bg-[#1F301D] text-[#F3F8F2]">Price: High to Low</option>
                <option value="rating" className="bg-[#1F301D] text-[#F3F8F2]">Top Rated</option>
              </select>
            </div>

            <span className="text-xs font-medium text-[#A5C8A1] tabular-nums">
              ({totalCount} styles)
            </span>
          </div>
        </div>

        {/* Main Categories Tab Bar (Horizontal Scrollable on mobile) */}
        <div className="overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-1.5 min-w-max p-1 bg-[#1F301D] rounded-lg border border-[#385532]">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#CC2240] text-white shadow-md font-semibold'
                      : 'text-[#C7DEC4] hover:text-[#FFA4B2] hover:bg-[#2A3F26]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subcategories Bar - Shown when Traditional is selected or All */}
        {(selectedCategory === 'traditional' || selectedCategory === 'all') && (
          <div className="mt-4 pt-3 border-t border-dashed border-[#385532] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#FF6B81] tracking-wider uppercase mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              Traditional Styles:
            </span>
            {TRADITIONAL_SUBCATEGORIES.map((sub) => {
              const isSubActive =
                selectedCategory === 'traditional'
                  ? selectedSubcategory === sub.id
                  : selectedSubcategory === sub.id && selectedCategory === 'all';
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedCategory('traditional');
                    setSelectedSubcategory(sub.id);
                  }}
                  className={`px-3 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                    isSubActive
                      ? 'bg-[#CC2240] text-white border-[#CC2240] shadow-sm font-semibold'
                      : 'bg-[#1F301D] text-[#C7DEC4] border-[#385532] hover:border-[#FF6B81] hover:text-[#FFA4B2]'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
