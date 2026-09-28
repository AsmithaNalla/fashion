import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Check, Sparkles } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProductDetail
  } = useShop();

  const [isAddedBriefly, setIsAddedBriefly] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const defaultSize = product.availableSizes[0] || 'Free Size';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, defaultSize, 1);
    setIsAddedBriefly(true);
    setTimeout(() => setIsAddedBriefly(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => setSelectedProductDetail(product)}
      className="group relative flex flex-col bg-[#1F301D] rounded-lg border border-[#385532] overflow-hidden hover:border-[#FF6B81] hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image Container (Takes ~70% of card) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#162215]">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1F301D] to-[#162215]">
            <Sparkles className="w-8 h-8 text-[#A5C8A1] mb-2" />
            <p className="font-serif-luxury text-sm font-semibold text-[#FFA4B2]">{product.name}</p>
            <p className="text-xs text-[#C7DEC4] mt-1">{product.fabric}</p>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#162215]/80 backdrop-blur-xs text-[#C7DEC4] hover:text-[#FFA4B2] hover:bg-[#1F301D] shadow-sm transition-colors z-10 cursor-pointer"
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-[#FF6B81] text-[#FF6B81]' : ''
            }`}
          />
        </button>

        {/* Quiet Kicker Tag on Image in Cherry Red */}
        {product.bestseller && (
          <span className="absolute top-3 left-3 bg-[#CC2240] text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
            Bestseller
          </span>
        )}

        {/* Floating Quick Action Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-[#CC2240] hover:bg-[#A8132D] text-white text-xs font-semibold rounded shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {isAddedBriefly ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag / Cart</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductDetail(product);
            }}
            className="p-2 bg-[#263C23]/90 hover:bg-[#345230] text-[#F3F8F2] rounded shadow-md border border-[#3E5C38] transition-colors cursor-pointer"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-[#1F301D]">
        <div>
          {/* Clean Unboxed Metadata */}
          <div className="flex items-center gap-2 text-[11px] text-[#A5C8A1] mb-1 font-medium">
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
            <span aria-hidden="true">·</span>
            <span>{product.colorName}</span>
          </div>

          {/* Product Title in Aesthetic Serif Font */}
          <h3 className="font-serif-luxury text-base font-semibold text-[#F3F8F2] group-hover:text-[#FFA4B2] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Fabric Line */}
          <p className="text-xs text-[#7DAA78] line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Price & Rating Bar */}
        <div className="mt-3 pt-2.5 border-t border-[#2D4529] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-[#FF6B81] tabular-nums font-mono">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#7DAA78] line-through tabular-nums font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-[#C7DEC4]">
            <span className="text-[#FF6B81] font-bold">★</span>
            <span className="tabular-nums font-medium">{product.rating}</span>
            <span className="text-[10px] text-[#7DAA78]">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
