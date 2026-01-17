# Garments ERP - Design System Architecture (DSA)

## 1. Project Overview

### 1.1 Purpose
A comprehensive ERP frontend for garments/textile companies to manage:
- Proforma Invoice generation (3 types)
- Letter of Credit (LC) management
- Document automation (Bill of Exchange, Delivery Challan, Commercial Invoice, Packing List, Beneficiary Certificate, Certificate of Origin)
- Product/Order tracking
- Accounting modules (Ledgers, Bookkeeping, Loan Management)

### 1.2 Target Users
- Operations Managers
- Accounts Team
- Production Coordinators
- Export/Import Officers

### 1.3 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Lucide React
- **Charts**: Recharts
- **PDF Generation**: Client-side preview (mock)
- **State**: React useState/useContext (mock data)

---

## 2. Design System

### 2.1 Aesthetic Direction
**Theme**: Industrial Elegance meets Modern Minimalism
- Clean, professional interface suitable for business operations
- Dark sidebar with light content area
- Subtle textile-inspired patterns/textures
- Sharp, precise typography reflecting the manufacturing industry

### 2.2 Color Palette

```css
:root {
  /* Primary - Deep Indigo (Industry/Trust) */
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-500: #6366f1;
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  --primary-900: #312e81;
  
  /* Secondary - Warm Amber (Textile/Warmth) */
  --secondary-50: #fffbeb;
  --secondary-100: #fef3c7;
  --secondary-500: #f59e0b;
  --secondary-600: #d97706;
  
  /* Neutral - Slate */
  --neutral-50: #f8fafc;
  --neutral-100: #f1f5f9;
  --neutral-200: #e2e8f0;
  --neutral-300: #cbd5e1;
  --neutral-400: #94a3b8;
  --neutral-500: #64748b;
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1e293b;
  --neutral-900: #0f172a;
  
  /* Status Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

### 2.3 Typography

```css
/* Display/Headers */
font-family: 'DM Sans', sans-serif;

/* Body/Data */
font-family: 'IBM Plex Sans', sans-serif;

