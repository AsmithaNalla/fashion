export type MainCategory =
  | 'all'
  | 'traditional'
  | 'spring-wear'
  | 'summer-wear'
  | 'bridal'
  | 'maternal-wear'
  | 'traditional-accessories'
  | 'western-accessories'
  | 'footwear';

export type TraditionalSubcategory =
  | 'all'
  | 'kurtis'
  | 'short-kurtis'
  | 'frocks'
  | 'long-frocks'
  | 'lehangas';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size' | 'Custom Stitching';

export interface Product {
  id: string;
  name: string;
  category: MainCategory;
  subcategory?: TraditionalSubcategory | string;
  price: number;
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  description: string;
  fabric: string;
  craft: string;
  careInstructions: string;
  availableSizes: ProductSize[];
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  rating: number;
  reviewCount: number;
  colorName: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
  customMeasurements?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
}

export type PaymentMethod = 'COD' | 'UPI';

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  size: ProductSize;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending (COD)' | 'Verified (UPI)' | 'Paid';
  upiTransactionId?: string;
  orderStatus: 'Confirmed' | 'Hand-Tailoring' | 'Dispatched' | 'Delivered';
  estimatedDeliveryDate: string;
}
