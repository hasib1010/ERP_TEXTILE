'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import {
  ArrowLeft,
  Save,
  FileText,
  Building2,
  Calendar,
  DollarSign,
  Ship,
  MapPin,
  CreditCard,
  User,
  Landmark,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { allProformaInvoices } from '@/data/mockData';
import { formatCurrency, formatDate, generateId } from '@/lib/utils';

export default function CreateLCPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lcNo: '',
    bbLcNo: '',
    dateOfOpening: new Date().toISOString().split('T')[0],
    issuingBank: '',
    piReference: '',
    buyerName: '',
    buyerAddress: '',
    beneficiary: 'Fashion Republic (BD)',
    beneficiaryAddress: 'Level 2, Rupayan Centre, 72 Mohakhali C/A, Dhaka - 1212, Bangladesh',
    amount: 0,
    currency: 'USD',
    expiryDate: '',
    shipmentDate: '',
    portOfLoading: 'Chittagong, Bangladesh',
    portOfDischarge: '',
    sightDays: 60,
    carrier: '',
    salesTerm: 'CFR',
  });

  const [selectedPI, setSelectedPI] = useState<string>('');

  const handlePISelect = (piId: string) => {
    const pi = allProformaInvoices.find((p) => p.id === piId);
    if (pi) {
      setSelectedPI(piId);
      setFormData((prev) => ({
        ...prev,
        piReference: pi.piNo,
        buyerName: pi.buyer.name,
        buyerAddress: `${pi.buyer.address}, ${pi.buyer.location}`,
        amount: pi.totals.totalAmount,
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' || name === 'sightDays' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log('LC Data:', { id: generateId(), ...formData });
    router.push('/lc-management');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Create Letter of Credit" subtitle="Open a new LC against a Proforma Invoice" />

      <div className="p-6">
        <Link
          href="/lc-management"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to LC Management
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PI Selection */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Select Proforma Invoice
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProformaInvoices.filter((pi) => pi.status === 'confirmed').map((pi) => (
                <button
                  key={pi.id}
                  type="button"
                  onClick={() => handlePISelect(pi.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedPI === pi.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-medium text-indigo-600">{pi.piNo}</span>
                    {selectedPI === pi.id && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                  </div>
                  <p className="text-sm font-medium text-slate-900 truncate">{pi.buyer.name}</p>
                  <p className="text-sm text-slate-500">{formatDate(pi.date)}</p>
                  <p className="text-lg font-semibold text-slate-900 mt-2">
                    {formatCurrency(pi.totals.totalAmount)}
                  </p>
                </button>
              ))}
            </div>
            {allProformaInvoices.filter((pi) => pi.status === 'confirmed').length === 0 && (
              <div className="text-center py-8 text-slate-500">
                No confirmed Proforma Invoices available. Please confirm a PI first.
              </div>
            )}
          </div>

          {/* LC Details */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              LC Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="label">LC Number</label>
                <input
                  type="text"
                  name="lcNo"
                  value={formData.lcNo}
                  onChange={handleInputChange}
                  placeholder="e.g., LC-2024-001"
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">BB LC Number</label>
                <input
                  type="text"
                  name="bbLcNo"
                  value={formData.bbLcNo}
                  onChange={handleInputChange}
                  placeholder="Bangladesh Bank LC No."
                  className="input"
                />
              </div>
              <div>
                <label className="label">Date of Opening</label>
                <input
                  type="date"
                  name="dateOfOpening"
                  value={formData.dateOfOpening}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Sight Days</label>
                <input
                  type="number"
                  name="sightDays"
                  value={formData.sightDays}
                  onChange={handleInputChange}
                  className="input"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="label">Currency</label>
                <select name="currency" value={formData.currency} onChange={handleInputChange} className="select">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
              <div>
                <label className="label">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="input pl-10"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bank Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-indigo-600" />
              Issuing Bank
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="label">Bank Name & Address</label>
                <textarea
                  name="issuingBank"
                  value={formData.issuingBank}
                  onChange={handleInputChange}
                  placeholder="Enter issuing bank name and address"
                  className="input min-h-[80px]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Buyer Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Buyer / Applicant
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Buyer Name</label>
                <input
                  type="text"
                  name="buyerName"
                  value={formData.buyerName}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">PI Reference</label>
                <input
                  type="text"
                  name="piReference"
                  value={formData.piReference}
                  onChange={handleInputChange}
                  className="input"
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Buyer Address</label>
                <textarea
                  name="buyerAddress"
                  value={formData.buyerAddress}
                  onChange={handleInputChange}
                  className="input min-h-[80px]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Beneficiary Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Beneficiary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Beneficiary Name</label>
                <input
                  type="text"
                  name="beneficiary"
                  value={formData.beneficiary}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Sales Term</label>
                <select name="salesTerm" value={formData.salesTerm} onChange={handleInputChange} className="select">
                  <option value="CFR">CFR - Cost and Freight</option>
                  <option value="CIF">CIF - Cost, Insurance and Freight</option>
                  <option value="FOB">FOB - Free on Board</option>
                  <option value="EXW">EXW - Ex Works</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label">Beneficiary Address</label>
                <textarea
                  name="beneficiaryAddress"
                  value={formData.beneficiaryAddress}
                  onChange={handleInputChange}
                  className="input min-h-[80px]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Ship className="w-5 h-5 text-indigo-600" />
              Shipment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="label">Shipment Date</label>
                <input
                  type="date"
                  name="shipmentDate"
                  value={formData.shipmentDate}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Carrier</label>
                <input
                  type="text"
                  name="carrier"
                  value={formData.carrier}
                  onChange={handleInputChange}
                  placeholder="Shipping carrier name"
                  className="input"
                />
              </div>
              <div>
                <label className="label flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Port of Loading
                </label>
                <input
                  type="text"
                  name="portOfLoading"
                  value={formData.portOfLoading}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Port of Discharge
                </label>
                <input
                  type="text"
                  name="portOfDischarge"
                  value={formData.portOfDischarge}
                  onChange={handleInputChange}
                  placeholder="e.g., Colombo, Sri Lanka"
                  className="input"
                  required
                />
              </div>
            </div>
          </div>

          {/* Documents to Generate */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Documents to Generate
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              The following documents will be automatically generated when this LC is created:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Bill of Exchange',
                'Delivery Challan',
                'Commercial Invoice',
                'Packing List',
                'Beneficiary Certificate',
                'Certificate of Origin',
              ].map((doc) => (
                <div
                  key={doc}
                  className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Link href="/lc-management" className="btn btn-outline">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={!selectedPI}>
              <Save className="w-4 h-4" />
              Create LC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
