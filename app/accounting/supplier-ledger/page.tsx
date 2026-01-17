'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  Search,
  Plus,
  Truck,
  DollarSign,
  TrendingDown,
  Eye,
  FileText,
  MapPin,
  X,
  Building2,
} from 'lucide-react';
import { supplierLedgers } from '@/data/mockData';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { SupplierLedger } from '@/lib/types';

export default function SupplierLedgerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierLedger | null>(null);

  const filteredSuppliers = supplierLedgers.filter(
    (supplier) =>
      supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.supplierId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPayables = supplierLedgers.reduce((sum, s) => sum + s.balance, 0);
  const totalSuppliers = supplierLedgers.length;
  const avgBalance = totalPayables / totalSuppliers || 0;

  return (
    <div className="min-h-screen">
      <Header title="Supplier Ledger" subtitle="Manage supplier accounts and payment obligations" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Suppliers</p>
                <p className="text-2xl font-bold text-slate-900">{totalSuppliers}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Payables</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalPayables)}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Avg. Balance</p>
                <p className="text-2xl font-bold text-amber-600">{formatCurrency(avgBalance)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-72"
            />
          </div>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Add Supplier
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supplier List */}
          <div className="lg:col-span-2 card">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Address</th>
                    <th>Entries</th>
                    <th>Balance</th>
                    <th className="w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      className={cn(
                        'cursor-pointer group',
                        selectedSupplier?.id === supplier.id && 'bg-emerald-50'
                      )}
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{supplier.supplierName}</p>
                            <p className="text-xs text-slate-500">{supplier.supplierId}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          <p className="text-slate-600 truncate max-w-[200px]">{supplier.supplierAddress}</p>
                        </div>
                      </td>
                      <td>
                        <span className="font-mono">{supplier.entries.length}</span>
                      </td>
                      <td>
                        <span className={cn(
                          'font-mono font-medium',
                          supplier.balance > 0 ? 'text-red-600' : 'text-slate-600'
                        )}>
                          {formatCurrency(supplier.balance)}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSupplier(supplier);
                          }}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Supplier Details Panel */}
          <div className="card">
            {selectedSupplier ? (
              <div>
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Supplier Details</h3>
                  <button
                    onClick={() => setSelectedSupplier(null)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  {/* Supplier Info */}
                  <div className="text-center pb-4 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                      <Building2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">{selectedSupplier.supplierName}</h4>
                    <p className="text-sm text-slate-500">{selectedSupplier.supplierId}</p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                      <span className="text-slate-600">{selectedSupplier.supplierAddress}</span>
                    </div>
                  </div>

                  {/* Balance Info */}
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Amount Due</span>
                      <span className={cn(
                        'font-mono font-bold text-lg',
                        selectedSupplier.balance > 0 ? 'text-red-600' : 'text-emerald-600'
                      )}>
                        {formatCurrency(selectedSupplier.balance)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Total Debit</span>
                      <span className="font-mono text-red-600">{formatCurrency(selectedSupplier.totalDebit)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Total Credit</span>
                      <span className="font-mono text-emerald-600">{formatCurrency(selectedSupplier.totalCredit)}</span>
                    </div>
                  </div>

                  {/* Transaction History */}
                  <div>
                    <h5 className="font-medium text-slate-900 mb-3">Recent Transactions</h5>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {selectedSupplier.entries?.slice(0, 10).map((entry, index) => (
                        <div
                          key={entry.id || index}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {entry.particulars}
                            </p>
                            <p className="text-xs text-slate-500">{formatDate(entry.date)}</p>
                          </div>
                          <span className={cn(
                            'font-mono font-medium',
                            entry.credit > 0 ? 'text-emerald-600' : 'text-red-600'
                          )}>
                            {entry.credit > 0 ? '-' : '+'}{formatCurrency(entry.debit || entry.credit)}
                          </span>
                        </div>
                      ))}
                      {(!selectedSupplier.entries || selectedSupplier.entries.length === 0) && (
                        <p className="text-center text-sm text-slate-500 py-4">No transactions yet</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex gap-2">
                    <button className="btn btn-primary flex-1">
                      <Plus className="w-4 h-4" />
                      Make Payment
                    </button>
                    <button className="btn btn-outline">
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Truck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Select a supplier to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
