'use client';

import React from 'react';
import { numberToWords } from '@/lib/utils';
import type { LetterOfCredit, ProformaInvoice } from '@/lib/types';

interface CommercialInvoiceDocumentProps {
  lc: LetterOfCredit;
  pi?: ProformaInvoice | null;
}

export default function CommercialInvoiceDocument({ lc, pi }: CommercialInvoiceDocumentProps) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const items = (pi as any)?.items || [];
  const totals = (pi as any)?.totals || { totalAmount: lc.amount, grossWeight: 0, netWeight: 0 };

  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Times New Roman, serif', fontSize: '12px' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{lc.beneficiary}</h1>
        <p className="text-sm">House No#16, Road No 01, Sector#10, Uttara, Dhaka-1230, Bangladesh.</p>
        <p className="text-sm">Email: fashionrepublic@gmail.com</p>
      </div>

      {/* Document Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold underline">COMMERCIAL INVOICE</h2>
      </div>

      {/* Invoice Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="border border-black p-3">
          <p className="font-semibold mb-1">Exporter:</p>
          <p className="font-bold">{lc.beneficiary}</p>
          <p>Uttara, Dhaka-1230, Bangladesh</p>
        </div>
        <div className="border border-black p-3">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="font-semibold">Invoice No:</td>
                <td>{lc.lcNo}/CI</td>
              </tr>
              <tr>
                <td className="font-semibold">Date:</td>
                <td>{formatDate(lc.shipmentDate)}</td>
              </tr>
              <tr>
                <td className="font-semibold">L/C No:</td>
                <td>{lc.lcNo}</td>
              </tr>
              <tr>
                <td className="font-semibold">L/C Date:</td>
                <td>{formatDate(lc.dateOfOpening)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="border border-black p-3">
          <p className="font-semibold mb-1">Consignee/Importer:</p>
          <p className="font-bold">{lc.buyerName}</p>
        </div>
        <div className="border border-black p-3">
          <p className="font-semibold mb-1">Buyer (if other than consignee):</p>
          <p>Same as Consignee</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="border border-black p-3">
          <p className="font-semibold">Country of Origin:</p>
          <p>Bangladesh</p>
        </div>
        <div className="border border-black p-3">
          <p className="font-semibold">Port of Loading:</p>
          <p>{lc.portOfLoading}</p>
        </div>
        <div className="border border-black p-3">
          <p className="font-semibold">Port of Discharge:</p>
          <p>{lc.portOfDischarge}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse mb-4" style={{ fontSize: '10px' }}>
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2 text-left">Marks & Numbers</th>
            <th className="border border-black p-2 text-left">Description of Goods</th>
            <th className="border border-black p-2 text-center">Quantity</th>
            <th className="border border-black p-2 text-right">Unit Price (USD)</th>
            <th className="border border-black p-2 text-right">Total Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item: any, index: number) => (
              <tr key={index}>
                <td className="border border-black p-2">{lc.lcNo}</td>
                <td className="border border-black p-2">{item.description || item.measurement || 'As per LC'}</td>
                <td className="border border-black p-2 text-center">
                  {item.quantityPcs || item.quantityYds || item.cartonQty || '-'}
                </td>
                <td className="border border-black p-2 text-right">
                  {(item.unitPrice || 0).toFixed(4)}
                </td>
                <td className="border border-black p-2 text-right">
                  {(item.totalAmount || item.totalPrice || 0).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-black p-2">{lc.lcNo}</td>
              <td className="border border-black p-2">Goods as per LC</td>
              <td className="border border-black p-2 text-center">As per LC</td>
              <td className="border border-black p-2 text-right">-</td>
              <td className="border border-black p-2 text-right">{lc.amount.toFixed(2)}</td>
            </tr>
          )}
          {/* Total Row */}
          <tr className="font-bold bg-gray-50">
            <td className="border border-black p-2" colSpan={4}>Total FOB Value</td>
            <td className="border border-black p-2 text-right">USD {(totals.totalAmount || lc.amount).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Amount in Words */}
      <div className="mb-4 p-3 border border-black">
        <p><span className="font-semibold">Amount in Words:</span> US Dollars {numberToWords(totals.totalAmount || lc.amount)} Only</p>
      </div>

      {/* Weight Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <p><span className="font-semibold">Net Weight:</span> {totals.netWeight?.toFixed(2) || '0.00'} Kg</p>
        </div>
        <div>
          <p><span className="font-semibold">Gross Weight:</span> {totals.grossWeight?.toFixed(2) || '0.00'} Kg</p>
        </div>
      </div>

      {/* Declaration */}
      <div className="text-sm mb-6 p-3 border border-black">
        <p className="font-semibold mb-2">Declaration:</p>
        <p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
      </div>

      {/* Signature */}
      <div className="flex justify-end mt-8">
        <div className="text-center">
          <div className="border-t border-black pt-2 px-12 mt-12">
            <p className="font-semibold">For {lc.beneficiary}</p>
            <p className="text-sm text-gray-600">Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}
