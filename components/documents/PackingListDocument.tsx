'use client';

import React from 'react';
import type { LetterOfCredit, ProformaInvoice } from '@/lib/types';

interface PackingListDocumentProps {
  lc: LetterOfCredit;
  pi?: ProformaInvoice | null;
}

export default function PackingListDocument({ lc, pi }: PackingListDocumentProps) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const items = (pi as any)?.items || [];
  const totals = (pi as any)?.totals || { grossWeight: 0, netWeight: 0 };

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
        <h2 className="text-xl font-bold underline">PACKING LIST</h2>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="border border-black p-3">
          <p className="font-semibold mb-1">Exporter:</p>
          <p className="font-bold">{lc.beneficiary}</p>
          <p>Uttara, Dhaka-1230</p>
          <p>Bangladesh</p>
        </div>
        <div className="border border-black p-3">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold">Packing List No:</td>
                <td>{lc.lcNo}/PL</td>
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
                <td className="font-semibold">Invoice No:</td>
                <td>{lc.lcNo}/CI</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="border border-black p-3">
          <p className="font-semibold mb-1">Consignee:</p>
          <p className="font-bold">{lc.buyerName}</p>
        </div>
        <div className="border border-black p-3">
          <p className="font-semibold">Country of Origin:</p>
          <p>Bangladesh</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse mb-4" style={{ fontSize: '10px' }}>
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2 text-center">Carton No.</th>
            <th className="border border-black p-2 text-left">Description of Goods</th>
            <th className="border border-black p-2 text-center">Quantity</th>
            <th className="border border-black p-2 text-right">Net Wt (Kg)</th>
            <th className="border border-black p-2 text-right">Gross Wt (Kg)</th>
            <th className="border border-black p-2 text-center">Measurement (CBM)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item: any, index: number) => (
              <tr key={index}>
                <td className="border border-black p-2 text-center">{index + 1}</td>
                <td className="border border-black p-2">{item.description || item.measurement || 'As per LC'}</td>
                <td className="border border-black p-2 text-center">
                  {item.quantityPcs || item.quantityYds || item.cartonQty || '-'}
                </td>
                <td className="border border-black p-2 text-right">
                  {(item.netWeight || item.netWeightKg || 0).toFixed(2)}
                </td>
                <td className="border border-black p-2 text-right">
                  {(item.grossWeight || item.grossWeightKg || 0).toFixed(2)}
                </td>
                <td className="border border-black p-2 text-center">-</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-black p-2 text-center">1</td>
              <td className="border border-black p-2">Goods as per LC {lc.lcNo}</td>
              <td className="border border-black p-2 text-center">As per LC</td>
              <td className="border border-black p-2 text-right">{totals.netWeight?.toFixed(2) || '0.00'}</td>
              <td className="border border-black p-2 text-right">{totals.grossWeight?.toFixed(2) || '0.00'}</td>
              <td className="border border-black p-2 text-center">-</td>
            </tr>
          )}
          {/* Total Row */}
          <tr className="font-bold bg-gray-50">
            <td className="border border-black p-2 text-center" colSpan={3}>Total</td>
            <td className="border border-black p-2 text-right">{totals.netWeight?.toFixed(2) || '0.00'}</td>
            <td className="border border-black p-2 text-right">{totals.grossWeight?.toFixed(2) || '0.00'}</td>
            <td className="border border-black p-2 text-center">-</td>
          </tr>
        </tbody>
      </table>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-sm border border-black p-3">
        <div>
          <p className="font-semibold">Total Cartons:</p>
          <p>{items.length || 1}</p>
        </div>
        <div>
          <p className="font-semibold">Total Net Weight:</p>
          <p>{totals.netWeight?.toFixed(2) || '0.00'} Kg</p>
        </div>
        <div>
          <p className="font-semibold">Total Gross Weight:</p>
          <p>{totals.grossWeight?.toFixed(2) || '0.00'} Kg</p>
        </div>
      </div>

      {/* Port Information */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <p><span className="font-semibold">Port of Loading:</span> {lc.portOfLoading}</p>
        </div>
        <div>
          <p><span className="font-semibold">Port of Discharge:</span> {lc.portOfDischarge}</p>
        </div>
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
