import {
  ProformaInvoice,
  PILabels,
  PIFabric,
  PICartons,
  LetterOfCredit,
  ProductTracking,
  CustomerLedger,
  SupplierLedger,
  IOUCashBook,
  DailyBookEntry,
  Loan,
  DashboardStats,
  ChartDataPoint,
} from '@/lib/types';

// Proforma Invoices - Labels & Tags (Based on Page 1)
export const piLabels1: PILabels = {
  id: 'pi-labels-001',
  piNo: 'F R B-22/2025 (D)',
  type: 'labels',
  date: '2025-11-02',
  buyer: {
    name: 'M/S TROUSER WORLD (PVT) LTD.',
    address: 'Plot 1, Kunia, Jaydebpur',
    location: 'GAZIPUR-1704, Bangladesh',
  },
  merchandiser: 'Mr. Rashed / Dostogir',
  vendor: 'fashion_republic',
  styleNo: '30SHR',
  items: [
    { id: '1', description: 'Care Label', colour: 'APP', netWeight: 533.33, grossWeight: 560, quantityDzn: 5333.33, quantityPcs: 64000, unitPrice: 0.03, totalAmount: 160.00 },
    { id: '2', description: 'Care Label 03-04', colour: 'APP', netWeight: 533.33, grossWeight: 560, quantityDzn: 5333.33, quantityPcs: 64000, unitPrice: 0.03, totalAmount: 160.00 },
    { id: '3', description: 'Care Label 05-06', colour: 'APP', netWeight: 533.33, grossWeight: 560, quantityDzn: 5333.33, quantityPcs: 64000, unitPrice: 0.03, totalAmount: 160.00 },
    { id: '4', description: 'Care Label 07', colour: 'APP', netWeight: 533.33, grossWeight: 560, quantityDzn: 5333.33, quantityPcs: 64000, unitPrice: 0.03, totalAmount: 160.00 },
    { id: '5', description: 'Main Label', colour: 'APP', netWeight: 533.33, grossWeight: 560, quantityDzn: 5333.33, quantityPcs: 64000, unitPrice: 0.13, totalAmount: 693.33 },
    { id: '6', description: 'Waist Tag', colour: 'APP', netWeight: 533.33, grossWeight: 560, quantityDzn: 5333.33, quantityPcs: 64000, unitPrice: 0.09, totalAmount: 480.00 },
    { id: '7', description: 'HANG TAG', colour: 'APP', netWeight: 533.33, grossWeight: 560, quantityDzn: 5333.33, quantityPcs: 64000, unitPrice: 0.10, totalAmount: 533.33 },
    { id: '8', description: 'HT String', colour: 'APP', netWeight: 533.33, grossWeight: 560, quantityDzn: 5333.33, quantityPcs: 64000, unitPrice: 0.03, totalAmount: 160.00 },
    { id: '9', description: 'Logo Label', colour: 'APP', netWeight: 533.33, grossWeight: 560, quantityDzn: 5333.33, quantityPcs: 64000, unitPrice: 0.08, totalAmount: 426.67 },
  ],
  totals: {
    netWeight: 4266.67,
    grossWeight: 4480,
    quantityPcs: 512000,
    totalAmount: 2933.33,
  },
  terms: {
    payment: 'At 90 days sight i.e; by an Irrevocable Letter of Credit in US Dollar incorporating opener\'s Export L/C Number, Payment of the proceeds at the bank presenting document should be in US Dollar in the from of F.D.D Drawn on Bangladesh.',
    delivery: '15 days, from the date of receipt of BB L/C.',
    advisingBank: 'National Bank Limited, Pagati Sarani Brance DhaKA-1230, Bangladesh.',
    negotiation: '15 (fifteen) days from the date of delivery.',
    origin: 'Bangladesh',
    swiftCode: 'NBLBBDDH098',
    binNo: '00-1199972-0102',
    hsCode: '62171000',
  },
  status: 'confirmed',
};

