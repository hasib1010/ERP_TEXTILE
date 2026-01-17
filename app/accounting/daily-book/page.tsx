'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { exportToCSV } from '@/components/ui/ReportActions';
import {
  Search,
  Plus,
  BookOpen,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Download,
  DollarSign,
} from 'lucide-react';
import { dailyBookEntries } from '@/data/mockData';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

type FilterType = 'all' | 'receipt' | 'payment' | 'journal' | 'contra';

export default function DailyBookkeepingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filteredEntries = dailyBookEntries.filter((entry) => {
    const matchesSearch =
      searchQuery === '' ||
      entry.particulars.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.accountHead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.voucherNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || entry.type === filterType;
    
    // Filter by current month
    const entryDate = new Date(entry.date);
    const matchesMonth =
      entryDate.getMonth() === currentMonth.getMonth() &&
      entryDate.getFullYear() === currentMonth.getFullYear();
    
    return matchesSearch && matchesType && matchesMonth;
  });

  // Calculate totals for current month
  const totalCredit = filteredEntries.reduce((sum, e) => sum + e.credit, 0);
  const totalDebit = filteredEntries.reduce((sum, e) => sum + e.debit, 0);
  const netBalance = totalCredit - totalDebit;

  // Group entries by date
  const groupedByDate = filteredEntries.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, typeof dailyBookEntries>);

  // Get unique account heads with totals
  const accountHeadTotals = dailyBookEntries.reduce((acc, entry) => {
    const key = entry.accountHead;
    if (!acc[key]) {
      acc[key] = { accountHead: entry.accountHead, debit: 0, credit: 0 };
    }
    acc[key].debit += entry.debit;
    acc[key].credit += entry.credit;
    return acc;
  }, {} as Record<string, { accountHead: string; debit: number; credit: number }>);

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'receipt':
        return 'bg-emerald-100 text-emerald-700';
      case 'payment':
        return 'bg-red-100 text-red-700';
      case 'journal':
        return 'bg-blue-100 text-blue-700';
      case 'contra':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Daily Bookkeeping" subtitle="Track daily transactions and vouchers" />

      <div className="p-6 space-y-6">
        {/* Month Navigator */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h2 className="text-xl font-bold text-slate-900 min-w-[200px] text-center">{monthName}</h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Credit</p>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalCredit)}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Debit</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalDebit)}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Net Balance</p>
                <p className={cn(
                  'text-2xl font-bold',
                  netBalance >= 0 ? 'text-emerald-600' : 'text-red-600'
                )}>
                  {formatCurrency(Math.abs(netBalance))}
                </p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Entries</p>
                <p className="text-2xl font-bold text-indigo-600">{filteredEntries.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by particulars, account head..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-80"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="select w-40"
            >
              <option value="all">All Types</option>
              <option value="receipt">Receipt</option>
              <option value="payment">Payment</option>
              <option value="journal">Journal</option>
              <option value="contra">Contra</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="btn btn-outline"
              onClick={() => exportToCSV(
                filteredEntries.map(e => ({
                  Date: formatDate(e.date),
                  'Voucher No': e.voucherNo,
                  Type: e.type,
                  Particulars: e.particulars,
                  'Account Head': e.accountHead,
                  Debit: e.debit,
                  Credit: e.credit,
                  Narration: e.narration,
                })),
                `daily_book_${currentMonth.toLocaleString('default', { month: 'short', year: 'numeric' })}`
              )}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="btn btn-primary">
              <Plus className="w-4 h-4" />
              Add Entry
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entries by Date */}
          <div className="lg:col-span-2 space-y-4">
            {Object.entries(groupedByDate)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([date, entries]) => {
                const dayTotal = entries.reduce(
                  (acc, e) => ({
                    debit: acc.debit + e.debit,
                    credit: acc.credit + e.credit,
                  }),
                  { debit: 0, credit: 0 }
                );

                return (
                  <div key={date} className="card overflow-hidden">
                    {/* Date Header */}
                    <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                          {new Date(date).getDate()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}
                          </p>
                          <p className="text-xs text-slate-500">{formatDate(date)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Daily Total</p>
                        <div className="flex gap-4 text-sm font-mono">
                          <span className="text-emerald-600">Cr: {formatCurrency(dayTotal.credit)}</span>
                          <span className="text-red-600">Dr: {formatCurrency(dayTotal.debit)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Entries */}
                    <div className="divide-y divide-slate-100">
                      {entries.map((entry) => (
                        <div
                          key={entry.id}
                          className="px-4 py-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-3">
                              <span className={cn(
                                'badge uppercase text-xs',
                                getTypeColor(entry.type)
                              )}>
                                {entry.type}
                              </span>
                              <span className="text-sm font-mono text-slate-500">{entry.voucherNo}</span>
                            </div>
                            <div className="flex gap-4 font-mono text-sm">
                              {entry.credit > 0 && (
                                <span className="text-emerald-600">+{formatCurrency(entry.credit)}</span>
                              )}
                              {entry.debit > 0 && (
                                <span className="text-red-600">-{formatCurrency(entry.debit)}</span>
                              )}
                            </div>
                          </div>
                          <p className="font-medium text-slate-900">{entry.particulars}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {entry.accountHead}
                            </span>
                            {entry.narration && (
                              <span className="text-xs text-slate-500">{entry.narration}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

            {Object.keys(groupedByDate).length === 0 && (
              <div className="card p-12 text-center">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No entries found for {monthName}</p>
              </div>
            )}
          </div>

          {/* Account Heads Summary */}
          <div className="space-y-4">
            <div className="card">
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Account Heads</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {Object.values(accountHeadTotals).map((item) => (
                  <div key={item.accountHead} className="p-4 hover:bg-slate-50 transition-colors">
                    <p className="font-medium text-slate-900 mb-2">{item.accountHead}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Debit</span>
                      <span className="font-mono text-red-600">{formatCurrency(item.debit)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Credit</span>
                      <span className="font-mono text-emerald-600">{formatCurrency(item.credit)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Entry Types</h3>
              <div className="space-y-3">
                {['receipt', 'payment', 'journal', 'contra'].map((type) => {
                  const count = dailyBookEntries.filter((e) => e.type === type).length;
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'badge capitalize text-xs',
                          getTypeColor(type)
                        )}>
                          {type}
                        </span>
                      </div>
                      <span className="font-mono text-slate-600">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
