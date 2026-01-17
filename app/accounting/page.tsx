'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import {
  Users,
  Truck,
  Wallet,
  BookOpen,
  Landmark,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  DollarSign,
} from 'lucide-react';
import { 
  customerLedgers, 
  supplierLedgers, 
  iouCashBooks, 
  dailyBookEntries,
  loans,
  dashboardStats
} from '@/data/mockData';
import { formatCurrency, cn } from '@/lib/utils';

export default function AccountingOverviewPage() {
  // Calculate totals
  const totalReceivables = customerLedgers.reduce((sum, c) => sum + c.balance, 0);
  const totalPayables = supplierLedgers.reduce((sum, s) => sum + s.balance, 0);
  const totalIOUBalance = iouCashBooks.reduce((sum, entry) => sum + entry.balance, 0);
  const totalLoanBalance = loans.reduce((sum, loan) => sum + loan.outstandingBalance, 0);
  
  // Calculate monthly income and expense from daily book
  const monthlyIncome = dailyBookEntries
    .filter(e => e.type === 'receipt')
    .reduce((sum, e) => sum + e.credit, 0);
  const monthlyExpense = dailyBookEntries
    .filter(e => e.type === 'payment')
    .reduce((sum, e) => sum + e.debit, 0);

  const modules = [
    {
      title: 'Customer Ledger',
      description: 'Track customer balances and payments',
      icon: Users,
      href: '/accounting/customer-ledger',
      color: 'indigo',
      stats: [
        { label: 'Total Customers', value: customerLedgers.length },
        { label: 'Total Receivables', value: formatCurrency(totalReceivables) },
      ],
    },
    {
      title: 'Supplier Ledger',
      description: 'Manage supplier accounts and payments',
      icon: Truck,
      href: '/accounting/supplier-ledger',
      color: 'emerald',
      stats: [
        { label: 'Total Suppliers', value: supplierLedgers.length },
        { label: 'Total Payables', value: formatCurrency(totalPayables) },
      ],
    },
    {
      title: 'MOI / Cash Book',
      description: 'IOU and convenience bill management',
      icon: Wallet,
      href: '/accounting/moi',
      color: 'amber',
      stats: [
        { label: 'Total Entries', value: iouCashBooks.length },
        { label: 'Current Balance', value: formatCurrency(Math.abs(totalIOUBalance)) },
      ],
    },
    {
      title: 'Daily Bookkeeping',
      description: 'Track daily income and expenses',
      icon: BookOpen,
      href: '/accounting/daily-book',
      color: 'violet',
      stats: [
        { label: 'Monthly Income', value: formatCurrency(monthlyIncome) },
        { label: 'Monthly Expense', value: formatCurrency(monthlyExpense) },
      ],
    },
    {
      title: 'Loan Management',
      description: 'Manage loans and repayments',
      icon: Landmark,
      href: '/accounting/loans',
      color: 'rose',
      stats: [
        { label: 'Active Loans', value: loans.filter(l => l.status === 'active').length },
        { label: 'Outstanding', value: formatCurrency(totalLoanBalance) },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; border: string }> = {
      indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', border: 'hover:border-indigo-300' },
      emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600', border: 'hover:border-emerald-300' },
      amber: { bg: 'bg-amber-100', icon: 'text-amber-600', border: 'hover:border-amber-300' },
      violet: { bg: 'bg-violet-100', icon: 'text-violet-600', border: 'hover:border-violet-300' },
      rose: { bg: 'bg-rose-100', icon: 'text-rose-600', border: 'hover:border-rose-300' },
    };
    return colors[color] || colors.indigo;
  };

  return (
    <div className="min-h-screen">
      <Header title="Accounting" subtitle="Financial management and bookkeeping" />

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Receivables</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(totalReceivables)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">From {customerLedgers.length} customers</p>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Payables</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(totalPayables)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">To {supplierLedgers.length} suppliers</p>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Net Position</p>
                <p className={cn(
                  'text-2xl font-bold mt-1',
                  totalReceivables - totalPayables >= 0 ? 'text-emerald-600' : 'text-red-600'
                )}>
                  {formatCurrency(Math.abs(totalReceivables - totalPayables))}
                </p>
              </div>
              <div className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center',
                totalReceivables - totalPayables >= 0 ? 'bg-emerald-100' : 'bg-red-100'
              )}>
                <DollarSign className={cn(
                  'w-6 h-6',
                  totalReceivables - totalPayables >= 0 ? 'text-emerald-600' : 'text-red-600'
                )} />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {totalReceivables - totalPayables >= 0 ? 'Net receivable' : 'Net payable'}
            </p>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Outstanding Loans</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{formatCurrency(totalLoanBalance)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <Landmark className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">{loans.filter(l => l.status === 'active').length} active loans</p>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            const colorClasses = getColorClasses(module.color);

            return (
              <Link
                key={module.title}
                href={module.href}
                className={cn('card p-6 group transition-all', colorClasses.border)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', colorClasses.bg)}>
                    <Icon className={cn('w-6 h-6', colorClasses.icon)} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-1">{module.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{module.description}</p>

                <div className="flex gap-6">
                  {module.stats.map((stat, index) => (
                    <div key={index}>
                      <p className="text-xs text-slate-400">{stat.label}</p>
                      <p className="font-semibold text-slate-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Daily Entries */}
          <div className="card">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Recent Transactions</h3>
              <Link href="/accounting/daily-book" className="text-sm text-indigo-600 hover:text-indigo-700">
                View All
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {dailyBookEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      entry.credit > 0 ? 'bg-emerald-100' : 'bg-red-100'
                    )}>
                      {entry.credit > 0 ? (
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{entry.particulars}</p>
                      <p className="text-xs text-slate-500">{entry.accountHead}</p>
                    </div>
                  </div>
                  <p className={cn(
                    'font-mono font-medium',
                    entry.credit > 0 ? 'text-emerald-600' : 'text-red-600'
                  )}>
                    {entry.credit > 0 ? '+' : '-'}{formatCurrency(entry.credit || entry.debit)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Summary */}
          <div className="card">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Active Loans</h3>
              <Link href="/accounting/loans" className="text-sm text-indigo-600 hover:text-indigo-700">
                View All
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {loans.filter(l => l.status === 'active').map((loan) => (
                <div key={loan.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-slate-900">{loan.lender}</p>
                      <p className="text-xs text-slate-500">{loan.loanType}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-medium text-slate-900">{formatCurrency(loan.outstandingBalance)}</p>
                      <p className="text-xs text-slate-500">of {formatCurrency(loan.principalAmount)}</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${((loan.principalAmount - loan.outstandingBalance) / loan.principalAmount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
