'use client';

import React, { useState } from 'react';
import { Download, Printer, FileSpreadsheet, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportActionsProps {
  onExportCSV?: () => void;
  onPrint?: () => void;
  title?: string;
  className?: string;
}

export default function ReportActions({
  onExportCSV,
  onPrint,
  title = 'Report',
  className,
}: ReportActionsProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleExportCSV = async () => {
    if (onExportCSV) {
      setIsExporting(true);
      try {
        await onExportCSV();
      } finally {
        setIsExporting(false);
      }
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {onExportCSV && (
        <button
          onClick={handleExportCSV}
          disabled={isExporting}
          className="btn btn-outline flex items-center gap-2"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileSpreadsheet className="w-4 h-4" />
          )}
          <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
        </button>
      )}
      <button
        onClick={handlePrint}
        className="btn btn-outline flex items-center gap-2"
      >
        <Printer className="w-4 h-4" />
        <span>Print</span>
      </button>
    </div>
  );
}

// Utility function to export data to CSV
export function exportToCSV(data: Record<string, any>[], filename: string) {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Utility function to export data to Excel (simple CSV that Excel can open)
export function exportToExcel(data: Record<string, any>[], filename: string) {
  exportToCSV(data, filename);
}
