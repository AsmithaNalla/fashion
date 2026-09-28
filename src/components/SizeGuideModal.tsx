import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, Sparkles } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const sizeChartInches = [
    { size: 'XS', bust: '32', waist: '26', hip: '35', kurtiLen: '44' },
    { size: 'S', bust: '34', waist: '28', hip: '37', kurtiLen: '44' },
    { size: 'M', bust: '36', waist: '30', hip: '39', kurtiLen: '45' },
    { size: 'L', bust: '38', waist: '32', hip: '41', kurtiLen: '45' },
    { size: 'XL', bust: '40', waist: '34', hip: '43', kurtiLen: '46' },
    { size: 'XXL', bust: '42', waist: '36', hip: '45', kurtiLen: '46' },
  ];

  const sizeChartCm = [
    { size: 'XS', bust: '81', waist: '66', hip: '89', kurtiLen: '112' },
    { size: 'S', bust: '86', waist: '71', hip: '94', kurtiLen: '112' },
    { size: 'M', bust: '91', waist: '76', hip: '99', kurtiLen: '114' },
    { size: 'L', bust: '97', waist: '81', hip: '104', kurtiLen: '114' },
    { size: 'XL', bust: '102', waist: '86', hip: '109', kurtiLen: '117' },
    { size: 'XXL', bust: '107', waist: '91', hip: '114', kurtiLen: '117' },
  ];

  const currentChart = unit === 'inches' ? sizeChartInches : sizeChartCm;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative bg-[#1F301D] text-[#F3F8F2] rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#385532] p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#2D4529] pb-3">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#FF6B81]" />
            <div>
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#FF6B81]">
                Couture Sizing & Measurements
              </h2>
              <p className="text-xs text-[#A5C8A1]">
                ashdediva&apos;s standard silhouette measurements
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 rounded-md text-[#C7DEC4] hover:text-[#FFA4B2] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-end">
          <div className="inline-flex rounded-md border border-[#3E5C38] p-0.5 bg-[#182617] text-xs">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded font-medium cursor-pointer ${
                unit === 'inches' ? 'bg-[#CC2240] text-white' : 'text-[#C7DEC4]'
              }`}
            >
              Inches (&quot;)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded font-medium cursor-pointer ${
                unit === 'cm' ? 'bg-[#CC2240] text-white' : 'text-[#C7DEC4]'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto border border-[#385532] rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#182617] text-[#A5C8A1] font-semibold border-b border-[#2D4529]">
              <tr>
                <th className="py-2.5 px-4">Size</th>
                <th className="py-2.5 px-4">Bust ({unit === 'inches' ? 'in' : 'cm'})</th>
                <th className="py-2.5 px-4">Waist</th>
                <th className="py-2.5 px-4">Hip</th>
                <th className="py-2.5 px-4">Standard Kurti Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D4529] bg-[#223520]">
              {currentChart.map((row) => (
                <tr key={row.size} className="hover:bg-[#2A4027]">
                  <td className="py-2.5 px-4 font-bold text-[#FF6B81]">{row.size}</td>
                  <td className="py-2.5 px-4 tabular-nums text-[#F3F8F2]">{row.bust}</td>
                  <td className="py-2.5 px-4 tabular-nums text-[#F3F8F2]">{row.waist}</td>
                  <td className="py-2.5 px-4 tabular-nums text-[#F3F8F2]">{row.hip}</td>
                  <td className="py-2.5 px-4 tabular-nums text-[#F3F8F2]">{row.kurtiLen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom Stitching Notice */}
        <div className="p-3.5 bg-[#182617] border border-[#345230] rounded-lg text-xs text-[#C7DEC4] space-y-1">
          <p className="font-semibold text-[#FF6B81] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need Custom Stitching or Bridal Alterations?</span>
          </p>
          <p className="text-[11px] leading-relaxed text-[#A5C8A1]">
            Select &ldquo;Custom Stitching&rdquo; in the size options when adding any kurti, lehanga, or frock to your bag. Our master tailor will contact you via WhatsApp / Phone to take your precise measurements at zero additional fee.
          </p>
        </div>
      </div>
    </div>
  );
};