// Proforma Invoices - Fabric (Based on Page 2)
export const piFabric1: PIFabric = {
  id: 'pi-fabric-001',
  piNo: 'MT-31/25 SP (5H)',
  type: 'fabric',
  date: '2025-12-23',
  buyer: {
    name: 'TROUSER WORLD (PVT) LTD.',
    address: 'PLOT#378/1, KUNIA, JAYDEBPUR',
    location: 'GAZIPUR, BANGLADESH',
  },
  payee: 'Payper',
  merchandiser: 'Mr. Shahin',
  vendor: 'moon_textile',
  items: [
    { id: '1', styleNo: '2025-2195 West', description: 'TC HERRINGBONE', gsm: '115-120', width: '56/57"', colour: 'NAVY BLUE', netWeightKg: 508, grossWeightKg: 533.4, quantityYds: 5080, unitPrice: 0.87, totalAmount: 4419.60 },
    { id: '2', styleNo: '2025-2195 West', description: 'TC HERRINGBONE', gsm: '115-120', width: '56/57"', colour: 'BLACK', netWeightKg: 214.4, grossWeightKg: 225.12, quantityYds: 2144, unitPrice: 0.87, totalAmount: 1865.28 },
  ],
  totals: {
    netWeight: 508,
    grossWeight: 533.4,
    quantityYds: 7224,
    totalAmount: 6284.88,
  },
  terms: {
    payment: 'At 90 days sight i.e; by an Irrevocable Letter of Credit in US Dollar incorporating opener\'s Export L/C Number, Payment of the proceeds at the bank presenting document should be in US Dollar in the from of F.D.D Drawn on Bangladesh.',
    delivery: '15 days, from the date of receipt of BB L/C.',
    advisingBank: 'National Bank Limited, Pagati Sarani Brance DhaKA-1230, Bangladesh.',
    origin: 'Bangladesh',
    swiftCode: 'NBLBBDDH098',
    vatNo: '000977203-0306',
    hsCode: '5209.31.00',
  },
  status: 'sent',
};

// Proforma Invoices - Cartons (Based on Page 3)
export const piCartons1: PICartons = {
  id: 'pi-cartons-001',
  piNo: 'F R B-30/2025',
  type: 'cartons',
  date: '2025-12-21',
  buyer: {
    name: 'Knit Bazaar (Pvt) Ltd.',
    address: 'Plot 40/41, Vadam, Tongi, Gazipur',
    location: 'Bangladesh',
  },
  merchandiser: 'Mr. Awal/Amir',
  vendor: 'fashion_republic',
  items: [
    { id: '1', orderNo: '537014', measurement: 'L - 40 X W - 30 X H - 28 cm', cartonPly: '7ply', cartonQty: 4080, netWeightKg: 0.8, grossWeightKg: 3264.00, unit: 'PCS', unitPrice: 0.87, totalPrice: 3549.60 },
    { id: '2', orderNo: '537014', measurement: 'Top Bottoms 35x25 cm', cartonPly: '3ply', cartonQty: 8160, netWeightKg: 0.8, grossWeightKg: 6528.00, unit: 'PCS', unitPrice: 0.05, totalPrice: 408.00 },
    { id: '3', orderNo: '508056', measurement: 'L - 40 X W - 30 X H - 20 cm', cartonPly: '7ply', cartonQty: 3900, netWeightKg: 0.8, grossWeightKg: 3120.00, unit: 'PCS', unitPrice: 0.75, totalPrice: 2925.00 },
    { id: '4', orderNo: '508056', measurement: 'Top Bottoms 35x25 cm', cartonPly: '3ply', cartonQty: 7800, netWeightKg: 0.8, grossWeightKg: 6240.00, unit: 'PCS', unitPrice: 0.05, totalPrice: 390.00 },
  ],
  totals: {
    cartonQty: 23940,
    grossWeight: 19152.00,
    totalAmount: 7272.60,
  },
  terms: {
    payment: 'At 90 days sight i.e; by an Irrevocable Letter of Credit in US Dollar incorporating opener\'s Export L/C Number, Payment of the proceeds at the bank presenting document should be in US Dollar in the from of F.D.D Drawn on Bangladesh.',
    delivery: '15 days, from the date of receipt of BB L/C.',
    advisingBank: 'National bank limited pragati sarani branch Dhaka, 1230, Bangladesh.',
    negotiation: '15 (fifteen) days from the date of delivery.',
    origin: 'Bangladesh',
    swiftCode: 'NBLBBDDH098',
    binNo: '00-1199972-0102',
    hsCode: '62171000',
  },
  status: 'draft',
};