/* Monospace/Numbers */
font-family: 'IBM Plex Mono', monospace;
```

### 2.4 Spacing Scale
```
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px
```

### 2.5 Component Patterns

#### Cards
- Subtle border (1px)
- Slight shadow on hover
- Rounded corners (8px)
- White background with subtle texture option

#### Tables
- Alternating row colors (very subtle)
- Sticky headers
- Hover states
- Inline editing capability

#### Forms
- Floating labels or top-aligned labels
- Clear validation states
- Grouped fields with section headers

---

## 3. Data Architecture

### 3.1 Proforma Invoice Types

#### Type 1: Labels & Tags (Fashion Republic BD)
```typescript
interface PILabels {
  id: string;
  piNo: string;
  date: Date;
  buyer: {
    name: string;
    address: string;
    location: string;
  };
  merchandiser: string;
  styleNo: string;
  items: Array<{
    description: string;
    colour: string;
    netWeight: number;
    grossWeight: number;
    quantityDzn: number;
    quantityPcs: number;
    unitPrice: number;
    totalAmount: number;
  }>;
  totals: {
    netWeight: number;
    grossWeight: number;
    quantityPcs: number;
    totalAmount: number;
  };
  terms: {
    payment: string;
    delivery: string;
    advisingBank: string;
    negotiation: string;
    origin: string;
    swiftCode: string;
    binNo: string;
    hsCode: string;
  };
  vendor: 'fashion_republic' | 'moon_textile';
}
```

#### Type 2: Fabric (Moon Textile)
```typescript
interface PIFabric {
  id: string;
  piNo: string;
  date: Date;
  buyer: {
    name: string;
    address: string;
    location: string;
  };
  payee: string;
  merchandiser: string;
  items: Array<{
    styleNo: string;
    description: string;
    gsm: string;
    width: string;
    colour: string;
    netWeightKg: number;
    grossWeightKg: number;
    quantityYds: number;
    unitPrice: number;
    totalAmount: number;
  }>;
  totals: {
    netWeight: number;
    grossWeight: number;
    quantityYds: number;
    totalAmount: number;
  };
  terms: {
    payment: string;
    delivery: string;
    advisingBank: string;
    vatNo: string;
    origin: string;
    swiftCode: string;
    hsCode: string;
  };
  vendor: 'moon_textile';
}
```

#### Type 3: Cartons (Fashion Republic BD)
```typescript
interface PICartons {
  id: string;
  piNo: string;
  date: Date;
  buyer: {
    name: string;
    address: string;
    location: string;
  };
  merchandiser: string;
  items: Array<{
    orderNo: string;
    measurement: string; // "L x W x H"
    cartonPly: string;
    cartonQty: number;
    netWeightKg: number;
    grossWeightKg: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
  }>;
  totals: {
    cartonQty: number;
    grossWeight: number;
    totalAmount: number;
  };
  terms: {
    payment: string;
    delivery: string;
    advisingBank: string;
    negotiation: string;
    origin: string;
    swiftCode: string;
    binNo: string;
    hsCode: string;
  };
  vendor: 'fashion_republic';
}
```

### 3.2 Letter of Credit (LC)
```typescript
interface LetterOfCredit {
  id: string;
  lcNo: string;
  bbLcNo: string;
  dateOfOpening: Date;
  issuingBank: string;
  piReference: string; // Links to PI
  buyerName: string;
  beneficiary: string;
  amount: number;
  currency: string;
  expiryDate: Date;
  shipmentDate: Date;
  portOfLoading: string;
  portOfDischarge: string;
  status: 'pending' | 'active' | 'shipped' | 'completed' | 'cancelled';
  documents: {
    billOfExchange: boolean;
    deliveryChallan: boolean;
    commercialInvoice: boolean;
    packingList: boolean;
    beneficiaryCertificate: boolean;
    certificateOfOrigin: boolean;
  };
}
```

### 3.3 Product Tracking
```typescript
interface ProductTracking {
  id: string;
  piNo: string;
  productCode: string;
  productName: string;
  initialQuantity: number;
  deliveredQuantity: number;
  remainingQuantity: number;
  deliveryStatus: 'pending' | 'partial' | 'completed';
  deliveredBy: string;
  lastUpdated: Date;
  deliveryHistory: Array<{
    date: Date;
    quantity: number;
    deliveredBy: string;
    remarks: string;
  }>;
}
```

### 3.4 Accounting Models

#### Customer Ledger
```typescript
interface CustomerLedger {
  id: string;
  customerId: string;
  customerName: string;
  entries: Array<{
    date: Date;
    particulars: string;
    reference: string;
    debit: number;
    credit: number;
    balance: number;
  }>;
}
```

#### Supplier Ledger
```typescript
interface SupplierLedger {
  id: string;
  supplierId: string;
  supplierName: string;
  entries: Array<{
    date: Date;
    particulars: string;
    reference: string;
    debit: number;
    credit: number;
    balance: number;
  }>;
}
```

#### IOU/Cash Book (MOI - Convenience Bill)
```typescript
interface IOUCashBook {
  id: string;
  personName: string;
  entries: Array<{
    date: Date;
    particular: string;
    debit: number;
    credit: number;
    purpose: string;
    remarks: string;
  }>;
  balance: number;
}
```

#### Daily Bookkeeping
```typescript
interface DailyBookEntry {
  id: string;
  date: Date;
  voucherNo: string;
  type: 'receipt' | 'payment' | 'journal' | 'contra';
  particulars: string;
  accountHead: string;
  debit: number;
  credit: number;
  narration: string;
  createdBy: string;
}
```

#### Loan Management
```typescript
interface Loan {
  id: string;
  loanNo: string;
  loanType: 'bank' | 'personal' | 'director';
  lender: string;
  principalAmount: number;
  interestRate: number;
  tenure: number; // months
  startDate: Date;
  endDate: Date;
  emiAmount: number;
  status: 'active' | 'closed' | 'defaulted';
  repayments: Array<{
    date: Date;
    amount: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}
```

---

## 4. Application Structure

```
garments-erp/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Dashboard)
│   ├── globals.css
│   ├── proforma-invoice/
│   │   ├── page.tsx (List)
│   │   ├── create/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       └── page.tsx (View/Edit)
│   ├── lc-management/
│   │   ├── page.tsx (List)
│   │   ├── create/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       └── page.tsx (View + Documents)
│   ├── product-tracking/
│   │   └── page.tsx
│   ├── accounting/
│   │   ├── page.tsx (Overview)
│   │   ├── customer-ledger/
│   │   │   └── page.tsx
│   │   ├── supplier-ledger/
│   │   │   └── page.tsx
│   │   ├── moi-cashbook/
│   │   │   └── page.tsx
│   │   ├── daily-bookkeeping/
│   │   │   └── page.tsx
│   │   └── loan-management/
│   │       └── page.tsx
│   └── settings/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── PageWrapper.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── Tabs.tsx
│   ├── documents/
│   │   ├── BillOfExchange.tsx
│   │   ├── DeliveryChallan.tsx
│   │   ├── CommercialInvoice.tsx
│   │   ├── PackingList.tsx
│   │   ├── BeneficiaryCertificate.tsx
│   │   └── CertificateOfOrigin.tsx
│   └── charts/
│       └── DashboardCharts.tsx
├── data/
│   └── mockData.ts
├── lib/
│   ├── types.ts
│   └── utils.ts
└── public/
    └── ...
