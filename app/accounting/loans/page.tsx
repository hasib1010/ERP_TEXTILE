'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  Plus,
  Landmark,
  DollarSign,
  Calendar,
  TrendingDown,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Building2,
  User,
  Percent,
} from 'lucide-react';
import { loans } from '@/data/mockData';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { Loan } from '@/lib/types';

type FilterStatus = 'all' | 'active' | 'closed' | 'defaulted';

export default function LoanManagementPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const filteredLoans = loans.filter((loan) => {
    if (filterStatus === 'all') return true;
    return loan.status === filterStatus;
  });

  // Calculate totals
  const totalPrincipal = loans.reduce((sum, l) => sum + l.principalAmount, 0);
  const totalOutstanding = loans.reduce((sum, l) => sum + l.outstandingBalance, 0);
  const totalPaid = totalPrincipal - totalOutstanding;
  const activeLoans = loans.filter(l => l.status === 'active').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'closed':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'defaulted':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-amber-100 text-amber-700';
      case 'closed':
        return 'bg-emerald-100 text-emerald-700';
      case 'defaulted':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getLoanTypeIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return <Building2 className="w-5 h-5 text-indigo-600" />;
      case 'director':
        return <User className="w-5 h-5 text-violet-600" />;
      case 'personal':
        return <User className="w-5 h-5 text-emerald-600" />;
      default:
        return <Landmark className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Loan Management" subtitle="Track and manage loans and repayments" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Landmark className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Principal</p>
                <p className="text-2xl font-bold text-indigo-600">{formatCurrency(totalPrincipal)}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Outstanding</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalOutstanding)}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Paid</p>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalPaid)}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Active Loans</p>
                <p className="text-2xl font-bold text-amber-600">{activeLoans}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filterStatus === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              All ({loans.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filterStatus === 'active' ? 'bg-amber-100 text-amber-700' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              Active ({loans.filter(l => l.status === 'active').length})
            </button>
            <button
              onClick={() => setFilterStatus('closed')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filterStatus === 'closed' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              Closed ({loans.filter(l => l.status === 'closed').length})
            </button>
            <button
              onClick={() => setFilterStatus('defaulted')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filterStatus === 'defaulted' ? 'bg-red-100 text-red-700' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              Defaulted ({loans.filter(l => l.status === 'defaulted').length})
            </button>
          </div>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Add Loan
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Loans List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredLoans.map((loan) => {
              const progress = ((loan.principalAmount - loan.outstandingBalance) / loan.principalAmount) * 100;

              return (
                <div
                  key={loan.id}
                  className={cn(
                    'card p-5 cursor-pointer transition-all hover:border-indigo-300',
                    selectedLoan?.id === loan.id && 'ring-2 ring-indigo-500 border-indigo-500'
                  )}
                  onClick={() => setSelectedLoan(loan)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-12 h-12 rounded-lg flex items-center justify-center',
                        loan.loanType === 'bank' ? 'bg-indigo-100' :
                        loan.loanType === 'director' ? 'bg-violet-100' : 'bg-emerald-100'
                      )}>
                        {getLoanTypeIcon(loan.loanType)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{loan.lender}</h3>
                        <p className="text-sm text-slate-500 capitalize">{loan.loanType} Loan</p>
                      </div>
                    </div>
                    <span className={cn('badge', getStatusColor(loan.status))}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(loan.status)}
                        {loan.status}
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500">Principal</p>
                      <p className="font-mono font-semibold">{formatCurrency(loan.principalAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Outstanding</p>
                      <p className="font-mono font-semibold text-red-600">{formatCurrency(loan.outstandingBalance)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Interest Rate</p>
                      <p className="font-mono font-semibold">{loan.interestRate}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Repayment Progress</span>
                      <span className="font-mono text-slate-700">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar className="w-4 h-4" />
                      <span>Start: {formatDate(loan.startDate)}</span>
                    </div>
                    {loan.endDate && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>End: {formatDate(loan.endDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredLoans.length === 0 && (
              <div className="card p-12 text-center">
                <Landmark className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No loans found</p>
              </div>
            )}
          </div>

          {/* Loan Details Panel */}
          <div className="card">
            {selectedLoan ? (
              <div>
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Loan Details</h3>
                  <button
                    onClick={() => setSelectedLoan(null)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  {/* Lender Info */}
                  <div className="text-center pb-4 border-b border-slate-100">
                    <div className={cn(
                      'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3',
                      selectedLoan.loanType === 'bank' ? 'bg-indigo-100' :
                      selectedLoan.loanType === 'director' ? 'bg-violet-100' : 'bg-emerald-100'
                    )}>
                      {selectedLoan.loanType === 'bank' ? (
                        <Building2 className="w-8 h-8 text-indigo-600" />
                      ) : (
                        <User className="w-8 h-8 text-violet-600" />
                      )}
                    </div>
                    <h4 className="font-semibold text-slate-900">{selectedLoan.lender}</h4>
                    <p className="text-sm text-slate-500 capitalize">{selectedLoan.loanType} Loan</p>
                    <span className={cn('badge mt-2', getStatusColor(selectedLoan.status))}>
                      {selectedLoan.status}
                    </span>
                  </div>

                  {/* Loan Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500">Principal Amount</p>
                      <p className="font-mono font-semibold text-slate-900">{formatCurrency(selectedLoan.principalAmount)}</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500">Outstanding</p>
                      <p className="font-mono font-semibold text-red-600">{formatCurrency(selectedLoan.outstandingBalance)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500">Interest Rate</p>
                      <p className="font-mono font-semibold text-slate-900 flex items-center gap-1">
                        <Percent className="w-4 h-4" />
                        {selectedLoan.interestRate}%
                      </p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500">Total Paid</p>
                      <p className="font-mono font-semibold text-emerald-600">
                        {formatCurrency(selectedLoan.principalAmount - selectedLoan.outstandingBalance)}
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">Start Date</span>
                      <span className="font-medium">{formatDate(selectedLoan.startDate)}</span>
                    </div>
                    {selectedLoan.endDate && (
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">End Date</span>
                        <span className="font-medium">{formatDate(selectedLoan.endDate)}</span>
                      </div>
                    )}
                  </div>

                  {/* Repayment Schedule */}
                  {selectedLoan.repayments && selectedLoan.repayments.length > 0 && (
                    <div>
                      <h5 className="font-medium text-slate-900 mb-3">Repayment History</h5>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {selectedLoan.repayments.map((payment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                          >
                            <div>
                              <p className="text-sm font-medium text-slate-900">
                                Payment #{index + 1}
                              </p>
                              <p className="text-xs text-slate-500">{formatDate(payment.date)}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono font-medium text-emerald-600">
                                {formatCurrency(payment.amount)}
                              </p>
                              <span className="text-xs text-slate-500">
                                P: {formatCurrency(payment.principal)} | I: {formatCurrency(payment.interest)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex gap-2">
                    <button className="btn btn-primary flex-1">
                      <Plus className="w-4 h-4" />
                      Record Payment
                    </button>
                    <button className="btn btn-outline">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Landmark className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Select a loan to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
