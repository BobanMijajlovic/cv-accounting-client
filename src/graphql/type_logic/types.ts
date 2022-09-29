import {
  Address,
  Bank,
  BankAccount,
  BankHeaderTransactions,
  BankHeaderTransactionType,
  BankTransactionAdditionalData,
  BankTransactionItemType,
  BankTransactions,
  Calculation,
  CalculationItem,
  Category,
  CategoryRelationship,
  Client,
  Contact,
  Customer,
  CustomerInfo,
  Discounts,
  DueDates,
  Expense,
  ExpenseItem,
  FinanceTransferDocument,
  Invoice,
  InvoiceAdvanceInvoice,
  InvoiceFooterType,
  InvoiceHeaderType,
  InvoiceItem,
  InvoiceItemDiscount,
  Item,
  ItemsCategory,
  ItemsImages,
  ItemSupplier,
  LoginType,
  Maybe,
  Normative,
  NormativeItem,
  Notes,
  ProductionOrder,
  ProductionOrderItem,
  ProformaInvoice,
  Receipt,
  ReceiptItem,
  ReceiptPayment,
  ReturnInvoice,
  Scalars,
  Tax,
  TaxFinance,
  TaxValue,
  Translate,
  User,
  UserChangePasswordType,
  Warehouse,
  WarehouseFinance,
  WarehouseItem,
  WarehouseItemInfo,
  WorkOrder,
  WorkOrderItem
} from '../graphql'

type MergeSubType<Base, SubBase> = {
  [Key in keyof SubBase]:
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
  undefined extends Base[Key] ? never : SubBase[Key]
}
type Merge<M, N> = Pick<M, Exclude<keyof M, keyof N>> & MergeSubType<M, N>
type Composite<M, N, K> = Merge<M, N> & Pick<K, Exclude<keyof K, keyof M>>

export type TResponseArray<T = any> = {
  items: Array<any>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore?: Scalars['Boolean'];
}

export type TBank = Partial<Bank>

export type TBankAccount = Partial<BankAccount>

export type TAddress = Partial<Address>
export type TContact = Partial<Contact>
export type TCustomer = Partial<Merge<Customer, {
  addresses: TAddress[],
  contacts: TContact[],
  infos: TCustomerInfo[],
  banks: TBankAccount[]
}>>

export type TCustomerInfo = Partial<CustomerInfo>

export type TClient = Partial<Merge<Client, {
  addresses: TAddress[]
  banks: TBankAccount[]
  contacts: TContact[]
  logo?: string
}>>

export type TTaxValue = Partial<TaxValue>

export type TTax = Partial<Merge<Tax, {
  values: TTaxValue[]
}>>

export type TItemSupplier = Partial<Merge<ItemSupplier, {
  supplier: TCustomer
}>>

export type TItemsCategory = Partial<ItemsCategory>
export type TItemImages = Partial<ItemsImages>

export type TItem = Partial<Merge<Item, {
  itemSuppliers: TItemSupplier[]
  norms: TNormative[]
  itemsCategories: TItemsCategory[]
  images: TItemImages
}>>

export type TWarehouseItem = Partial<WarehouseItem>

export type TWarehouseItemInfo = Partial<Merge<WarehouseItemInfo, {
  warehouseItem: TWarehouseItem
  item: TItem
  warehouse: TWarehouse
}>>

export type TWarehouse = Partial<Warehouse>

export type TWorkOrderItem = Partial<Merge<WorkOrderItem, {
  warehouseItemInfo: TWarehouseItemInfo
}>>

export type TWorkOrder = Partial<Merge<WorkOrder, {
  workOrderItems: TWorkOrderItem[]
}>>

export type TUser = Partial<User>

export type TUserChangePassword = Partial<Merge<UserChangePasswordType, {
  confirmPassword?: string
}>>

export type TLogin = Partial<LoginType>

export type TForgotPasswordType = {
  email: string
}

export type TDiscounts = Partial<Discounts>

export type TExpenseItem = Partial<ExpenseItem>

export type TExpense = Partial<Merge<Expense, {
  items: TExpenseItem[]
}>>

export type TCalculationItem = Partial<Merge<CalculationItem, {
  item: TItem
  itemSupplier: TItemSupplier
  tax: TTax
}>>

export type TCalculation = Partial<Merge<Calculation, {
  warehouse: TWarehouse
  supplier: TCustomer
  dueDate: TDueDates[],
  expense: TExpense[],
  discount: TDiscounts[]
  items: TCalculationItem[]
  vats: TTaxFinance[]
}>>

export type TWarehouseFinance = Partial<Merge<WarehouseFinance, {
  invoice: TInvoice,
  calculation: TCalculation
  warehouse: TWarehouse
}>>

