// Vendor Types
export type VendorType = 'fashion_republic' | 'moon_textile';

// Buyer Interface
export interface Buyer {
  name: string;
  address: string;
  location: string;
}

// Base PI Interface
export interface BasePI {
  id: string;
  piNo: string;
  date: string;
  buyer: Buyer;
  merchandiser: string;
  vendor: VendorType;
  terms: PITerms;
  status: 'draft' | 'sent' | 'confirmed' | 'cancelled';
}

export interface PITerms {
  payment: string;
  delivery: string;
  advisingBank: string;
  negotiation?: string;
  origin: string;
  swiftCode: string;
  binNo?: string;
  vatNo?: string;
  hsCode: string;
}

// PI Type 1: Labels & Tags
export interface PILabelsItem {
  id: string;
  description: string;
  colour: string;
  netWeight: number;
  grossWeight: number;
  quantityDzn: number;
  quantityPcs: number;
  unitPrice: number;
  totalAmount: number;
}

export interface PILabels extends BasePI {
  type: 'labels';
  styleNo: string;
  items: PILabelsItem[];
  totals: {
    netWeight: number;
    grossWeight: number;
    quantityPcs: number;
    totalAmount: number;
  };
}

// PI Type 2: Fabric
export interface PIFabricItem {
  id: string;
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
}

export interface PIFabric extends BasePI {
  type: 'fabric';
  payee?: string;
  items: PIFabricItem[];
  totals: {
    netWeight: number;
    grossWeight: number;
    quantityYds: number;
    totalAmount: number;
  };
}

// PI Type 3: Cartons
export interface PICartonsItem {
  id: string;
  orderNo: string;
  measurement: string;
  cartonPly: string;
  cartonQty: number;
  netWeightKg: number;
  grossWeightKg: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface PICartons extends BasePI {
  type: 'cartons';
  items: PICartonsItem[];
  totals: {
    cartonQty: number;
    grossWeight: number;
    totalAmount: number;
  };
}

export type ProformaInvoice = PILabels | PIFabric | PICartons;

// Letter of Credit
export interface LetterOfCredit {
  id: string;
  lcNo: string;
  bbLcNo: string;
  dateOfOpening: string;
  issuingBank: string;
  piReference: string;
  piData?: ProformaInvoice;
  buyerName: string;
  buyerAddress: string;
  beneficiary: string;
  beneficiaryAddress: string;
  amount: number;
  currency: string;
  expiryDate: string;
  shipmentDate: string;
  portOfLoading: string;
  portOfDischarge: string;
  status: 'pending' | 'active' | 'shipped' | 'completed' | 'cancelled';
  sightDays: number;
  documents: {
    billOfExchange: boolean;
    deliveryChallan: boolean;
    commercialInvoice: boolean;
    packingList: boolean;
    beneficiaryCertificate: boolean;
    certificateOfOrigin: boolean;
  };
  carrier?: string;
  salesTerm?: string;
  totalNetWeight?: number;
  totalGrossWeight?: number;
}

// Product Tracking
export interface DeliveryHistoryItem {
  id: string;
  date: string;
  quantity: number;
  deliveredBy: string;
  remarks: string;
}

export interface ProductTracking {
  id: string;
  piNo: string;
  productCode: string;
  productName: string;
  colour?: string;
  initialQuantity: number;
  deliveredQuantity: number;
  remainingQuantity: number;
  deliveryStatus: 'pending' | 'partial' | 'completed' | 'delayed';
  deliveredBy: string;
  lastUpdated: string;
  deliveryHistory: DeliveryHistoryItem[];
}

// Accounting - Customer Ledger
export interface LedgerEntry {
  id: string;
  date: string;
  particulars: string;
  reference: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface CustomerLedger {
  id: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  entries: LedgerEntry[];
  totalDebit: number;
  totalCredit: number;
  balance: number;
}

// Accounting - Supplier Ledger
export interface SupplierLedger {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierAddress: string;
  entries: LedgerEntry[];
  totalDebit: number;
  totalCredit: number;
  balance: number;
}

// Accounting - IOU/MOI Cash Book
export interface IOUEntry {
  id: string;
  date: string;
  particular: string;
  debit: number;
  credit: number;
  purpose: string;
  remarks: string;
}

export interface IOUCashBook {
  id: string;
  personName: string;
  personId: string;
  entries: IOUEntry[];
  balance: number;
}

// Accounting - Daily Bookkeeping
export interface DailyBookEntry {
  id: string;
  date: string;
  voucherNo: string;
  type: 'receipt' | 'payment' | 'journal' | 'contra';
  particulars: string;
  accountHead: string;
  debit: number;
  credit: number;
  narration: string;
  createdBy: string;
}

// Accounting - Loan Management
export interface LoanRepayment {
  id: string;
  date: string;
  amount: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface Loan {
  id: string;
  loanNo: string;
  loanType: 'bank' | 'personal' | 'director';
  lender: string;
  principalAmount: number;
  interestRate: number;
  tenure: number;
  startDate: string;
  endDate: string;
  emiAmount: number;
  status: 'active' | 'closed' | 'defaulted';
  repayments: LoanRepayment[];
  outstandingBalance: number;
}

// Dashboard Stats
export interface DashboardStats {
  totalPIs: number;
  activeLCs: number;
  pendingDeliveries: number;
  totalReceivables: number;
  totalPayables: number;
  activeLoans: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
}

// Chart Data
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}
