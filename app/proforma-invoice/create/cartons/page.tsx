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
  orderNo: string;
  measurement: string;
  cartonPly: string;
  cartonQty: number;
  netWeightKg: number;
  grossWeightKg: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

const defaultLineItem: LineItem = {
  id: '',
  orderNo: '',
  measurement: '',
  cartonPly: '7ply',
  cartonQty: 0,
  netWeightKg: 0.8,
  grossWeightKg: 0,
  unit: 'PCS',
  unitPrice: 0,
  totalPrice: 0,
};

export default function CreateCartonsPI() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    piNo: `F R B-${new Date().getMonth() + 1}/${new Date().getFullYear()} (Draft)`,
    date: new Date().toISOString().split('T')[0],
    buyerName: '',
    buyerAddress: '',
    buyerLocation: '',
    merchandiser: '',
    payment: 'At 90 days sight i.e; by an Irrevocable Letter of Credit in US Dollar incorporating opener\'s Export L/C Number, Payment of the proceeds at the bank presenting document should be in US Dollar in the from of F.D.D Drawn on Bangladesh.',
    delivery: '15 days, from the date of receipt of BB L/C.',
    advisingBank: 'National bank limited pragati sarani branch Dhaka,1230,Bangladesh,',
    negotiation: '15(fifteen) days from the date of delivery.',
    origin: 'Bangladesh',
    swiftCode: 'NBLBBDDH098',
    binNo: '00-1199972-0102',
    hsCode: '62171000',
  });

  const [items, setItems] = useState<LineItem[]>([
    { ...defaultLineItem, id: generateId(), orderNo: '', measurement: 'L - 40 X W - 30 X H - 28 cm', cartonPly: '7ply' },
    { ...defaultLineItem, id: generateId(), orderNo: '', measurement: 'Top Bottoms 35x25 cm', cartonPly: '3ply' },
  ]);

  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        
        // Auto-calculate grossWeight
        if (field === 'cartonQty' || field === 'netWeightKg') {
          updated.grossWeightKg = Number(updated.cartonQty) * Number(updated.netWeightKg);
        }
        
        // Auto-calculate totalPrice
        if (field === 'grossWeightKg' || field === 'unitPrice') {
          updated.totalPrice = updated.grossWeightKg * updated.unitPrice;
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
        cartonQty: acc.cartonQty + item.cartonQty,
        grossWeight: acc.grossWeight + item.grossWeightKg,
        totalAmount: acc.totalAmount + item.totalPrice,
      }),
      { cartonQty: 0, grossWeight: 0, totalAmount: 0 }
    );
  };

  const totals = calculateTotals();

  const handleSave = () => {
    console.log('Saving Cartons PI:', { formData, items, totals });
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
                documentTitle={`PI_${formData.piNo}_Cartons`}
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
                <h1 className="text-3xl font-bold text-slate-900">Fashion Republic (BD).</h1>
                <p className="text-sm text-slate-600 mt-1">
                  House No#16, Road No 01, Sector#10, Uttara, Dhaka-1230, Bangladesh.
                </p>
                <p className="text-sm text-slate-600">(Mail:fashionrepublic@gmail.com)</p>
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
                  <p><span className="font-semibold">Date:</span> {new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                  <p><span className="font-semibold">Buyer:</span> {formData.buyerName?.split(' ')[0] || 'LIDIL'}</p>
                  <p><span className="font-semibold">Merchandiser:</span> {formData.merchandiser || 'Name'}</p>
                  <p><span className="font-semibold">PI NO:</span> {formData.piNo}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="document-table">
                <thead>
                  <tr>
                    <th>ORDER NO</th>
                    <th>CARTOON MEASURMENT</th>
                    <th>CARTON PLY</th>
                    <th>CARTON QTY</th>
                    <th>NET WEIGHT/ KG</th>
                    <th>GROSS WEIGHT/ KG</th>
                    <th>UNIT</th>
                    <th>UNIT PRICE</th>
                    <th>TOTAL PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.orderNo || '-'}</td>
                      <td>{item.measurement}</td>
                      <td>{item.cartonPly}</td>
                      <td className="text-right">{item.cartonQty.toLocaleString()}</td>
                      <td className="text-right">{item.netWeightKg.toFixed(1)}</td>
                      <td className="text-right">{item.grossWeightKg.toFixed(2)}</td>
                      <td>{item.unit}</td>
                      <td className="text-right">$ {item.unitPrice.toFixed(2)}</td>
                      <td className="text-right">$ {item.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-slate-50">
                    <td colSpan={3} className="text-right">Total</td>
                    <td className="text-right">{totals.cartonQty.toLocaleString()}</td>
                    <td></td>
                    <td className="text-right">{totals.grossWeight.toFixed(2)}</td>
                    <td></td>
                    <td colSpan={1} className="text-right">Total</td>
                    <td className="text-right">$ {totals.totalAmount.toFixed(2)}</td>
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
                <div className="space-y-1">
                  <p><span className="font-semibold">01.Payment</span> {formData.payment}</p>
                  <p><span className="font-semibold">02.Delivery</span> {formData.delivery}</p>
                  <p><span className="font-semibold">03.Advising Bank</span> {formData.advisingBank}</p>
                  <p><span className="font-semibold">04.Negotiation</span> {formData.negotiation}</p>
                  <p><span className="font-semibold">05.Original</span> {formData.origin}</p>
                  <p><span className="font-semibold">06.Swift Code:</span> {formData.swiftCode}</p>
                  <p><span className="font-semibold">07.BIN NO :</span> {formData.binNo}</p>
                  <p><span className="font-semibold">H.S.Code</span> {formData.hsCode}</p>
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
                    <p className="text-sm font-semibold">For Fashion Republic BD</p>
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
              <p className="text-sm text-slate-500">Cartons (Fashion Republic)</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="e.g., Knit Bazaar (Pvt) Ltd."
                    value={formData.buyerName}
                    onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Merchandiser</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., Mr.Awal/Amir"
                    value={formData.merchandiser}
                    onChange={(e) => setFormData({ ...formData, merchandiser: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Address</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., Plot 40/41, Vadam, Tongi, Gazipur."
                    value={formData.buyerAddress}
                    onChange={(e) => setFormData({ ...formData, buyerAddress: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Location</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., Bangladesh."
                    value={formData.buyerLocation}
                    onChange={(e) => setFormData({ ...formData, buyerLocation: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Carton Items</h3>
                <button onClick={addItem} className="btn btn-outline btn-sm">
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="w-24">Order No</th>
                      <th>Measurement</th>
                      <th className="w-20">Ply</th>
                      <th className="w-24">Qty</th>
                      <th className="w-24">Net Wt/KG</th>
                      <th className="w-28">Gross Wt/KG</th>
                      <th className="w-16">Unit</th>
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
                            value={item.orderNo}
                            onChange={(e) => updateItem(item.id, 'orderNo', e.target.value)}
                            placeholder="537014"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input input-sm"
                            value={item.measurement}
                            onChange={(e) => updateItem(item.id, 'measurement', e.target.value)}
                            placeholder="L - 40 X W - 30 X H - 28 cm"
                          />
                        </td>
                        <td>
                          <select
                            className="select select-sm"
                            value={item.cartonPly}
                            onChange={(e) => updateItem(item.id, 'cartonPly', e.target.value)}
                          >
                            <option value="3ply">3ply</option>
                            <option value="5ply">5ply</option>
                            <option value="7ply">7ply</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="input input-sm text-right"
                            value={item.cartonQty || ''}
                            onChange={(e) => updateItem(item.id, 'cartonQty', parseInt(e.target.value) || 0)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.1"
                            className="input input-sm text-right"
                            value={item.netWeightKg || ''}
                            onChange={(e) => updateItem(item.id, 'netWeightKg', parseFloat(e.target.value) || 0)}
                          />
                        </td>
                        <td className="font-mono text-right text-sm">
                          {item.grossWeightKg.toFixed(2)}
                        </td>
                        <td>
                          <select
                            className="select select-sm"
                            value={item.unit}
                            onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                          >
                            <option value="PCS">PCS</option>
                            <option value="KG">KG</option>
                          </select>
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
                          {formatCurrency(item.totalPrice)}
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
                    <label className="label">04. Negotiation</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.negotiation}
                      onChange={(e) => setFormData({ ...formData, negotiation: e.target.value })}
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
                    <label className="label">07. BIN NO</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.binNo}
                      onChange={(e) => setFormData({ ...formData, binNo: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">H.S. Code</label>
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
                  <span className="text-slate-500">Total Cartons</span>
                  <span className="font-mono">{totals.cartonQty.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gross Weight</span>
                  <span className="font-mono">{totals.grossWeight.toFixed(2)} KG</span>
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