// More sample PIs
export const piLabels2: PILabels = {
  id: 'pi-labels-002',
  piNo: 'F R B-23/2025 (E)',
  type: 'labels',
  date: '2025-11-15',
  buyer: {
    name: 'FASHION WORLD LTD.',
    address: 'House 45, Gulshan-2',
    location: 'Dhaka-1212, Bangladesh',
  },
  merchandiser: 'Mr. Karim',
  vendor: 'fashion_republic',
  styleNo: '45XRT',
  items: [
    { id: '1', description: 'Main Label', colour: 'White', netWeight: 320, grossWeight: 340, quantityDzn: 4000, quantityPcs: 48000, unitPrice: 0.12, totalAmount: 576.00 },
    { id: '2', description: 'Size Label', colour: 'White', netWeight: 160, grossWeight: 170, quantityDzn: 4000, quantityPcs: 48000, unitPrice: 0.05, totalAmount: 240.00 },
    { id: '3', description: 'Care Label', colour: 'White', netWeight: 240, grossWeight: 260, quantityDzn: 4000, quantityPcs: 48000, unitPrice: 0.04, totalAmount: 192.00 },
  ],
  totals: {
    netWeight: 720,
    grossWeight: 770,
    quantityPcs: 144000,
    totalAmount: 1008.00,
  },
  terms: {
    payment: 'At 90 days sight i.e; by an Irrevocable Letter of Credit in US Dollar.',
    delivery: '15 days, from the date of receipt of BB L/C.',
    advisingBank: 'National Bank Limited, Pagati Sarani Branch, Dhaka.',
    negotiation: '15 (fifteen) days from the date of delivery.',
    origin: 'Bangladesh',
    swiftCode: 'NBLBBDDH098',
    binNo: '00-1199972-0102',
    hsCode: '62171000',
  },
  status: 'confirmed',
};

export const allProformaInvoices: ProformaInvoice[] = [
  piLabels1,
  piFabric1,
  piCartons1,
  piLabels2,
];

// Letter of Credits (Based on Pages 4-9)
export const lc1: LetterOfCredit = {
  id: 'lc-001',
  lcNo: 'MT-02/24SP',
  bbLcNo: '968240400614',
  dateOfOpening: '2024-07-28',
  issuingBank: 'National Bank Limited, Pragati Sarani Branch, Dhaka, Bangladesh',
  piReference: 'pi-fabric-001',
  buyerName: 'TROUSER WORLD (PVT) LTD.',
  buyerAddress: 'PLOT-378/1, KUNIA JAYDEBPUR, Gazipur Bangladesh',
  beneficiary: 'Moon Textile',
  beneficiaryAddress: 'House No#16, Road No 01, Sector#10, Uttara, Dhaka-1230, Bangladesh',
  amount: 3629.00,
  currency: 'USD',
  expiryDate: '2024-10-28',
  shipmentDate: '2024-08-15',
  portOfLoading: 'Dhaka, Bangladesh',
  portOfDischarge: 'Customers Factory',
  status: 'completed',
  sightDays: 120,
  documents: {
    billOfExchange: true,
    deliveryChallan: true,
    commercialInvoice: true,
    packingList: true,
    beneficiaryCertificate: true,
    certificateOfOrigin: true,
  },
  carrier: 'By Truck / Covered van',
  salesTerm: 'C & F FREIGHT PREPAID',
  totalNetWeight: 430.00,
  totalGrossWeight: 530.00,
};

export const lc2: LetterOfCredit = {
  id: 'lc-002',
  lcNo: 'FR-05/25SP',
  bbLcNo: '968240400720',
  dateOfOpening: '2025-01-05',
  issuingBank: 'National Bank Limited, Pragati Sarani Branch, Dhaka, Bangladesh',
  piReference: 'pi-labels-001',
  buyerName: 'M/S TROUSER WORLD (PVT) LTD.',
  buyerAddress: 'Plot 1, Kunia, Jaydebpur, GAZIPUR-1704, Bangladesh',
  beneficiary: 'Fashion Republic (BD)',
  beneficiaryAddress: 'House No#16, Road No 01, Sector#10, Uttara, Dhaka-1230, Bangladesh',
  amount: 2933.33,
  currency: 'USD',
  expiryDate: '2025-04-05',
  shipmentDate: '2025-02-01',
  portOfLoading: 'Dhaka, Bangladesh',
  portOfDischarge: 'Customers Factory',
  status: 'active',
  sightDays: 90,
  documents: {
    billOfExchange: true,
    deliveryChallan: false,
    commercialInvoice: false,
    packingList: false,
    beneficiaryCertificate: false,
    certificateOfOrigin: false,
  },
  carrier: 'By Truck / Covered van',
  salesTerm: 'C & F FREIGHT PREPAID',
  totalNetWeight: 4266.67,
  totalGrossWeight: 4480,
};

