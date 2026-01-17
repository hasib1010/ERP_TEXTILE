'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  FileText,
  Download,
  Landmark,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { allLettersOfCredit, allProformaInvoices } from '@/data/mockData';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';

export default function LCManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLCs, setSelectedLCs] = useState<string[]>([]);

  const filteredLCs = allLettersOfCredit.filter((lc) => {
    const matchesSearch =
      lc.lcNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lc.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lc.beneficiary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelect = (id: string) => {
    setSelectedLCs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedLCs.length === filteredLCs.length) {
      setSelectedLCs([]);
    } else {
      setSelectedLCs(filteredLCs.map((lc) => lc.id));
    }
  };

  // Calculate stats
  const totalLCs = allLettersOfCredit.length;
  const activeLCs = allLettersOfCredit.filter((lc) => lc.status === 'active').length;
  const completedLCs = allLettersOfCredit.filter((lc) => lc.status === 'completed').length;
  const totalValue = allLettersOfCredit.reduce((sum, lc) => sum + lc.amount, 0);

  const getDocumentCount = (lc: typeof allLettersOfCredit[0]) => {
    return Object.values(lc.documents).filter(Boolean).length;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">LC Management</h1>
            <p className="text-slate-500 mt-1">Manage Letters of Credit and auto-generate documents</p>
          </div>
          <Link href="/lc-management/create" className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Create New LC
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="stat-value">{totalLCs}</p>
                <p className="stat-label">Total LCs</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="stat-value">{activeLCs}</p>
                <p className="stat-label">Active</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="stat-value">{completedLCs}</p>
                <p className="stat-label">Completed</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="stat-value">{formatCurrency(totalValue)}</p>
                <p className="stat-label">Total Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="card p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by LC No, Buyer, or Beneficiary..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select
                className="select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="btn btn-outline">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* LC List */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-12">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                      checked={selectedLCs.length === filteredLCs.length && filteredLCs.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>LC No</th>
                  <th>Buyer</th>
                  <th>Beneficiary</th>
                  <th>PI Reference</th>
                  <th>Amount</th>
                  <th>Opening Date</th>
                  <th>Expiry</th>
                  <th>Documents</th>
                  <th>Status</th>
                  <th className="w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLCs.map((lc) => (
                  <tr key={lc.id} className="group hover:bg-slate-50">
                    <td>
                      <input
                        type="checkbox"
                        className="rounded border-slate-300"
                        checked={selectedLCs.includes(lc.id)}
                        onChange={() => toggleSelect(lc.id)}
                      />
                    </td>
                    <td>
                      <Link
                        href={`/lc-management/${lc.id}`}
                        className="font-medium font-mono text-indigo-600 hover:text-indigo-700"
                      >
                        {lc.lcNo}
                      </Link>
                    </td>
                    <td className="max-w-[150px] truncate">{lc.buyerName}</td>
                    <td className="max-w-[150px] truncate">{lc.beneficiary}</td>
                    <td>
                      <span className="font-mono text-sm">{lc.piReference}</span>
                    </td>
                    <td className="font-mono">{formatCurrency(lc.amount)}</td>
                    <td className="text-sm">{formatDate(lc.dateOfOpening)}</td>
                    <td className="text-sm">{formatDate(lc.expiryDate)}</td>
                    <td>
                      <span className="text-sm">
                        {getDocumentCount(lc)}/6 docs
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusColor(lc.status)}`}>
                        {lc.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/lc-management/${lc.id}`}
                          className="btn btn-ghost btn-sm"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="btn btn-ghost btn-sm" title="Download All">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLCs.length === 0 && (
            <div className="text-center py-12">
              <Landmark className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No LCs found</h3>
              <p className="text-slate-500 mb-4">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating your first Letter of Credit'}
              </p>
              <Link href="/lc-management/create" className="btn btn-primary">
                <Plus className="w-4 h-4" />
                Create New LC
              </Link>
            </div>
          )}
        </div>

        {/* Selected Actions */}
        {selectedLCs.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4">
            <span className="text-sm">
              {selectedLCs.length} item{selectedLCs.length > 1 ? 's' : ''} selected
            </span>
            <div className="w-px h-6 bg-slate-700" />
            <button className="text-sm hover:text-slate-300 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download All
            </button>
            <button className="text-sm text-red-400 hover:text-red-300 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
