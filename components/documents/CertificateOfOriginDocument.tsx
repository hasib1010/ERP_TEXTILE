'use client';

import React from 'react';
import type { LetterOfCredit, ProformaInvoice } from '@/lib/types';

interface CertificateOfOriginDocumentProps {
  lc: LetterOfCredit;
  pi?: ProformaInvoice | null;
}

export default function CertificateOfOriginDocument({ lc, pi }: CertificateOfOriginDocumentProps) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const items = (pi as any)?.items || [];
  const totals = (pi as any)?.totals || { grossWeight: 0 };

  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Times New Roman, serif', fontSize: '12px' }}>
      {/* Header */}
      <div className="border-2 border-black">
        {/* Title */}
        <div className="text-center py-4 border-b-2 border-black bg-gray-50">
          <h1 className="text-2xl font-bold">CERTIFICATE OF ORIGIN</h1>
          <p className="text-sm">(Combined declaration and certificate)</p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-2">
          {/* Left Column */}
          <div className="border-r-2 border-black">
            {/* Box 1 - Exporter */}
            <div className="p-3 border-b border-black min-h-24">
              <p className="text-xs font-semibold mb-1">1. Goods consigned from (Exporter's business name, address, country)</p>
              <p className="font-bold">{lc.beneficiary}</p>
              <p className="text-sm">Uttara, Dhaka-1230</p>
              <p className="text-sm">BANGLADESH</p>
            </div>

            {/* Box 2 - Consignee */}
            <div className="p-3 border-b border-black min-h-24">
              <p className="text-xs font-semibold mb-1">2. Goods consigned to (Consignee's name, address, country)</p>
              <p className="font-bold">{lc.buyerName}</p>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Reference Number */}
            <div className="p-3 border-b border-black">
              <p className="text-xs font-semibold mb-1">Reference No.</p>
              <p>{lc.lcNo}/CO</p>
            </div>

            {/* GSP Info */}
            <div className="p-3 border-b border-black min-h-32">
              <p className="text-xs font-semibold mb-1">GENERALIZED SYSTEM OF PREFERENCES</p>
              <p className="text-xs">CERTIFICATE OF ORIGIN</p>
              <p className="text-xs">(Combined declaration and certificate)</p>
              <p className="text-xs mt-2">FORM A</p>
              <p className="text-xs mt-2">Issued in: <span className="font-bold">BANGLADESH</span></p>
            </div>
          </div>
        </div>

        {/* Transport Details */}
        <div className="p-3 border-b border-black">
          <p className="text-xs font-semibold mb-1">3. Means of transport and route (as far as known)</p>
          <p className="text-sm">
            From: <span className="font-bold">{lc.portOfLoading}</span> To: <span className="font-bold">{lc.portOfDischarge}</span>
          </p>
          <p className="text-sm">By: Sea/Air</p>
        </div>

        {/* Country Info */}
        <div className="grid grid-cols-2 border-b border-black">
          <div className="p-3 border-r border-black">
            <p className="text-xs font-semibold">4. For official use</p>
          </div>
          <div className="p-3">
            <p className="text-xs font-semibold">5. Country of destination</p>
            <p className="text-sm">{lc.portOfDischarge?.split(',')[0] || 'As per LC'}</p>
          </div>
        </div>

        {/* Goods Description Table */}
        <div className="border-b border-black">
          <div className="grid grid-cols-12 bg-gray-50 text-xs font-semibold border-b border-black">
            <div className="col-span-1 p-2 border-r border-black">6. Item number</div>
            <div className="col-span-2 p-2 border-r border-black">7. Marks and numbers of packages</div>
            <div className="col-span-4 p-2 border-r border-black">8. Number and kind of packages; description of goods</div>
            <div className="col-span-2 p-2 border-r border-black">9. Gross weight (kg) or other quantity</div>
            <div className="col-span-1 p-2 border-r border-black">10. Number and date of invoices</div>
            <div className="col-span-2 p-2">11. Origin criterion</div>
          </div>

          {/* Items */}
          <div className="min-h-32">
            {items.length > 0 ? (
              items.map((item: any, index: number) => (
                <div key={index} className="grid grid-cols-12 text-sm border-b border-black last:border-b-0">
                  <div className="col-span-1 p-2 border-r border-black">{index + 1}</div>
                  <div className="col-span-2 p-2 border-r border-black">{lc.lcNo}</div>
                  <div className="col-span-4 p-2 border-r border-black">{item.description || item.measurement || 'Goods as per LC'}</div>
                  <div className="col-span-2 p-2 border-r border-black text-right">{(item.grossWeight || item.grossWeightKg || 0).toFixed(2)}</div>
                  <div className="col-span-1 p-2 border-r border-black text-xs">{lc.lcNo}/CI</div>
                  <div className="col-span-2 p-2">P</div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-12 text-sm">
                <div className="col-span-1 p-2 border-r border-black">1</div>
                <div className="col-span-2 p-2 border-r border-black">{lc.lcNo}</div>
                <div className="col-span-4 p-2 border-r border-black">Goods as per LC {lc.lcNo}</div>
                <div className="col-span-2 p-2 border-r border-black text-right">{totals.grossWeight?.toFixed(2) || '0.00'}</div>
                <div className="col-span-1 p-2 border-r border-black text-xs">{lc.lcNo}/CI</div>
                <div className="col-span-2 p-2">P</div>
              </div>
            )}
          </div>
        </div>

        {/* Declaration and Certification */}
        <div className="grid grid-cols-2">
          {/* Declaration by Exporter */}
          <div className="p-3 border-r border-black">
            <p className="text-xs font-semibold mb-2">12. Declaration by the exporter</p>
            <p className="text-xs leading-relaxed">
              The undersigned hereby declares that the above details and statements are correct; 
              that all the goods were produced in <span className="font-bold">BANGLADESH</span> and 
              that they comply with the origin requirements specified for those goods in the 
              Generalized System of Preferences for goods exported to the countries named in box 5.
            </p>
            <div className="mt-4">
              <p className="text-xs">Place and date: Dhaka, {formatDate(lc.shipmentDate)}</p>
              <div className="mt-8 pt-2 border-t border-black inline-block px-8">
                <p className="text-xs">Signature of authorized signatory</p>
              </div>
            </div>
          </div>

          {/* Certification */}
          <div className="p-3">
            <p className="text-xs font-semibold mb-2">13. Certification</p>
            <p className="text-xs leading-relaxed">
              It is hereby certified, on the basis of control carried out, that the declaration 
              by the exporter is correct.
            </p>
            <div className="mt-4">
              <p className="text-xs">Place and date: _________________</p>
              <div className="mt-4">
                <p className="text-xs">Signature and stamp of certifying authority:</p>
                <div className="mt-12 text-center">
                  <p className="text-xs">(Official Stamp)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
