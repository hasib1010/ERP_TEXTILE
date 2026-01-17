'use client';

import React from 'react';
import { numberToWords } from '@/lib/utils';
import type { LetterOfCredit, ProformaInvoice } from '@/lib/types';

interface BillOfExchangeDocumentProps {
  lc: LetterOfCredit;
  pi?: ProformaInvoice | null;
}

export default function BillOfExchangeDocument({ lc, pi }: BillOfExchangeDocumentProps) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const renderCopy = (copyNumber: 'FIRST' | 'SECOND') => (
    <div className="bg-white p-8 text-black mb-8 break-after-page" style={{ fontFamily: 'Times New Roman, serif', fontSize: '12px' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs text-gray-500 mb-1">{copyNumber} OF EXCHANGE</p>
        <h1 className="text-2xl font-bold tracking-wide">BILL OF EXCHANGE</h1>
      </div>

      {/* Exchange Details */}
      <div className="flex justify-between mb-6">
        <div>
          <p><span className="font-semibold">Exchange For:</span> USD {lc.amount.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p><span className="font-semibold">Dhaka, Bangladesh</span></p>
          <p><span className="font-semibold">Date:</span> {formatDate(lc.dateOfOpening)}</p>
        </div>
      </div>

      {/* Bill Content */}
      <div className="space-y-4 text-justify leading-relaxed">
        <p>
          At <span className="font-bold">{lc.sightDays || 90} Days</span> sight of this {copyNumber} of Exchange 
          ({copyNumber === 'FIRST' ? 'Second' : 'First'} of the same tenor and date unpaid) Pay to the 
          order of <span className="font-bold">{lc.beneficiary}</span>
        </p>

        <p className="font-bold text-center py-2">
          US DOLLARS {numberToWords(lc.amount).toUpperCase()} ONLY
        </p>
        <p className="text-center">
          (USD {lc.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })})
        </p>

        <p>
          Value received and charge the same to the account of Letter of Credit No. 
          <span className="font-bold"> {lc.lcNo}</span> dated <span className="font-bold">{formatDate(lc.dateOfOpening)}</span> issued by 
          <span className="font-bold"> {lc.issuingBank}</span>.
        </p>
      </div>

      {/* Drawee */}
      <div className="mt-8">
        <p className="font-semibold">To:</p>
        <p>{lc.issuingBank}</p>
        <p>{lc.buyerName}</p>
      </div>

      {/* Signature */}
      <div className="flex justify-end mt-12">
        <div className="text-center">
          <div className="border-t border-black pt-2 px-16 mt-16">
            <p className="font-semibold">For {lc.beneficiary}</p>
            <p className="text-sm text-gray-600">Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {renderCopy('FIRST')}
      {renderCopy('SECOND')}
    </div>
  );
}
