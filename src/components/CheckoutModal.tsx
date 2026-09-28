import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PaymentMethod } from '../types';
import {
  X,
  ShieldCheck,
  Truck,
  QrCode,
  Smartphone,
  Banknote,
  CheckCircle,
  Loader2,
  Lock
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    user,
    login,
    cart,
    subtotal,
    promoDiscount,
    cartTotal,
    placeOrder
  } = useShop();

  // Form state pre-populated with user details
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.deliveryAddress?.street || '');
  const [city, setCity] = useState(user?.deliveryAddress?.city || 'Hyderabad');
  const [state, setState] = useState(user?.deliveryAddress?.state || 'Telangana');
  const [pincode, setPincode] = useState(user?.deliveryAddress?.pincode || '500033');
  const [landmark, setLandmark] = useState(user?.deliveryAddress?.landmark || '');

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiOption, setUpiOption] = useState<'qr' | 'id' | 'apps'>('qr');
  const [upiId, setUpiId] = useState('');
  const [selectedApp, setSelectedApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim'>('gpay');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please provide a valid email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setValidationError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!street.trim()) {
      setValidationError('Please provide your complete delivery street address.');
      return;
    }
    if (!pincode.trim() || pincode.length < 6) {
      setValidationError('Please enter a valid 6-digit postal PIN code.');
      return;
    }

    if (paymentMethod === 'UPI' && upiOption === 'id' && !upiId.includes('@')) {
      setValidationError('Please enter a valid UPI ID (e.g., name@okhdfcbank or phone@upi).');
      return;
    }

    // Auto update or register user session if not yet logged in
    if (!user) {
      login(name, email, phone);
    }

    setIsProcessing(true);

    // Simulate luxury order verification & payment confirmation
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder({
        paymentMethod,
        shippingAddress: {
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          landmark: landmark.trim()
        },
        upiTransactionId:
          paymentMethod === 'UPI'
            ? `UPI-REF-${Math.floor(10000000 + Math.random() * 90000000)}`
            : undefined
      });
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div
        className="relative bg-[#1F301D] text-[#F3F8F2] rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#385532] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#2D4529] flex items-center justify-between bg-[#182617]">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#FF6B81]" />
            <div>
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#FF6B81]">
                Boutique Checkout & Order Placement
              </h2>
              <p className="text-xs text-[#A5C8A1]">
                Exclusive women&apos;s couture · Cash on Delivery & Instant UPI accepted
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-md text-[#C7DEC4] hover:text-[#FFA4B2] hover:bg-[#2A3F26] cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Body */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto bg-[#1F301D]">
          {validationError && (
            <div className="p-3 bg-[#6B0819]/50 border border-[#A8132D] text-[#FFA4B2] text-xs rounded-md">
              {validationError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Customer & Delivery Details */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Section 1: Customer Contact Info */}
              <div className="space-y-3">
                <h3 className="font-serif-luxury text-lg font-semibold text-[#FFA4B2] border-b border-[#2D4529] pb-1.5">
                  1. Patron Contact Details
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asmitha Nalla"
                      className="w-full px-3.5 py-2 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="patron@gmail.com"
                        className="w-full px-3.5 py-2 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="space-y-3 pt-2">
                <h3 className="font-serif-luxury text-lg font-semibold text-[#FFA4B2] border-b border-[#2D4529] pb-1.5">
                  2. Shipping & Delivery Address
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                      Street Address / House No. / Villa *
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Plot 42, Road No 10, Jubilee Hills"
                      className="w-full px-3.5 py-2 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="w-full px-3.5 py-2 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className="w-full px-3.5 py-2 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="500033"
                        maxLength={6}
                        className="w-full px-3.5 py-2 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Near Peddamma Temple"
                        className="w-full px-3.5 py-2 text-xs bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method (COD or UPI) */}
              <div className="space-y-3 pt-2">
                <h3 className="font-serif-luxury text-lg font-semibold text-[#FF6B81] border-b border-[#2D4529] pb-1.5 flex items-center justify-between">
                  <span>3. Payment Method</span>
                  <span className="text-xs font-sans font-medium text-[#A5C8A1]">
                    COD or UPI
                  </span>
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  
                  {/* UPI Option Card */}
                  <label
                    className={`flex flex-col p-3.5 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#FF6B81] bg-[#6B0819]/30 ring-1 ring-[#FF6B81]'
                        : 'border-[#3E5C38] bg-[#182617] hover:border-[#A5C8A1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#FF6B81]" />
                        <span className="text-xs font-semibold text-[#F3F8F2]">
                          Instant UPI
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                        className="text-[#FF6B81] focus:ring-[#FF6B81]"
                      />
                    </div>
                    <span className="text-[11px] text-[#C7DEC4] mt-1.5 leading-tight">
                      Google Pay, PhonePe, Paytm, or UPI ID with QR
                    </span>
                  </label>

                  {/* Cash on Delivery (COD) Card */}
                  <label
                    className={`flex flex-col p-3.5 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#FF6B81] bg-[#6B0819]/30 ring-1 ring-[#FF6B81]'
                        : 'border-[#3E5C38] bg-[#182617] hover:border-[#A5C8A1]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#A5C8A1]" />
                        <span className="text-xs font-semibold text-[#F3F8F2]">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                        className="text-[#FF6B81] focus:ring-[#FF6B81]"
                      />
                    </div>
                    <span className="text-[11px] text-[#C7DEC4] mt-1.5 leading-tight">
                      Pay with cash or QR at your doorstep
                    </span>
                  </label>
                </div>

                {/* Sub-panel for UPI Details */}
                {paymentMethod === 'UPI' && (
                  <div className="p-4 bg-[#182617] rounded-lg border border-[#385532] space-y-3.5 mt-2">
                    <div className="flex items-center gap-2 border-b border-[#2D4529] pb-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setUpiOption('qr')}
                        className={`px-3 py-1 rounded font-medium cursor-pointer ${
                          upiOption === 'qr'
                            ? 'bg-[#CC2240] text-white'
                            : 'text-[#C7DEC4] hover:bg-[#243521]'
                        }`}
                      >
                        Scan QR Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiOption('id')}
                        className={`px-3 py-1 rounded font-medium cursor-pointer ${
                          upiOption === 'id'
                            ? 'bg-[#CC2240] text-white'
                            : 'text-[#C7DEC4] hover:bg-[#243521]'
                        }`}
                      >
                        Enter UPI ID / VPA
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiOption('apps')}
                        className={`px-3 py-1 rounded font-medium cursor-pointer ${
                          upiOption === 'apps'
                            ? 'bg-[#CC2240] text-white'
                            : 'text-[#C7DEC4] hover:bg-[#243521]'
                        }`}
                      >
                        UPI Apps
                      </button>
                    </div>

                    {upiOption === 'qr' && (
                      <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
                        {/* Interactive dynamic QR code representation */}
                        <div className="w-32 h-32 bg-white p-2 rounded-lg border border-[#3E5C38] flex flex-col items-center justify-center relative shadow-md">
                          <QrCode className="w-24 h-24 text-[#1F301D]" />
                          <span className="text-[9px] font-mono text-[#1F301D] font-bold mt-1">UPI: ashdediva@upi</span>
                        </div>
                        <div className="space-y-1 text-xs text-[#C7DEC4]">
                          <p className="font-semibold text-[#F3F8F2]">
                            Scan with Any UPI App
                          </p>
                          <p className="text-[11px] text-[#A5C8A1]">
                            Open GPay, PhonePe, Paytm or BHIM on your smartphone to scan and pay.
                          </p>
                          <p className="text-xs font-semibold text-[#FF6B81] pt-1">
                            Payable Amount: ₹{cartTotal.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    )}

                    {upiOption === 'id' && (
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-[#C7DEC4]">
                          Your UPI ID (Virtual Payment Address)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                            className="w-full px-3 py-2 text-xs bg-[#243521] border border-[#3E5C38] rounded text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
                          />
                        </div>
                        <p className="text-[11px] text-[#A5C8A1]">
                          A payment collect request will be sent to your UPI app.
                        </p>
                      </div>
                    )}

                    {upiOption === 'apps' && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        {[
                          { id: 'gpay', name: 'Google Pay' },
                          { id: 'phonepe', name: 'PhonePe' },
                          { id: 'paytm', name: 'Paytm UPI' },
                          { id: 'bhim', name: 'BHIM UPI' }
                        ].map((app) => (
                          <button
                            type="button"
                            key={app.id}
                            onClick={() => setSelectedApp(app.id as any)}
                            className={`p-2.5 rounded border text-xs font-medium transition-all cursor-pointer ${
                              selectedApp === app.id
                                ? 'border-[#FF6B81] bg-[#CC2240] text-white'
                                : 'border-[#3E5C38] bg-[#243521] text-[#C7DEC4]'
                            }`}
                          >
                            {app.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="p-3.5 bg-[#182617] rounded-lg border border-[#345230] text-xs text-[#C7DEC4] space-y-1">
                    <p className="font-semibold text-[#FFA4B2]">
                      Cash on Delivery Reassurance
                    </p>
                    <p className="text-[11px] text-[#A5C8A1]">
                      Our delivery associate will bring your packaged order to your doorstep. You may pay with cash or ask the delivery associate for a digital UPI QR code upon receipt.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary & Place Order */}
            <div className="lg:col-span-5 bg-[#182617] p-5 rounded-lg border border-[#345230] flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif-luxury text-lg font-semibold text-[#FF6B81] border-b border-[#2D4529] pb-2">
                  Order Summary
                </h3>

                {/* Items preview */}
                <div className="max-h-52 overflow-y-auto space-y-3 py-3 border-b border-[#2D4529]">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-14 object-cover rounded bg-[#162215] shrink-0 border border-[#2D4529]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#F3F8F2] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[#A5C8A1] text-[11px]">
                          Size: {item.selectedSize} · Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-[#FF6B81] tabular-nums font-mono">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing totals */}
                <div className="space-y-2 py-3 text-xs text-[#C7DEC4]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-[#FFA4B2]">
                      <span>Promo Savings</span>
                      <span className="font-mono tabular-nums">-₹{promoDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Couture Express Delivery</span>
                    <span className="text-[#A5C8A1] font-semibold uppercase text-[10px]">Free</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#F3F8F2] pt-2 border-t border-[#2D4529]">
                    <span>Total Amount</span>
                    <span className="text-[#FF6B81] font-mono tabular-nums font-bold">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-[#20311E] rounded text-[11px] text-[#A5C8A1] space-y-1 border border-[#345230]">
                  <div className="flex items-center gap-1.5 font-medium text-[#F3F8F2]">
                    <Truck className="w-3.5 h-3.5 text-[#FF6B81]" />
                    <span>Estimated Delivery: Within 4-5 Days</span>
                  </div>
                  <p>Hand-inspected, steam-pressed, and packaged in ashdediva signature luxury box.</p>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 bg-[#CC2240] hover:bg-[#A8132D] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-75 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Your Order...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>
                        Confirm Order ({paymentMethod === 'COD' ? 'Cash on Delivery' : 'Instant UPI'})
                      </span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#A5C8A1] mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7DAA78]" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
              </div>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
