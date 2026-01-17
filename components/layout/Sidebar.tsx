'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Landmark,
  Package,
  Calculator,
  Settings,
  ChevronDown,
  ChevronRight,
  Tags,
  Shirt,
  Box,
  Users,
  Building2,
  Receipt,
  BookOpen,
  Wallet,
  Menu,
  X,
  Scissors,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: { label: string; href: string; icon?: React.ReactNode }[];
}

const navigation: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'Proforma Invoice',
    icon: <FileText className="w-5 h-5" />,
    children: [
      { label: 'All Invoices', href: '/proforma-invoice', icon: <FileText className="w-4 h-4" /> },
      { label: 'Create - Labels', href: '/proforma-invoice/create/labels', icon: <Tags className="w-4 h-4" /> },
      { label: 'Create - Fabric', href: '/proforma-invoice/create/fabric', icon: <Shirt className="w-4 h-4" /> },
      { label: 'Create - Cartons', href: '/proforma-invoice/create/cartons', icon: <Box className="w-4 h-4" /> },
    ],
  },
  {
    label: 'LC Management',
    icon: <Landmark className="w-5 h-5" />,
    children: [
      { label: 'All LCs', href: '/lc-management' },
      { label: 'Create LC', href: '/lc-management/create' },
    ],
  },
  {
    label: 'Product Tracking',
    href: '/product-tracking',
    icon: <Package className="w-5 h-5" />,
  },
  {
    label: 'Accounting',
    icon: <Calculator className="w-5 h-5" />,
    children: [
      { label: 'Overview', href: '/accounting', icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: 'Customer Ledger', href: '/accounting/customer-ledger', icon: <Users className="w-4 h-4" /> },
      { label: 'Supplier Ledger', href: '/accounting/supplier-ledger', icon: <Building2 className="w-4 h-4" /> },
      { label: 'MOI (Cash Book)', href: '/accounting/moi', icon: <Receipt className="w-4 h-4" /> },
      { label: 'Daily Bookkeeping', href: '/accounting/daily-book', icon: <BookOpen className="w-4 h-4" /> },
      { label: 'Loan Management', href: '/accounting/loans', icon: <Wallet className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

const SIDEBAR_STATE_KEY = 'garment-erp-sidebar-state';
const SIDEBAR_COLLAPSED_KEY = 'garment-erp-sidebar-collapsed';

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Proforma Invoice', 'Accounting']);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedExpanded = localStorage.getItem(SIDEBAR_STATE_KEY);
      const savedCollapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      
      if (savedExpanded) {
        setExpandedItems(JSON.parse(savedExpanded));
      }
      
      if (savedCollapsed) {
        setIsCollapsed(JSON.parse(savedCollapsed));
      }
    } catch (e) {
      // Use default values on error
    }
    setIsLoaded(true);
  }, []);

  // Save expanded state to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(expandedItems));
    }
  }, [expandedItems, isLoaded]);

  // Save collapsed state to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, isLoaded]);

  // Auto-expand parent when navigating to a child route
  useEffect(() => {
    navigation.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) => pathname.startsWith(child.href));
        if (hasActiveChild && !expandedItems.includes(item.label)) {
          setExpandedItems((prev) => [...prev, item.label]);
        }
      }
    });
  }, [pathname]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const NavContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <>
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 py-6 border-b border-slate-800 transition-all duration-300",
        collapsed ? "px-2 justify-center" : "px-4"
      )}>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <Scissors className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold text-white tracking-tight">GarmentERP</h1>
            <p className="text-xs text-slate-500">Management System</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navigation.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => !collapsed && toggleExpand(item.label)}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'sidebar-item w-full',
                    collapsed && 'justify-center px-2',
                    expandedItems.includes(item.label) || item.children.some((child) => isActive(child.href))
                      ? 'text-white bg-slate-800'
                      : 'sidebar-item-default'
                  )}
                >
                  {item.icon}
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {expandedItems.includes(item.label) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </>
                  )}
                </button>
                {!collapsed && expandedItems.includes(item.label) && (
                  <div className="ml-4 mt-1 space-y-1 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'sidebar-item',
                          isActive(child.href) ? 'sidebar-item-active' : 'sidebar-item-default'
                        )}
                      >
                        {child.icon && child.icon}
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href!}
                title={collapsed ? item.label : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'sidebar-item',
                  collapsed && 'justify-center px-2',
                  isActive(item.href!) ? 'sidebar-item-active' : 'sidebar-item-default'
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle (Desktop only) */}
      {!collapsed ? (
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex items-center gap-2 px-4 py-3 text-sm text-slate-400 hover:text-white transition-colors border-t border-slate-800"
        >
          <PanelLeftClose className="w-5 h-5" />
          <span>Collapse sidebar</span>
        </button>
      ) : (
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex items-center justify-center py-3 text-slate-400 hover:text-white transition-colors border-t border-slate-800"
          title="Expand sidebar"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <div className={cn(
        "py-4 border-t border-slate-800 transition-all duration-300",
        collapsed ? "px-2" : "px-4"
      )}>
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center"
        )}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-slate-900 font-semibold text-sm flex-shrink-0">
            FR
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-medium text-white truncate">Fashion Republic</p>
              <p className="text-xs text-slate-500 truncate">Admin Account</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 text-white shadow-lg"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 transform transition-transform duration-300 ease-in-out flex flex-col',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <NavContent collapsed={false} />
      </aside>

      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-slate-900 transition-all duration-300",
          isCollapsed ? "lg:w-20" : "lg:w-72"
        )}
      >
        <NavContent collapsed={isCollapsed} />
      </aside>

      {/* Spacer for main content */}
      <div className={cn(
        "hidden lg:block transition-all duration-300 flex-shrink-0",
        isCollapsed ? "lg:w-20" : "lg:w-72"
      )} />
    </>
  );
}