```

---

## 5. Navigation Structure

### Main Navigation (Sidebar)
```
📊 Dashboard
📄 Proforma Invoice
   ├── All Invoices
   ├── Create PI (Labels & Tags)
   ├── Create PI (Fabric)
   └── Create PI (Cartons)
🏦 LC Management
   ├── All LCs
   ├── Create LC
   └── Documents
📦 Product Tracking
💰 Accounting
   ├── Overview
   ├── Customer Ledger
   ├── Supplier Ledger
   ├── MOI (Convenience Bills)
   ├── Daily Bookkeeping
   └── Loan Management
⚙️ Settings
```

---

## 6. Key Features & Workflows

### 6.1 PI Creation Workflow
1. User selects PI type (Labels, Fabric, Cartons)
2. Fills in buyer details
3. Adds line items with quantities and prices
4. System calculates totals
5. Fills in payment terms
6. Generates formatted PI document

### 6.2 LC to Documents Workflow
1. User creates LC entry linking to a PI
2. System pulls PI data
3. User enters LC-specific details
4. System auto-generates 6 documents:
   - Bill of Exchange (1st and 2nd copies)
   - Delivery Challan
   - Commercial Invoice
   - Packing List
   - Beneficiary Certificate
   - Certificate of Origin
5. Documents available for preview/print from LC detail page

### 6.3 Product Tracking Workflow
1. Data populated from PIs automatically
2. Shows all products with initial quantities
3. Users can update delivered quantities
4. System tracks delivery status
5. History maintained for each delivery update

### 6.4 Accounting Workflows
- **Customer Ledger**: Track all transactions per customer
- **Supplier Ledger**: Track all payments/dues to suppliers
- **MOI**: Manage convenience bills (like IOU system from page 10)
- **Daily Bookkeeping**: Record daily transactions
- **Loan Management**: Track loan disbursements and repayments

---

## 7. Mock Data Summary

Based on the uploaded invoices:

### Buyers
1. M/S Trouser World (PVT) Ltd - Gazipur
2. Knit Bazaar (Pvt) Ltd - Tongi, Gazipur

### Vendors
1. Fashion Republic (BD) - Uttara, Dhaka (Labels, Cartons)
2. Moon Textile - Uttara, Dhaka (Fabric)

### Bank
- National Bank Limited, Pragati Sarani Branch, Dhaka

### Sample Products
- Care Labels (various types)
- Main Labels, Waist Tags, Hang Tags
- TC Herringbone Fabric (115-120 GSM)
- T/C Pocketing Fabric
- Cartons (various sizes)

---

## 8. Responsive Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Layout Behavior
- **< 768px**: Collapsed sidebar (hamburger menu), stacked layouts
- **768px - 1024px**: Mini sidebar, responsive tables
- **> 1024px**: Full sidebar, full tables

---

## 9. Document Templates

All generated documents will follow the exact format from the uploaded samples:
- Company letterhead
- Structured tables
- Terms and conditions
- Signature sections
- Professional formatting

---

## 10. Implementation Priority

### Phase 1 (Core)
1. Layout & Navigation
2. Dashboard with overview stats
3. PI List & Creation (all 3 types)

### Phase 2 (Documents)
4. LC Management
5. Auto-generated documents

### Phase 3 (Tracking & Accounting)
6. Product Tracking
7. Customer/Supplier Ledgers
8. MOI/Cash Book
9. Daily Bookkeeping
10. Loan Management

---

*This DSA serves as the foundation for building the Garments ERP system.*
