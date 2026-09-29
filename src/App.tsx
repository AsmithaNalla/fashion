import React, { useMemo } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LookbookSection } from './components/LookbookSection';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LoginPage } from './components/LoginPage';
import { OrdersView } from './components/OrdersView';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { BespokeModal } from './components/BespokeModal';
import { N8nChatWidget } from './components/N8nChatWidget';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Sparkles, RefreshCw } from 'lucide-react';

const MainShopView: React.FC = () => {
  const {
    selectedCategory,
    selectedSubcategory,
    searchQuery,
    sortBy,
    setSelectedCategory,
    setSelectedSubcategory,
    setSearchQuery
  } = useShop();

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Traditional Subcategory
    if (selectedCategory === 'traditional' && selectedSubcategory !== 'all') {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.craft.toLowerCase().includes(q) ||
          p.colorName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: Popular / Bestsellers first
      if (a.bestseller && !b.bestseller) return -1;
      if (!a.bestseller && b.bestseller) return 1;
      return b.rating - a.rating;
    });

    return result;
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#243521] text-[#F3F8F2]">
      {/* Top Bar Navigation */}
      <Header />

      <main className="flex-1 bg-[#243521]">
        {/* Luxury Hero Banner in Matcha Green */}
        <Hero />

        {/* Lookbook Spotlight */}
        <LookbookSection />

        {/* Shop By Category Browser */}
        <CategoryNav totalCount={filteredProducts.length} />

        {/* Products Grid Section */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#1F301D] rounded-xl border border-[#385532] p-8 max-w-lg mx-auto space-y-3">
              <Sparkles className="w-8 h-8 text-[#FF6B81] mx-auto" />
              <h3 className="font-serif-luxury text-2xl font-semibold text-[#FFA4B2]">
                No matching couture found
              </h3>
              <p className="text-xs text-[#C7DEC4]">
                Try selecting another category or clear your search query to see our available creations.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubcategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#CC2240] text-white text-xs font-semibold rounded hover:bg-[#A8132D] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Brand Footer in Matcha Green */}
      <Footer />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { currentPage } = useShop();

  return (
    <>
      {currentPage === 'login' ? <LoginPage /> : <MainShopView />}

      {/* Interactive Overlays & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrdersView />
      <OrderSuccessModal />
      <SizeGuideModal />
      <BespokeModal />

      {/* Live n8n Couture Stylist & Webhook Chat Widget */}
      <N8nChatWidget />
    </>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
