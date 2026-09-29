import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, User, Search, X, Package, Sparkles, LogIn } from 'lucide-react';
import { MainCategory } from '../types';

export const Header: React.FC = () => {
  const {
    user,
    cartCount,
    setIsCartOpen,
    setIsOrdersViewOpen,
    selectedCategory,
    setSelectedCategory,
    setSelectedSubcategory,
    searchQuery,
    setSearchQuery,
    orders,
    currentPage,
    setCurrentPage
  } = useShop();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  const handleNavClick = (category: MainCategory) => {
    setCurrentPage('shop');
    setSelectedCategory(category);
    setSelectedSubcategory('all');
    // Scroll smoothly to shop section
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1E2E1B]/95 backdrop-blur-md border-b border-[#345230] transition-all">
      {/* Slim Top Announcement Bar in Matcha Green with Gold/Cherry accents */}
      {!isBannerDismissed && (
        <div className="bg-[#162215] text-[#C7DEC4] text-xs px-4 py-2 flex items-center justify-between border-b border-[#293F26]">
          <div className="mx-auto flex items-center gap-2 font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B81]" />
            <span>Complimentary custom tailoring on Traditional & Bridal wear | Use code</span>
            <span className="font-semibold underline tracking-wider text-[#FFA4B2]">MATCHA10</span>
            <span>for 10% off</span>
          </div>
          <button
            onClick={() => setIsBannerDismissed(true)}
            className="text-[#A5C8A1] hover:text-[#FFA4B2] transition-colors p-0.5 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar - Strictly 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single Wordmark Element in Cherry Red */}
          <div className="flex items-center">
            <button
              onClick={() => {
                setCurrentPage('shop');
                setSelectedCategory('all');
                setSelectedSubcategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-tight text-[#FF6B81] group-hover:text-[#FFA4B2] transition-colors">
                ashdediva&apos;s label
              </span>
              <span className="block text-[10px] tracking-[0.28em] uppercase text-[#A5C8A1] font-medium">
                Exclusive Haute Couture
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#C7DEC4]">
            
            {/* Dedicated Login Portal Link */}
            <button
              onClick={() => setCurrentPage('login')}
              className={`hover:text-[#FF6B81] transition-colors relative py-1 flex items-center gap-1 cursor-pointer ${
                currentPage === 'login' ? 'text-[#FF6B81] font-semibold border-b-2 border-[#FF6B81]' : ''
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-[#FF6B81]" />
              <span>Patron Login & Portal</span>
            </button>

            <button
              onClick={() => handleNavClick('traditional')}
              className={`hover:text-[#FF6B81] transition-colors relative py-1 cursor-pointer ${
                currentPage === 'shop' && selectedCategory === 'traditional' ? 'text-[#FF6B81] font-semibold border-b-2 border-[#FF6B81]' : ''
              }`}
            >
              Traditional Couture
            </button>
            <button
              onClick={() => handleNavClick('spring-wear')}
              className={`hover:text-[#FF6B81] transition-colors relative py-1 cursor-pointer ${
                currentPage === 'shop' && selectedCategory === 'spring-wear' ? 'text-[#FF6B81] font-semibold border-b-2 border-[#FF6B81]' : ''
              }`}
            >
              Spring Wear
            </button>
            <button
              onClick={() => handleNavClick('summer-wear')}
              className={`hover:text-[#FF6B81] transition-colors relative py-1 cursor-pointer ${
                currentPage === 'shop' && selectedCategory === 'summer-wear' ? 'text-[#FF6B81] font-semibold border-b-2 border-[#FF6B81]' : ''
              }`}
            >
              Summer Wear
            </button>
            <button
              onClick={() => handleNavClick('bridal')}
              className={`hover:text-[#FF6B81] transition-colors relative py-1 cursor-pointer ${
                currentPage === 'shop' && selectedCategory === 'bridal' ? 'text-[#FF6B81] font-semibold border-b-2 border-[#FF6B81]' : ''
              }`}
            >
              Bridal Atelier
            </button>
            <button
              onClick={() => handleNavClick('maternal-wear')}
              className={`hover:text-[#FF6B81] transition-colors relative py-1 cursor-pointer ${
                currentPage === 'shop' && selectedCategory === 'maternal-wear' ? 'text-[#FF6B81] font-semibold border-b-2 border-[#FF6B81]' : ''
              }`}
            >
              Maternal Wear
            </button>
            <button
              onClick={() => handleNavClick('traditional-accessories')}
              className={`hover:text-[#FF6B81] transition-colors relative py-1 cursor-pointer ${
                currentPage === 'shop' && (selectedCategory === 'traditional-accessories' || selectedCategory === 'western-accessories' || selectedCategory === 'footwear')
                  ? 'text-[#FF6B81] font-semibold border-b-2 border-[#FF6B81]'
                  : ''
              }`}
            >
              Accessories & Footwear
            </button>
          </nav>

          {/* Zone 3: Primary Action Clusters */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-[#293F26] border border-[#3E5C38] rounded-md px-2.5 py-1.5 w-44 sm:w-60">
                  <Search className="w-4 h-4 text-[#A5C8A1] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search kurtis, lehangas..."
                    autoFocus
                    className="bg-transparent text-xs text-[#F3F8F2] focus:outline-none w-full placeholder-[#7DAA78]"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="text-[#A5C8A1] hover:text-[#FFA4B2] ml-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-[#C7DEC4] hover:text-[#FF6B81] transition-colors rounded-md hover:bg-[#293F26]"
                  aria-label="Search collection"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Live n8n Stylist Concierge Quick Trigger */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-n8n-chat'))}
              className="p-2 text-[#C7DEC4] hover:text-[#FFA4B2] transition-colors rounded-md hover:bg-[#293F26] flex items-center gap-1 cursor-pointer"
              aria-label="Open n8n Stylist Concierge"
              title="Chat with Live n8n Stylist Concierge"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B81]" />
              <span className="hidden md:inline-block text-xs font-medium text-[#FFA4B2]">
                Stylist Chat
              </span>
            </button>

            {/* My Orders Button */}
            <button
              onClick={() => setIsOrdersViewOpen(true)}
              className="relative p-2 text-[#C7DEC4] hover:text-[#FF6B81] transition-colors rounded-md hover:bg-[#293F26] flex items-center gap-1.5 cursor-pointer"
              aria-label="View Orders"
              title="Track My Orders"
            >
              <Package className="w-5 h-5" />
              {orders.length > 0 && (
                <span className="hidden sm:inline-block text-xs font-semibold tabular-nums text-[#FF6B81]">
                  Orders ({orders.length})
                </span>
              )}
            </button>

            {/* User Login Page Toggle Button */}
            <button
              onClick={() => setCurrentPage(currentPage === 'login' ? 'shop' : 'login')}
              className={`flex items-center gap-1.5 p-2 rounded-md transition-colors cursor-pointer ${
                currentPage === 'login'
                  ? 'bg-[#CC2240] text-white shadow-sm'
                  : 'text-[#C7DEC4] hover:text-[#FF6B81] hover:bg-[#293F26]'
              }`}
              aria-label="Account Login"
              title={user ? `Signed in as ${user.name}` : 'Login Page'}
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline-block text-xs font-medium max-w-[100px] truncate">
                {user ? user.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#C7DEC4] hover:text-[#FF6B81] transition-colors rounded-md hover:bg-[#293F26] flex items-center cursor-pointer"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#CC2240] text-white text-[11px] font-bold tabular-nums w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
