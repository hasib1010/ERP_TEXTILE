'use client';

import React from 'react';
import { numberToWords } from '@/lib/utils';
import type { LetterOfCredit, ProformaInvoice } from '@/lib/types';

interface BeneficiaryCertificateDocumentProps {
  lc: LetterOfCredit;
  pi?: ProformaInvoice | null;
}

export default function BeneficiaryCertificateDocument({ lc, pi }: BeneficiaryCertificateDocumentProps) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const totals = (pi as any)?.totals || { totalAmount: lc.amount };

  return (
    <div className="bg-white p-8 text-black" style={{ fontFamily: 'Times New Roman, serif', fontSize: '12px' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{lc.beneficiary}</h1>
        <p className="text-sm">House No#16, Road No 01, Sector#10, Uttara, Dhaka-1230, Bangladesh.</p>
        <p className="text-sm">Email: fashionrepublic@gmail.com</p>
      </div>

      {/* Document Title */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold underline">BENEFICIARY CERTIFICATE</h2>
      </div>

      {/* Reference Details */}
      <div className="mb-6 text-sm">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-semibold w-40">Date:</td>
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
            <tr>
              <td className="font-semibold">L/C Value:</td>
              <td>USD {lc.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td className="font-semibold">Invoice No:</td>
              <td>{lc.lcNo}/CI</td>
            </tr>
            <tr>
              <td className="font-semibold">Invoice Value:</td>
              <td>USD {(totals.totalAmount || lc.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Certificate Content */}
      <div className="space-y-6 text-justify leading-relaxed">
        <p>
          This is to certify that we, <span className="font-bold">{lc.beneficiary}</span>, 
          are the Beneficiary of the above mentioned Letter of Credit.
        </p>

        <p>
          We hereby certify that:
        </p>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            The goods covered by this shipment are of <span className="font-bold">BANGLADESH</span> origin 
            and are manufactured by us.
          </li>
          <li>
            The goods shipped are in accordance with the terms and conditions of the Letter of Credit 
            No. <span className="font-bold">{lc.lcNo}</span> dated <span className="font-bold">{formatDate(lc.dateOfOpening)}</span> 
            opened by <span className="font-bold">{lc.issuingBank}</span>.
          </li>
          <li>
            The total invoice value is <span className="font-bold">USD {(totals.totalAmount || lc.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span> 
            (US Dollars {numberToWords(totals.totalAmount || lc.amount)} Only).
          </li>
          <li>
            We have not received any payment from any source against this shipment other than 
            the negotiating bank.
          </li>
          <li>
            One set of non-negotiable documents have been sent directly to the applicant.
          </li>
          <li>
            The goods are being shipped from <span className="font-bold">{lc.portOfLoading}</span> to 
            <span className="font-bold"> {lc.portOfDischarge}</span>.
          </li>
        </ol>

        <p className="mt-8">
          This certificate is issued at the request of the applicant and in compliance with the 
          terms of the Letter of Credit.
        </p>
      </div>

      {/* Signature */}
      <div className="flex justify-end mt-16">
        <div className="text-center">
          <div className="border-t border-black pt-2 px-12 mt-16">
            <p className="font-semibold">For {lc.beneficiary}</p>
            <p className="text-sm text-gray-600">Authorized Signature</p>
          </div>
        </div>
      </div>

      {/* Stamp Area */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>(Company Seal)</p>
      </div>
    </div>
  );
}
