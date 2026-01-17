'use client';

import React, { useState, use, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import PrintPDFActions from '@/components/ui/PrintPDFActions';
import {
  BillOfExchangeDocument,
  DeliveryChallanDocument,
  CommercialInvoiceDocument,
  PackingListDocument,
  BeneficiaryCertificateDocument,
  CertificateOfOriginDocument,
} from '@/components/documents';
import {
  ArrowLeft,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  Building2,
  Calendar,
  DollarSign,
  Package,
  AlertCircle,
} from 'lucide-react';
import { allLettersOfCredit, allProformaInvoices } from '@/data/mockData';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

type DocumentType = 'bill-of-exchange' | 'delivery-challan' | 'commercial-invoice' | 'packing-list' | 'beneficiary-certificate' | 'certificate-of-origin';

export default function LCDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lc = allLettersOfCredit.find(l => l.id === id);
  const linkedPI = lc ? allProformaInvoices.find(pi => pi.piNo === lc.piReference) : null;
  const documentRef = useRef<HTMLDivElement>(null);
  
  const [activeDocument, setActiveDocument] = useState<DocumentType>('bill-of-exchange');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    lcDetails: true,
    documents: true,
  });

  if (!lc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">LC Not Found</h2>
          <Link href="/lc-management" className="text-indigo-600 hover:text-indigo-700">
            Back to LC Management
          </Link>
        </div>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const documents = [
    { id: 'bill-of-exchange', name: 'Bill of Exchange', icon: FileText },
    { id: 'delivery-challan', name: 'Delivery Challan', icon: Package },
    { id: 'commercial-invoice', name: 'Commercial Invoice', icon: DollarSign },
    { id: 'packing-list', name: 'Packing List', icon: Package },
    { id: 'beneficiary-certificate', name: 'Beneficiary Certificate', icon: CheckCircle },
    { id: 'certificate-of-origin', name: 'Certificate of Origin', icon: Building2 },
  ];

  const renderDocument = () => {
    switch (activeDocument) {
      case 'bill-of-exchange':
        return <BillOfExchangeDocument lc={lc} pi={linkedPI} />;
      case 'delivery-challan':
        return <DeliveryChallanDocument lc={lc} pi={linkedPI} />;
      case 'commercial-invoice':
        return <CommercialInvoiceDocument lc={lc} pi={linkedPI} />;
      case 'packing-list':
        return <PackingListDocument lc={lc} pi={linkedPI} />;
      case 'beneficiary-certificate':
        return <BeneficiaryCertificateDocument lc={lc} pi={linkedPI} />;
      case 'certificate-of-origin':
        return <CertificateOfOriginDocument lc={lc} pi={linkedPI} />;
      default:
        return <BillOfExchangeDocument lc={lc} pi={linkedPI} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="LC Details" subtitle={`Letter of Credit: ${lc.lcNo}`} />

      <div className="p-6 space-y-6">
        {/* Back Link */}
        <Link
          href="/lc-management"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to LC Management
        </Link>

        {/* LC Summary Card */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-900">{lc.lcNo}</h2>
                <span className={cn('badge', getStatusColor(lc.status))}>
                  {lc.status.charAt(0).toUpperCase() + lc.status.slice(1)}
                </span>
              </div>
              <p className="text-slate-600">B/B LC: {lc.bbLcNo}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-indigo-600">{formatCurrency(lc.amount)}</p>
              <p className="text-sm text-slate-500">{lc.currency}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">Issuing Bank</p>
              <p className="font-medium text-slate-900">{lc.issuingBank}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Buyer</p>
              <p className="font-medium text-slate-900">{lc.buyerName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Beneficiary</p>
              <p className="font-medium text-slate-900">{lc.beneficiary}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">PI Reference</p>
              <Link href={`/proforma-invoice/${linkedPI?.id || ''}`} className="font-medium text-indigo-600 hover:text-indigo-700">
                {lc.piReference}
              </Link>
            </div>
          </div>
        </div>

        {/* Details & Documents Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - LC Details */}
          <div className="space-y-6">
            {/* Dates Card */}
            <div className="card">
              <button
                onClick={() => toggleSection('lcDetails')}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-slate-900">Important Dates</h3>
                </div>
                {expandedSections.lcDetails ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              {expandedSections.lcDetails && (
                <div className="p-4 pt-0 space-y-3 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date of Opening</span>
                    <span className="font-medium">{formatDate(lc.dateOfOpening)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Expiry Date</span>
                    <span className="font-medium">{formatDate(lc.expiryDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipment Date</span>
                    <span className="font-medium">{formatDate(lc.shipmentDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sight Days</span>
                    <span className="font-medium">{lc.sightDays || 90} Days</span>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Card */}
            <div className="card p-4">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" />
                Shipping Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Port of Loading</span>
                  <span className="font-medium">{lc.portOfLoading}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Port of Discharge</span>
                  <span className="font-medium">{lc.portOfDischarge}</span>
                </div>
              </div>
            </div>

            {/* Documents Checklist */}
            <div className="card">
              <button
                onClick={() => toggleSection('documents')}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-slate-900">Documents Status</h3>
                </div>
                {expandedSections.documents ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              {expandedSections.documents && (
                <div className="p-4 pt-0 space-y-2 border-t border-slate-100">
                  {documents.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDocument(doc.id as DocumentType)}
                      className={cn(
                        'w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left',
                        activeDocument === doc.id
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'hover:bg-slate-50 text-slate-700'
                      )}
                    >
                      {lc.documents[doc.id.replace(/-/g, '') as keyof typeof lc.documents] ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                      )}
                      <span className="text-sm">{doc.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Document Preview */}
          <div className="xl:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">
                  {documents.find(d => d.id === activeDocument)?.name}
                </h3>
                <PrintPDFActions 
                  contentRef={documentRef}
                  documentTitle={`${lc.lcNo}_${activeDocument}`}
                  size="sm"
                />
              </div>
              <div className="p-6 bg-slate-100 min-h-[600px] overflow-auto">
                <div className="max-w-4xl mx-auto" ref={documentRef}>
                  {renderDocument()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
