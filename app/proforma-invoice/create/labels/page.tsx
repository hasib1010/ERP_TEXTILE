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
  description: string;
  colour: string;
  netWeight: number;
  grossWeight: number;
  quantityDzn: number;
  quantityPcs: number;
  unitPrice: number;
  totalAmount: number;
}

const defaultLineItem: LineItem = {
  id: '',
  description: '',
  colour: 'APP',
  netWeight: 0,
  grossWeight: 0,
  quantityDzn: 0,
  quantityPcs: 0,
  unitPrice: 0,
  totalAmount: 0,
};

export default function CreateLabelsPI() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    piNo: `F R B-${new Date().getMonth() + 1}/${new Date().getFullYear()} (Draft)`,
    date: new Date().toISOString().split('T')[0],
    buyerName: '',
    buyerAddress: '',
    buyerLocation: '',
    merchandiser: '',
    styleNo: '',
    payment: 'At 90 days sight i.e; by an Irrevocable Letter of Credit in US Dollar incorporating opener\'s Export L/C Number, Payment of the proceeds at the bank presenting document should be in US Dollar in the from of F.D.D Drawn on Bangladesh.',
    delivery: '15 days, from the date of receipt of BB L/C.',
    advisingBank: 'National Bank Limited, Pagati Sarani Brance DhaKA-1230, Bangladesh.',
    negotiation: '15 (fifteen) days from the date of delivery.',
    origin: 'Bangladesh',
    swiftCode: 'NBLBBDDH098',
    binNo: '00-1199972-0102',
    hsCode: '62171000',
  });

  const [items, setItems] = useState<LineItem[]>([
    { ...defaultLineItem, id: generateId(), description: 'Care Label' },
    { ...defaultLineItem, id: generateId(), description: 'Main Label' },
  ]);

  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        
        // Auto-calculate quantityPcs from quantityDzn
        if (field === 'quantityDzn') {
          updated.quantityPcs = Number(value) * 12;
        }
        
        // Auto-calculate totalAmount
        if (field === 'quantityPcs' || field === 'unitPrice') {
          updated.totalAmount = updated.quantityPcs * updated.unitPrice;
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
        netWeight: acc.netWeight + Number(item.netWeight),
        grossWeight: acc.grossWeight + Number(item.grossWeight),
        quantityPcs: acc.quantityPcs + Number(item.quantityPcs),
        totalAmount: acc.totalAmount + Number(item.totalAmount),
      }),
      { netWeight: 0, grossWeight: 0, quantityPcs: 0, totalAmount: 0 }
    );
  };

  const totals = calculateTotals();

  const handleSave = () => {
    // In a real app, this would save to the database
    console.log('Saving PI:', { formData, items, totals });
    router.push('/proforma-invoice');
  };

  return (
    <div className="min-h-screen">
      <Header title="Create Proforma Invoice" subtitle="Labels & Tags" />

      <div className="p-6 space-y-6">
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between">
          <Link href="/proforma-invoice" className="btn btn-ghost">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
          <div className="flex gap-3">
            <button onClick={() => setShowPreview(!showPreview)} className="btn btn-outline">
              <Eye className="w-4 h-4" />
              {showPreview ? 'Edit Mode' : 'Preview'}
            </button>
            {showPreview && (
              <PrintPDFActions 
                contentRef={previewRef}
                documentTitle={`PI_${formData.piNo}_Labels`}
              />
            )}
            <button onClick={handleSave} className="btn btn-primary">
              <Save className="w-4 h-4" />
              Save Invoice
            </button>
          </div>
        </div>

        {showPreview ? (
          /* Preview Mode */
          <div className="document-preview animate-fade-in" ref={previewRef}>
            <div className="document-header">
              <h1 className="text-3xl font-bold">Fashion Republic (BD).</h1>
              <p className="text-sm text-slate-600">House No#16, Road No 01, Sector#10, Uttara, Dhaka-1230, Bangladesh.</p>
              <p className="text-sm text-slate-600">(Mail:fashionrepublic@gmail.com)</p>
              <h2 className="text-xl font-semibold mt-4">Proforma Invoice</h2>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
              <div>
                <p className="font-semibold">{formData.buyerName || '[Buyer Name]'}</p>
                <p>{formData.buyerAddress || '[Address]'}</p>
                <p>{formData.buyerLocation || '[Location]'}</p>
              </div>
              <div className="text-right">
                <p><span className="font-semibold">Date:</span> {formData.date}</p>
                <p><span className="font-semibold">Buyer:</span> LPP</p>
                <p><span className="font-semibold">P I NO:</span> {formData.piNo}</p>
                <p><span className="font-semibold">Ref:</span> {formData.merchandiser || '[Merchandiser]'}</p>
              </div>
            </div>

            <table className="document-table mb-4">
              <thead>
                <tr>
                  <th>Style No/Po Number</th>
                  <th>Description</th>
                  <th>Colour</th>
                  <th>Net Weight</th>
                  <th>Gross Weight</th>
                  <th>Qty (Dzn)</th>
                  <th>Qty (Pcs)</th>
                  <th>Unit Price (US$)</th>
                  <th>Total (US$)</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index === 0 ? formData.styleNo || '-' : ''}</td>
                    <td>{item.description}</td>
                    <td>{item.colour}</td>
                    <td className="text-right">{item.netWeight.toFixed(2)}</td>
                    <td className="text-right">{item.grossWeight}</td>
                    <td className="text-right">{item.quantityDzn.toFixed(2)}</td>
                    <td className="text-right">{item.quantityPcs}</td>
                    <td className="text-right">${item.unitPrice.toFixed(2)}</td>
                    <td className="text-right">${item.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="font-semibold bg-slate-100">
                  <td colSpan={3} className="text-right">Total</td>
                  <td className="text-right">{totals.netWeight.toFixed(2)}</td>
                  <td className="text-right">{totals.grossWeight.toFixed(0)}</td>
                  <td colSpan={2} className="text-right">{totals.quantityPcs}</td>
                  <td></td>
                  <td className="text-right">${totals.totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <p className="text-sm font-semibold mb-6">
              Total Amount (in Words): US Dollar {numberToWords(totals.totalAmount)}
            </p>

            <div className="text-sm space-y-2 border-t pt-4">
              <h4 className="font-semibold underline">Additional Terms and Condition:</h4>
              <p><span className="font-semibold">01. Payment:</span> {formData.payment}</p>
              <p><span className="font-semibold">02. Delivery:</span> {formData.delivery}</p>
              <p><span className="font-semibold">03. Advising Bank:</span> {formData.advisingBank}</p>
              <p><span className="font-semibold">04. Negotiation:</span> {formData.negotiation}</p>
              <p><span className="font-semibold">05. Original:</span> {formData.origin}</p>
              <p><span className="font-semibold">06. Swift Code:</span> {formData.swiftCode}</p>
              <p><span className="font-semibold">07. BIN NO:</span> {formData.binNo}</p>
              <p><span className="font-semibold">08. H.S.Code:</span> {formData.hsCode}</p>
            </div>

            <div className="flex justify-between mt-12 pt-8">
              <div className="text-center">
                <div className="border-t border-slate-400 w-40 mx-auto"></div>
                <p className="text-sm mt-2">Bayer Acceptance</p>
              </div>
              <div className="text-center">
                <div className="border-t border-slate-400 w-40 mx-auto"></div>
                <p className="text-sm mt-2">Authorised Signature</p>
                <p className="text-sm font-semibold">For Fashion Republic BD</p>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-6 animate-fade-in">
            {/* Basic Info */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="label">PI Number</label>
                  <input
                    type="text"
                    value={formData.piNo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, piNo: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Style No</label>
                  <input
                    type="text"
                    value={formData.styleNo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, styleNo: e.target.value }))}
                    className="input"
                    placeholder="e.g., 30SHR"
                  />
                </div>
              </div>
            </div>

            {/* Buyer Info */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Buyer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Buyer Name</label>
                  <input
                    type="text"
                    value={formData.buyerName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, buyerName: e.target.value }))}
                    className="input"
                    placeholder="M/S TROUSER WORLD (PVT) LTD."
                  />
                </div>
                <div>
                  <label className="label">Merchandiser</label>
                  <input
                    type="text"
                    value={formData.merchandiser}
                    onChange={(e) => setFormData((prev) => ({ ...prev, merchandiser: e.target.value }))}
                    className="input"
                    placeholder="Mr. Rashed / Dostogir"
                  />
                </div>
                <div>
                  <label className="label">Address</label>
                  <input
                    type="text"
                    value={formData.buyerAddress}
                    onChange={(e) => setFormData((prev) => ({ ...prev, buyerAddress: e.target.value }))}
                    className="input"
                    placeholder="Plot 1, Kunia, Jaydebpur"
                  />
                </div>
                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    value={formData.buyerLocation}
                    onChange={(e) => setFormData((prev) => ({ ...prev, buyerLocation: e.target.value }))}
                    className="input"
                    placeholder="GAZIPUR-1704, Bangladesh"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Line Items</h3>
                <button onClick={addItem} className="btn btn-outline btn-sm">
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Colour</th>
                      <th>Net Wt</th>
                      <th>Gross Wt</th>
                      <th>Qty (Dzn)</th>
                      <th>Qty (Pcs)</th>
                      <th>Unit Price ($)</th>
                      <th>Total ($)</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            className="input py-1.5"
                            placeholder="Care Label"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={item.colour}
                            onChange={(e) => updateItem(item.id, 'colour', e.target.value)}
                            className="input py-1.5 w-20"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.netWeight || ''}
                            onChange={(e) => updateItem(item.id, 'netWeight', parseFloat(e.target.value) || 0)}
                            className="input py-1.5 w-24"
                            step="0.01"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.grossWeight || ''}
                            onChange={(e) => updateItem(item.id, 'grossWeight', parseFloat(e.target.value) || 0)}
                            className="input py-1.5 w-24"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.quantityDzn || ''}
                            onChange={(e) => updateItem(item.id, 'quantityDzn', parseFloat(e.target.value) || 0)}
                            className="input py-1.5 w-28"
                            step="0.01"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.quantityPcs || ''}
                            onChange={(e) => updateItem(item.id, 'quantityPcs', parseInt(e.target.value) || 0)}
                            className="input py-1.5 w-28 bg-slate-50"
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.unitPrice || ''}
                            onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="input py-1.5 w-24"
                            step="0.01"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={formatCurrency(item.totalAmount)}
                            className="input py-1.5 w-28 bg-slate-50 font-mono"
                            readOnly
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded"
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

              {/* Totals */}
              <div className="mt-6 pt-4 border-t flex justify-end">
                <div className="w-72 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Net Weight:</span>
                    <span className="font-medium">{totals.netWeight.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Gross Weight:</span>
                    <span className="font-medium">{totals.grossWeight.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Quantity (Pcs):</span>
                    <span className="font-medium">{totals.quantityPcs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total Amount:</span>
                    <span className="text-indigo-600">{formatCurrency(totals.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Terms & Conditions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Payment Terms</label>
                  <textarea
                    value={formData.payment}
                    onChange={(e) => setFormData((prev) => ({ ...prev, payment: e.target.value }))}
                    className="input min-h-[100px]"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="label">Delivery Terms</label>
                  <input
                    type="text"
                    value={formData.delivery}
                    onChange={(e) => setFormData((prev) => ({ ...prev, delivery: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Advising Bank</label>
                  <input
                    type="text"
                    value={formData.advisingBank}
                    onChange={(e) => setFormData((prev) => ({ ...prev, advisingBank: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Negotiation</label>
                  <input
                    type="text"
                    value={formData.negotiation}
                    onChange={(e) => setFormData((prev) => ({ ...prev, negotiation: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Origin</label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData((prev) => ({ ...prev, origin: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Swift Code</label>
                  <input
                    type="text"
                    value={formData.swiftCode}
                    onChange={(e) => setFormData((prev) => ({ ...prev, swiftCode: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">BIN No</label>
                  <input
                    type="text"
                    value={formData.binNo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, binNo: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">H.S. Code</label>
                  <input
                    type="text"
                    value={formData.hsCode}
                    onChange={(e) => setFormData((prev) => ({ ...prev, hsCode: e.target.value }))}
                    className="input"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
