import React, { useState } from 'react';
import { Product, ProductSize } from '../types';
import { useShop } from '../context/ShopContext';
import {
  X,
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Check,
  Sparkles
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductDetail,
    setSelectedProductDetail,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsSizeGuideOpen,
    setIsCheckoutOpen
  } = useShop();

  const product = selectedProductDetail;
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'craft' | 'care'>('details');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const defaultAvailableSizes = product.availableSizes || ['Free Size'];

  const handleAddAndClose = () => {
    addToCart(product, selectedSize, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      setSelectedProductDetail(null);
    }, 900);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setSelectedProductDetail(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#1F301D] text-[#F3F8F2] rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#385532] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductDetail(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#162215]/80 text-[#C7DEC4] hover:text-[#FFA4B2] hover:bg-[#162215] shadow-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left: Product Image Column */}
          <div className="md:col-span-6 bg-[#162215] relative flex items-center justify-center p-4">
            <div className="relative w-full aspect-[3/4] max-h-[520px] rounded-lg overflow-hidden border border-[#2D4529] bg-[#162215]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 left-4 p-2.5 rounded-full bg-[#162215]/80 text-[#C7DEC4] hover:text-[#FFA4B2] shadow-sm transition-colors cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#FF6B81] text-[#FF6B81]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right: Product Info & Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#1F301D]">
            <div className="space-y-4">
              
              {/* Category & Tag */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A5C8A1] tracking-widest uppercase">
                <span>{product.category.replace('-', ' ')}</span>
                {product.subcategory && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{product.subcategory.replace('-', ' ')}</span>
                  </>
                )}
              </div>

              {/* Title in Red Cherry */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#FF6B81] leading-snug">
                {product.name}
              </h2>

              {/* Price & Taxes */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-[#FF6B81] font-mono tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#7DAA78] line-through font-mono tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs bg-[#2E452B] text-[#FFA4B2] font-semibold px-2 py-0.5 rounded border border-[#4B6F45]">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
                <span className="text-[11px] text-[#A5C8A1]">Inclusive of all taxes</span>
              </div>

              {/* Brief Description */}
              <p className="text-sm text-[#C7DEC4] leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A5C8A1]">
                    Select Size:
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#FFA4B2] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Chart & Custom Fit</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {defaultAvailableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#CC2240] text-white border-[#CC2240] shadow-md font-semibold'
                          : 'bg-[#273B24] text-[#F3F8F2] border-[#3E5C38] hover:border-[#FFA4B2]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A5C8A1]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#3E5C38] rounded-md bg-[#273B24]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-sm text-[#C7DEC4] hover:bg-[#344E30] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold tabular-nums text-[#F3F8F2]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2.5 py-1 text-sm text-[#C7DEC4] hover:bg-[#344E30] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddAndClose}
                  className="flex-1 py-3 px-4 bg-[#2D4528] hover:bg-[#385532] text-[#F3F8F2] text-xs font-semibold uppercase tracking-wider rounded-md border border-[#4E7649] shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 bg-[#CC2240] hover:bg-[#A8132D] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now (COD / UPI)</span>
                </button>
              </div>

              {/* Specifications Tabs */}
              <div className="pt-4 border-t border-[#2D4529]">
                <div className="flex border-b border-[#2D4529] text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 mr-4 transition-colors cursor-pointer ${
                      activeTab === 'details'
                        ? 'text-[#FF6B81] border-b-2 border-[#FF6B81] font-semibold'
                        : 'text-[#A5C8A1] hover:text-[#F3F8F2]'
                    }`}
                  >
                    Fabric & Fit
                  </button>
                  <button
                    onClick={() => setActiveTab('craft')}
                    className={`pb-2 mr-4 transition-colors cursor-pointer ${
                      activeTab === 'craft'
                        ? 'text-[#FF6B81] border-b-2 border-[#FF6B81] font-semibold'
                        : 'text-[#A5C8A1] hover:text-[#F3F8F2]'
                    }`}
                  >
                    Artisanal Craft
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'care'
                        ? 'text-[#FF6B81] border-b-2 border-[#FF6B81] font-semibold'
                        : 'text-[#A5C8A1] hover:text-[#F3F8F2]'
                    }`}
                  >
                    Wash Care
                  </button>
                </div>

                <div className="pt-3 text-xs text-[#C7DEC4]">
                  {activeTab === 'details' && (
                    <div className="space-y-1">
                      <p><span className="font-semibold text-[#F3F8F2]">Fabric:</span> {product.fabric}</p>
                      <p><span className="font-semibold text-[#F3F8F2]">Color:</span> {product.colorName}</p>
                      <p><span className="font-semibold text-[#F3F8F2]">Tailoring:</span> Handcrafted finish with concealed seam allowances.</p>
                    </div>
                  )}
                  {activeTab === 'craft' && (
                    <p className="leading-relaxed">
                      <span className="font-semibold text-[#F3F8F2]">Craftsmanship:</span> {product.craft}. Made in collaboration with generational master artisans.
                    </p>
                  )}
                  {activeTab === 'care' && (
                    <p className="leading-relaxed">
                      <span className="font-semibold text-[#F3F8F2]">Care Instructions:</span> {product.careInstructions}
                    </p>
                  )}
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-3 grid grid-cols-2 gap-2 text-[11px] text-[#A5C8A1] border-t border-[#2D4529]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#FF6B81]" />
                  <span>Free Express Delivery (4-5 Days)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#FF6B81]" />
                  <span>7-Day Hassle-free Exchange</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B81]" />
                  <span>Cash on Delivery or Instant UPI</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6B81]" />
                  <span>Complimentary Alterations</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
