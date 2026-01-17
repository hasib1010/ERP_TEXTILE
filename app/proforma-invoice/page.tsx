'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import {
  Plus,
  Search,
  Filter,
  FileText,
  Tags,
  Shirt,
  Box,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
} from 'lucide-react';
import { allProformaInvoices } from '@/data/mockData';
import { formatCurrency, formatDate, getStatusColor, cn } from '@/lib/utils';

type FilterType = 'all' | 'labels' | 'fabric' | 'cartons';

export default function ProformaInvoicePage() {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredInvoices = allProformaInvoices.filter((pi) => {
    const matchesType = filterType === 'all' || pi.type === filterType;
    const matchesSearch =
      searchQuery === '' ||
      pi.piNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pi.buyer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'labels':
        return <Tags className="w-4 h-4 text-indigo-600" />;
      case 'fabric':
        return <Shirt className="w-4 h-4 text-emerald-600" />;
      case 'cartons':
        return <Box className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredInvoices.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredInvoices.map((pi) => pi.id));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      <Header title="Proforma Invoices" subtitle="Manage all your proforma invoices" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by PI No or Buyer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-64"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="select w-40"
            >
              <option value="all">All Types</option>
              <option value="labels">Labels & Tags</option>
              <option value="fabric">Fabric</option>
              <option value="cartons">Cartons</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            {selectedItems.length > 0 && (
              <button className="btn btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
                Delete ({selectedItems.length})
              </button>
            )}
            <div className="relative group">
              <button className="btn btn-primary">
                <Plus className="w-4 h-4" />
                Create PI
              </button>
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-2">
                  <Link
                    href="/proforma-invoice/create/labels"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
                  >
                    <Tags className="w-4 h-4 text-indigo-600" />
                    Labels & Tags
                  </Link>
                  <Link
                    href="/proforma-invoice/create/fabric"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
                  >
                    <Shirt className="w-4 h-4 text-emerald-600" />
                    Fabric
                  </Link>
                  <Link
                    href="/proforma-invoice/create/cartons"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
                  >
                    <Box className="w-4 h-4 text-amber-600" />
                    Cartons
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setFilterType('all')}
            className={cn(
              'card p-4 text-left transition-all',
              filterType === 'all' ? 'ring-2 ring-indigo-500 border-indigo-500' : 'hover:border-slate-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{allProformaInvoices.length}</p>
                <p className="text-sm text-slate-500">All Invoices</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setFilterType('labels')}
            className={cn(
              'card p-4 text-left transition-all',
              filterType === 'labels' ? 'ring-2 ring-indigo-500 border-indigo-500' : 'hover:border-slate-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Tags className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {allProformaInvoices.filter((pi) => pi.type === 'labels').length}
                </p>
                <p className="text-sm text-slate-500">Labels & Tags</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setFilterType('fabric')}
            className={cn(
              'card p-4 text-left transition-all',
              filterType === 'fabric' ? 'ring-2 ring-indigo-500 border-indigo-500' : 'hover:border-slate-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Shirt className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {allProformaInvoices.filter((pi) => pi.type === 'fabric').length}
                </p>
                <p className="text-sm text-slate-500">Fabric</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setFilterType('cartons')}
            className={cn(
              'card p-4 text-left transition-all',
              filterType === 'cartons' ? 'ring-2 ring-indigo-500 border-indigo-500' : 'hover:border-slate-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Box className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {allProformaInvoices.filter((pi) => pi.type === 'cartons').length}
                </p>
                <p className="text-sm text-slate-500">Cartons</p>
              </div>
            </div>
          </button>
        </div>

        {/* Table */}
        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredInvoices.length && filteredInvoices.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th>PI No</th>
                  <th>Type</th>
                  <th>Buyer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((pi) => (
                  <tr key={pi.id} className="group">
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(pi.id)}
                        onChange={() => toggleSelectItem(pi.id)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td>
                      <Link
                        href={`/proforma-invoice/${pi.id}`}
                        className="font-medium font-mono text-indigo-600 hover:text-indigo-700"
                      >
                        {pi.piNo}
                      </Link>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(pi.type)}
                        <span className="capitalize">{pi.type}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-slate-900 truncate max-w-[200px]">{pi.buyer.name}</p>
                        <p className="text-xs text-slate-500 truncate max-w-[200px]">{pi.buyer.location}</p>
                      </div>
                    </td>
                    <td className="text-slate-600">{formatDate(pi.date)}</td>
                    <td className="font-mono font-medium">{formatCurrency(pi.totals.totalAmount)}</td>
                    <td>
                      <span className={`badge ${getStatusColor(pi.status)}`}>{pi.status}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/proforma-invoice/${pi.id}`}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No invoices found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
