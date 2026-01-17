'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import PrintPDFActions from '@/components/ui/PrintPDFActions';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Eye,
  Calculator,
} from 'lucide-react';
import { generateId, formatCurrency, numberToWords } from '@/lib/utils';

interface LineItem {
  id: string;
  styleNo: string;
  description: string;
  gsm: string;
  width: string;
  colour: string;
  netWeightKg: number;
  grossWeightKg: number;
  quantityYds: number;
  unitPrice: number;
  totalAmount: number;
}

const defaultLineItem: LineItem = {
  id: '',
  styleNo: '',
  description: '',
  gsm: '115-120',
  width: '56/57"',
  colour: '',
  netWeightKg: 0,
  grossWeightKg: 0,
  quantityYds: 0,
  unitPrice: 0,
  totalAmount: 0,
};

export default function CreateFabricPI() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    piNo: `MT-${new Date().getMonth() + 1}/${new Date().getFullYear().toString().slice(-2)} SP (Draft)`,
    date: new Date().toISOString().split('T')[0],
    buyerName: '',
    buyerAddress: '',
    buyerLocation: '',
    payee: '',
    merchandiser: '',
    payment: 'At 90 days sight i.e; by an Irrevocable Letter of Credit in US Dollar incorporating opener\'s Export L/C Number, Payment of the proceeds at the bank presenting document should be in US Dollar in the from of F.D.D Drawn on Bangladesh.',
    delivery: '15 days, from the date of receipt of BB L/C.',
    advisingBank: 'National Bank Limited, Pagati Sarani Brance DhaKA-1230, Bangladesh.',
    vatNo: '',
    origin: 'Bangladesh',
    swiftCode: 'NBLBBDDH098',
    hsCode: '5209.31.00',
  });

  const [items, setItems] = useState<LineItem[]>([
    { ...defaultLineItem, id: generateId(), styleNo: '', description: 'TC HERRINGBONE', gsm: '115-120', colour: 'NAVY BLUE' },
    { ...defaultLineItem, id: generateId(), styleNo: '', description: 'TC HERRINGBONE', gsm: '115-120', colour: 'BLACK' },
  ]);

  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        
        // Auto-calculate totalAmount
        if (field === 'quantityYds' || field === 'unitPrice') {
          updated.totalAmount = updated.quantityYds * updated.unitPrice;
        }
        
        return updated;
      })
    );
  };

  const addItem = () => {
    setItems((prev) => [...prev, { ...defaultLineItem, id: generateId() }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const calculateTotals = () => {
    return items.reduce(
      (acc, item) => ({
        netWeight: acc.netWeight + item.netWeightKg,
        grossWeight: acc.grossWeight + item.grossWeightKg,
        quantityYds: acc.quantityYds + item.quantityYds,
        totalAmount: acc.totalAmount + item.totalAmount,
      }),
      { netWeight: 0, grossWeight: 0, quantityYds: 0, totalAmount: 0 }
    );
  };

  const totals = calculateTotals();

  const handleSave = () => {
    console.log('Saving Fabric PI:', { formData, items, totals });
    router.push('/proforma-invoice');
  };

  if (showPreview) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowPreview(false)}
              className="btn btn-outline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Edit
            </button>
            <div className="flex gap-3">
              <PrintPDFActions 
                contentRef={previewRef}
                documentTitle={`PI_${formData.piNo}_Fabric`}
              />
              <button className="btn btn-primary" onClick={handleSave}>
                <Save className="w-4 h-4" />
                Save Invoice
              </button>
            </div>
          </div>

          {/* Document Preview */}
          <div className="max-w-4xl mx-auto" ref={previewRef}>
            <div className="document-preview">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Moon Textile.</h1>
                <p className="text-sm text-slate-600 mt-1">
                  House No#16, Road No 01, Sector#10, Uttara, Dhaka-1230, Bangladesh.
                </p>
                <p className="text-sm text-slate-600">(Mail:moontex011@gmail.com)</p>
                <h2 className="text-xl font-semibold text-slate-800 mt-4">Proforma Invoice</h2>
              </div>

              {/* Buyer & Invoice Info */}
              <div className="flex justify-between mb-6 text-sm">
                <div>
                  <p className="font-bold">{formData.buyerName || 'BUYER NAME'}</p>
                  <p>{formData.buyerAddress || 'Address'}</p>
                  <p>{formData.buyerLocation || 'Location'}</p>
                </div>
                <div className="text-right">
                  <p><span className="font-semibold">PI NO:</span> {formData.piNo}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</p>
                  <p><span className="font-semibold">Buyer:</span> {formData.payee || 'Payee'}</p>
                  <p><span className="font-semibold">Merchandiser:</span> {formData.merchandiser || 'Name'}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="document-table">
                <thead>
                  <tr>
                    <th>Style.No</th>
                    <th>Description</th>
                    <th>Width</th>
                    <th>Colour</th>
                    <th>Net Weight (KG)</th>
                    <th>Gross Weight (KG)</th>
                    <th>Quantity (In Yds)</th>
                    <th>Unit Price (In US $)</th>
                    <th>Total Amount (In US$)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.styleNo || '-'}</td>
                      <td>{item.description} ({item.gsm} GSM)</td>
                      <td>{item.width}</td>
                      <td>{item.colour}</td>
                      <td className="text-right">{item.netWeightKg.toFixed(1)}</td>
                      <td className="text-right">{item.grossWeightKg.toFixed(1)}</td>
                      <td className="text-right">{item.quantityYds.toLocaleString()}</td>
                      <td className="text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="text-right">${item.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-slate-50">
                    <td colSpan={4} className="text-right">Total</td>
                    <td className="text-right">{totals.netWeight.toFixed(1)}</td>
                    <td className="text-right">{totals.grossWeight.toFixed(1)}</td>
                    <td className="text-right">{totals.quantityYds.toLocaleString()} Yds</td>
                    <td></td>
                    <td className="text-right">${totals.totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Amount in Words */}
              <p className="mt-4 text-sm">
                <span className="font-semibold underline">Total Amount(in Words): US Dollar:</span>{' '}
                {numberToWords(totals.totalAmount)} Only.
              </p>

              {/* Terms */}
              <div className="mt-6 text-sm">
                <p className="font-semibold underline mb-2">Additional Terms and Condition:</p>
                <div className="grid grid-cols-[140px_1fr] gap-y-1">
                  <span className="font-semibold">01.Payment :</span>
                  <span>{formData.payment}</span>
                  <span className="font-semibold">02.Delivery :</span>
                  <span>{formData.delivery}</span>
                  <span className="font-semibold">03.Advising Bank :</span>
                  <span>{formData.advisingBank}</span>
                  <span className="font-semibold">04.Vat No :</span>
                  <span>{formData.vatNo}</span>
                  <span className="font-semibold">05.Original :</span>
                  <span>{formData.origin}</span>
                  <span className="font-semibold">06.Swift Code :</span>
                  <span>{formData.swiftCode}</span>
                  <span className="font-semibold">07. HS Code :</span>
                  <span>{formData.hsCode}</span>
                </div>
              </div>

              {/* Signatures */}
              <div className="flex justify-between mt-16">
                <div className="text-center">
                  <div className="border-t border-slate-400 pt-2 w-48">
                    <p className="text-sm">Buyer Acceptance</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="border-t border-slate-400 pt-2 w-48">
                    <p className="text-sm">Authorised Signature</p>
                    <p className="text-sm font-semibold">For Moon TextileMills,</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/proforma-invoice" className="btn btn-ghost">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Create Proforma Invoice</h1>
              <p className="text-sm text-slate-500">Fabric (Moon Textile)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowPreview(true)} className="btn btn-outline">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              <Save className="w-4 h-4" />
              Save Draft
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label">PI Number</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.piNo}
                    onChange={(e) => setFormData({ ...formData, piNo: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Date</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Payee</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter payee name"
                    value={formData.payee}
                    onChange={(e) => setFormData({ ...formData, payee: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Buyer Information */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Buyer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Buyer Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., TROUSER WORLD (PVT) LTD."
                    value={formData.buyerName}
                    onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Merchandiser</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., Mr.Shahin"
                    value={formData.merchandiser}
                    onChange={(e) => setFormData({ ...formData, merchandiser: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Address</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., PLOT#378/1, KUNIA, JAYDEBPUR,"
                    value={formData.buyerAddress}
                    onChange={(e) => setFormData({ ...formData, buyerAddress: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Location</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., GAZIPUR, BANGLADESH."
                    value={formData.buyerLocation}
                    onChange={(e) => setFormData({ ...formData, buyerLocation: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Fabric Items</h3>
                <button onClick={addItem} className="btn btn-outline btn-sm">
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="w-24">Style No</th>
                      <th>Description</th>
                      <th className="w-24">GSM</th>
                      <th className="w-20">Width</th>
                      <th className="w-24">Colour</th>
                      <th className="w-24">Net Wt (KG)</th>
                      <th className="w-28">Gross Wt (KG)</th>
                      <th className="w-24">Qty (Yds)</th>
                      <th className="w-24">Unit Price</th>
                      <th className="w-28">Total</th>
                      <th className="w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="text"
                            className="input input-sm"
                            value={item.styleNo}
                            onChange={(e) => updateItem(item.id, 'styleNo', e.target.value)}
                            placeholder="2025-2195"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input input-sm"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder="TC HERRINGBONE"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input input-sm"
                            value={item.gsm}
                            onChange={(e) => updateItem(item.id, 'gsm', e.target.value)}
                            placeholder="115-120"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input input-sm"
                            value={item.width}
                            onChange={(e) => updateItem(item.id, 'width', e.target.value)}
                            placeholder="56/57&quot;"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input input-sm"
                            value={item.colour}
                            onChange={(e) => updateItem(item.id, 'colour', e.target.value)}
                            placeholder="NAVY BLUE"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="input input-sm text-right"
                            value={item.netWeightKg || ''}
                            onChange={(e) => updateItem(item.id, 'netWeightKg', parseFloat(e.target.value) || 0)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="input input-sm text-right"
                            value={item.grossWeightKg || ''}
                            onChange={(e) => updateItem(item.id, 'grossWeightKg', parseFloat(e.target.value) || 0)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="input input-sm text-right"
                            value={item.quantityYds || ''}
                            onChange={(e) => updateItem(item.id, 'quantityYds', parseInt(e.target.value) || 0)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.01"
                            className="input input-sm text-right"
                            value={item.unitPrice || ''}
                            onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          />
                        </td>
                        <td className="font-mono text-right">
                          {formatCurrency(item.totalAmount)}
                        </td>
                        <td>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="btn btn-ghost btn-sm text-red-500 hover:text-red-700"
                            disabled={items.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Terms & Conditions</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="label">01. Payment</label>
                  <textarea
                    className="input min-h-[80px]"
                    value={formData.payment}
                    onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">02. Delivery</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.delivery}
                      onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">03. Advising Bank</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.advisingBank}
                      onChange={(e) => setFormData({ ...formData, advisingBank: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">04. VAT No</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g., 000977203-0306"
                      value={formData.vatNo}
                      onChange={(e) => setFormData({ ...formData, vatNo: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">05. Origin</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">06. Swift Code</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.swiftCode}
                      onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">07. HS Code</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.hsCode}
                      onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <div className="card p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Invoice Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Items</span>
                  <span className="font-medium">{items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Quantity</span>
                  <span className="font-mono">{totals.quantityYds.toLocaleString()} Yds</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Net Weight</span>
                  <span className="font-mono">{totals.netWeight.toFixed(1)} KG</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gross Weight</span>
                  <span className="font-mono">{totals.grossWeight.toFixed(1)} KG</span>
                </div>
                <hr className="border-slate-200" />
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Total Amount</span>
                  <span className="text-xl font-bold text-indigo-600 font-mono">
                    {formatCurrency(totals.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">Amount in Words:</p>
                <p className="text-sm font-medium text-slate-700">
                  {numberToWords(totals.totalAmount)} Only
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <button onClick={() => setShowPreview(true)} className="btn btn-outline w-full">
                  <Eye className="w-4 h-4" />
                  Preview Document
                </button>
                <button className="btn btn-primary w-full" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                  Save Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