export const allLettersOfCredit: LetterOfCredit[] = [lc1, lc2];

// Product Tracking (Based on LC/PI data)
export const productTrackingData: ProductTracking[] = [
  {
    id: 'pt-001',
    piNo: 'F R B-22/2025 (D)',
    productCode: '30SHR-CL',
    productName: 'Care Label',
    colour: 'APP',
    initialQuantity: 64000,
    deliveredQuantity: 48000,
    remainingQuantity: 16000,
    deliveryStatus: 'partial',
    deliveredBy: 'Mr. Kamal',
    lastUpdated: '2025-01-10',
    deliveryHistory: [
      { id: 'dh-1', date: '2025-01-05', quantity: 24000, deliveredBy: 'Mr. Kamal', remarks: 'First batch delivery' },
      { id: 'dh-2', date: '2025-01-10', quantity: 24000, deliveredBy: 'Mr. Kamal', remarks: 'Second batch delivery' },
    ],
  },
  {
    id: 'pt-002',
    piNo: 'F R B-22/2025 (D)',
    productCode: '30SHR-ML',
    productName: 'Main Label',
    colour: 'APP',
    initialQuantity: 64000,
    deliveredQuantity: 64000,
    remainingQuantity: 0,
    deliveryStatus: 'completed',
    deliveredBy: 'Mr. Rahim',
    lastUpdated: '2025-01-08',
    deliveryHistory: [
      { id: 'dh-3', date: '2025-01-08', quantity: 64000, deliveredBy: 'Mr. Rahim', remarks: 'Complete delivery' },
    ],
  },
  {
    id: 'pt-003',
    piNo: 'MT-31/25 SP (5H)',
    productCode: '2025-2195-NB',
    productName: 'TC HERRINGBONE - Navy Blue',
    colour: 'NAVY BLUE',
    initialQuantity: 5080,
    deliveredQuantity: 0,
    remainingQuantity: 5080,
    deliveryStatus: 'pending',
    deliveredBy: '',
    lastUpdated: '2025-01-01',
    deliveryHistory: [],
  },
  {
    id: 'pt-004',
    piNo: 'MT-31/25 SP (5H)',
    productCode: '2025-2195-BK',
    productName: 'TC HERRINGBONE - Black',
    colour: 'BLACK',
    initialQuantity: 2144,
    deliveredQuantity: 1000,
    remainingQuantity: 1144,
    deliveryStatus: 'partial',
    deliveredBy: 'Mr. Jamal',
    lastUpdated: '2025-01-12',
    deliveryHistory: [
      { id: 'dh-4', date: '2025-01-12', quantity: 1000, deliveredBy: 'Mr. Jamal', remarks: 'Partial delivery' },
    ],
  },
  {
    id: 'pt-005',
    piNo: 'F R B-30/2025',
    productCode: '537014-7P',
    productName: 'Carton L-40 X W-30 X H-28 cm',
    colour: '-',
    initialQuantity: 4080,
    deliveredQuantity: 0,
    remainingQuantity: 4080,
    deliveryStatus: 'pending',
    deliveredBy: '',
    lastUpdated: '2025-01-01',
    deliveryHistory: [],
  },
];

