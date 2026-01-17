'use client';

import React from 'react';
import { formatCurrency, numberToWords } from '@/lib/utils';
import type { PILabels } from '@/lib/types';

interface PILabelsDocumentProps {
  data: PILabels;
}

export default function PILabelsDocument({ data }: PILabelsDocumentProps) {
  const formatDocDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const totalQuantityDzn = data.items.reduce((sum, item) => sum + (item.quantityDzn || 0), 0);

  return (
    <div className="bg-white p-8 text-black h-full flex flex-col" style={{ fontFamily: 'Times New Roman, serif', fontSize: '12px' }}>
      {/* Company Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Times New Roman, serif' }}>
          Fashion Republic (BD).
        </h1>
        <p className="text-sm font-semibold">House No#16, Road No 01, Sector#10, Uttara, Dhaka-1230, Bangladesh.</p>
        <p className="text-sm font-semibold">(Mail:fashionrepublic@gmail.com)</p>
        <h2 className="text-lg font-bold mt-2">Proforma Invoice</h2>
      </div>

      {/* Buyer and Invoice Details */}
      <div className="flex justify-between items-start mb-4 border-t border-black pt-4">
        <div className="w-[60%]">
          <p className="font-bold uppercase mb-1">{data.buyer.name}</p>
          <p className="whitespace-pre-line leading-tight">{data.buyer.address}</p>
          <p>{data.buyer.location}</p>
        </div>
        <div className="w-[40%]">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="font-bold w-24">Date :</td>
                <td className="font-bold">{formatDocDate(data.date)}</td>
              </tr>
              <tr>
                <td className="font-bold">Buyer :</td>
                <td className="font-bold">LPP</td>
              </tr>
              <tr>
                <td className="font-bold">P I NO :</td>
                <td className="font-bold">{data.piNo}</td>
              </tr>
              <tr>
                <td className="font-bold">Ref :</td>
                <td className="font-bold">{data.merchandiser}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse border border-black mb-4" style={{ fontSize: '11px' }}>
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border border-black p-1 align-top bg-[#dbead5]">Style No/ Po<br />Number</th>
            <th className="border border-black p-1 align-top bg-[#dbead5]">Description</th>
            <th className="border border-black p-1 align-top bg-[#dbead5]">Colour</th>
            <th className="border border-black p-1 align-top bg-[#dbead5]">Net<br />weight</th>
            <th className="border border-black p-1 align-top bg-[#dbead5]">Gross<br />Weight</th>
            <th className="border border-black p-1 align-top bg-[#dbead5]">Quantity<br />(In Dzn)</th>
            <th className="border border-black p-1 align-top bg-[#dbead5]">Quantity<br />(In Pcs)</th>
            <th className="border border-black p-1 align-top bg-[#dbead5]">Unit Price<br />(In US $)</th>
            <th className="border border-black p-1 align-top bg-[#dbead5]">Total Amount<br />(In US $)</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border border-black p-1 font-bold">{data.styleNo}</td>
              <td className="border border-black p-1 font-bold">{item.description}</td>
              <td className="border border-black p-1 font-bold">{item.colour}</td>
              <td className="border border-black p-1">{item.netWeight.toFixed(2)}</td>
              <td className="border border-black p-1">{item.grossWeight.toFixed(0)}</td>
              <td className="border border-black p-1">{item.quantityDzn.toFixed(2)}</td>
              <td className="border border-black p-1 font-bold">{item.quantityPcs}</td>
              <td className="border border-black p-1 font-bold">$ {item.unitPrice.toFixed(2)}</td>
              <td className="border border-black p-1 font-bold text-right">{item.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          ))}
          {/* Total Row */}
          <tr className="font-bold bg-white">
            <td className="border border-black p-1 text-right italic" colSpan={3}>Total</td>
            <td className="border border-black p-1 text-center">{data.totals.netWeight.toFixed(2)}</td>
            <td className="border border-black p-1 text-center">{data.totals.grossWeight.toFixed(0)}</td>
            <td className="border border-black p-1 text-center">{totalQuantityDzn.toFixed(2)}</td>
            <td className="border border-black p-1 text-center">{data.totals.quantityPcs}</td>
            <td className="border border-black p-1 text-center"></td>
            <td className="border border-black p-1 text-right">$ {data.totals.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
        </tbody>
      </table>

      {/* Amount in Words */}
      <div className="mb-4 font-bold underline">
        <p>Total Amount(in Words): US Dollar : {numberToWords(data.totals.totalAmount)} Only.</p>
      </div>

      {/* Terms */}
      <div className="mb-8">
        <h3 className="font-bold underline mb-2">Additional Terms and Condition:</h3>
        <div className="grid grid-cols-[120px_1fr] gap-y-1 text-sm">
          <div className="font-bold">01.Payment :</div>
          <div className="leading-tight">{data.terms.payment}</div>

          <div className="font-bold">02.Delivery :</div>
          <div>{data.terms.delivery}</div>

          <div className="font-bold">03.Advising Bank :</div>
          <div>{data.terms.advisingBank}</div>

          <div className="font-bold">04.Negotiation :</div>
          <div>{data.terms.negotiation}</div>

          <div className="font-bold">05.Original :</div>
          <div>Bangladeshi</div>

          <div className="font-bold">06.Swift Code :</div>
          <div>{data.terms.swiftCode}</div>

          <div className="font-bold">07.BIN NO :</div>
          <div>{data.terms.binNo}</div>

          <div className="font-bold">08.H.S.Code :</div>
          <div>{data.terms.hsCode}</div>
        </div>
      </div>

      {/* Signatures */}
      <div className="mt-auto pt-16 flex justify-between items-end">
        <div className="border-t border-black px-4 pt-1">
          <p className="font-bold">Bayer Acceptance</p>
        </div>
        <div className="flex flex-col items-center">
          {/* Signature Image Placeholder - using a textual representation style or generic signature if desired, 
                for now standardizing the text line as requested */}
          {/* <img src="/signature.png" alt="Signature" className="h-10 mb-[-10px]" /> */}
          <div className="font-script text-2xl mb-1">Ryd</div>
          <div className="border-t border-black px-4 pt-1 text-center">
            <p className="font-bold text-sm">Authorised Signature</p>
            <p className="font-bold text-sm">For Fashion Republic BD</p>
          </div>
        </div>
      </div>
    </div>
  );
}
