import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Scissors, CheckCircle, Sparkles } from 'lucide-react';

export const BespokeModal: React.FC = () => {
  const { isBespokeModalOpen, setIsBespokeModalOpen, user } = useShop();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [outfitType, setOutfitType] = useState('Bridal Lehanga');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isBespokeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsBespokeModalOpen(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative bg-[#1F301D] text-[#F3F8F2] rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#385532] p-6 sm:p-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsBespokeModalOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-md text-[#C7DEC4] hover:text-[#FFA4B2] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-[#263C23] text-[#FF6B81] border border-[#3C5B37] flex items-center justify-center mx-auto mb-2">
            <Scissors className="w-6 h-6 text-[#FF6B81]" />
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#FF6B81]">
            Bespoke Tailoring & Bridal Consultation
          </h2>
          <p className="text-xs text-[#A5C8A1]">
            Personalized couture made to your exact measurements
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 text-center space-y-3 bg-[#182617] rounded-lg border border-[#345230]">
            <CheckCircle className="w-10 h-10 text-[#FF6B81] mx-auto" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#FFA4B2]">
              Consultation Request Received
            </h3>
            <p className="text-xs text-[#C7DEC4]">
              Our lead couture stylist will reach out on WhatsApp/Phone within 4 business hours to curate your bespoke silhouette.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Asmitha Nalla"
                className="w-full px-3 py-2 bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                Silhouette of Interest
              </label>
              <select
                value={outfitType}
                onChange={(e) => setOutfitType(e.target.value)}
                className="w-full px-3 py-2 bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] focus:outline-none focus:border-[#FF6B81]"
              >
                <option value="Bridal Lehanga" className="bg-[#1F301D]">Bridal Lehanga / Trousseau</option>
                <option value="Traditional Kurti / Short Kurti" className="bg-[#1F301D]">Handcrafted Silk Kurti / Short Kurti</option>
                <option value="Floor-Length Long Frock" className="bg-[#1F301D]">Floor-Length Long Frock / Anarkali</option>
                <option value="Maternal Couture" className="bg-[#1F301D]">Maternity Bespoke Ensemble</option>
                <option value="Festive Spring/Summer Co-ord" className="bg-[#1F301D]">Festive Spring/Summer Co-ord</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#A5C8A1] mb-1">
                Custom Requirements or Event Date
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention any custom color shades, neckline preferences, sleeve lengths or wedding dates..."
                className="w-full px-3 py-2 bg-[#273B24] border border-[#3E5C38] rounded-md text-[#F3F8F2] placeholder-[#7DAA78] focus:outline-none focus:border-[#FF6B81]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#CC2240] hover:bg-[#A8132D] text-white font-semibold uppercase tracking-wider rounded-md shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Complimentary Consultation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