// Customer Ledger
export const customerLedgers: CustomerLedger[] = [
  {
    id: 'cl-001',
    customerId: 'CUST-001',
    customerName: 'TROUSER WORLD (PVT) LTD.',
    customerAddress: 'PLOT-378/1, KUNIA JAYDEBPUR, Gazipur',
    entries: [
      { id: 'cle-1', date: '2024-12-01', particulars: 'Opening Balance', reference: '-', debit: 0, credit: 0, balance: 0 },
      { id: 'cle-2', date: '2024-12-05', particulars: 'PI F R B-22/2025 (D)', reference: 'INV-001', debit: 2933.33, credit: 0, balance: 2933.33 },
      { id: 'cle-3', date: '2024-12-15', particulars: 'Payment Received - L/C', reference: 'LC-002', debit: 0, credit: 1500.00, balance: 1433.33 },
      { id: 'cle-4', date: '2025-01-05', particulars: 'PI MT-31/25 SP', reference: 'INV-002', debit: 6284.88, credit: 0, balance: 7718.21 },
      { id: 'cle-5', date: '2025-01-10', particulars: 'Payment Received', reference: 'REC-005', debit: 0, credit: 3000.00, balance: 4718.21 },
    ],
    totalDebit: 9218.21,
    totalCredit: 4500.00,
    balance: 4718.21,
  },
  {
    id: 'cl-002',
    customerId: 'CUST-002',
    customerName: 'Knit Bazaar (Pvt) Ltd.',
    customerAddress: 'Plot 40/41, Vadam, Tongi, Gazipur',
    entries: [
      { id: 'cle-6', date: '2024-12-01', particulars: 'Opening Balance', reference: '-', debit: 0, credit: 0, balance: 0 },
      { id: 'cle-7', date: '2024-12-21', particulars: 'PI F R B-30/2025', reference: 'INV-003', debit: 7272.60, credit: 0, balance: 7272.60 },
    ],
    totalDebit: 7272.60,
    totalCredit: 0,
    balance: 7272.60,
  },
];

// Supplier Ledger
export const supplierLedgers: SupplierLedger[] = [
  {
    id: 'sl-001',
    supplierId: 'SUP-001',
    supplierName: 'Raw Materials Co.',
    supplierAddress: 'Tejgaon Industrial Area, Dhaka',
    entries: [
      { id: 'sle-1', date: '2024-12-01', particulars: 'Opening Balance', reference: '-', debit: 0, credit: 0, balance: 0 },
      { id: 'sle-2', date: '2024-12-10', particulars: 'Purchase - Labels Raw', reference: 'PO-001', debit: 0, credit: 1500.00, balance: -1500.00 },
      { id: 'sle-3', date: '2024-12-20', particulars: 'Payment Made', reference: 'PAY-001', debit: 1000.00, credit: 0, balance: -500.00 },
      { id: 'sle-4', date: '2025-01-05', particulars: 'Purchase - Thread', reference: 'PO-002', debit: 0, credit: 800.00, balance: -1300.00 },
    ],
    totalDebit: 1000.00,
    totalCredit: 2300.00,
    balance: -1300.00,
  },
  {
    id: 'sl-002',
    supplierId: 'SUP-002',
    supplierName: 'Carton Box Industries',
    supplierAddress: 'Gazipur Industrial Zone',
    entries: [
      { id: 'sle-5', date: '2024-12-01', particulars: 'Opening Balance', reference: '-', debit: 0, credit: 0, balance: 0 },
      { id: 'sle-6', date: '2024-12-15', particulars: 'Purchase - Cartons', reference: 'PO-003', debit: 0, credit: 3500.00, balance: -3500.00 },
      { id: 'sle-7', date: '2025-01-02', particulars: 'Payment Made', reference: 'PAY-002', debit: 2000.00, credit: 0, balance: -1500.00 },
    ],
    totalDebit: 2000.00,
    totalCredit: 3500.00,
    balance: -1500.00,
  },
];

