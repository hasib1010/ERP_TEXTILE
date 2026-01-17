'use client';

import React from 'react';
import type { LetterOfCredit, ProformaInvoice } from '@/lib/types';

interface DeliveryChallanDocumentProps {
  lc: LetterOfCredit;
  pi?: ProformaInvoice | null;
}

export default function DeliveryChallanDocument({ lc, pi }: DeliveryChallanDocumentProps) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const items = (pi as any)?.items || [];
  const totals = (pi as any)?.totals || { grossWeight: 0 };

  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Times New Roman, serif', fontSize: '12px' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{lc.beneficiary}</h1>
        <p className="text-sm">House No#16, Road No 01, Sector#10, Uttara, Dhaka-1230, Bangladesh.</p>
      </div>

      {/* Document Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold underline">DELIVERY CHALLAN</h2>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
        <div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold pr-2">Challan No:</td>
                <td>{lc.lcNo}/DC</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">L/C No:</td>
                <td>{lc.lcNo}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">B/B L/C No:</td>
                <td>{lc.bbLcNo}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold pr-2 text-right">Date:</td>
                <td className="text-right">{formatDate(lc.shipmentDate)}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2 text-right">P/I No:</td>
                <td className="text-right">{lc.piReference}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Consignee */}
      <div className="mb-6">
        <p className="font-semibold">Consignee:</p>
        <p className="font-bold">{lc.buyerName}</p>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse mb-6" style={{ fontSize: '11px' }}>
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2 text-left">Sl.</th>
            <th className="border border-black p-2 text-left">Description of Goods</th>
            <th className="border border-black p-2 text-center">Quantity</th>
            <th className="border border-black p-2 text-center">Unit</th>
            <th className="border border-black p-2 text-right">Gross Weight (Kg)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item: any, index: number) => (
              <tr key={index}>
                <td className="border border-black p-2">{index + 1}</td>
                <td className="border border-black p-2">{item.description || item.measurement || 'As per LC'}</td>
                <td className="border border-black p-2 text-center">
                  {item.quantityPcs || item.quantityYds || item.cartonQty || '-'}
                </td>
                <td className="border border-black p-2 text-center">
                  {item.unit || (item.quantityPcs ? 'PCS' : item.quantityYds ? 'YDS' : 'PCS')}
                </td>
                <td className="border border-black p-2 text-right">
                  {(item.grossWeight || item.grossWeightKg || 0).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-black p-2">1</td>
              <td className="border border-black p-2">Goods as per LC {lc.lcNo}</td>
              <td className="border border-black p-2 text-center">As per LC</td>
              <td className="border border-black p-2 text-center">-</td>
              <td className="border border-black p-2 text-right">{totals.grossWeight?.toFixed(2) || '0.00'}</td>
            </tr>
          )}
          {/* Total Row */}
          <tr className="font-bold bg-gray-50">
            <td className="border border-black p-2" colSpan={4}>Total Gross Weight</td>
            <td className="border border-black p-2 text-right">{totals.grossWeight?.toFixed(2) || '0.00'} Kg</td>
          </tr>
        </tbody>
      </table>

      {/* Transport Details */}
      <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
        <div>
          <p><span className="font-semibold">Transport Mode:</span> By Road</p>
          <p><span className="font-semibold">Vehicle No:</span> _______________</p>
        </div>
        <div>
          <p><span className="font-semibold">Driver Name:</span> _______________</p>
          <p><span className="font-semibold">Contact No:</span> _______________</p>
        </div>
      </div>

      {/* Signatures */}
      <div className="flex justify-between mt-16">
        <div className="text-center">
          <div className="border-t border-black pt-2 px-8">
            <p>Received By</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-black pt-2 px-8">
            <p>Checked By</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-black pt-2 px-8">
            <p>Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}
