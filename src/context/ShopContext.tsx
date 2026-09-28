import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, UserProfile, Order, MainCategory, TraditionalSubcategory, PaymentMethod, ProductSize } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  // Auth
  user: UserProfile | null;
  login: (name: string, email: string, phone: string) => void;
  logout: () => void;
  updateUserAddress: (address: NonNullable<UserProfile['deliveryAddress']>) => void;

  // Navigation & Filter
  selectedCategory: MainCategory;
  setSelectedCategory: (cat: MainCategory) => void;
  selectedSubcategory: TraditionalSubcategory | string;
  setSelectedSubcategory: (sub: TraditionalSubcategory | string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating';
  setSortBy: (sort: 'popular' | 'price-low' | 'price-high' | 'rating') => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: ProductSize, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  promoDiscount: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (data: {
    paymentMethod: PaymentMethod;
    shippingAddress: NonNullable<UserProfile['deliveryAddress']>;
    upiTransactionId?: string;
  }) => Order;
  lastPlacedOrder: Order | null;
  cancelOrder: (orderId: string) => void;

  // Page View (Dedicated Login Page vs Shop Collections)
  currentPage: 'login' | 'shop';
  setCurrentPage: (page: 'login' | 'shop') => void;

  // UI Modals
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrdersViewOpen: boolean;
  setIsOrdersViewOpen: (open: boolean) => void;
  isBespokeModalOpen: boolean;
  setIsBespokeModalOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;
  setLastPlacedOrder: (order: Order | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'ashdediva_user';
const CART_STORAGE_KEY = 'ashdediva_cart';
const WISHLIST_STORAGE_KEY = 'ashdediva_wishlist';
const ORDERS_STORAGE_KEY = 'ashdediva_orders';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state initialized from local storage
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Category & filtering
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<TraditionalSubcategory | string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountPercentage, setPromoDiscountPercentage] = useState(0);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Sample initial order if user is logged in
      return [];
    } catch {
      return [];
    }
  });
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Page view state: 'login' (Dedicated login & order portal) or 'shop' (Shop collections)
  const [currentPage, setCurrentPage] = useState<'login' | 'shop'>('login');

  // UI state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersViewOpen, setIsOrdersViewOpen] = useState(false);
  const [isBespokeModalOpen, setIsBespokeModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Sync state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  // Auth actions
  const login = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      deliveryAddress: user?.deliveryAddress || {
        street: '8-2-293/82 Jubilee Hills Road No. 36',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500033',
        landmark: 'Near Peddamma Temple'
      }
    };
    setUser(newUser);
    setIsLoginModalOpen(false);
    setCurrentPage('shop');
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserAddress = (address: NonNullable<UserProfile['deliveryAddress']>) => {
    if (user) {
      setUser({ ...user, deliveryAddress: address });
    }
  };

  // Cart actions
  const addToCart = (product: Product, size: ProductSize, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      const newItem: CartItem = {
        id: `${product.id}-${size}-${Date.now()}`,
        product,
        selectedSize: size,
        quantity
      };
      return [...prev, newItem];
    });
    // Open bag drawer for instant, delightful feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'MATCHA10' || cleaned === 'DIVA10') {
      setPromoCode(cleaned);
      setPromoDiscountPercentage(10);
      return true;
    }
    if (cleaned === 'COUTURE15' || cleaned === 'FIRST15') {
      setPromoCode(cleaned);
      setPromoDiscountPercentage(15);
      return true;
    }
    return false;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const promoDiscount = Math.round((subtotal * promoDiscountPercentage) / 100);
  const cartTotal = Math.max(0, subtotal - promoDiscount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Order placement
  const placeOrder = ({
    paymentMethod,
    shippingAddress,
    upiTransactionId
  }: {
    paymentMethod: PaymentMethod;
    shippingAddress: NonNullable<UserProfile['deliveryAddress']>;
    upiTransactionId?: string;
  }): Order => {
    const now = new Date();
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ADL-${now.getFullYear()}-${orderNumber}`;

    // Delivery date ~ 4-5 days from now
    const deliveryDateObj = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
    const estDeliveryDate = deliveryDateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: orderId,
      createdAt: now.toISOString(),
      customerName: user?.name || 'Valued Diva Patron',
      customerEmail: user?.email || 'patron@ashdediva.com',
      customerPhone: user?.phone || '+91 98765 43210',
      shippingAddress,
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        image: c.product.image,
        size: c.selectedSize,
        price: c.product.price,
        quantity: c.quantity
      })),
      subtotal,
      discount: promoDiscount,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'UPI' ? 'Verified (UPI)' : 'Pending (COD)',
      upiTransactionId: paymentMethod === 'UPI' ? upiTransactionId || `UPI-${Date.now()}` : undefined,
      orderStatus: 'Confirmed',
      estimatedDeliveryDate: estDeliveryDate
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
  };

  return (
    <ShopContext.Provider
      value={{
        user,
        login,
        logout,
        updateUserAddress,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        promoCode,
        applyPromoCode,
        promoDiscount,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        lastPlacedOrder,
        cancelOrder,
        currentPage,
        setCurrentPage,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrdersViewOpen,
        setIsOrdersViewOpen,
        isBespokeModalOpen,
        setIsBespokeModalOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        selectedProductDetail,
        setSelectedProductDetail,
        setLastPlacedOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
