'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import {
  FileText,
  Landmark,
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Building2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import {
  dashboardStats,
  revenueChartData,
  piTypeDistribution,
  deliveryStatusData,
  allProformaInvoices,
  allLettersOfCredit,
  productTrackingData,
} from '@/data/mockData';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444'];

export default function Dashboard() {
  const recentPIs = allProformaInvoices.slice(0, 4);
  const recentLCs = allLettersOfCredit.slice(0, 3);
  const pendingDeliveries = productTrackingData.filter(
    (p) => p.deliveryStatus === 'pending' || p.deliveryStatus === 'partial'
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back!</h1>
            <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your business today.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/proforma-invoice/create/labels" className="btn btn-primary">
              <FileText className="w-4 h-4" />
              New PI
            </Link>
            <Link href="/lc-management/create" className="btn btn-outline">
              <Landmark className="w-4 h-4" />
              New LC
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="stat-change text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                +12%
              </span>
            </div>
            <p className="stat-value mt-3">{dashboardStats.totalPIs}</p>
            <p className="stat-label">Total PIs</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-amber-600" />
              </div>
              <span className="badge badge-success">Active</span>
            </div>
            <p className="stat-value mt-3">{dashboardStats.activeLCs}</p>
            <p className="stat-label">Active LCs</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <span className="badge badge-warning">Pending</span>
            </div>
            <p className="stat-value mt-3">{dashboardStats.pendingDeliveries}</p>
            <p className="stat-label">Pending Deliveries</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="stat-change text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                +8%
              </span>
            </div>
            <p className="stat-value mt-3">{formatCurrency(dashboardStats.totalReceivables)}</p>
            <p className="stat-label">Receivables</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Revenue Overview</h3>
                <p className="text-sm text-slate-500">Monthly revenue vs expenses</p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-slate-600">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="text-slate-600">Expenses</span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value: number | undefined) => [`$${(value || 0).toLocaleString()}`, '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#cbd5e1"
                    strokeWidth={2}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PI Distribution */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">PI Distribution</h3>
            <p className="text-sm text-slate-500 mb-4">By invoice type</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={piTypeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {piTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {piTypeDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Status & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Delivery Status */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Delivery Status</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deliveryStatusData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {deliveryStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.name === 'Completed'
                            ? '#10b981'
                            : entry.name === 'Partial'
                            ? '#f59e0b'
                            : '#ef4444'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Proforma Invoices */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Recent Proforma Invoices</h3>
              <Link href="/proforma-invoice" className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>PI No</th>
                    <th>Buyer</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPIs.map((pi) => (
                    <tr key={pi.id}>
                      <td className="font-medium font-mono">{pi.piNo}</td>
                      <td className="max-w-[200px] truncate">{pi.buyer.name}</td>
                      <td>
                        <span className="badge badge-neutral capitalize">{pi.type}</span>
                      </td>
                      <td className="font-mono">{formatCurrency(pi.totals.totalAmount)}</td>
                      <td>
                        <span className={`badge ${getStatusColor(pi.status)}`}>{pi.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active LCs */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Active Letters of Credit</h3>
              <Link href="/lc-management" className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentLCs.map((lc) => (
                <div key={lc.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Landmark className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-900 truncate">{lc.lcNo}</p>
                      <span className={`badge ${getStatusColor(lc.status)}`}>{lc.status}</span>
                    </div>
                    <p className="text-sm text-slate-500 truncate">{lc.buyerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold font-mono text-slate-900">{formatCurrency(lc.amount)}</p>
                    <p className="text-xs text-slate-500">Expires: {formatDate(lc.expiryDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Deliveries */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Pending Deliveries</h3>
              <Link href="/product-tracking" className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {pendingDeliveries.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 border border-slate-200 rounded-lg">
                  <div className="flex-shrink-0">
                    {item.deliveryStatus === 'pending' ? (
                      <Clock className="w-5 h-5 text-orange-500" />
                    ) : item.deliveryStatus === 'partial' ? (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{item.productName}</p>
                    <p className="text-xs text-slate-500">PI: {item.piNo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">
                      {item.deliveredQuantity}/{item.initialQuantity}
                    </p>
                    <p className="text-xs text-slate-500">
                      {Math.round((item.deliveredQuantity / item.initialQuantity) * 100)}% complete
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">2</p>
              <p className="text-sm text-slate-500">Customers</p>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">2</p>
              <p className="text-sm text-slate-500">Suppliers</p>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(dashboardStats.totalPayables)}</p>
              <p className="text-sm text-slate-500">Payables</p>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{dashboardStats.activeLoans}</p>
              <p className="text-sm text-slate-500">Active Loans</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
