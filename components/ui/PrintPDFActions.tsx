'use client';

import React, { useRef, useState } from 'react';
import { Printer, Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrintPDFActionsProps {
  contentRef?: React.RefObject<HTMLElement | null>;
  documentTitle?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export default function PrintPDFActions({
  contentRef,
  documentTitle = 'Document',
  className,
  size = 'md',
  variant = 'outline',
}: PrintPDFActionsProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2.5',
  };

  const variantClasses = {
    default: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'hover:bg-slate-100 text-slate-600 hover:text-slate-900',
  };

  const handlePrint = () => {
    if (contentRef?.current) {
      const printContent = contentRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${documentTitle}</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                body {
                  font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                  padding: 20px;
                  color: #1e293b;
                  background: white;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 16px 0;
                }
                th, td {
                  border: 1px solid #e2e8f0;
                  padding: 8px 12px;
                  text-align: left;
                }
                th {
                  background: #f8fafc;
                  font-weight: 600;
                }
                .font-bold { font-weight: 700; }
                .font-semibold { font-weight: 600; }
                .font-medium { font-weight: 500; }
                .font-mono { font-family: 'IBM Plex Mono', monospace; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .text-sm { font-size: 14px; }
                .text-xs { font-size: 12px; }
                .text-lg { font-size: 18px; }
                .text-xl { font-size: 20px; }
                .text-2xl { font-size: 24px; }
                .mb-2 { margin-bottom: 8px; }
                .mb-4 { margin-bottom: 16px; }
                .mb-6 { margin-bottom: 24px; }
                .mt-4 { margin-top: 16px; }
                .mt-6 { margin-top: 24px; }
                .mt-8 { margin-top: 32px; }
                .py-2 { padding-top: 8px; padding-bottom: 8px; }
                .py-4 { padding-top: 16px; padding-bottom: 16px; }
                .px-4 { padding-left: 16px; padding-right: 16px; }
                .p-4 { padding: 16px; }
                .p-6 { padding: 24px; }
                .border { border: 1px solid #e2e8f0; }
                .border-t { border-top: 1px solid #e2e8f0; }
                .border-b { border-bottom: 1px solid #e2e8f0; }
                .rounded { border-radius: 8px; }
                .bg-slate-50 { background: #f8fafc; }
                .text-slate-500 { color: #64748b; }
                .text-slate-600 { color: #475569; }
                .text-slate-900 { color: #0f172a; }
                .text-indigo-600 { color: #4f46e5; }
                .grid { display: grid; }
                .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
                .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
                .gap-4 { gap: 16px; }
                .gap-6 { gap: 24px; }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-between { justify-content: space-between; }
                .space-y-2 > * + * { margin-top: 8px; }
                .space-y-4 > * + * { margin-top: 16px; }
                .leading-relaxed { line-height: 1.625; }
                @media print {
                  body { padding: 0; }
                  @page { margin: 1cm; }
                }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for content to load then print
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      }
    } else {
      window.print();
    }
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    try {
      // Dynamic import of html2pdf
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = contentRef?.current || document.body;
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${documentTitle.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' as const
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
      // Fallback: open print dialog with PDF option
      handlePrint();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        onClick={handlePrint}
        className={cn('btn flex items-center gap-2', variantClasses[variant], sizeClasses[size])}
      >
        <Printer className={cn(size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
        <span>Print</span>
      </button>
      <button
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className={cn('btn flex items-center gap-2', variantClasses[variant], sizeClasses[size])}
      >
        {isGenerating ? (
          <Loader2 className={cn('animate-spin', size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
        ) : (
          <Download className={cn(size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
        )}
        <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
      </button>
    </div>
  );
}

// Hook for using print functionality in any component
export function usePrint() {
  const printRef = useRef<HTMLDivElement>(null);
  
  const print = (title?: string) => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${title || 'Print'}</title>
              <style>
                body { font-family: sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background: #f5f5f5; }
                @media print { body { padding: 0; } }
              </style>
            </head>
            <body>${printContent}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      }
    }
  };

  return { printRef, print };
}
