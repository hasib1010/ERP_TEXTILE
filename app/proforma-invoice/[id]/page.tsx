'use client';

import React, { useState, use, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import PrintPDFActions from '@/components/ui/PrintPDFActions';
import {
  PILabelsDocument,
  PIFabricDocument,
  PICartonsDocument,
} from '@/components/documents';
import {
  ArrowLeft,
  Edit,
  Download,
  Printer,
  FileText,
  Tags,
  Shirt,
  Box,
  Building2,
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  Send,
} from 'lucide-react';
import { allProformaInvoices } from '@/data/mockData';
import { formatCurrency, formatDate, numberToWords, getStatusColor, cn } from '@/lib/utils';
import type { PILabels, PIFabric, PICartons, ProformaInvoice } from '@/lib/types';

type ViewMode = 'details' | 'preview';

export default function PIDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [viewMode, setViewMode] = useState<ViewMode>('details');
  const previewRef = useRef<HTMLDivElement>(null);

  const pi = allProformaInvoices.find((p) => p.id === id);

  if (!pi) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header title="Proforma Invoice" subtitle="Invoice not found" />
        <div className="p-6">
          <Link
            href="/proforma-invoice"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Proforma Invoices
          </Link>
          <div className="card p-12 text-center">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Invoice Not Found</h2>
            <p className="text-slate-500">The proforma invoice you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'labels':
        return <Tags className="w-5 h-5 text-indigo-600" />;
      case 'fabric':
        return <Shirt className="w-5 h-5 text-emerald-600" />;
      case 'cartons':
        return <Box className="w-5 h-5 text-amber-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'sent':
        return <Send className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const renderPreview = (pi: ProformaInvoice) => {
    switch (pi.type) {
      case 'labels':
        return <PILabelsDocument data={pi as PILabels} />;
      case 'fabric':
        return <PIFabricDocument data={pi as PIFabric} />;
      case 'cartons':
        return <PICartonsDocument data={pi as PICartons} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title={`Proforma Invoice: ${pi.piNo}`} subtitle={`${pi.type.charAt(0).toUpperCase() + pi.type.slice(1)} Invoice`} />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/proforma-invoice"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Proforma Invoices
          </Link>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('details')}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all',
                  viewMode === 'details'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                )}
              >
                Details
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all',
                  viewMode === 'preview'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                )}
              >
                Preview
              </button>
            </div>

            <Link
              href={`/proforma-invoice/create/${pi.type}?edit=${pi.id}`}
              className="btn btn-outline"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
            <PrintPDFActions 
              contentRef={previewRef}
              documentTitle={`PI_${pi.piNo}`}
              size="md"
            />
          </div>
        </div>

        {viewMode === 'details' ? (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center',
                    pi.type === 'labels' && 'bg-indigo-100',
                    pi.type === 'fabric' && 'bg-emerald-100',
                    pi.type === 'cartons' && 'bg-amber-100'
                  )}>
                    {getTypeIcon(pi.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{pi.piNo}</h2>
                    <p className="text-slate-500 capitalize">{pi.type} Invoice</p>
                  </div>
                </div>
                <span className={cn('badge flex items-center gap-1', getStatusColor(pi.status))}>
                  {getStatusIcon(pi.status)}
                  {pi.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t">
                <div>
                  <p className="text-sm text-slate-500">Date</p>
                  <p className="font-medium text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {formatDate(pi.date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Amount</p>
                  <p className="font-medium text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    {formatCurrency(pi.totals.totalAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Vendor</p>
                  <p className="font-medium text-slate-900 capitalize">
                    {pi.vendor.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Merchandiser</p>
                  <p className="font-medium text-slate-900">{pi.merchandiser}</p>
                </div>
              </div>
            </div>

            {/* Buyer Information */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                Buyer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="font-medium text-slate-900">{pi.buyer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="font-medium text-slate-900">{pi.buyer.address}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="font-medium text-slate-900">{pi.buyer.location}</p>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Line Items
              </h3>
              <div className="table-container">
                {pi.type === 'labels' && (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Colour</th>
                        <th className="text-right">Net Wt</th>
                        <th className="text-right">Gross Wt</th>
                        <th className="text-right">Qty (Dzn)</th>
                        <th className="text-right">Qty (Pcs)</th>
                        <th className="text-right">Unit Price</th>
                        <th className="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pi as PILabels).items.map((item) => (
                        <tr key={item.id}>
                          <td className="font-medium">{item.description}</td>
                          <td>{item.colour}</td>
                          <td className="text-right font-mono">{item.netWeight.toFixed(2)}</td>
                          <td className="text-right font-mono">{item.grossWeight.toFixed(2)}</td>
                          <td className="text-right font-mono">{item.quantityDzn.toFixed(2)}</td>
                          <td className="text-right font-mono">{item.quantityPcs}</td>
                          <td className="text-right font-mono">${item.unitPrice.toFixed(4)}</td>
                          <td className="text-right font-mono font-medium">{formatCurrency(item.totalAmount)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50 font-semibold">
                        <td colSpan={2}>Total</td>
                        <td className="text-right font-mono">{pi.totals.netWeight.toFixed(2)}</td>
                        <td className="text-right font-mono">{pi.totals.grossWeight.toFixed(2)}</td>
                        <td colSpan={2}></td>
                        <td className="text-right font-mono">{pi.totals.quantityPcs}</td>
                        <td className="text-right font-mono">{formatCurrency(pi.totals.totalAmount)}</td>
                      </tr>
                    </tfoot>
                  </table>
                )}

                {pi.type === 'fabric' && (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Style No</th>
                        <th>Description</th>
                        <th>Width</th>
                        <th>Colour</th>
                        <th className="text-right">Net Wt</th>
                        <th className="text-right">Gross Wt</th>
                        <th className="text-right">Qty (Yds)</th>
                        <th className="text-right">Unit Price</th>
                        <th className="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pi as PIFabric).items.map((item) => (
                        <tr key={item.id}>
                          <td className="font-medium">{item.styleNo}</td>
                          <td>{item.description}</td>
                          <td>{item.width}</td>
                          <td>{item.colour}</td>
                          <td className="text-right font-mono">{item.netWeightKg.toFixed(2)}</td>
                          <td className="text-right font-mono">{item.grossWeightKg.toFixed(2)}</td>
                          <td className="text-right font-mono">{item.quantityYds.toFixed(2)}</td>
                          <td className="text-right font-mono">${item.unitPrice.toFixed(2)}</td>
                          <td className="text-right font-mono font-medium">{formatCurrency(item.totalAmount)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50 font-semibold">
                        <td colSpan={4}>Total</td>
                        <td className="text-right font-mono">{pi.totals.netWeight.toFixed(2)}</td>
                        <td className="text-right font-mono">{pi.totals.grossWeight.toFixed(2)}</td>
                        <td className="text-right font-mono">{pi.totals.quantityYds.toFixed(2)}</td>
                        <td></td>
                        <td className="text-right font-mono">{formatCurrency(pi.totals.totalAmount)}</td>
                      </tr>
                    </tfoot>
                  </table>
                )}

                {pi.type === 'cartons' && (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Order No</th>
                        <th>Measurement</th>
                        <th>Carton Ply</th>
                        <th className="text-right">Carton Qty</th>
                        <th className="text-right">Net Wt</th>
                        <th className="text-right">Gross Wt</th>
                        <th>Unit</th>
                        <th className="text-right">Unit Price</th>
                        <th className="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(pi as PICartons).items.map((item) => (
                        <tr key={item.id}>
                          <td className="font-medium">{item.orderNo}</td>
                          <td>{item.measurement}</td>
                          <td>{item.cartonPly}</td>
                          <td className="text-right font-mono">{item.cartonQty}</td>
                          <td className="text-right font-mono">{item.netWeightKg.toFixed(2)}</td>
                          <td className="text-right font-mono">{item.grossWeightKg.toFixed(2)}</td>
                          <td>{item.unit}</td>
                          <td className="text-right font-mono">${item.unitPrice.toFixed(2)}</td>
                          <td className="text-right font-mono font-medium">{formatCurrency(item.totalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50 font-semibold">
                        <td colSpan={3}>Total</td>
                        <td className="text-right font-mono">{pi.totals.cartonQty}</td>
                        <td colSpan={2}></td>
                        <td className="text-right font-mono">{pi.totals.grossWeight.toFixed(2)}</td>
                        <td></td>
                        <td className="text-right font-mono">{formatCurrency(pi.totals.totalAmount)}</td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                Terms & Conditions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Payment Terms</p>
                  <p className="font-medium text-slate-900">{pi.terms.payment}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Delivery Terms</p>
                  <p className="font-medium text-slate-900">{pi.terms.delivery}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Advising Bank</p>
                  <p className="font-medium text-slate-900">{pi.terms.advisingBank}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Origin</p>
                  <p className="font-medium text-slate-900">{pi.terms.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">SWIFT Code</p>
                  <p className="font-medium text-slate-900">{pi.terms.swiftCode}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">HS Code</p>
                  <p className="font-medium text-slate-900">{pi.terms.hsCode}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 bg-slate-200 rounded-lg" ref={previewRef}>
            {renderPreview(pi)}
          </div>
        )}
      </div>
    </div>
  );
}
