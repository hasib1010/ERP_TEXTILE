'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  Building2,
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  FileText,
  Save,
  Upload,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Landmark,
  Hash,
  Check,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SettingsTab = 'company' | 'profile' | 'notifications' | 'security' | 'appearance' | 'documents';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('company');
  const [saved, setSaved] = useState(false);

  // Company Settings State
  const [companyData, setCompanyData] = useState({
    name: 'Fashion Republic (BD)',
    address: 'Level 2, Rupayan Centre, 72 Mohakhali C/A',
    city: 'Dhaka',
    country: 'Bangladesh',
    postalCode: '1212',
    phone: '+880 2 222 295 159',
    mobile: '+880 1707 077 071',
    email: 'info@fashionrepublic.com.bd',
    website: 'www.fashionrepublic.com.bd',
    taxId: 'BIN-123456789',
    vatNo: 'VAT-987654321',
    tradeLicense: 'TL-2024-001234',
    bankName: 'Standard Chartered Bank',
    bankBranch: 'Gulshan Branch, Dhaka',
    accountNo: '1234567890123',
    swiftCode: 'SCBLBDDX',
    routingNo: '115261234',
  });

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@fashionrepublic.com.bd',
    phone: '+880 1707 077 071',
    role: 'Administrator',
    department: 'Management',
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNewPI: true,
    emailLCStatus: true,
    emailDeliveryUpdates: true,
    emailPaymentReminders: true,
    pushNewPI: false,
    pushLCStatus: true,
    pushDeliveryUpdates: true,
    pushPaymentReminders: false,
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme: 'light' as 'light' | 'dark' | 'system',
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    currency: 'USD',
    timezone: 'Asia/Dhaka',
  });

  // Document Settings
  const [documentSettings, setDocumentSettings] = useState({
    piPrefix: 'PI',
    lcPrefix: 'LC',
    invoicePrefix: 'INV',
    autoNumbering: true,
    defaultTerms: 'Payment against L/C at sight.',
    defaultDelivery: 'Within 15 days after L/C received.',
    defaultOrigin: 'Bangladesh',
    showCompanyLogo: true,
    showBankDetails: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'company' as SettingsTab, label: 'Company', icon: Building2 },
    { id: 'profile' as SettingsTab, label: 'Profile', icon: User },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell },
    { id: 'security' as SettingsTab, label: 'Security', icon: Lock },
    { id: 'appearance' as SettingsTab, label: 'Appearance', icon: Palette },
    { id: 'documents' as SettingsTab, label: 'Documents', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Settings" subtitle="Manage your account and system preferences" />

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors',
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Company Settings */}
            {activeTab === 'company' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                    Company Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="label">Company Name</label>
                      <input
                        type="text"
                        value={companyData.name}
                        onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Address</label>
                      <input
                        type="text"
                        value={companyData.address}
                        onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">City</label>
                      <input
                        type="text"
                        value={companyData.city}
                        onChange={(e) => setCompanyData({ ...companyData, city: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Country</label>
                      <input
                        type="text"
                        value={companyData.country}
                        onChange={(e) => setCompanyData({ ...companyData, country: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Postal Code</label>
                      <input
                        type="text"
                        value={companyData.postalCode}
                        onChange={(e) => setCompanyData({ ...companyData, postalCode: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-indigo-600" />
                    Contact Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Phone</label>
                      <input
                        type="tel"
                        value={companyData.phone}
                        onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Mobile</label>
                      <input
                        type="tel"
                        value={companyData.mobile}
                        onChange={(e) => setCompanyData({ ...companyData, mobile: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input
                        type="email"
                        value={companyData.email}
                        onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Website</label>
                      <input
                        type="url"
                        value={companyData.website}
                        onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Hash className="w-5 h-5 text-indigo-600" />
                    Tax & License Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="label">Tax ID / BIN No</label>
                      <input
                        type="text"
                        value={companyData.taxId}
                        onChange={(e) => setCompanyData({ ...companyData, taxId: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">VAT No</label>
                      <input
                        type="text"
                        value={companyData.vatNo}
                        onChange={(e) => setCompanyData({ ...companyData, vatNo: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Trade License</label>
                      <input
                        type="text"
                        value={companyData.tradeLicense}
                        onChange={(e) => setCompanyData({ ...companyData, tradeLicense: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-indigo-600" />
                    Bank Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Bank Name</label>
                      <input
                        type="text"
                        value={companyData.bankName}
                        onChange={(e) => setCompanyData({ ...companyData, bankName: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Branch</label>
                      <input
                        type="text"
                        value={companyData.bankBranch}
                        onChange={(e) => setCompanyData({ ...companyData, bankBranch: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Account No</label>
                      <input
                        type="text"
                        value={companyData.accountNo}
                        onChange={(e) => setCompanyData({ ...companyData, accountNo: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">SWIFT Code</label>
                      <input
                        type="text"
                        value={companyData.swiftCode}
                        onChange={(e) => setCompanyData({ ...companyData, swiftCode: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Routing No</label>
                      <input
                        type="text"
                        value={companyData.routingNo}
                        onChange={(e) => setCompanyData({ ...companyData, routingNo: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="w-12 h-12 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {profileData.firstName} {profileData.lastName}
                      </h2>
                      <p className="text-slate-500">{profileData.role}</p>
                      <button className="btn btn-outline btn-sm mt-2">
                        <Upload className="w-4 h-4" />
                        Change Photo
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">First Name</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Last Name</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Role</label>
                      <input
                        type="text"
                        value={profileData.role}
                        className="input bg-slate-50"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="label">Department</label>
                      <input
                        type="text"
                        value={profileData.department}
                        onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    Email Notifications
                  </h2>
                  <div className="space-y-4">
                    {[
                      { key: 'emailNewPI', label: 'New Proforma Invoice created' },
                      { key: 'emailLCStatus', label: 'LC status updates' },
                      { key: 'emailDeliveryUpdates', label: 'Delivery updates' },
                      { key: 'emailPaymentReminders', label: 'Payment reminders' },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer">
                        <span className="text-slate-700">{item.label}</span>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) =>
                              setNotifications({ ...notifications, [item.key]: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-indigo-600" />
                    Push Notifications
                  </h2>
                  <div className="space-y-4">
                    {[
                      { key: 'pushNewPI', label: 'New Proforma Invoice created' },
                      { key: 'pushLCStatus', label: 'LC status updates' },
                      { key: 'pushDeliveryUpdates', label: 'Delivery updates' },
                      { key: 'pushPaymentReminders', label: 'Payment reminders' },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer">
                        <span className="text-slate-700">{item.label}</span>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) =>
                              setNotifications({ ...notifications, [item.key]: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-indigo-600" />
                    Change Password
                  </h2>
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="label">Current Password</label>
                      <input type="password" className="input" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="label">New Password</label>
                      <input type="password" className="input" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="label">Confirm New Password</label>
                      <input type="password" className="input" placeholder="••••••••" />
                    </div>
                    <button className="btn btn-primary">Update Password</button>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Two-Factor Authentication</h2>
                  <p className="text-slate-600 mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <button className="btn btn-outline">Enable 2FA</button>
                </div>

                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Sessions</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">Current Session</p>
                        <p className="text-sm text-slate-500">Dhaka, Bangladesh • Chrome on Windows</p>
                      </div>
                      <span className="badge badge-success">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-indigo-600" />
                    Theme
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'light', label: 'Light', icon: Sun },
                      { value: 'dark', label: 'Dark', icon: Moon },
                      { value: 'system', label: 'System', icon: Globe },
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => setAppearance({ ...appearance, theme: theme.value as 'light' | 'dark' | 'system' })}
                        className={cn(
                          'p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2',
                          appearance.theme === theme.value
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 hover:border-slate-300'
                        )}
                      >
                        <theme.icon className={cn(
                          'w-6 h-6',
                          appearance.theme === theme.value ? 'text-indigo-600' : 'text-slate-500'
                        )} />
                        <span className={cn(
                          'font-medium',
                          appearance.theme === theme.value ? 'text-indigo-600' : 'text-slate-700'
                        )}>
                          {theme.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    Regional Settings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Language</label>
                      <select
                        value={appearance.language}
                        onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
                        className="select"
                      >
                        <option value="en">English</option>
                        <option value="bn">বাংলা (Bengali)</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Date Format</label>
                      <select
                        value={appearance.dateFormat}
                        onChange={(e) => setAppearance({ ...appearance, dateFormat: e.target.value })}
                        className="select"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Currency</label>
                      <select
                        value={appearance.currency}
                        onChange={(e) => setAppearance({ ...appearance, currency: e.target.value })}
                        className="select"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="BDT">BDT - Bangladeshi Taka</option>
                        <option value="EUR">EUR - Euro</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Timezone</label>
                      <select
                        value={appearance.timezone}
                        onChange={(e) => setAppearance({ ...appearance, timezone: e.target.value })}
                        className="select"
                      >
                        <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Document Settings */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Hash className="w-5 h-5 text-indigo-600" />
                    Document Numbering
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="label">PI Prefix</label>
                      <input
                        type="text"
                        value={documentSettings.piPrefix}
                        onChange={(e) => setDocumentSettings({ ...documentSettings, piPrefix: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">LC Prefix</label>
                      <input
                        type="text"
                        value={documentSettings.lcPrefix}
                        onChange={(e) => setDocumentSettings({ ...documentSettings, lcPrefix: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Invoice Prefix</label>
                      <input
                        type="text"
                        value={documentSettings.invoicePrefix}
                        onChange={(e) => setDocumentSettings({ ...documentSettings, invoicePrefix: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-3 mt-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={documentSettings.autoNumbering}
                      onChange={(e) => setDocumentSettings({ ...documentSettings, autoNumbering: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-700">Enable automatic document numbering</span>
                  </label>
                </div>

                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    Default Terms
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Default Payment Terms</label>
                      <textarea
                        value={documentSettings.defaultTerms}
                        onChange={(e) => setDocumentSettings({ ...documentSettings, defaultTerms: e.target.value })}
                        className="input min-h-[80px]"
                      />
                    </div>
                    <div>
                      <label className="label">Default Delivery Terms</label>
                      <textarea
                        value={documentSettings.defaultDelivery}
                        onChange={(e) => setDocumentSettings({ ...documentSettings, defaultDelivery: e.target.value })}
                        className="input min-h-[80px]"
                      />
                    </div>
                    <div>
                      <label className="label">Default Origin</label>
                      <input
                        type="text"
                        value={documentSettings.defaultOrigin}
                        onChange={(e) => setDocumentSettings({ ...documentSettings, defaultOrigin: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Document Display Options</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={documentSettings.showCompanyLogo}
                        onChange={(e) => setDocumentSettings({ ...documentSettings, showCompanyLogo: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-slate-700">Show company logo on documents</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={documentSettings.showBankDetails}
                        onChange={(e) => setDocumentSettings({ ...documentSettings, showBankDetails: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-slate-700">Show bank details on invoices</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-end gap-3 mt-6">
              {saved && (
                <span className="flex items-center gap-2 text-emerald-600">
                  <Check className="w-4 h-4" />
                  Settings saved successfully
                </span>
              )}
              <button onClick={handleSave} className="btn btn-primary">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