// IOU Cash Book (Based on Page 10)
export const iouCashBooks: IOUCashBook[] = [
  {
    id: 'iou-001',
    personName: 'Mr. Sumon',
    personId: 'EMP-001',
    entries: [
      { id: 'iou-e1', date: '2022-06-21', particular: 'Sumon vai', debit: 50, credit: 0, purpose: '', remarks: '' },
      { id: 'iou-e2', date: '2022-06-22', particular: 'Sumon vai', debit: 100, credit: 0, purpose: '', remarks: '' },
      { id: 'iou-e3', date: '2022-06-26', particular: 'Sumon vai (IOU Return)', debit: 0, credit: 90, purpose: '', remarks: '' },
      { id: 'iou-e4', date: '2022-06-29', particular: 'Sumon vai', debit: 42000, credit: 0, purpose: '', remarks: '' },
      { id: 'iou-e5', date: '2022-06-29', particular: 'Sumon vai (IOU Return)', debit: 0, credit: 41230, purpose: '', remarks: '' },
      { id: 'iou-e6', date: '2022-06-30', particular: 'Sumon vai', debit: 4500, credit: 0, purpose: '', remarks: '' },
      { id: 'iou-e7', date: '2022-06-30', particular: 'Sumon vai', debit: 0, credit: 4880, purpose: '', remarks: '' },
      { id: 'iou-e8', date: '2022-07-03', particular: 'IOU Adjust (Salary)', debit: 0, credit: 450, purpose: '', remarks: '' },
      { id: 'iou-e9', date: '2022-07-06', particular: 'Sumon vai', debit: 4000, credit: 0, purpose: '', remarks: '' },
      { id: 'iou-e10', date: '2022-07-06', particular: 'Sumon vai (IOU Return)', debit: 0, credit: 3830, purpose: '', remarks: '' },
      { id: 'iou-e11', date: '2022-07-23', particular: 'Sumon vai', debit: 5500, credit: 0, purpose: '', remarks: '' },
      { id: 'iou-e12', date: '2022-07-24', particular: 'Sumon vai (IOU Return)', debit: 0, credit: 5510, purpose: '', remarks: '' },
    ],
    balance: 160,
  },
  {
    id: 'iou-002',
    personName: 'Mr. Kamal',
    personId: 'EMP-002',
    entries: [
      { id: 'iou-e20', date: '2024-12-01', particular: 'Office Expense', debit: 5000, credit: 0, purpose: 'Stationery', remarks: '' },
      { id: 'iou-e21', date: '2024-12-10', particular: 'Return', debit: 0, credit: 4500, purpose: '', remarks: 'Bills submitted' },
      { id: 'iou-e22', date: '2024-12-15', particular: 'Travel Advance', debit: 3000, credit: 0, purpose: 'Gazipur visit', remarks: '' },
      { id: 'iou-e23', date: '2024-12-20', particular: 'Return', debit: 0, credit: 2800, purpose: '', remarks: 'Balance 200 adjusted' },
    ],
    balance: 700,
  },
];

// Daily Bookkeeping
export const dailyBookEntries: DailyBookEntry[] = [
  { id: 'db-001', date: '2025-01-15', voucherNo: 'RV-001', type: 'receipt', particulars: 'Cash received from Trouser World', accountHead: 'Sales', debit: 0, credit: 50000, narration: 'Against PI F R B-22/2025', createdBy: 'Admin' },
  { id: 'db-002', date: '2025-01-15', voucherNo: 'PV-001', type: 'payment', particulars: 'Paid to Raw Materials Co.', accountHead: 'Purchase', debit: 25000, credit: 0, narration: 'Raw material purchase', createdBy: 'Admin' },
  { id: 'db-003', date: '2025-01-15', voucherNo: 'JV-001', type: 'journal', particulars: 'Depreciation Entry', accountHead: 'Depreciation', debit: 5000, credit: 5000, narration: 'Monthly depreciation', createdBy: 'Accountant' },
  { id: 'db-004', date: '2025-01-14', voucherNo: 'RV-002', type: 'receipt', particulars: 'Bank Interest Received', accountHead: 'Interest Income', debit: 0, credit: 1200, narration: 'FDR Interest', createdBy: 'Admin' },
  { id: 'db-005', date: '2025-01-14', voucherNo: 'PV-002', type: 'payment', particulars: 'Electricity Bill', accountHead: 'Utilities', debit: 15000, credit: 0, narration: 'December bill', createdBy: 'Admin' },
  { id: 'db-006', date: '2025-01-13', voucherNo: 'CV-001', type: 'contra', particulars: 'Cash Deposit to Bank', accountHead: 'Bank', debit: 100000, credit: 100000, narration: 'Cash deposited', createdBy: 'Admin' },
  { id: 'db-007', date: '2025-01-13', voucherNo: 'PV-003', type: 'payment', particulars: 'Staff Salary', accountHead: 'Salary', debit: 85000, credit: 0, narration: 'December salary', createdBy: 'Admin' },
  { id: 'db-008', date: '2025-01-12', voucherNo: 'RV-003', type: 'receipt', particulars: 'Cash received from Knit Bazaar', accountHead: 'Sales', debit: 0, credit: 35000, narration: 'Advance payment', createdBy: 'Admin' },
];

