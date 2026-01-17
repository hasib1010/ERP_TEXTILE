'use client';

import React from 'react';
import { formatCurrency, numberToWords } from '@/lib/utils';
import type { PIFabric } from '@/lib/types';

interface PIFabricDocumentProps {
  data: PIFabric;
}

export default function PIFabricDocument({ data }: PIFabricDocumentProps) {
  const formatDocDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
  };

  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Times New Roman, serif', fontSize: '12px' }}>
      {/* Company Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Times New Roman, serif' }}>
          Moon Textile.
        </h1>
        <p className="text-sm">House No#16, Road No 01, Sector#10, Uttara, Dhaka-1230, Bangladesh.</p>
        <p className="text-sm">(Mail:moontex011@gmail.com)</p>
      </div>

      {/* Document Title */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold underline">Proforma Invoice</h2>
      </div>

      {/* Buyer and Invoice Details */}
      <div className="flex justify-between mb-4">
        <div className="w-1/2">
          <p className="font-bold">{data.buyer.name}</p>
          <p>{data.buyer.address}</p>
          <p>{data.buyer.location}</p>
        </div>
        <div className="text-right">
          <table className="ml-auto text-sm">
            <tbody>
              <tr>
                <td className="pr-2 text-right font-semibold">P I NO:</td>
                <td>{data.piNo}</td>
              </tr>
              <tr>
                <td className="pr-2 text-right font-semibold">Date:</td>
                <td>{formatDocDate(data.date)}</td>
              </tr>
              <tr>
                <td className="pr-2 text-right font-semibold">Buyer:</td>
                <td>{data.payee || 'Payee'}</td>
              </tr>
              <tr>
                <td className="pr-2 text-right font-semibold">Merchandiser:</td>
                <td>{data.merchandiser}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse mb-4" style={{ fontSize: '10px' }}>
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-1 text-left">Style No</th>
            <th className="border border-black p-1 text-left">Description</th>
            <th className="border border-black p-1 text-center">GSM</th>
            <th className="border border-black p-1 text-center">Width</th>
            <th className="border border-black p-1 text-center">Colour</th>
            <th className="border border-black p-1 text-right">Net Wt (Kg)</th>
            <th className="border border-black p-1 text-right">Gross Wt (Kg)</th>
            <th className="border border-black p-1 text-right">Qty (Yds)</th>
            <th className="border border-black p-1 text-right">Unit Price</th>
            <th className="border border-black p-1 text-right">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-1">{item.styleNo}</td>
              <td className="border border-black p-1">{item.description}</td>
              <td className="border border-black p-1 text-center">{item.gsm}</td>
              <td className="border border-black p-1 text-center">{item.width}</td>
              <td className="border border-black p-1 text-center">{item.colour}</td>
              <td className="border border-black p-1 text-right">{item.netWeightKg.toFixed(2)}</td>
              <td className="border border-black p-1 text-right">{item.grossWeightKg.toFixed(2)}</td>
              <td className="border border-black p-1 text-right">{item.quantityYds.toFixed(2)}</td>
              <td className="border border-black p-1 text-right">${item.unitPrice.toFixed(4)}</td>
              <td className="border border-black p-1 text-right">${item.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
          {/* Total Row */}
          <tr className="font-bold bg-gray-50">
            <td className="border border-black p-1" colSpan={5}>Total</td>
            <td className="border border-black p-1 text-right">{data.totals.netWeight.toFixed(2)}</td>
            <td className="border border-black p-1 text-right">{data.totals.grossWeight.toFixed(2)}</td>
            <td className="border border-black p-1 text-right">{data.totals.quantityYds.toFixed(2)}</td>
            <td className="border border-black p-1 text-right"></td>
            <td className="border border-black p-1 text-right">${data.totals.totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Amount in Words */}
      <div className="mb-4">
        <p className="font-semibold">
          In Word: US Dollar {numberToWords(data.totals.totalAmount)} Only.
        </p>
      </div>

      {/* Terms */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <p><span className="font-semibold">Payment:</span> {data.terms.payment}</p>
          <p><span className="font-semibold">Delivery:</span> {data.terms.delivery}</p>
          <p><span className="font-semibold">Advising Bank:</span> {data.terms.advisingBank}</p>
        </div>
        <div>
          <p><span className="font-semibold">Country of Origin:</span> {data.terms.origin}</p>
          <p><span className="font-semibold">Swift Code:</span> {data.terms.swiftCode}</p>
          <p><span className="font-semibold">VAT No:</span> {data.terms.vatNo}</p>
          <p><span className="font-semibold">H.S Code:</span> {data.terms.hsCode}</p>
        </div>
      </div>

      {/* Bank Details */}
      <div className="text-sm mb-6">
        <p className="font-semibold">Bank Name: National Bank Limited</p>
        <p>Pragati Sarani Branch, Dhaka</p>
        <p>A/C Name: Moon Textile</p>
        <p>A/C No: 0116-3112001201</p>
      </div>

      {/* Signature */}
      <div className="flex justify-between mt-12">
        <div></div>
        <div className="text-center">
          <div className="border-t border-black pt-2 px-8">
            <p className="font-semibold">For Moon Textile.</p>
            <p className="text-sm text-gray-600">Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}