export type TNotes = Partial<Notes>
export type TInvoiceItemDiscount = Partial<InvoiceItemDiscount>

export type TInvoiceHeader = Merge<InvoiceHeaderType, {
  customer?: TCustomer
}>

export type TInvoiceFooter = Partial<Merge<InvoiceFooterType, {
  discountFooter: number
  note?: string
}>>

export type TInvoice = Partial<Merge<Invoice, {
  customer: TCustomer
  warehouse: TWarehouse
  items: TInvoiceItem[]
  dueDates: TDueDates[]
  notes: TNotes[]
  discount: TDiscounts[]
  expense: TExpense[]
  vats: TTaxFinance[]
}>>

export type TInvoiceItem = Partial<Merge<InvoiceItem, {
  item: TItem
  warehouse: TWarehouse
  warehouseItem: TWarehouseItem
  discount?: TInvoiceItemDiscount[]
}>>

export type TReceiptPayment = Partial<ReceiptPayment>

export type TReceiptItem = Partial<Merge<ReceiptItem, {
  item: TItem
  tax: TTax
}>>

export type TReceipt = Partial<Merge<Receipt, {
  items: TReceiptItem[]
  payment: TReceiptPayment
}>>

export type TTranslate = Partial<Translate>

export type TBankTransactionAdditionalData = Partial<BankTransactionAdditionalData>

export type TBankTransactions = Partial<Merge<BankTransactions, {
  bankAccount: TBankAccount
  customer: TCustomer
  transactionAdditionalData: TBankTransactionAdditionalData
}>>

export type TBankHeaderTransactions = Partial<Merge<BankHeaderTransactions, {
  bankTransactions: TBankTransactions[]
  bankAccount: TBankAccount
}>>

export type TBankHeaderTransactionType = Partial<BankHeaderTransactionType>

export type BankTransactionItemAdditionalDataType = Partial<{
  accountNumber: string
  modelString: string
  description: string
  code: string
  transactionKey: string
}>

export type TBankTransactionItemType = Partial<Merge<BankTransactionItemType, {
  accountSearch: string
  bankAccount: TBankAccount
  customer: TCustomer
  additionalData: BankTransactionItemAdditionalDataType
}>>

export type TCustomerSummarizeNextWeek = {
  dueDate: string
  financeOwes: number
  financeClaims: number
  sum: number
}

export type TSummarizeTodayFuture = {
  financeToday: number
  financeFuture: number
}

export type TClientCustomerCardSummarize = Partial<{
  customer: TCustomer
  financeOwes: number
  financeClaims: number
  financeBankOwes: number
  financeBankClaims: number
  invoiceDueDate: TSummarizeTodayFuture
  calculationDueDate: TSummarizeTodayFuture
}>

export type TProformaInvoice = Partial<Merge<ProformaInvoice, {
  customer: TCustomer
  warehouse: TWarehouse
  items: TInvoiceItem[]
  notes: TNotes[]
  discount: TDiscounts[]
  expense: TExpense[]
  vats: TTaxFinance[]
}>>

export type TBankTransactionParsePdfItem = Partial<{
  claim: number
  owes: number
  paidDate: Date
  code: string
  bankAccount?: TBankAccount
}>

export type TBankTransactionParsePdf = {
  bankAccount: string
  items: TBankTransactionParsePdfItem[]
}

export type TReturnInvoice = Partial<Merge<ReturnInvoice, {
  customer: TCustomer
  warehouse: TWarehouse
  items: TInvoiceItem[]
  dueDates: TDueDates[]
  notes: TNotes[]
  expense: TExpense[]
  vats: TTaxFinance[]
}>>

export type TTaxFinance = Partial<TaxFinance>
export type TDueDates = Partial<DueDates>

export type TFinanceTransferDocument = Partial<Merge<FinanceTransferDocument, {
  tax: TTaxFinance
  notes: TNotes[]
  dueDates: TDueDates[]
}>>

export type TInvoiceAdvanceInvoice = Partial<Merge<InvoiceAdvanceInvoice, {
  invoice: TInvoice
  financeTransferDocument: TFinanceTransferDocument
}>>

export type TNormativeItem = Partial<Merge<NormativeItem, {
  item: TItem
}>>

export type TNormative = Partial<Merge<Normative, {
  item: TItem
}>>

export type TProductionOrderItem = Partial<Merge<ProductionOrderItem, {
  item: TItem
}>>

export type TProductionOrder = Partial<Merge<ProductionOrder, {
  item: TItem,
  normative: TNormative,
  items: TProductionOrderItem[]
  expense: TExpense[]
}>>

export type TCategoryRelationship = Partial<CategoryRelationship>

export type TCategory = Partial<Merge<Category, {
  children: TCategoryRelationship[]
}>>