// Loan Management
export const loans: Loan[] = [
  {
    id: 'loan-001',
    loanNo: 'BL-2024-001',
    loanType: 'bank',
    lender: 'National Bank Limited',
    principalAmount: 500000,
    interestRate: 12,
    tenure: 24,
    startDate: '2024-06-01',
    endDate: '2026-06-01',
    emiAmount: 23536.82,
    status: 'active',
    repayments: [
      { id: 'rep-1', date: '2024-07-01', amount: 23536.82, principal: 18536.82, interest: 5000, balance: 481463.18 },
      { id: 'rep-2', date: '2024-08-01', amount: 23536.82, principal: 18722.19, interest: 4814.63, balance: 462740.99 },
      { id: 'rep-3', date: '2024-09-01', amount: 23536.82, principal: 18909.41, interest: 4627.41, balance: 443831.58 },
      { id: 'rep-4', date: '2024-10-01', amount: 23536.82, principal: 19098.50, interest: 4438.32, balance: 424733.08 },
      { id: 'rep-5', date: '2024-11-01', amount: 23536.82, principal: 19289.49, interest: 4247.33, balance: 405443.59 },
      { id: 'rep-6', date: '2024-12-01', amount: 23536.82, principal: 19482.38, interest: 4054.44, balance: 385961.21 },
      { id: 'rep-7', date: '2025-01-01', amount: 23536.82, principal: 19677.20, interest: 3859.61, balance: 366284.01 },
    ],
    outstandingBalance: 366284.01,
  },
  {
    id: 'loan-002',
    loanNo: 'DL-2024-001',
    loanType: 'director',
    lender: 'Mr. Rahman (Director)',
    principalAmount: 200000,
    interestRate: 0,
    tenure: 12,
    startDate: '2024-09-01',
    endDate: '2025-09-01',
    emiAmount: 16666.67,
    status: 'active',
    repayments: [
      { id: 'rep-10', date: '2024-10-01', amount: 16666.67, principal: 16666.67, interest: 0, balance: 183333.33 },
      { id: 'rep-11', date: '2024-11-01', amount: 16666.67, principal: 16666.67, interest: 0, balance: 166666.66 },
      { id: 'rep-12', date: '2024-12-01', amount: 16666.67, principal: 16666.67, interest: 0, balance: 149999.99 },
      { id: 'rep-13', date: '2025-01-01', amount: 16666.67, principal: 16666.67, interest: 0, balance: 133333.32 },
    ],
    outstandingBalance: 133333.32,
  },
];

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalPIs: 4,
  activeLCs: 2,
  pendingDeliveries: 3,
  totalReceivables: 11990.81,
  totalPayables: 2800.00,
  activeLoans: 2,
  monthlyRevenue: 85000,
  monthlyExpenses: 125000,
};

// Chart Data
export const revenueChartData: ChartDataPoint[] = [
  { name: 'Jul', value: 65000, revenue: 65000, expenses: 45000 },
  { name: 'Aug', value: 72000, revenue: 72000, expenses: 52000 },
  { name: 'Sep', value: 58000, revenue: 58000, expenses: 48000 },
  { name: 'Oct', value: 89000, revenue: 89000, expenses: 62000 },
  { name: 'Nov', value: 95000, revenue: 95000, expenses: 71000 },
  { name: 'Dec', value: 78000, revenue: 78000, expenses: 68000 },
  { name: 'Jan', value: 85000, revenue: 85000, expenses: 75000 },
];

export const piTypeDistribution: ChartDataPoint[] = [
  { name: 'Labels & Tags', value: 45 },
  { name: 'Fabric', value: 35 },
  { name: 'Cartons', value: 20 },
];

export const lcStatusDistribution: ChartDataPoint[] = [
  { name: 'Completed', value: 1 },
  { name: 'Active', value: 1 },
  { name: 'Pending', value: 0 },
];

export const deliveryStatusData: ChartDataPoint[] = [
  { name: 'Completed', value: 1 },
  { name: 'Partial', value: 2 },
  { name: 'Pending', value: 2 },
];
