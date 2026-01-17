'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  Search,
  Filter,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Save,
  X,
  ChevronDown,
  Download,
  History,
} from 'lucide-react';
import { productTrackingData, allProformaInvoices } from '@/data/mockData';
import { formatDate, cn } from '@/lib/utils';
import { DeliveryHistoryItem } from '@/lib/types';
import { exportToCSV } from '@/components/ui/ReportActions';
import { ProductTracking } from '@/lib/types';

type DeliveryStatus = 'pending' | 'partial' | 'completed' | 'delayed';

export default function ProductTrackingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | 'all'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<Record<string, { deliveredQty: number; deliveredBy: string }>>({});
  const [trackingData, setTrackingData] = useState<ProductTracking[]>(productTrackingData);
  const [showHistory, setShowHistory] = useState<string | null>(null);

  const filteredProducts = trackingData.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.piNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.deliveryStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: DeliveryStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'partial':
        return <Truck className="w-4 h-4 text-amber-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-slate-400" />;
      case 'delayed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Package className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'partial':
        return 'bg-amber-100 text-amber-700';
      case 'pending':
        return 'bg-slate-100 text-slate-700';
      case 'delayed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const calculateProgress = (delivered: number, initial: number) => {
    return Math.min(100, Math.round((delivered / initial) * 100));
  };

  const handleEditClick = (item: ProductTracking) => {
    setEditingId(item.id);
    setEditingValues({
      [item.id]: {
        deliveredQty: item.deliveredQuantity,
        deliveredBy: item.deliveredBy || '',
      },
    });
  };

  const handleSave = (id: string) => {
    const editedItem = trackingData.find(item => item.id === id);
    if (!editedItem || !editingValues[id]) return;

    const newDeliveredQty = editingValues[id].deliveredQty;
    const newDeliveredBy = editingValues[id].deliveredBy;

    // Determine new status
    let newStatus: DeliveryStatus = 'pending';
    if (newDeliveredQty >= editedItem.initialQuantity) {
      newStatus = 'completed';
    } else if (newDeliveredQty > 0) {
      newStatus = 'partial';
    }

    // Add to delivery history
    const newHistoryEntry: DeliveryHistoryItem = {
      id: `dh-${Date.now()}`,
      date: new Date().toISOString(),
      quantity: newDeliveredQty - editedItem.deliveredQuantity,
      deliveredBy: newDeliveredBy,
      remarks: `Updated delivery quantity from ${editedItem.deliveredQuantity} to ${newDeliveredQty}`,
    };

    setTrackingData(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              deliveredQuantity: newDeliveredQty,
              deliveredBy: newDeliveredBy,
              deliveryStatus: newStatus,
              deliveryHistory: [...(item.deliveryHistory || []), newHistoryEntry],
              lastUpdated: new Date().toISOString(),
            }
          : item
      )
    );

    setEditingId(null);
    setEditingValues({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingValues({});
  };

  // Stats
  const stats = {
    total: trackingData.length,
    completed: trackingData.filter(t => t.deliveryStatus === 'completed').length,
    partial: trackingData.filter(t => t.deliveryStatus === 'partial').length,
    pending: trackingData.filter(t => t.deliveryStatus === 'pending').length,
    delayed: trackingData.filter(t => t.deliveryStatus === 'delayed').length,
  };

  return (
    <div className="min-h-screen">
      <Header title="Product Tracking" subtitle="Track deliveries and manage product shipments" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <button
            onClick={() => setStatusFilter('all')}
            className={cn(
              'card p-4 text-left transition-all',
              statusFilter === 'all' ? 'ring-2 ring-indigo-500' : 'hover:border-slate-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                <p className="text-xs text-slate-500">Total Items</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={cn(
              'card p-4 text-left transition-all',
              statusFilter === 'completed' ? 'ring-2 ring-emerald-500' : 'hover:border-slate-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
                <p className="text-xs text-slate-500">Completed</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setStatusFilter('partial')}
            className={cn(
              'card p-4 text-left transition-all',
              statusFilter === 'partial' ? 'ring-2 ring-amber-500' : 'hover:border-slate-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Truck className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{stats.partial}</p>
                <p className="text-xs text-slate-500">Partial</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={cn(
              'card p-4 text-left transition-all',
              statusFilter === 'pending' ? 'ring-2 ring-slate-500' : 'hover:border-slate-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-600">{stats.pending}</p>
                <p className="text-xs text-slate-500">Pending</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setStatusFilter('delayed')}
            className={cn(
              'card p-4 text-left transition-all',
              statusFilter === 'delayed' ? 'ring-2 ring-red-500' : 'hover:border-slate-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.delayed}</p>
                <p className="text-xs text-slate-500">Delayed</p>
              </div>
            </div>
          </button>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by PI No, Code, or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-72"
              />
            </div>
          </div>

          <button 
            className="btn btn-outline"
            onClick={() => exportToCSV(
              trackingData.map(item => ({
                'PI No': item.piNo,
                'Product Code': item.productCode,
                'Product Name': item.productName,
                Colour: item.colour || 'N/A',
                'Initial Qty': item.initialQuantity,
                'Delivered Qty': item.deliveredQuantity,
                'Remaining Qty': item.remainingQuantity,
                Status: item.deliveryStatus,
                'Delivered By': item.deliveredBy,
                'Last Updated': formatDate(item.lastUpdated),
              })),
              'product_tracking_report'
            )}
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Tracking Table */}
        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>PI No</th>
                  <th>Product Code</th>
                  <th>Product Name</th>
                  <th>Initial Qty</th>
                  <th>Delivered Qty</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Delivered By</th>
                  <th>Last Updated</th>
                  <th className="w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item) => {
                  const progress = calculateProgress(item.deliveredQuantity, item.initialQuantity);
                  const isEditing = editingId === item.id;

                  return (
                    <React.Fragment key={item.id}>
                      <tr className="group">
                        <td>
                          <span className="font-mono text-indigo-600 font-medium">{item.piNo}</span>
                        </td>
                        <td>
                          <span className="font-mono text-slate-600">{item.productCode}</span>
                        </td>
                        <td>
                          <span className="font-medium text-slate-900">{item.productName}</span>
                        </td>
                        <td>
                          <span className="font-mono">{item.initialQuantity.toLocaleString()}</span>
                        </td>
                        <td>
                          {isEditing ? (
                            <input
                              type="number"
                              value={editingValues[item.id]?.deliveredQty ?? item.deliveredQuantity}
                              onChange={(e) =>
                                setEditingValues({
                                  ...editingValues,
                                  [item.id]: {
                                    ...editingValues[item.id],
                                    deliveredQty: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              min={0}
                              max={item.initialQuantity}
                              className="input w-24 text-center font-mono"
                            />
                          ) : (
                            <span className="font-mono">{item.deliveredQuantity.toLocaleString()}</span>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  'h-full rounded-full transition-all',
                                  progress === 100
                                    ? 'bg-emerald-500'
                                    : progress > 50
                                    ? 'bg-amber-500'
                                    : progress > 0
                                    ? 'bg-indigo-500'
                                    : 'bg-slate-300'
                                )}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-slate-500">{progress}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={cn('badge', getStatusColor(item.deliveryStatus))}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(item.deliveryStatus)}
                              {item.deliveryStatus}
                            </span>
                          </span>
                        </td>
                        <td>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editingValues[item.id]?.deliveredBy ?? item.deliveredBy}
                              onChange={(e) =>
                                setEditingValues({
                                  ...editingValues,
                                  [item.id]: {
                                    ...editingValues[item.id],
                                    deliveredBy: e.target.value,
                                  },
                                })
                              }
                              placeholder="Enter name"
                              className="input w-32"
                            />
                          ) : (
                            <span className="text-slate-600">{item.deliveredBy || '-'}</span>
                          )}
                        </td>
                        <td>
                          <span className="text-sm text-slate-500">{formatDate(item.lastUpdated)}</span>
                        </td>
                        <td>
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleSave(item.id)}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                                title="Save"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={handleCancel}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEditClick(item)}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                                title="Edit Delivery"
                              >
                                <Truck className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setShowHistory(showHistory === item.id ? null : item.id)}
                                className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded"
                                title="View History"
                              >
                                <History className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                      {/* Delivery History */}
                      {showHistory === item.id && item.deliveryHistory && item.deliveryHistory.length > 0 && (
                        <tr>
                          <td colSpan={10} className="bg-slate-50 p-4">
                            <div className="text-sm">
                              <h4 className="font-semibold text-slate-700 mb-3">Delivery History</h4>
                              <div className="space-y-2">
                                {item.deliveryHistory.map((entry, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 bg-white rounded-lg border border-slate-200"
                                  >
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-mono text-sm">
                                      {index + 1}
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium text-slate-900">
                                        {entry.quantity > 0 ? '+' : ''}
                                        {entry.quantity} units
                                      </p>
                                      <p className="text-xs text-slate-500">{entry.remarks}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-slate-600">By: {entry.deliveredBy || 'N/A'}</p>
                                      <p className="text-xs text-slate-400">{formatDate(entry.date)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No products found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
