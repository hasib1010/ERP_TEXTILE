'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { exportToCSV } from '@/components/ui/ReportActions';
import {
  Search,
  Plus,
  Download,
  Users,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  User,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { iouCashBooks } from '@/data/mockData';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

export default function MOICashBookPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPersons, setExpandedPersons] = useState<string[]>([]);

  // Filter persons by search
  const filteredPersons = iouCashBooks.filter((person) =>
    searchQuery === '' ||
    person.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.personId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate totals across all persons
  const totals = iouCashBooks.reduce(
    (acc, person) => {
      const personDebits = person.entries.reduce((sum, e) => sum + e.debit, 0);
      const personCredits = person.entries.reduce((sum, e) => sum + e.credit, 0);
      return {
        totalDebits: acc.totalDebits + personDebits,
        totalCredits: acc.totalCredits + personCredits,
        totalBalance: acc.totalBalance + person.balance,
      };
    },
    { totalDebits: 0, totalCredits: 0, totalBalance: 0 }
  );

  const toggleExpanded = (personId: string) => {
    setExpandedPersons((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId]
    );
  };

  return (
    <div className="min-h-screen">
      <Header title="MOI / Cash Book" subtitle="IOU and convenience bill management" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <ArrowDownLeft className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Given (Debit)</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(totals.totalDebits)}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Received (Credit)</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(totals.totalCredits)}</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Net Outstanding</p>
                <p className={cn(
                  'text-2xl font-bold',
                  totals.totalBalance > 0 ? 'text-amber-600' : 'text-emerald-600'
                )}>
                  {formatCurrency(totals.totalBalance)}
                </p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">People</p>
                <p className="text-2xl font-bold text-slate-900">{iouCashBooks.length}</p>
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
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-64"
            />
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="btn btn-outline"
              onClick={() => {
                const exportData = iouCashBooks.flatMap(person => 
                  person.entries.map(e => ({
                    Person: person.personName,
                    'Person ID': person.personId,
                    Date: formatDate(e.date),
                    Particular: e.particular,
                    Purpose: e.purpose,
                    Debit: e.debit,
                    Credit: e.credit,
                    Remarks: e.remarks,
                  }))
                );
                exportToCSV(exportData, 'moi_cash_book');
              }}
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

        {/* Person Cards with Entries */}
        <div className="space-y-4">
          {filteredPersons.map((person) => {
            const isExpanded = expandedPersons.includes(person.id);
            const totalDebits = person.entries.reduce((sum, e) => sum + e.debit, 0);
            const totalCredits = person.entries.reduce((sum, e) => sum + e.credit, 0);

            return (
              <div key={person.id} className="card overflow-hidden">
                {/* Person Header */}
                <button
                  onClick={() => toggleExpanded(person.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-slate-900">{person.personName}</h3>
                      <p className="text-sm text-slate-500">ID: {person.personId}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Given</p>
                      <p className="font-semibold text-emerald-600">{formatCurrency(totalDebits)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Received</p>
                      <p className="font-semibold text-blue-600">{formatCurrency(totalCredits)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Balance</p>
                      <p className={cn(
                        'font-semibold',
                        person.balance > 0 ? 'text-amber-600' : 'text-slate-600'
                      )}>
                        {formatCurrency(person.balance)}
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Entries Table */}
                {isExpanded && (
                  <div className="border-t">
                    <div className="table-container">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Particulars</th>
                            <th>Purpose</th>
                            <th className="text-right">Debit (Given)</th>
                            <th className="text-right">Credit (Received)</th>
                            <th>Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {person.entries.map((entry) => (
                            <tr key={entry.id}>
                              <td className="font-mono text-sm">{formatDate(entry.date)}</td>
                              <td className="font-medium">{entry.particular}</td>
                              <td className="text-slate-600">{entry.purpose || '-'}</td>
                              <td className="text-right font-mono">
                                {entry.debit > 0 ? (
                                  <span className="text-emerald-600">{formatCurrency(entry.debit)}</span>
                                ) : (
                                  '-'
                                )}
                              </td>
                              <td className="text-right font-mono">
                                {entry.credit > 0 ? (
                                  <span className="text-blue-600">{formatCurrency(entry.credit)}</span>
                                ) : (
                                  '-'
                                )}
                              </td>
                              <td className="text-slate-500">{entry.remarks || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-slate-50 font-semibold">
                            <td colSpan={3}>Total</td>
                            <td className="text-right font-mono text-emerald-600">{formatCurrency(totalDebits)}</td>
                            <td className="text-right font-mono text-blue-600">{formatCurrency(totalCredits)}</td>
                            <td></td>
                          </tr>
                          <tr className="bg-slate-100 font-semibold">
                            <td colSpan={4}>Outstanding Balance</td>
                            <td className={cn(
                              'text-right font-mono',
                              person.balance > 0 ? 'text-amber-600' : 'text-slate-600'
                            )}>
                              {formatCurrency(person.balance)}
                            </td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredPersons.length === 0 && (
          <div className="card p-12 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No records found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
