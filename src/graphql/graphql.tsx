import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  workOrder?: Maybe<WorkOrder>;
  workOrders: ResponseWorkOrders;
  travelOrder?: Maybe<TravelOrder>;
  travelOrders: ResponseTravelOrders;
  invoiceVersion?: Maybe<InvoiceVersion>;
  invoiceVersions: ResponseInvoiceVersions;
  bankHeaderTransactions: ResponseBankHeaderTransactions;
  applicationData: ResponseApplicationData;
  user?: Maybe<User>;
  users: ResponseUsers;
  customer?: Maybe<Customer>;
  customers: ResponseCustomers;
  item?: Maybe<Item>;
  items: ResponseItems;
  category?: Maybe<Category>;
  categories: ResponseCategories;
  receipt?: Maybe<Receipt>;
  receipts: ResponseReceipts;
  client?: Maybe<Client>;
  clients: ResponseClients;
  financeTransferDocument?: Maybe<FinanceTransferDocument>;
  financeTransferDocuments: ResponseFinanceTransferDocuments;
  invoice?: Maybe<Invoice>;
  invoices: ResponseInvoices;
  productionOrder?: Maybe<ProductionOrder>;
  productionOrders: ResponseProductionOrders;
  normative?: Maybe<Normative>;
  normatives: ResponseNormatives;
  calculation?: Maybe<Calculation>;
  calculations: ResponseCalculations;
  warehouseItem?: Maybe<WarehouseItem>;
  warehouseItems: ResponseWarehouseItems;
  returnInvoice?: Maybe<ReturnInvoice>;
  returnInvoices: ResponseReturnInvoices;
  warehouseFinance?: Maybe<WarehouseFinance>;
  warehouseFinances: ResponseWarehouseFinances;
  proformaInvoice?: Maybe<ProformaInvoice>;
  proformaInvoices: ResponseProformaInvoices;
  warehouse?: Maybe<Warehouse>;
  warehouses: ResponseWarehouses;
  currencyDefinition?: Maybe<CurrencyDefinition>;
  currencyDefinitions: ResponseCurrencyDefinitions;
  currencyValue?: Maybe<CurrencyValue>;
  currencyValues: ResponseCurrencyValues;
  settings: ResponseSettings;
  getCurrencyList: Array<CurrencyValue>;
  bank?: Maybe<Bank>;
  banks: Array<Bank>;
  bankAccountFilter?: Maybe<Array<BankAccount>>;
  bankAccount?: Maybe<BankAccount>;
  taxDefinitions: Array<Tax>;
  getValidTax: Array<Tax>;
  warehouseItemInfo: WarehouseItemInfo;
  warehouseItemsInfo: ResponseWarehouseItemsInfo;
  warehouseItemByFilter?: Maybe<Array<WarehouseItemInfo>>;
  dueDatesSummarizeByFilter?: Maybe<Array<DueDates>>;
  dueDates: ResponseDueDates;
  TransactionReturnInvoiceCustomerSum?: Maybe<TransactionCustomerSummarize>;
  getLastWarehouseItem?: Maybe<WarehouseItem>;
  TransactionCalculationCustomerSum?: Maybe<TransactionCustomerSummarize>;
  normativeSummarize: Normative;
  findItemsWithNormative?: Maybe<Array<Item>>;
  TransactionInvoiceCustomerSum?: Maybe<TransactionCustomerSummarize>;
  getLoggedClient?: Maybe<Client>;
  getClientLogoUrl?: Maybe<Scalars['String']>;
  getAllCategories?: Maybe<Array<Category>>;
  totalSaleTransactionByItem?: Maybe<TransactionItemSummarize>;
  totalTransactionBetweenDatesByItem?: Maybe<Array<TransactionItemSummarize>>;
  totalSaleItemsByYear?: Maybe<Array<TransactionItemSummarize>>;
  customerExternalByName: Array<Customer>;
  customerExternalByTin: Customer;
  customerExternalByBankAccount: Customer;
  address?: Maybe<Address>;
  triggerToken: LoginTokens;
  refreshToken: LoginTokens;
  login: LoginTokens;
  logged: User;
  userPasswordRecovery: Scalars['String'];
  getTranslate: Array<Translation>;
  authLogin: AuthLoginTokens;
  bankTransactionAccountsCustomerSum?: Maybe<BankTransactionCustomerSummarize>;
  bankTransactions: ResponseBankTransactions;
  bankHeaderTransaction?: Maybe<BankHeaderTransactions>;
  totalTransactionByAccount: BankHeaderTransactions;
  vehicle: Vehicle;
};


export type QueryWorkOrderArgs = {
  id: Scalars['Int'];
};


export type QueryWorkOrdersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryTravelOrderArgs = {
  id: Scalars['Int'];
};


export type QueryTravelOrdersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryInvoiceVersionArgs = {
  id: Scalars['Int'];
};


export type QueryInvoiceVersionsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryBankHeaderTransactionsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryApplicationDataArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryCustomerArgs = {
  id: Scalars['Int'];
};


export type QueryCustomersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryItemArgs = {
  id: Scalars['Int'];
};


export type QueryItemsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryCategoriesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryReceiptArgs = {
  id: Scalars['Int'];
};


export type QueryReceiptsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryClientArgs = {
  id: Scalars['Int'];
};


export type QueryClientsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryFinanceTransferDocumentArgs = {
  id: Scalars['Int'];
};


export type QueryFinanceTransferDocumentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryInvoiceArgs = {
  id: Scalars['Int'];
};


export type QueryInvoicesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryProductionOrderArgs = {
  id: Scalars['Int'];
};


export type QueryProductionOrdersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryNormativeArgs = {
  id: Scalars['Int'];
};


export type QueryNormativesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryCalculationArgs = {
  id: Scalars['Int'];
};


export type QueryCalculationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryWarehouseItemArgs = {
  id: Scalars['Int'];
};


export type QueryWarehouseItemsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryReturnInvoiceArgs = {
  id: Scalars['Int'];
};


export type QueryReturnInvoicesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryWarehouseFinanceArgs = {
  id: Scalars['Int'];
};


export type QueryWarehouseFinancesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryProformaInvoiceArgs = {
  id: Scalars['Int'];
};


export type QueryProformaInvoicesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryWarehouseArgs = {
  id: Scalars['Int'];
};


export type QueryWarehousesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryCurrencyDefinitionArgs = {
  id: Scalars['Int'];
};


export type QueryCurrencyDefinitionsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryCurrencyValueArgs = {
  id: Scalars['Int'];
};


export type QueryCurrencyValuesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QuerySettingsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryGetCurrencyListArgs = {
  date?: Maybe<Scalars['DateTime']>;
};


export type QueryBankArgs = {
  id: Scalars['Int'];
};


export type QueryBankAccountFilterArgs = {
  value: Scalars['String'];
};


export type QueryBankAccountArgs = {
  id: Scalars['Int'];
};


export type QueryGetValidTaxArgs = {
  date?: Maybe<Scalars['DateTime']>;
};


export type QueryWarehouseItemInfoArgs = {
  id: Scalars['Int'];
};


export type QueryWarehouseItemsInfoArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryWarehouseItemByFilterArgs = {
  warehouseId: Scalars['Int'];
  value: Scalars['String'];
};


export type QueryDueDatesSummarizeByFilterArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryDueDatesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryTransactionReturnInvoiceCustomerSumArgs = {
  dateEnd?: Maybe<Scalars['DateTime']>;
  dateStart?: Maybe<Scalars['DateTime']>;
  customerId?: Maybe<Scalars['Int']>;
};


export type QueryGetLastWarehouseItemArgs = {
  itemId: Scalars['Int'];
  warehouseId: Scalars['Int'];
};


export type QueryTransactionCalculationCustomerSumArgs = {
  dateEnd?: Maybe<Scalars['DateTime']>;
  dateStart?: Maybe<Scalars['DateTime']>;
  customerId?: Maybe<Scalars['Int']>;
};


export type QueryNormativeSummarizeArgs = {
  id: Scalars['Int'];
};


export type QueryFindItemsWithNormativeArgs = {
  value: Scalars['String'];
};


export type QueryTransactionInvoiceCustomerSumArgs = {
  dateEnd?: Maybe<Scalars['DateTime']>;
  dateStart?: Maybe<Scalars['DateTime']>;
  customerId?: Maybe<Scalars['Int']>;
};


export type QueryTotalSaleTransactionByItemArgs = {
  dateEnd?: Maybe<Scalars['DateTime']>;
  dateStart?: Maybe<Scalars['DateTime']>;
  itemId: Scalars['Int'];
};


export type QueryTotalTransactionBetweenDatesByItemArgs = {
  dateEnd?: Maybe<Scalars['DateTime']>;
  dateStart?: Maybe<Scalars['DateTime']>;
  itemId: Scalars['Int'];
};


export type QueryTotalSaleItemsByYearArgs = {
  itemId: Scalars['Int'];
};


export type QueryCustomerExternalByNameArgs = {
  value: Scalars['String'];
};


export type QueryCustomerExternalByTinArgs = {
  value: Scalars['String'];
};


export type QueryCustomerExternalByBankAccountArgs = {
  value: Scalars['String'];
};


export type QueryAddressArgs = {
  id: Scalars['Int'];
};


export type QueryLoginArgs = {
  data: LoginType;
};


export type QueryUserPasswordRecoveryArgs = {
  email: Scalars['String'];
};


export type QueryGetTranslateArgs = {
  force?: Maybe<Scalars['Boolean']>;
  lang: Scalars['String'];
};


export type QueryAuthLoginArgs = {
  data: AuthUserLogin;
};


export type QueryBankTransactionAccountsCustomerSumArgs = {
  dateEnd?: Maybe<Scalars['DateTime']>;
  dateStart?: Maybe<Scalars['DateTime']>;
  customerId?: Maybe<Scalars['Int']>;
};


export type QueryBankTransactionsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryBankHeaderTransactionArgs = {
  id: Scalars['Int'];
};


export type QueryTotalTransactionByAccountArgs = {
  bankAccountId: Scalars['Int'];
};


export type QueryVehicleArgs = {
  id: Scalars['Int'];
};

export type WorkOrder = {
  __typename?: 'WorkOrder';
  id: Scalars['ID'];
  fromWarehouseId: Scalars['Int'];
  toWarehouseId: Scalars['Int'];
  finance?: Maybe<Scalars['Float']>;
  transferDate: Scalars['DateTime'];
  status?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  fromWarehouse: Warehouse;
  toWarehouse: Warehouse;
  workOrderItems?: Maybe<Array<WorkOrderItem>>;
};


export type Client = {
  __typename?: 'Client';
  id: Scalars['ID'];
  accountCode: Scalars['String'];
  shortName: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  taxNumber: Scalars['String'];
  uniqueCompanyNumber?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  addresses?: Maybe<Array<Address>>;
  settings?: Maybe<Array<Settings>>;
  customer?: Maybe<Array<Customer>>;
  banks?: Maybe<Array<BankAccount>>;
  contacts?: Maybe<Array<Contact>>;
  taxFinance?: Maybe<Array<TaxFinance>>;
  dueDates?: Maybe<Array<DueDates>>;
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['ID'];
  street?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  customerId?: Maybe<Scalars['Int']>;
  clientId?: Maybe<Scalars['Int']>;
  warehouseId?: Maybe<Scalars['Int']>;
};

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['ID'];
  key: Scalars['String'];
  value: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['ID'];
  shortName: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  taxNumber: Scalars['String'];
  uniqueCompanyNumber?: Maybe<Scalars['String']>;
  totalOwes?: Maybe<Scalars['Float']>;
  totalClaims?: Maybe<Scalars['Float']>;
  paidFrom?: Maybe<Scalars['Float']>;
  paidTo?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client?: Maybe<Client>;
  addresses?: Maybe<Array<Address>>;
  contacts?: Maybe<Array<Contact>>;
  banks?: Maybe<Array<BankAccount>>;
  infos?: Maybe<Array<CustomerInfo>>;
  financeTransferDocument?: Maybe<Array<FinanceTransferDocument>>;
  dueDates?: Maybe<Array<DueDates>>;
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['ID'];
  type: Scalars['String'];
  value: Scalars['String'];
  description: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
  customerId?: Maybe<Scalars['Int']>;
  clientId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type BankAccount = {
  __typename?: 'BankAccount';
  id: Scalars['ID'];
  account?: Maybe<Scalars['String']>;
  accountString?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  bankId: Scalars['Int'];
  customerId?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  client: Client;
  customer?: Maybe<Customer>;
  bank?: Maybe<Bank>;
};

export type Bank = {
  __typename?: 'Bank';
  id: Scalars['ID'];
  bankName: Scalars['String'];
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type CustomerInfo = {
  __typename?: 'CustomerInfo';
  id: Scalars['ID'];
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
  valueJSON?: Maybe<Scalars['JSON']>;
  status?: Maybe<Scalars['Int']>;
  customerId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  customer: Customer;
  client: Client;
};


export type FinanceTransferDocument = {
  __typename?: 'FinanceTransferDocument';
  id: Scalars['ID'];
  number?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  itemDescription?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  documentType?: Maybe<Scalars['Int']>;
  flag?: Maybe<Scalars['Int']>;
  customerId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  customer?: Maybe<Customer>;
  tax?: Maybe<Array<TaxFinance>>;
  dueDates?: Maybe<Array<DueDates>>;
  notes?: Maybe<Array<Notes>>;
  invoiceAdvance?: Maybe<Array<InvoiceAdvanceInvoice>>;
};

export type TaxFinance = {
  __typename?: 'TaxFinance';
  id: Scalars['ID'];
  date?: Maybe<Scalars['String']>;
  taxFinance: Scalars['Float'];
  taxPercent: Scalars['Float'];
  financeMP: Scalars['Float'];
  taxId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  flag?: Maybe<Scalars['Int']>;
  financeTransferDocumentId?: Maybe<Scalars['Int']>;
  invoiceId?: Maybe<Scalars['Int']>;
  returnInvoiceId?: Maybe<Scalars['Int']>;
  proformaInvoiceId?: Maybe<Scalars['Int']>;
  calculationId?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  tax?: Maybe<Tax>;
};

export type Tax = {
  __typename?: 'Tax';
  id: Scalars['ID'];
  name: Scalars['String'];
  short: Scalars['String'];
  mark: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  values?: Maybe<Array<TaxValue>>;
};

export type TaxValue = {
  __typename?: 'TaxValue';
  id: Scalars['ID'];
  value: Scalars['Float'];
  date: Scalars['DateTime'];
  taxId: Scalars['Int'];
  clientId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  tax?: Maybe<Tax>;
};

export type DueDates = {
  __typename?: 'DueDates';
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  finance: Scalars['Float'];
  date?: Maybe<Scalars['String']>;
  flag?: Maybe<Scalars['Int']>;
  status: Scalars['Int'];
  calculationId?: Maybe<Scalars['Int']>;
  invoiceId?: Maybe<Scalars['Int']>;
  returnInvoiceId?: Maybe<Scalars['Int']>;
  financeTransferDocumentId?: Maybe<Scalars['Int']>;
  customerId?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  calculation?: Maybe<Calculation>;
  invoice?: Maybe<Invoice>;
  returnInvoice?: Maybe<ReturnInvoice>;
  financeTransferDocument?: Maybe<FinanceTransferDocument>;
};

export type Calculation = {
  __typename?: 'Calculation';
  id: Scalars['ID'];
  number?: Maybe<Scalars['String']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  totalFinanceVP?: Maybe<Scalars['Float']>;
  financeTax: Scalars['Float'];
  totalFinanceMP: Scalars['Float'];
  expenseInternalFinanceMP?: Maybe<Scalars['Float']>;
  expenseInternalFinanceTax?: Maybe<Scalars['Float']>;
  expenseTotalFinanceMP?: Maybe<Scalars['Float']>;
  expenseTotalFinanceTax?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  bookDate?: Maybe<Scalars['DateTime']>;
  clientId: Scalars['Int'];
  supplierId?: Maybe<Scalars['Int']>;
  warehouseId?: Maybe<Scalars['Int']>;
  retailShopId?: Maybe<Scalars['Int']>;
  itemInputType?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  supplier?: Maybe<Customer>;
  warehouse?: Maybe<Warehouse>;
  discount?: Maybe<Array<Discounts>>;
  dueDate?: Maybe<Array<DueDates>>;
  vats?: Maybe<Array<TaxFinance>>;
  expense?: Maybe<Array<Expense>>;
  items?: Maybe<Array<CalculationItem>>;
};

export type Warehouse = {
  __typename?: 'Warehouse';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  financeTotalOwes?: Maybe<Scalars['Float']>;
  financeTotalClaims?: Maybe<Scalars['Float']>;
  flag?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  addresses?: Maybe<Array<Address>>;
};

export type Discounts = {
  __typename?: 'Discounts';
  id: Scalars['ID'];
  percent?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  invoiceId?: Maybe<Scalars['Int']>;
  proformaInvoiceId?: Maybe<Scalars['Int']>;
  calculationId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Expense = {
  __typename?: 'Expense';
  id: Scalars['ID'];
  invoiceNumber?: Maybe<Scalars['String']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  financeMP?: Maybe<Scalars['Float']>;
  financeTax?: Maybe<Scalars['Float']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  calculationId?: Maybe<Scalars['Int']>;
  invoiceId?: Maybe<Scalars['Int']>;
  proformaInvoiceId?: Maybe<Scalars['Int']>;
  returnInvoiceId?: Maybe<Scalars['Int']>;
  productionOrderId?: Maybe<Scalars['Int']>;
  customerId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  calculation?: Maybe<Calculation>;
  invoice?: Maybe<Invoice>;
  returnInvoice?: Maybe<ReturnInvoice>;
  proformaInvoice?: Maybe<ProformaInvoice>;
  productionOrder?: Maybe<ProductionOrder>;
  customer?: Maybe<Customer>;
  items?: Maybe<Array<ExpenseItem>>;
};

export type Invoice = {
  __typename?: 'Invoice';
  id: Scalars['ID'];
  flag?: Maybe<Scalars['Int']>;
  number?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  totalFinanceVP?: Maybe<Scalars['Float']>;
  totalFinanceTax?: Maybe<Scalars['Float']>;
  totalFinanceMP?: Maybe<Scalars['Float']>;
  currencyValue?: Maybe<Scalars['Float']>;
  discountDefault?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Int']>;
  currencyId?: Maybe<Scalars['Int']>;
  customerId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  customer?: Maybe<Customer>;
  discount?: Maybe<Array<Discounts>>;
  notes?: Maybe<Array<Notes>>;
  dueDates?: Maybe<Array<DueDates>>;
  vats?: Maybe<Array<TaxFinance>>;
  expense?: Maybe<Array<Expense>>;
  items?: Maybe<Array<InvoiceItem>>;
  invoiceAdvance?: Maybe<Array<InvoiceAdvanceInvoice>>;
};

export type Notes = {
  __typename?: 'Notes';
  id: Scalars['ID'];
  note: Scalars['String'];
  invoiceId?: Maybe<Scalars['Int']>;
  proformaInvoiceId?: Maybe<Scalars['Int']>;
  returnInvoiceId?: Maybe<Scalars['Int']>;
  financeTransferDocumentId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type InvoiceItem = {
  __typename?: 'InvoiceItem';
  id: Scalars['ID'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  financeVP: Scalars['Float'];
  financeFinalVP: Scalars['Float'];
  taxPercent: Scalars['Float'];
  taxFinance: Scalars['Float'];
  useDiscountDefault: Scalars['Int'];
  taxId: Scalars['Int'];
  invoiceId?: Maybe<Scalars['Int']>;
  proformaInvoiceId?: Maybe<Scalars['Int']>;
  returnInvoiceId?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  itemId: Scalars['Int'];
  warehouseId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  invoice?: Maybe<Invoice>;
  proformaInvoice?: Maybe<ProformaInvoice>;
  returnInvoice?: Maybe<ReturnInvoice>;
  client: Client;
  item: Item;
  tax: Tax;
  warehouse: Warehouse;
  discount?: Maybe<Array<InvoiceItemDiscount>>;
};

export type ProformaInvoice = {
  __typename?: 'ProformaInvoice';
  id: Scalars['ID'];
  flag?: Maybe<Scalars['Int']>;
  number?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  totalFinanceVP?: Maybe<Scalars['Float']>;
  totalFinanceTax?: Maybe<Scalars['Float']>;
  totalFinanceMP?: Maybe<Scalars['Float']>;
  currencyValue?: Maybe<Scalars['Float']>;
  discountDefault?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Int']>;
  currencyId?: Maybe<Scalars['Int']>;
  invoiceId?: Maybe<Scalars['Int']>;
  customerId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  customer?: Maybe<Customer>;
  invoice?: Maybe<Invoice>;
  vats?: Maybe<Array<TaxFinance>>;
  discount?: Maybe<Array<InvoiceDiscount>>;
  notes?: Maybe<Array<Notes>>;
  expense?: Maybe<Array<Expense>>;
  items?: Maybe<Array<InvoiceItem>>;
};

export type InvoiceDiscount = {
  __typename?: 'InvoiceDiscount';
  id: Scalars['ID'];
  percent?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  invoiceId?: Maybe<Scalars['Int']>;
  proformaInvoiceId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  invoice?: Maybe<Invoice>;
  proformaInvoice?: Maybe<ProformaInvoice>;
};

export type ReturnInvoice = {
  __typename?: 'ReturnInvoice';
  id: Scalars['ID'];
  flag?: Maybe<Scalars['Int']>;
  number?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  totalFinanceVP?: Maybe<Scalars['Float']>;
  totalFinanceTax?: Maybe<Scalars['Float']>;
  totalFinanceMP?: Maybe<Scalars['Float']>;
  currencyValue?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Int']>;
  currencyId?: Maybe<Scalars['Int']>;
  customerId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  customer?: Maybe<Customer>;
  notes?: Maybe<Array<Notes>>;
  dueDates?: Maybe<Array<DueDates>>;
  vats?: Maybe<Array<TaxFinance>>;
  expense?: Maybe<Array<Expense>>;
  items?: Maybe<Array<InvoiceItem>>;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['ID'];
  barCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  type: Scalars['Int'];
  shortName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  uom: Scalars['Int'];
  mp?: Maybe<Scalars['Float']>;
  vp?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Int']>;
  taxId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  tax: Tax;
  itemSuppliers?: Maybe<Array<ItemSupplier>>;
  warehouseItems?: Maybe<Array<WarehouseItem>>;
  norms?: Maybe<Array<Normative>>;
  images?: Maybe<Array<ItemsImages>>;
  itemsCategories?: Maybe<Array<ItemsCategory>>;
};

export type ItemSupplier = {
  __typename?: 'ItemSupplier';
  id: Scalars['ID'];
  code?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  itemId: Scalars['Int'];
  supplierId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  item: Item;
  supplier: Customer;
};

export type WarehouseItem = {
  __typename?: 'WarehouseItem';
  id: Scalars['ID'];
  quantityTransactionClaims?: Maybe<Scalars['Float']>;
  quantityTransactionOwes?: Maybe<Scalars['Float']>;
  priceTransaction: Scalars['Float'];
  quantityOnStack?: Maybe<Scalars['Float']>;
  financeOnStack?: Maybe<Scalars['Float']>;
  priceStack: Scalars['Float'];
  quantityTotalClaims?: Maybe<Scalars['Float']>;
  financeTotalClaims: Scalars['Float'];
  quantityTotalOwes?: Maybe<Scalars['Float']>;
  financeTotalOwes: Scalars['Float'];
  claimsOwes?: Maybe<Scalars['Int']>;
  transactionDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  warehouseId: Scalars['Int'];
  customerId: Scalars['Int'];
  invoiceId?: Maybe<Scalars['Int']>;
  returnInvoiceId?: Maybe<Scalars['Int']>;
  calculationId?: Maybe<Scalars['Int']>;
  itemId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  warehouse?: Maybe<Warehouse>;
  item?: Maybe<Item>;
  client?: Maybe<Client>;
  customer?: Maybe<Customer>;
  invoice?: Maybe<Invoice>;
  returnInvoice?: Maybe<ReturnInvoice>;
  calculation?: Maybe<Calculation>;
};

export type Normative = {
  __typename?: 'Normative';
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  clientId?: Maybe<Scalars['Int']>;
  itemId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client?: Maybe<Client>;
  item?: Maybe<Item>;
  items?: Maybe<Array<NormativeItem>>;
};

export type NormativeItem = {
  __typename?: 'NormativeItem';
  id: Scalars['ID'];
  quantity: Scalars['Float'];
  itemId: Scalars['Int'];
  normativeId: Scalars['Int'];
  activeNormativeId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  item: Item;
  normative: Normative;
};

export type ItemsImages = {
  __typename?: 'ItemsImages';
  id: Scalars['ID'];
  url: Scalars['String'];
  name: Scalars['String'];
  type?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  itemId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  item?: Maybe<Item>;
};

export type ItemsCategory = {
  __typename?: 'ItemsCategory';
  id: Scalars['ID'];
  itemId: Scalars['Int'];
  categoryId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  item?: Maybe<Item>;
  category?: Maybe<Category>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client?: Maybe<Client>;
  parent?: Maybe<Category>;
  children?: Maybe<Array<CategoryRelationship>>;
};

export type CategoryRelationship = {
  __typename?: 'CategoryRelationship';
  id: Scalars['ID'];
  parent: Scalars['Int'];
  child: Scalars['Int'];
  type?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type InvoiceItemDiscount = {
  __typename?: 'InvoiceItemDiscount';
  id: Scalars['ID'];
  percent?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  invoiceItemId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  invoiceItem: InvoiceItem;
};

export type InvoiceAdvanceInvoice = {
  __typename?: 'InvoiceAdvanceInvoice';
  id: Scalars['ID'];
  date: Scalars['DateTime'];
  itemDescription?: Maybe<Scalars['String']>;
  totalFinanceVP?: Maybe<Scalars['Float']>;
  totalFinanceTax?: Maybe<Scalars['Float']>;
  totalFinanceMP?: Maybe<Scalars['Float']>;
  currencyValue?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Int']>;
  currencyId?: Maybe<Scalars['Int']>;
  invoiceId: Scalars['Int'];
  financeTransferDocumentId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  invoice: Invoice;
  financeTransferDocument: FinanceTransferDocument;
};

export type ProductionOrder = {
  __typename?: 'ProductionOrder';
  id: Scalars['ID'];
  number?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  dateFinish?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  status: Scalars['Int'];
  itemId?: Maybe<Scalars['Int']>;
  normativeId?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  item?: Maybe<Item>;
  normative?: Maybe<Normative>;
  items?: Maybe<Array<ProductionOrderItem>>;
  expense?: Maybe<Array<Expense>>;
};

export type ProductionOrderItem = {
  __typename?: 'ProductionOrderItem';
  id: Scalars['ID'];
  quantity: Scalars['Float'];
  itemId?: Maybe<Scalars['Int']>;
  productionOrderId?: Maybe<Scalars['Int']>;
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  item?: Maybe<Item>;
};

export type ExpenseItem = {
  __typename?: 'ExpenseItem';
  id: Scalars['ID'];
  financeMP?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  taxPercent: Scalars['Float'];
  taxId?: Maybe<Scalars['Int']>;
  expenseId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  expense?: Maybe<Expense>;
  tax?: Maybe<Tax>;
};

export type CalculationItem = {
  __typename?: 'CalculationItem';
  id: Scalars['ID'];
  posNumber?: Maybe<Scalars['Float']>;
  taxPercent: Scalars['Float'];
  quantity: Scalars['Float'];
  financeVP?: Maybe<Scalars['Float']>;
  financeMP?: Maybe<Scalars['Float']>;
  financeExpInternalVP?: Maybe<Scalars['Float']>;
  financeExpInternalMP?: Maybe<Scalars['Float']>;
  financeFinalVP?: Maybe<Scalars['Float']>;
  financeFinalMP?: Maybe<Scalars['Float']>;
  calculationId: Scalars['Int'];
  itemId: Scalars['Int'];
  taxId: Scalars['Int'];
  supplierItemId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  calculation: Calculation;
  item: Item;
  itemSupplier: ItemSupplier;
  tax: Tax;
};

export type WorkOrderItem = {
  __typename?: 'WorkOrderItem';
  id: Scalars['ID'];
  quantity: Scalars['Float'];
  taxPercent: Scalars['Float'];
  price: Scalars['Float'];
  finance?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Int']>;
  warehouseItemInfoId: Scalars['Int'];
  workOrderId: Scalars['Int'];
  taxId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  warehouseItemInfo: WarehouseItemInfo;
  workOrder: WorkOrder;
  client?: Maybe<Client>;
  tax?: Maybe<Tax>;
};

export type WarehouseItemInfo = {
  __typename?: 'WarehouseItemInfo';
  id: Scalars['ID'];
  warehouseId: Scalars['Int'];
  itemId: Scalars['Int'];
  warehouseItemId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  warehouse?: Maybe<Warehouse>;
  item?: Maybe<Item>;
  warehouseItem?: Maybe<WarehouseItem>;
};

export type Sorting = {
  direction?: Maybe<Scalars['String']>;
  field: Scalars['String'];
};

export type ResponseWorkOrders = {
  __typename?: 'responseWorkOrders';
  items: Array<WorkOrder>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type TravelOrder = {
  __typename?: 'TravelOrder';
  id: Scalars['ID'];
  dateIssued: Scalars['DateTime'];
  dateStart: Scalars['DateTime'];
  dateEnd: Scalars['DateTime'];
  totalHours: Scalars['Int'];
  noOfDays: Scalars['Int'];
  wageFinance: Scalars['Float'];
  totalFinance: Scalars['Float'];
  from: Scalars['String'];
  to: Scalars['String'];
  reason: Scalars['String'];
  totalDistance: Scalars['Int'];
  totalConsumption: Scalars['Int'];
  vehicleId: Scalars['Int'];
  clientId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client?: Maybe<Client>;
  vehicle?: Maybe<Vehicle>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  id: Scalars['ID'];
  brand: Scalars['String'];
  model: Scalars['String'];
  registrationNumber: Scalars['String'];
  consumption: Scalars['Float'];
  hasNorm?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  fuelTypeId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client?: Maybe<Client>;
  fuelType?: Maybe<FuelType>;
};

export type FuelType = {
  __typename?: 'FuelType';
  id: Scalars['ID'];
  type: Scalars['String'];
  name: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ResponseTravelOrders = {
  __typename?: 'responseTravelOrders';
  items: Array<TravelOrder>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type InvoiceVersion = {
  __typename?: 'InvoiceVersion';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ResponseInvoiceVersions = {
  __typename?: 'responseInvoiceVersions';
  items: Array<InvoiceVersion>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseBankHeaderTransactions = {
  __typename?: 'responseBankHeaderTransactions';
  items: Array<BankHeaderTransactions>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type BankHeaderTransactions = {
  __typename?: 'BankHeaderTransactions';
  id: Scalars['ID'];
  documentId?: Maybe<Scalars['String']>;
  financeClaims?: Maybe<Scalars['Float']>;
  financeOwes?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  dateProcessed?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  bankAccountId: Scalars['Int'];
  userId?: Maybe<Scalars['Int']>;
  clientId?: Maybe<Scalars['Int']>;
  client?: Maybe<Client>;
  bankAccount: BankAccount;
  bankTransactions?: Maybe<Array<BankTransactions>>;
};

export type BankTransactions = {
  __typename?: 'BankTransactions';
  id: Scalars['ID'];
  finance?: Maybe<Scalars['Float']>;
  expenses?: Maybe<Scalars['Float']>;
  datePaid?: Maybe<Scalars['String']>;
  dateProcessed?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  flag?: Maybe<Scalars['Int']>;
  customerId?: Maybe<Scalars['Int']>;
  clientId?: Maybe<Scalars['Int']>;
  bankAccountId?: Maybe<Scalars['Int']>;
  bankHeaderTransactionId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  bankHeaderTransaction: BankHeaderTransactions;
  customer?: Maybe<Customer>;
  bankAccount?: Maybe<BankAccount>;
  transactionAdditionalData?: Maybe<BankTransactionAdditionalData>;
};

export type BankTransactionAdditionalData = {
  __typename?: 'BankTransactionAdditionalData';
  id: Scalars['ID'];
  accountNumber?: Maybe<Scalars['String']>;
  modelString?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  transactionKey?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  bankTransactionsId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ResponseApplicationData = {
  __typename?: 'responseApplicationData';
  items: Array<ApplicationData>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ApplicationData = {
  __typename?: 'ApplicationData';
  id: Scalars['ID'];
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
  valueJSON?: Maybe<Scalars['JSON']>;
  status?: Maybe<Scalars['Int']>;
  clientId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
  password: Scalars['String'];
  status: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  updatedBy?: Maybe<Scalars['String']>;
  client: Client;
};

export type ResponseUsers = {
  __typename?: 'responseUsers';
  items: Array<User>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseCustomers = {
  __typename?: 'responseCustomers';
  items: Array<Customer>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseItems = {
  __typename?: 'responseItems';
  items: Array<Item>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseCategories = {
  __typename?: 'responseCategories';
  items: Array<Category>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type Receipt = {
  __typename?: 'Receipt';
  id: Scalars['ID'];
  receiptNumber: Scalars['String'];
  currencyValue?: Maybe<Scalars['Float']>;
  clientId: Scalars['Int'];
  currencyId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  client: Client;
  currency?: Maybe<CurrencyDefinition>;
  items?: Maybe<Array<ReceiptItem>>;
  payments?: Maybe<Array<ReceiptPayment>>;
};

export type CurrencyDefinition = {
  __typename?: 'CurrencyDefinition';
  id: Scalars['ID'];
  name: Scalars['String'];
  short: Scalars['String'];
  mark: Scalars['String'];
  country: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  values?: Maybe<Array<CurrencyValue>>;
};

export type CurrencyValue = {
  __typename?: 'CurrencyValue';
  id: Scalars['ID'];
  date: Scalars['String'];
  dateTo: Scalars['String'];
  dateCreated: Scalars['String'];
  unit: Scalars['Float'];
  buyingRate: Scalars['Float'];
  middleRate: Scalars['Float'];
  sellingRate: Scalars['Float'];
  currencyDefinitionId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  currencyDefinition: CurrencyDefinition;
};

export type ReceiptItem = {
  __typename?: 'ReceiptItem';
  id: Scalars['ID'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  financeVP?: Maybe<Scalars['Float']>;
  discountPercent?: Maybe<Scalars['Float']>;
  discountValue?: Maybe<Scalars['Float']>;
  financeFinalVP?: Maybe<Scalars['Float']>;
  taxPercent: Scalars['Float'];
  taxFinance?: Maybe<Scalars['Float']>;
  receiptId: Scalars['Int'];
  itemId: Scalars['Int'];
  taxId: Scalars['Int'];
  warehouseItemId?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  date?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  item: Item;
  tax: Tax;
  receipt: Receipt;
  warehouseItem?: Maybe<WarehouseItem>;
};

export type ReceiptPayment = {
  __typename?: 'ReceiptPayment';
  id: Scalars['ID'];
  type: Scalars['Int'];
  value: Scalars['Float'];
  receiptId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  receipt: Receipt;
};

export type ResponseReceipts = {
  __typename?: 'responseReceipts';
  items: Array<Receipt>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseClients = {
  __typename?: 'responseClients';
  items: Array<Client>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseFinanceTransferDocuments = {
  __typename?: 'responseFinanceTransferDocuments';
  items: Array<FinanceTransferDocument>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseInvoices = {
  __typename?: 'responseInvoices';
  items: Array<Invoice>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseProductionOrders = {
  __typename?: 'responseProductionOrders';
  items: Array<ProductionOrder>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseNormatives = {
  __typename?: 'responseNormatives';
  items: Array<Normative>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseCalculations = {
  __typename?: 'responseCalculations';
  items: Array<Calculation>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseWarehouseItems = {
  __typename?: 'responseWarehouseItems';
  items: Array<WarehouseItem>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseReturnInvoices = {
  __typename?: 'responseReturnInvoices';
  items: Array<ReturnInvoice>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type WarehouseFinance = {
  __typename?: 'WarehouseFinance';
  id: Scalars['ID'];
  date: Scalars['DateTime'];
  owes: Scalars['Float'];
  claims: Scalars['Float'];
  balance: Scalars['Float'];
  totalOwes: Scalars['Float'];
  totalClaims: Scalars['Float'];
  warehouseId: Scalars['Int'];
  calculationId?: Maybe<Scalars['Int']>;
  invoiceId?: Maybe<Scalars['Int']>;
  returnInvoiceId?: Maybe<Scalars['Int']>;
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  warehouse: Warehouse;
  client: Client;
  returnInvoice?: Maybe<ReturnInvoice>;
  invoice?: Maybe<Invoice>;
  calculation?: Maybe<Calculation>;
};

export type ResponseWarehouseFinances = {
  __typename?: 'responseWarehouseFinances';
  items: Array<WarehouseFinance>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseProformaInvoices = {
  __typename?: 'responseProformaInvoices';
  items: Array<ProformaInvoice>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseWarehouses = {
  __typename?: 'responseWarehouses';
  items: Array<Warehouse>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseCurrencyDefinitions = {
  __typename?: 'responseCurrencyDefinitions';
  items: Array<CurrencyDefinition>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseCurrencyValues = {
  __typename?: 'responseCurrencyValues';
  items: Array<CurrencyValue>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseSettings = {
  __typename?: 'responseSettings';
  items: Array<Settings>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseWarehouseItemsInfo = {
  __typename?: 'responseWarehouseItemsInfo';
  items: Array<WarehouseItemInfo>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseDueDates = {
  __typename?: 'responseDueDates';
  items: Array<DueDates>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type TransactionCustomerSummarize = {
  __typename?: 'TransactionCustomerSummarize';
  customer?: Maybe<Customer>;
  finance: Scalars['Float'];
};

export type TransactionItemSummarize = {
  __typename?: 'TransactionItemSummarize';
  item?: Maybe<Item>;
  date?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  financeVP: Scalars['Float'];
  taxFinance: Scalars['Float'];
};

export type LoginTokens = {
  __typename?: 'loginTokens';
  refresh: Scalars['String'];
};

export type LoginType = {
  accountCode?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Translation = {
  __typename?: 'Translation';
  key: Scalars['String'];
  translation?: Maybe<Scalars['String']>;
};

export type AuthUserLogin = {
  accountCode?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
  password: Scalars['String'];
};

export type AuthLoginTokens = {
  __typename?: 'AuthLoginTokens';
  token: Scalars['String'];
  user: User;
};

export type BankTransactionCustomerSummarize = {
  __typename?: 'BankTransactionCustomerSummarize';
  customer?: Maybe<Customer>;
  financeClaims: Scalars['Float'];
  financeOwes: Scalars['Float'];
};

export type ResponseBankTransactions = {
  __typename?: 'responseBankTransactions';
  items: Array<BankTransactions>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateWorkOrder: WorkOrder;
  insertWorkOrder: WorkOrder;
  updateTravelOrder: TravelOrder;
  insertTravelOrder: TravelOrder;
  updateInvoiceVersion: InvoiceVersion;
  insertInvoiceVersion: InvoiceVersion;
  updateBankHeaderTransactions: BankHeaderTransactions;
  insertBankHeaderTransactions: BankHeaderTransactions;
  updateApplicationData: ApplicationData;
  insertApplicationData: ApplicationData;
  updateUser: User;
  insertUser: User;
  updateCustomer: Customer;
  insertCustomer: Customer;
  updateItem: Item;
  insertItem: Item;
  updateCategory: Category;
  insertCategory: Category;
  updateReceipt: Receipt;
  insertReceipt: Receipt;
  updateClient: Client;
  insertClient: Client;
  updateFinanceTransferDocument: FinanceTransferDocument;
  insertFinanceTransferDocument: FinanceTransferDocument;
  updateInvoice: Invoice;
  insertInvoice: Invoice;
  updateProductionOrder: ProductionOrder;
  insertProductionOrder: ProductionOrder;
  updateNormative: Normative;
  insertNormative: Normative;
  updateCalculation: Calculation;
  insertCalculation: Calculation;
  updateWarehouseItem: WarehouseItem;
  insertWarehouseItem: WarehouseItem;
  updateReturnInvoice: ReturnInvoice;
  insertReturnInvoice: ReturnInvoice;
  updateWarehouseFinance: WarehouseFinance;
  insertWarehouseFinance: WarehouseFinance;
  updateProformaInvoice: ProformaInvoice;
  insertProformaInvoice: ProformaInvoice;
  updateWarehouse: Warehouse;
  insertWarehouse: Warehouse;
  updateCurrencyDefinition: CurrencyDefinition;
  insertCurrencyDefinition: CurrencyDefinition;
  updateCurrencyValue: CurrencyValue;
  insertCurrencyValue: CurrencyValue;
  updateSettings: Settings;
  insertSettings: Settings;
  updateBankAccount: BankAccount;
  updateContact: Contact;
  insertTaxDefinition: Array<Tax>;
  insertTaxValue: Array<Tax>;
  updateItemSupplier: ItemSupplier;
  deleteCalculationItem: Calculation;
  insertUpdateCalculationItem: Calculation;
  insertWarehouses: Scalars['String'];
  cloneProformaInvoice: ProformaInvoice;
  generateInvoice: ProformaInvoice;
  deleteInvoiceItem: Invoice;
  insertUpdateInvoiceItem: Invoice;
  testInsertWarehouseItem: Scalars['String'];
  deleteNormativeItem: Normative;
  insertNormativeItem: Normative;
  updateNormativeItem: Normative;
  deleteProductionOrderItem: ProductionOrder;
  insertProductionOrderItem: ProductionOrder;
  updateProductionOrderItem: ProductionOrder;
  uploadLogo: Scalars['String'];
  deleteCategory: Category;
  insertItems: Scalars['String'];
  testInsertItemsByClient: Scalars['String'];
  insertExternalCustomerByTin: Customer;
  insertCustomers: Scalars['String'];
  updateAddress: Address;
  resetPasswordByAdmin: Scalars['String'];
  userChangePassword: Scalars['String'];
  changePasswordByLink: Scalars['String'];
  authRegistration: Scalars['String'];
  authConfirmation: Scalars['String'];
  authPasswordChange: Scalars['String'];
  authPasswordRecovery: Scalars['String'];
  deleteBankTransaction: BankHeaderTransactions;
  insertBankTransactions: BankHeaderTransactions;
  updateBankTransaction: BankHeaderTransactions;
  uploadBankReport: BankHeaderTransactions;
  deleteBankHeaderTransaction?: Maybe<BankHeaderTransactions>;
  updateVehicle: Vehicle;
  updateWorkOrderItem: WorkOrderItem;
};


export type MutationUpdateWorkOrderArgs = {
  data: WorkOrderType;
  id: Scalars['Int'];
};


export type MutationInsertWorkOrderArgs = {
  data: WorkOrderType;
};


export type MutationUpdateTravelOrderArgs = {
  data: TravelOrderType;
  id: Scalars['Int'];
};


export type MutationInsertTravelOrderArgs = {
  data: TravelOrderType;
};


export type MutationUpdateInvoiceVersionArgs = {
  data: InvoiceVersionType;
  id: Scalars['Int'];
};


export type MutationInsertInvoiceVersionArgs = {
  data: InvoiceVersionType;
};


export type MutationUpdateBankHeaderTransactionsArgs = {
  data: BankTransactionType;
  id: Scalars['Int'];
};


export type MutationInsertBankHeaderTransactionsArgs = {
  data: BankTransactionType;
};


export type MutationUpdateApplicationDataArgs = {
  data: ApplicationDataType;
  id: Scalars['Int'];
};


export type MutationInsertApplicationDataArgs = {
  data: ApplicationDataType;
};


export type MutationUpdateUserArgs = {
  data: UserType;
  id: Scalars['Int'];
};


export type MutationInsertUserArgs = {
  data: UserType;
};


export type MutationUpdateCustomerArgs = {
  data: CustomerType;
  id: Scalars['Int'];
};


export type MutationInsertCustomerArgs = {
  data: CustomerType;
};


export type MutationUpdateItemArgs = {
  data: ItemType;
  id: Scalars['Int'];
};


export type MutationInsertItemArgs = {
  data: ItemType;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryType;
  id: Scalars['Int'];
};


export type MutationInsertCategoryArgs = {
  data: CategoryType;
};


export type MutationUpdateReceiptArgs = {
  data: ReceiptType;
  id: Scalars['Int'];
};


export type MutationInsertReceiptArgs = {
  data: ReceiptType;
};


export type MutationUpdateClientArgs = {
  data: ClientType;
  id: Scalars['Int'];
};


export type MutationInsertClientArgs = {
  data: ClientType;
};


export type MutationUpdateFinanceTransferDocumentArgs = {
  data: FinanceTransferDocumentUpdateType;
  id: Scalars['Int'];
};


export type MutationInsertFinanceTransferDocumentArgs = {
  data: FinanceTransferDocumentInsertType;
};


export type MutationUpdateInvoiceArgs = {
  data: InvoiceType;
  id: Scalars['Int'];
};


export type MutationInsertInvoiceArgs = {
  data: InvoiceType;
};


export type MutationUpdateProductionOrderArgs = {
  data: ProductionOrderType;
  id: Scalars['Int'];
};


export type MutationInsertProductionOrderArgs = {
  data: ProductionOrderType;
};


export type MutationUpdateNormativeArgs = {
  data: NormativeType;
  id: Scalars['Int'];
};


export type MutationInsertNormativeArgs = {
  data: NormativeType;
};


export type MutationUpdateCalculationArgs = {
  data: CalculationType;
  id: Scalars['Int'];
};


export type MutationInsertCalculationArgs = {
  data: CalculationType;
};


export type MutationUpdateWarehouseItemArgs = {
  data: WarehouseItemType;
  id: Scalars['Int'];
};


export type MutationInsertWarehouseItemArgs = {
  data: WarehouseItemType;
};


export type MutationUpdateReturnInvoiceArgs = {
  data: InvoiceType;
  id: Scalars['Int'];
};


export type MutationInsertReturnInvoiceArgs = {
  data: InvoiceType;
};


export type MutationUpdateWarehouseFinanceArgs = {
  data: WarehouseFinanceType;
  id: Scalars['Int'];
};


export type MutationInsertWarehouseFinanceArgs = {
  data: WarehouseFinanceType;
};


export type MutationUpdateProformaInvoiceArgs = {
  data: InvoiceType;
  id: Scalars['Int'];
};


export type MutationInsertProformaInvoiceArgs = {
  data: InvoiceType;
};


export type MutationUpdateWarehouseArgs = {
  data: WarehouseType;
  id: Scalars['Int'];
};


export type MutationInsertWarehouseArgs = {
  data: WarehouseType;
};


export type MutationUpdateCurrencyDefinitionArgs = {
  data: CurrencyDefinitionType;
  id: Scalars['Int'];
};


export type MutationInsertCurrencyDefinitionArgs = {
  data: CurrencyDefinitionType;
};


export type MutationUpdateCurrencyValueArgs = {
  data: CurrencyValueType;
  id: Scalars['Int'];
};


export type MutationInsertCurrencyValueArgs = {
  data: CurrencyValueType;
};


export type MutationUpdateSettingsArgs = {
  data: SettingsType;
  id: Scalars['Int'];
};


export type MutationInsertSettingsArgs = {
  data: SettingsType;
};


export type MutationUpdateBankAccountArgs = {
  data: BankAccountType;
  id: Scalars['Int'];
};


export type MutationUpdateContactArgs = {
  data: ContactType;
  id: Scalars['Int'];
};


export type MutationInsertTaxDefinitionArgs = {
  data: Array<TaxTypeDefine>;
};


export type MutationInsertTaxValueArgs = {
  data: TaxValuesType;
};


export type MutationUpdateItemSupplierArgs = {
  data: ItemSupplierType;
  id: Scalars['Int'];
};


export type MutationDeleteCalculationItemArgs = {
  calcId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationInsertUpdateCalculationItemArgs = {
  calcId: Scalars['Int'];
  id?: Maybe<Scalars['Int']>;
  data: CalculationItemType;
};


export type MutationInsertWarehousesArgs = {
  data: Array<WarehouseType>;
};


export type MutationCloneProformaInvoiceArgs = {
  id: Scalars['Int'];
};


export type MutationGenerateInvoiceArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteInvoiceItemArgs = {
  additionalData: InvoiceAdditionalType;
  id: Scalars['Int'];
};


export type MutationInsertUpdateInvoiceItemArgs = {
  additionalData: InvoiceAdditionalType;
  id?: Maybe<Scalars['Int']>;
  data: InvoiceItemType;
};


export type MutationTestInsertWarehouseItemArgs = {
  data: WarehouseItemsBulk;
};


export type MutationDeleteNormativeItemArgs = {
  id: Scalars['Int'];
};


export type MutationInsertNormativeItemArgs = {
  data: NormativeItemType;
};


export type MutationUpdateNormativeItemArgs = {
  data: NormativeItemType;
  id: Scalars['Int'];
};


export type MutationDeleteProductionOrderItemArgs = {
  id: Scalars['Int'];
};


export type MutationInsertProductionOrderItemArgs = {
  data: ProductionOrderItemType;
};


export type MutationUpdateProductionOrderItemArgs = {
  data: ProductionOrderItemType;
  id: Scalars['Int'];
};


export type MutationUploadLogoArgs = {
  file: Scalars['Upload'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationInsertItemsArgs = {
  data: Array<ItemType>;
};


export type MutationTestInsertItemsByClientArgs = {
  data: Array<ItemType>;
};


export type MutationInsertExternalCustomerByTinArgs = {
  value: Scalars['String'];
};


export type MutationInsertCustomersArgs = {
  data: Array<CustomerType>;
};


export type MutationUpdateAddressArgs = {
  data: AddressType;
  id: Scalars['Int'];
};


export type MutationResetPasswordByAdminArgs = {
  id: Scalars['Int'];
};


export type MutationUserChangePasswordArgs = {
  data: UserChangePasswordType;
};


export type MutationChangePasswordByLinkArgs = {
  data: ChangePasswordLinkType;
};


export type MutationAuthRegistrationArgs = {
  data: AuthUserRegister;
};


export type MutationAuthConfirmationArgs = {
  key: Scalars['String'];
};


export type MutationAuthPasswordChangeArgs = {
  data: AuthUserChangePassword;
};


export type MutationAuthPasswordRecoveryArgs = {
  email: Scalars['String'];
};


export type MutationDeleteBankTransactionArgs = {
  id: Scalars['Int'];
};


export type MutationInsertBankTransactionsArgs = {
  bankHeaderTransactionId: Scalars['Int'];
  data: Array<BankTransactionItemType>;
};


export type MutationUpdateBankTransactionArgs = {
  data: BankTransactionItemType;
  id: Scalars['Int'];
};


export type MutationUploadBankReportArgs = {
  file: Scalars['Upload'];
  id: Scalars['Int'];
};


export type MutationDeleteBankHeaderTransactionArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateVehicleArgs = {
  data: VehicleType;
  id: Scalars['Int'];
};


export type MutationUpdateWorkOrderItemArgs = {
  data: WorkOrderItemType;
  id: Scalars['Int'];
};

export type WorkOrderType = {
  fromWarehouseId?: Maybe<Scalars['Int']>;
  toWarehouseId?: Maybe<Scalars['Int']>;
  transferDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<WorkOrderItemType>>;
};

export type WorkOrderItemType = {
  warehouseItemInfoId?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Int']>;
};

export type TravelOrderType = {
  dateIssued?: Maybe<Scalars['DateTime']>;
  dateStart?: Maybe<Scalars['DateTime']>;
  dateEnd?: Maybe<Scalars['DateTime']>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  vehicleId?: Maybe<Scalars['Int']>;
  totalDistance?: Maybe<Scalars['Float']>;
  totalConsumption?: Maybe<Scalars['Float']>;
  users?: Maybe<Array<Scalars['Int']>>;
};

export type InvoiceVersionType = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
};

export type BankTransactionType = {
  header?: Maybe<BankHeaderTransactionType>;
  status?: Maybe<Scalars['Int']>;
};

export type BankHeaderTransactionType = {
  documentId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dateProcessed: Scalars['DateTime'];
  bankAccountId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
};

export type ApplicationDataType = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  valueJSON?: Maybe<Scalars['JSON']>;
  status?: Maybe<Scalars['Float']>;
};

export type UserType = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type CustomerType = {
  shortName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  uniqueCompanyNumber?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
  addresses?: Maybe<Array<AddressType>>;
  contacts?: Maybe<Array<ContactType>>;
  banks?: Maybe<Array<BankAccountType>>;
  infos?: Maybe<Array<CustomerInfoType>>;
};

export type AddressType = {
  street?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
};

export type ContactType = {
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
};

export type BankAccountType = {
  account?: Maybe<Scalars['String']>;
  bankId?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Float']>;
};

export type CustomerInfoType = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  valueJSON?: Maybe<Scalars['JSON']>;
  status?: Maybe<Scalars['Float']>;
};

export type ItemType = {
  type?: Maybe<Scalars['Int']>;
  shortName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  uom?: Maybe<Scalars['Int']>;
  barCode?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Int']>;
  taxId?: Maybe<Scalars['Int']>;
  vp?: Maybe<Scalars['Float']>;
  mp?: Maybe<Scalars['Float']>;
  categoryId?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Upload']>;
  itemSuppliers?: Maybe<Array<ItemSupplierType>>;
};


export type ItemSupplierType = {
  code?: Maybe<Scalars['Int']>;
  supplierId?: Maybe<Scalars['Int']>;
  itemId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
};

export type CategoryType = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
};

export type ReceiptType = {
  items?: Maybe<Array<ReceiptItemType>>;
  payments?: Maybe<Array<ReceiptPaymentType>>;
};

export type ReceiptItemType = {
  itemId: Scalars['Float'];
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  discountPercent?: Maybe<Scalars['Float']>;
  discountValue?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
};

export type ReceiptPaymentType = {
  type: Scalars['Float'];
  value: Scalars['Float'];
};

export type ClientType = {
  accountCode?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  uniqueCompanyNumber?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
  addresses?: Maybe<Array<AddressType>>;
  banks?: Maybe<Array<BankAccountType>>;
  contacts?: Maybe<Array<ContactType>>;
  infos?: Maybe<Array<CustomerInfoType>>;
};

export type FinanceTransferDocumentUpdateType = {
  status?: Maybe<Scalars['Int']>;
};

export type FinanceTransferDocumentInsertType = {
  customerId: Scalars['Int'];
  documentType?: Maybe<Scalars['Int']>;
  date: Scalars['DateTime'];
  taxId: Scalars['Float'];
  totalFinanceMP: Scalars['Float'];
  itemDescription: Scalars['String'];
  flag?: Maybe<Scalars['Int']>;
  notes?: Maybe<Array<InvoiceNoteType>>;
  dueDates?: Maybe<Array<DueDatesType>>;
};

export type InvoiceNoteType = {
  note: Scalars['String'];
};

export type DueDatesType = {
  finance: Scalars['Float'];
  date: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
};

export type InvoiceType = {
  header?: Maybe<InvoiceHeaderType>;
  footer?: Maybe<InvoiceFooterType>;
  items?: Maybe<Array<InvoiceItemType>>;
  status?: Maybe<Scalars['Int']>;
};

export type InvoiceHeaderType = {
  customerId: Scalars['Int'];
  discountDefault?: Maybe<Scalars['Float']>;
  flag: Scalars['Int'];
  date?: Maybe<Scalars['DateTime']>;
};

export type InvoiceFooterType = {
  notes?: Maybe<Array<InvoiceNoteType>>;
  dueDates?: Maybe<Array<InvoiceDueDateType>>;
  additionalExpense?: Maybe<Array<ExpenseType>>;
  discount?: Maybe<Array<InvoiceDiscountType>>;
};

export type InvoiceDueDateType = {
  finance: Scalars['Float'];
  dueDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
};

export type ExpenseType = {
  invoiceNumber?: Maybe<Scalars['String']>;
  invoiceDate?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  customerId?: Maybe<Scalars['Int']>;
  financeMP?: Maybe<Scalars['Float']>;
  financeTax?: Maybe<Scalars['Float']>;
  items: Array<ExpenseItemType>;
};

export type ExpenseItemType = {
  taxId: Scalars['Float'];
  financeMP: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
};

export type InvoiceDiscountType = {
  percent?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
};

export type InvoiceItemType = {
  quantity?: Maybe<Scalars['Float']>;
  discount?: Maybe<InvoiceDiscountType>;
  price?: Maybe<Scalars['Float']>;
  itemId: Scalars['Int'];
  warehouseId?: Maybe<Scalars['Int']>;
  useDiscountDefault?: Maybe<Scalars['Int']>;
};

export type ProductionOrderType = {
  header?: Maybe<ProductionOrderHeaderType>;
  status?: Maybe<Scalars['Int']>;
};

export type ProductionOrderHeaderType = {
  date: Scalars['DateTime'];
  itemId: Scalars['Int'];
  normativeId: Scalars['Int'];
  quantity: Scalars['Float'];
  expense?: Maybe<Array<ExpenseType>>;
};

export type NormativeType = {
  financeVP?: Maybe<Scalars['Float']>;
  itemId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  plannedPrice?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Int']>;
};

export type CalculationType = {
  header?: Maybe<CalculationHeaderType>;
  items?: Maybe<Array<CalculationItemType>>;
  itemInputType?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
};

export type CalculationHeaderType = {
  number?: Maybe<Scalars['String']>;
  invoiceNumber: Scalars['String'];
  totalFinanceMP: Scalars['Float'];
  financeTax: Scalars['Float'];
  date: Scalars['DateTime'];
  invoiceDate: Scalars['DateTime'];
  supplierId: Scalars['Int'];
  warehouseId: Scalars['Int'];
  dueDate: Array<CalculationDueDateType>;
  expense?: Maybe<Array<ExpenseType>>;
  additionalExpense?: Maybe<Array<ExpenseType>>;
  discount?: Maybe<Array<CalculationDiscountType>>;
  vats?: Maybe<Array<CalculationTaxType>>;
};

export type CalculationDueDateType = {
  description?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
  finance: Scalars['Float'];
};

export type CalculationDiscountType = {
  percent?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
};

export type CalculationTaxType = {
  taxId: Scalars['Float'];
  taxFinance: Scalars['Float'];
  financeMP?: Maybe<Scalars['Float']>;
};

export type CalculationItemType = {
  posNumber: Scalars['Float'];
  quantity?: Maybe<Scalars['Float']>;
  priceNoVat?: Maybe<Scalars['Float']>;
  priceWithVat?: Maybe<Scalars['Float']>;
  financeVP?: Maybe<Scalars['Float']>;
  financeMP?: Maybe<Scalars['Float']>;
  discountValue?: Maybe<Scalars['Float']>;
  discountPercent?: Maybe<Scalars['Float']>;
  itemId: Scalars['Int'];
};

export type WarehouseItemType = {
  itemId: Scalars['Int'];
  quantity: Scalars['Float'];
  price?: Maybe<Scalars['Float']>;
  finance?: Maybe<Scalars['Float']>;
};

export type WarehouseFinanceType = {
  date: Scalars['DateTime'];
  owes: Scalars['Float'];
  claims: Scalars['Float'];
  warehouseId: Scalars['Int'];
  invoiceId?: Maybe<Scalars['Int']>;
  calculationId?: Maybe<Scalars['Int']>;
};

export type WarehouseType = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  flag?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['Int']>;
};

export type CurrencyDefinitionType = {
  name?: Maybe<Scalars['String']>;
  short?: Maybe<Scalars['String']>;
  mark?: Maybe<Scalars['String']>;
  value?: Maybe<CurrencyValueType>;
  status?: Maybe<Scalars['Float']>;
};

export type CurrencyValueType = {
  date: Scalars['DateTime'];
  unit: Scalars['Float'];
  buyingRate: Scalars['Float'];
  middleRate: Scalars['Float'];
  sellingRate: Scalars['Float'];
  currencyDefinitionId: Scalars['Float'];
};

export type SettingsType = {
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Float']>;
};

export type TaxTypeDefine = {
  name: Scalars['String'];
  short: Scalars['String'];
  mark: Scalars['String'];
};

export type TaxValuesType = {
  date: Scalars['DateTime'];
  clientId?: Maybe<Scalars['Int']>;
  values: Array<TaxValueType>;
};

export type TaxValueType = {
  value: Scalars['Float'];
  taxId?: Maybe<Scalars['Int']>;
};

export type InvoiceAdditionalType = {
  invoiceId?: Maybe<Scalars['Int']>;
  proformaInvoiceId?: Maybe<Scalars['Int']>;
  returnInvoiceId?: Maybe<Scalars['Int']>;
};

export type WarehouseItemsBulk = {
  warehouseId: Scalars['Int'];
  customerId: Scalars['Int'];
  calculationId?: Maybe<Scalars['Int']>;
  invoiceId?: Maybe<Scalars['Int']>;
  items: Array<WarehouseItemType>;
};

export type NormativeItemType = {
  quantity?: Maybe<Scalars['Float']>;
  normativeId: Scalars['Int'];
  activeNormativeId?: Maybe<Scalars['Int']>;
  itemId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
};

export type ProductionOrderItemType = {
  quantity?: Maybe<Scalars['Float']>;
  itemId?: Maybe<Scalars['Int']>;
  productionOrderId?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
};

export type UserChangePasswordType = {
  password: Scalars['String'];
  currentPassword: Scalars['String'];
};

export type ChangePasswordLinkType = {
  password: Scalars['String'];
  key: Scalars['String'];
};

export type AuthUserRegister = {
  accountCode?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthUserChangePassword = {
  password: Scalars['String'];
  key: Scalars['String'];
};

export type BankTransactionItemType = {
  customerId?: Maybe<Scalars['Int']>;
  bankAccountId?: Maybe<Scalars['Int']>;
  finance?: Maybe<Scalars['Float']>;
  expenses?: Maybe<Scalars['Float']>;
  datePaid?: Maybe<Scalars['DateTime']>;
  dateProcessed?: Maybe<Scalars['DateTime']>;
  flag?: Maybe<Scalars['Int']>;
  additionalData?: Maybe<BankTransactionAdditionalDataType>;
};

export type BankTransactionAdditionalDataType = {
  accountNumber?: Maybe<Scalars['String']>;
  modelString?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  transactionKey?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type VehicleType = {
  brand?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  registrationNumber?: Maybe<Scalars['String']>;
  fuelTypeId?: Maybe<Scalars['Int']>;
  consumption?: Maybe<Scalars['Float']>;
  hasNorm?: Maybe<Scalars['Int']>;
};

export type Translate = {
  __typename?: 'Translate';
  id: Scalars['ID'];
  key: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
  sr: Scalars['String'];
  en: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Email = {
  __typename?: 'Email';
  id: Scalars['ID'];
  subject: Scalars['String'];
  to: Scalars['String'];
  numTryToSend: Scalars['Float'];
  status: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type CalculationDiscount = {
  __typename?: 'CalculationDiscount';
  id: Scalars['ID'];
  percent?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  calculationId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  calculation: Calculation;
};

export type TravelOrderUser = {
  __typename?: 'TravelOrderUser';
  id: Scalars['ID'];
  wage: Scalars['Float'];
  totalFinanceForUser: Scalars['Float'];
  travelOrderId: Scalars['Int'];
  userId: Scalars['Int'];
  status?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  travelOrder?: Maybe<TravelOrder>;
};

export type WarehouseSettings = {
  __typename?: 'WarehouseSettings';
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  warehouseId: Scalars['Int'];
  clientId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  warehouse?: Maybe<Warehouse>;
};

export type PaginationFilterSortPart = {
  direction: Scalars['String'];
  field: Scalars['String'];
};

export type PaginationFilterSearchPart = {
  value: Scalars['String'];
  fields: Array<Scalars['String']>;
};

export type PaginationFilterRequest = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<PaginationFilterSortPart>;
  filter?: Maybe<PaginationFilterSearchPart>;
};

export type ItemImageType = {
  url: Scalars['String'];
  itemId: Scalars['Int'];
};

export type ItemCategoryType = {
  itemId: Scalars['Int'];
  categoryId: Scalars['Int'];
};

export type CustomerSettingsType = {
  customerId: Scalars['Int'];
  settings: Array<CustomerInfoType>;
};

export type ApplicationDataDetailsFragment = (
  { __typename?: 'ApplicationData' }
  & Pick<ApplicationData, 'id' | 'key' | 'value' | 'valueJSON' | 'status' | 'createdAt' | 'updatedAt'>
);

export type AddressDetailsFragment = (
  { __typename?: 'Address' }
  & Pick<Address, 'id' | 'street' | 'zipCode' | 'city' | 'state' | 'description' | 'type' | 'status' | 'createdAt' | 'updatedAt'>
);

export type ContactDetailsFragment = (
  { __typename?: 'Contact' }
  & Pick<Contact, 'id' | 'type' | 'value' | 'description' | 'status' | 'createdAt' | 'updatedAt'>
);

export type BankAccountDetailsFragment = (
  { __typename?: 'BankAccount' }
  & Pick<BankAccount, 'id' | 'bankId' | 'account' | 'accountString' | 'customerId' | 'clientId' | 'status' | 'createdAt' | 'updatedAt'>
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'shortName' | 'fullName' | 'taxNumber'>
  )>, bank?: Maybe<(
    { __typename?: 'Bank' }
    & BankDetailsFragment
  )> }
);

export type CustomerDetailsShortFragment = (
  { __typename?: 'Customer' }
  & Pick<Customer, 'id' | 'shortName' | 'fullName' | 'description' | 'taxNumber' | 'uniqueCompanyNumber' | 'status' | 'createdAt' | 'updatedAt'>
  & { addresses?: Maybe<Array<(
    { __typename?: 'Address' }
    & AddressDetailsFragment
  )>> }
);

export type DueDatesDetailsFragment = (
  { __typename?: 'DueDates' }
  & Pick<DueDates, 'id' | 'date' | 'finance' | 'description' | 'flag' | 'invoiceId' | 'returnInvoiceId' | 'financeTransferDocumentId' | 'calculationId' | 'customerId' | 'status' | 'createdAt' | 'updatedAt'>
  & { calculation?: Maybe<(
    { __typename?: 'Calculation' }
    & Pick<Calculation, 'id' | 'number'>
  )>, returnInvoice?: Maybe<(
    { __typename?: 'ReturnInvoice' }
    & Pick<ReturnInvoice, 'id' | 'number'>
  )>, invoice?: Maybe<(
    { __typename?: 'Invoice' }
    & Pick<Invoice, 'id' | 'number'>
  )>, financeTransferDocument?: Maybe<(
    { __typename?: 'FinanceTransferDocument' }
    & Pick<FinanceTransferDocument, 'id' | 'number'>
  )> }
);

export type CustomerDetailsFragment = (
  { __typename?: 'Customer' }
  & Pick<Customer, 'id' | 'shortName' | 'fullName' | 'description' | 'taxNumber' | 'uniqueCompanyNumber' | 'status' | 'createdAt' | 'updatedAt'>
  & { addresses?: Maybe<Array<(
    { __typename?: 'Address' }
    & AddressDetailsFragment
  )>>, contacts?: Maybe<Array<(
    { __typename?: 'Contact' }
    & ContactDetailsFragment
  )>>, infos?: Maybe<Array<(
    { __typename?: 'CustomerInfo' }
    & CustomerInfoDetailsFragment
  )>>, banks?: Maybe<Array<(
    { __typename?: 'BankAccount' }
    & BankAccountDetailsFragment
  )>> }
);

export type CustomerInfoDetailsFragment = (
  { __typename?: 'CustomerInfo' }
  & Pick<CustomerInfo, 'id' | 'key' | 'value' | 'valueJSON' | 'status' | 'createdAt' | 'updatedAt'>
);

export type ClientDetailsFragment = (
  { __typename?: 'Client' }
  & Pick<Client, 'id' | 'shortName' | 'fullName' | 'description' | 'taxNumber' | 'uniqueCompanyNumber' | 'status' | 'createdAt' | 'updatedAt'>
  & { addresses?: Maybe<Array<(
    { __typename?: 'Address' }
    & AddressDetailsFragment
  )>>, banks?: Maybe<Array<(
    { __typename?: 'BankAccount' }
    & BankAccountDetailsFragment
  )>>, contacts?: Maybe<Array<(
    { __typename?: 'Contact' }
    & ContactDetailsFragment
  )>> }
);

export type TaxValueDetailsFragment = (
  { __typename?: 'TaxValue' }
  & Pick<TaxValue, 'id' | 'value' | 'date' | 'createdAt' | 'updatedAt'>
);

export type TaxDetailsFragment = (
  { __typename?: 'Tax' }
  & Pick<Tax, 'id' | 'name' | 'short' | 'mark' | 'createdAt' | 'updatedAt'>
);

export type CurrencyValueDetailsFragment = (
  { __typename?: 'CurrencyValue' }
  & Pick<CurrencyValue, 'id' | 'date' | 'unit' | 'buyingRate' | 'middleRate' | 'sellingRate' | 'currencyDefinitionId' | 'createdAt' | 'updatedAt'>
  & { currencyDefinition: (
    { __typename?: 'CurrencyDefinition' }
    & CurrencyDefinitionDetailsFragment
  ) }
);

export type CurrencyDefinitionDetailsFragment = (
  { __typename?: 'CurrencyDefinition' }
  & Pick<CurrencyDefinition, 'id' | 'name' | 'short' | 'mark' | 'country' | 'status' | 'createdAt' | 'updatedAt'>
);

export type ItemSupplierDetailsFragment = (
  { __typename?: 'ItemSupplier' }
  & Pick<ItemSupplier, 'id' | 'code' | 'itemId' | 'createdAt' | 'updatedAt'>
  & { supplier: (
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  ) }
);

export type ItemsCategoryDetailsFragment = (
  { __typename?: 'ItemsCategory' }
  & Pick<ItemsCategory, 'id' | 'itemId' | 'categoryId' | 'createdAt' | 'updatedAt'>
  & { category?: Maybe<(
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  )> }
);

export type ItemImagesDetailsFragment = (
  { __typename?: 'ItemsImages' }
  & Pick<ItemsImages, 'id' | 'url' | 'type' | 'size' | 'itemId' | 'status' | 'createdAt' | 'updatedAt'>
);

export type ItemDetailsFragment = (
  { __typename?: 'Item' }
  & Pick<Item, 'id' | 'barCode' | 'code' | 'type' | 'shortName' | 'fullName' | 'uom' | 'vp' | 'mp' | 'taxId' | 'status' | 'createdAt' | 'updatedAt'>
  & { itemSuppliers?: Maybe<Array<(
    { __typename?: 'ItemSupplier' }
    & ItemSupplierDetailsFragment
  )>>, norms?: Maybe<Array<(
    { __typename?: 'Normative' }
    & Pick<Normative, 'id' | 'description' | 'status' | 'createdAt' | 'updatedAt'>
  )>>, warehouseItems?: Maybe<Array<(
    { __typename?: 'WarehouseItem' }
    & WarehouseItemDetailsFragment
  )>>, itemsCategories?: Maybe<Array<(
    { __typename?: 'ItemsCategory' }
    & ItemsCategoryDetailsFragment
  )>>, images?: Maybe<Array<(
    { __typename?: 'ItemsImages' }
    & ItemImagesDetailsFragment
  )>> }
);

export type UserDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'userName' | 'createdAt' | 'updatedAt'>
);

export type WarehouseDetailsFragment = (
  { __typename?: 'Warehouse' }
  & Pick<Warehouse, 'id' | 'name' | 'description' | 'flag' | 'financeTotalClaims' | 'financeTotalOwes' | 'status' | 'createdAt' | 'updatedAt'>
  & { addresses?: Maybe<Array<(
    { __typename?: 'Address' }
    & AddressDetailsFragment
  )>> }
);

export type WarehouseSettingsDetailsFragment = (
  { __typename?: 'WarehouseSettings' }
  & Pick<WarehouseSettings, 'id' | 'name' | 'value' | 'description' | 'createdAt' | 'updatedAt'>
);

export type WarehouseItemDetailsFragment = (
  { __typename?: 'WarehouseItem' }
  & Pick<WarehouseItem, 'id' | 'quantityTransactionOwes' | 'quantityTransactionClaims' | 'priceTransaction' | 'quantityOnStack' | 'financeOnStack' | 'priceStack' | 'quantityTotalClaims' | 'financeTotalClaims' | 'quantityTotalOwes' | 'financeTotalOwes' | 'transactionDate' | 'itemId' | 'status' | 'createdAt' | 'updatedAt'>
  & { invoice?: Maybe<(
    { __typename?: 'Invoice' }
    & Pick<Invoice, 'id' | 'number'>
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'shortName' | 'fullName' | 'taxNumber'>
    )> }
  )>, calculation?: Maybe<(
    { __typename?: 'Calculation' }
    & Pick<Calculation, 'id' | 'invoiceNumber' | 'number'>
    & { supplier?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'shortName' | 'fullName' | 'taxNumber'>
    )> }
  )>, returnInvoice?: Maybe<(
    { __typename?: 'ReturnInvoice' }
    & Pick<ReturnInvoice, 'id' | 'number'>
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'shortName' | 'fullName' | 'taxNumber'>
    )> }
  )> }
);

export type WarehouseItemInfoDetailsFragment = (
  { __typename?: 'WarehouseItemInfo' }
  & Pick<WarehouseItemInfo, 'id' | 'warehouseId'>
  & { warehouse?: Maybe<(
    { __typename?: 'Warehouse' }
    & WarehouseDetailsFragment
  )>, warehouseItem?: Maybe<(
    { __typename?: 'WarehouseItem' }
    & WarehouseItemDetailsFragment
  )>, item?: Maybe<(
    { __typename?: 'Item' }
    & ItemDetailsFragment
  )> }
);

export type DiscountsDetailsFragment = (
  { __typename?: 'Discounts' }
  & Pick<Discounts, 'id' | 'value' | 'description' | 'percent' | 'status' | 'createdAt' | 'updatedAt'>
);

export type CalculationItemDetailsFragment = (
  { __typename?: 'CalculationItem' }
  & Pick<CalculationItem, 'id' | 'posNumber' | 'quantity' | 'taxPercent' | 'financeVP' | 'financeMP' | 'taxId' | 'financeExpInternalVP' | 'financeExpInternalMP' | 'financeFinalVP' | 'financeFinalMP' | 'status' | 'createdAt'>
  & { item: (
    { __typename?: 'Item' }
    & ItemDetailsFragment
  ), tax: (
    { __typename?: 'Tax' }
    & { values?: Maybe<Array<(
      { __typename?: 'TaxValue' }
      & TaxValueDetailsFragment
    )>> }
    & TaxDetailsFragment
  ) }
);

export type ExpenseItemDetailsFragment = (
  { __typename?: 'ExpenseItem' }
  & Pick<ExpenseItem, 'id' | 'description' | 'taxId' | 'taxPercent' | 'financeMP'>
  & { tax?: Maybe<(
    { __typename?: 'Tax' }
    & { values?: Maybe<Array<(
      { __typename?: 'TaxValue' }
      & TaxValueDetailsFragment
    )>> }
    & TaxDetailsFragment
  )> }
);

export type ExpenseDetailsFragment = (
  { __typename?: 'Expense' }
  & Pick<Expense, 'id' | 'invoiceNumber' | 'invoiceDate' | 'dueDate' | 'financeMP' | 'financeTax' | 'status' | 'createdAt' | 'updatedAt'>
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  )>, items?: Maybe<Array<(
    { __typename?: 'ExpenseItem' }
    & ExpenseItemDetailsFragment
  )>> }
);

export type CalculationDetailsFragment = (
  { __typename?: 'Calculation' }
  & Pick<Calculation, 'id' | 'number' | 'invoiceNumber' | 'totalFinanceVP' | 'totalFinanceMP' | 'financeTax' | 'expenseInternalFinanceMP' | 'expenseInternalFinanceTax' | 'expenseTotalFinanceMP' | 'expenseTotalFinanceTax' | 'date' | 'bookDate' | 'invoiceDate' | 'supplierId' | 'warehouseId' | 'clientId' | 'itemInputType' | 'status' | 'createdAt' | 'updatedAt'>
  & { supplier?: Maybe<(
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  )>, items?: Maybe<Array<(
    { __typename?: 'CalculationItem' }
    & CalculationItemDetailsFragment
  )>>, discount?: Maybe<Array<(
    { __typename?: 'Discounts' }
    & DiscountsDetailsFragment
  )>>, dueDate?: Maybe<Array<(
    { __typename?: 'DueDates' }
    & DueDatesDetailsFragment
  )>>, expense?: Maybe<Array<(
    { __typename?: 'Expense' }
    & ExpenseDetailsFragment
  )>>, warehouse?: Maybe<(
    { __typename?: 'Warehouse' }
    & WarehouseDetailsFragment
  )>, vats?: Maybe<Array<(
    { __typename?: 'TaxFinance' }
    & TaxFinanceDetailsFragment
  )>> }
);

export type InvoiceVersionDetailsFragment = (
  { __typename?: 'InvoiceVersion' }
  & Pick<InvoiceVersion, 'id' | 'name' | 'description' | 'status'>
);

export type NotesDetailsFragment = (
  { __typename?: 'Notes' }
  & Pick<Notes, 'id' | 'note' | 'invoiceId' | 'proformaInvoiceId' | 'returnInvoiceId' | 'financeTransferDocumentId' | 'status' | 'createdAt' | 'updatedAt'>
);

export type InvoiceDiscountDetailsFragment = (
  { __typename?: 'InvoiceDiscount' }
  & Pick<InvoiceDiscount, 'id' | 'percent' | 'value' | 'description' | 'invoiceId' | 'proformaInvoiceId' | 'status' | 'createdAt' | 'updatedAt'>
);

export type InvoiceItemDiscountDetailsFragment = (
  { __typename?: 'InvoiceItemDiscount' }
  & Pick<InvoiceItemDiscount, 'id' | 'percent' | 'value' | 'description' | 'invoiceItemId' | 'status' | 'createdAt' | 'updatedAt'>
);

export type InvoiceItemDetailsFragment = (
  { __typename?: 'InvoiceItem' }
  & Pick<InvoiceItem, 'id' | 'price' | 'quantity' | 'financeVP' | 'taxFinance' | 'taxPercent' | 'financeFinalVP' | 'taxId' | 'itemId' | 'useDiscountDefault' | 'warehouseId' | 'invoiceId' | 'proformaInvoiceId' | 'status'>
  & { discount?: Maybe<Array<(
    { __typename?: 'InvoiceItemDiscount' }
    & InvoiceItemDiscountDetailsFragment
  )>>, item: (
    { __typename?: 'Item' }
    & ItemDetailsFragment
  ), warehouse: (
    { __typename?: 'Warehouse' }
    & WarehouseDetailsFragment
  ), tax: (
    { __typename?: 'Tax' }
    & { values?: Maybe<Array<(
      { __typename?: 'TaxValue' }
      & TaxValueDetailsFragment
    )>> }
    & TaxDetailsFragment
  ) }
);

export type InvoiceDetailsFragment = (
  { __typename?: 'Invoice' }
  & Pick<Invoice, 'id' | 'number' | 'date' | 'customerId' | 'flag' | 'discountDefault' | 'totalFinanceTax' | 'totalFinanceVP' | 'clientId' | 'status' | 'createdAt' | 'updatedAt'>
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  )>, dueDates?: Maybe<Array<(
    { __typename?: 'DueDates' }
    & DueDatesDetailsFragment
  )>>, expense?: Maybe<Array<(
    { __typename?: 'Expense' }
    & ExpenseDetailsFragment
  )>>, notes?: Maybe<Array<(
    { __typename?: 'Notes' }
    & NotesDetailsFragment
  )>>, discount?: Maybe<Array<(
    { __typename?: 'Discounts' }
    & DiscountsDetailsFragment
  )>>, vats?: Maybe<Array<(
    { __typename?: 'TaxFinance' }
    & TaxFinanceDetailsFragment
  )>>, items?: Maybe<Array<(
    { __typename?: 'InvoiceItem' }
    & InvoiceItemDetailsFragment
  )>> }
);

export type WarehouseFinanceDetailsFragment = (
  { __typename?: 'WarehouseFinance' }
  & Pick<WarehouseFinance, 'id' | 'date' | 'owes' | 'claims' | 'balance' | 'totalOwes' | 'totalClaims' | 'returnInvoiceId' | 'invoiceId' | 'calculationId' | 'createdAt' | 'updatedAt'>
  & { warehouse: (
    { __typename?: 'Warehouse' }
    & WarehouseDetailsFragment
  ), calculation?: Maybe<(
    { __typename?: 'Calculation' }
    & CalculationDetailsFragment
  )>, invoice?: Maybe<(
    { __typename?: 'Invoice' }
    & InvoiceDetailsFragment
  )>, returnInvoice?: Maybe<(
    { __typename?: 'ReturnInvoice' }
    & ReturnInvoiceDetailsFragment
  )> }
);

export type ReceiptItemDetailsFragment = (
  { __typename?: 'ReceiptItem' }
  & Pick<ReceiptItem, 'id' | 'price' | 'quantity' | 'discountPercent' | 'discountValue' | 'taxPercent' | 'taxFinance' | 'financeVP' | 'financeFinalVP' | 'receiptId' | 'itemId' | 'taxId' | 'warehouseItemId' | 'status' | 'createdAt' | 'updatedAt'>
  & { item: (
    { __typename?: 'Item' }
    & ItemDetailsFragment
  ), tax: (
    { __typename?: 'Tax' }
    & { values?: Maybe<Array<(
      { __typename?: 'TaxValue' }
      & TaxValueDetailsFragment
    )>> }
    & TaxDetailsFragment
  ) }
);

export type ReceiptPaymentDetailsFragment = (
  { __typename?: 'ReceiptPayment' }
  & Pick<ReceiptPayment, 'id' | 'type' | 'value' | 'receiptId' | 'status' | 'createdAt' | 'updatedAt'>
);

export type ReceiptDetailsFragment = (
  { __typename?: 'Receipt' }
  & Pick<Receipt, 'id' | 'receiptNumber' | 'currencyValue' | 'clientId' | 'currencyId' | 'status' | 'createdAt' | 'updatedAt'>
  & { items?: Maybe<Array<(
    { __typename?: 'ReceiptItem' }
    & ReceiptItemDetailsFragment
  )>>, payments?: Maybe<Array<(
    { __typename?: 'ReceiptPayment' }
    & ReceiptPaymentDetailsFragment
  )>>, client: (
    { __typename?: 'Client' }
    & ClientDetailsFragment
  ) }
);

export type TranslateDetailFragment = (
  { __typename?: 'Translate' }
  & Pick<Translate, 'id' | 'key' | 'comment' | 'en' | 'sr'>
);

export type TransactionAdditionalDataFragment = (
  { __typename?: 'BankTransactionAdditionalData' }
  & Pick<BankTransactionAdditionalData, 'id' | 'accountNumber' | 'modelString' | 'description' | 'transactionKey' | 'code' | 'bankTransactionsId' | 'createdAt' | 'updatedAt'>
);

export type BankTransactionDetailsFragment = (
  { __typename?: 'BankTransactions' }
  & Pick<BankTransactions, 'id' | 'finance' | 'expenses' | 'datePaid' | 'dateProcessed' | 'flag' | 'customerId' | 'clientId' | 'bankAccountId' | 'bankHeaderTransactionId' | 'status' | 'createdAt' | 'updatedAt'>
  & { transactionAdditionalData?: Maybe<(
    { __typename?: 'BankTransactionAdditionalData' }
    & TransactionAdditionalDataFragment
  )>, bankAccount?: Maybe<(
    { __typename?: 'BankAccount' }
    & BankAccountDetailsFragment
  )>, customer?: Maybe<(
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  )> }
);

export type BankHeaderTransactionDetailsFragment = (
  { __typename?: 'BankHeaderTransactions' }
  & Pick<BankHeaderTransactions, 'id' | 'documentId' | 'financeClaims' | 'financeOwes' | 'description' | 'dateProcessed' | 'bankAccountId' | 'userId' | 'clientId' | 'status' | 'createdAt' | 'updatedAt'>
  & { bankAccount: (
    { __typename?: 'BankAccount' }
    & BankAccountDetailsFragment
  ), client?: Maybe<(
    { __typename?: 'Client' }
    & ClientDetailsFragment
  )>, bankTransactions?: Maybe<Array<(
    { __typename?: 'BankTransactions' }
    & BankTransactionDetailsFragment
  )>> }
);

export type WorkOrderItemDetailsFragment = (
  { __typename?: 'WorkOrderItem' }
  & Pick<WorkOrderItem, 'id' | 'quantity' | 'price' | 'finance' | 'taxPercent' | 'workOrderId' | 'taxId' | 'clientId' | 'warehouseItemInfoId' | 'status' | 'createdAt' | 'updatedAt'>
  & { warehouseItemInfo: (
    { __typename?: 'WarehouseItemInfo' }
    & WarehouseItemInfoDetailsFragment
  ) }
);

export type WorkOrderDetailsFragment = (
  { __typename?: 'WorkOrder' }
  & Pick<WorkOrder, 'id' | 'fromWarehouseId' | 'toWarehouseId' | 'finance' | 'clientId' | 'transferDate' | 'status' | 'createdAt' | 'updatedAt'>
  & { workOrderItems?: Maybe<Array<(
    { __typename?: 'WorkOrderItem' }
    & WorkOrderItemDetailsFragment
  )>>, fromWarehouse: (
    { __typename?: 'Warehouse' }
    & WarehouseDetailsFragment
  ), toWarehouse: (
    { __typename?: 'Warehouse' }
    & WarehouseDetailsFragment
  ) }
);

export type ProformaInvoiceDetailsFragment = (
  { __typename?: 'ProformaInvoice' }
  & Pick<ProformaInvoice, 'id' | 'number' | 'date' | 'customerId' | 'flag' | 'discountDefault' | 'totalFinanceTax' | 'totalFinanceVP' | 'clientId' | 'invoiceId' | 'status' | 'createdAt' | 'updatedAt'>
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  )>, expense?: Maybe<Array<(
    { __typename?: 'Expense' }
    & ExpenseDetailsFragment
  )>>, notes?: Maybe<Array<(
    { __typename?: 'Notes' }
    & NotesDetailsFragment
  )>>, discount?: Maybe<Array<(
    { __typename?: 'InvoiceDiscount' }
    & InvoiceDiscountDetailsFragment
  )>>, vats?: Maybe<Array<(
    { __typename?: 'TaxFinance' }
    & TaxFinanceDetailsFragment
  )>>, items?: Maybe<Array<(
    { __typename?: 'InvoiceItem' }
    & InvoiceItemDetailsFragment
  )>>, invoice?: Maybe<(
    { __typename?: 'Invoice' }
    & Pick<Invoice, 'id' | 'number' | 'date'>
  )> }
);

export type BankDetailsFragment = (
  { __typename?: 'Bank' }
  & Pick<Bank, 'id' | 'bankName' | 'status'>
);

export type ReturnInvoiceDetailsFragment = (
  { __typename?: 'ReturnInvoice' }
  & Pick<ReturnInvoice, 'id' | 'number' | 'date' | 'customerId' | 'flag' | 'totalFinanceTax' | 'totalFinanceVP' | 'clientId' | 'status' | 'createdAt' | 'updatedAt'>
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  )>, dueDates?: Maybe<Array<(
    { __typename?: 'DueDates' }
    & DueDatesDetailsFragment
  )>>, expense?: Maybe<Array<(
    { __typename?: 'Expense' }
    & ExpenseDetailsFragment
  )>>, notes?: Maybe<Array<(
    { __typename?: 'Notes' }
    & NotesDetailsFragment
  )>>, vats?: Maybe<Array<(
    { __typename?: 'TaxFinance' }
    & TaxFinanceDetailsFragment
  )>>, items?: Maybe<Array<(
    { __typename?: 'InvoiceItem' }
    & InvoiceItemDetailsFragment
  )>> }
);

export type InvoiceAdvanceInvoiceDetailsFragment = (
  { __typename?: 'InvoiceAdvanceInvoice' }
  & Pick<InvoiceAdvanceInvoice, 'id' | 'date' | 'itemDescription' | 'totalFinanceVP' | 'totalFinanceTax' | 'totalFinanceMP' | 'invoiceId' | 'financeTransferDocumentId' | 'status' | 'createdAt' | 'updatedAt'>
);

export type TaxFinanceDetailsFragment = (
  { __typename?: 'TaxFinance' }
  & Pick<TaxFinance, 'id' | 'date' | 'taxFinance' | 'taxPercent' | 'financeMP' | 'taxId' | 'proformaInvoiceId' | 'invoiceId' | 'returnInvoiceId' | 'financeTransferDocumentId' | 'calculationId' | 'flag' | 'status' | 'createdAt' | 'updatedAt'>
  & { tax?: Maybe<(
    { __typename?: 'Tax' }
    & { values?: Maybe<Array<(
      { __typename?: 'TaxValue' }
      & TaxValueDetailsFragment
    )>> }
    & TaxDetailsFragment
  )> }
);

export type FinanceTransferDocumentDetailsFragment = (
  { __typename?: 'FinanceTransferDocument' }
  & Pick<FinanceTransferDocument, 'id' | 'number' | 'date' | 'itemDescription' | 'documentType' | 'flag' | 'customerId' | 'status' | 'createdAt' | 'updatedAt'>
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  )>, tax?: Maybe<Array<(
    { __typename?: 'TaxFinance' }
    & TaxFinanceDetailsFragment
  )>>, dueDates?: Maybe<Array<(
    { __typename?: 'DueDates' }
    & DueDatesDetailsFragment
  )>>, notes?: Maybe<Array<(
    { __typename?: 'Notes' }
    & NotesDetailsFragment
  )>> }
);

export type NormativeItemDetailsFragment = (
  { __typename?: 'NormativeItem' }
  & Pick<NormativeItem, 'id' | 'quantity' | 'itemId' | 'normativeId' | 'activeNormativeId' | 'status' | 'createdAt' | 'updatedAt'>
  & { item: (
    { __typename?: 'Item' }
    & ItemDetailsFragment
  ) }
);

export type NormativeDetailsFragment = (
  { __typename?: 'Normative' }
  & Pick<Normative, 'id' | 'description' | 'clientId' | 'itemId' | 'status' | 'createdAt' | 'updatedAt'>
  & { items?: Maybe<Array<(
    { __typename?: 'NormativeItem' }
    & NormativeItemDetailsFragment
  )>>, item?: Maybe<(
    { __typename?: 'Item' }
    & ItemDetailsFragment
  )> }
);

export type ProductionOrderItemDetailsFragment = (
  { __typename?: 'ProductionOrderItem' }
  & Pick<ProductionOrderItem, 'id' | 'quantity' | 'itemId' | 'productionOrderId' | 'status' | 'createdAt' | 'updatedAt'>
  & { item?: Maybe<(
    { __typename?: 'Item' }
    & ItemDetailsFragment
  )> }
);

export type ProductionOrderDetailsFragment = (
  { __typename?: 'ProductionOrder' }
  & Pick<ProductionOrder, 'id' | 'number' | 'date' | 'dateFinish' | 'quantity' | 'status' | 'itemId' | 'normativeId' | 'userId' | 'clientId' | 'createdAt' | 'updatedAt'>
  & { item?: Maybe<(
    { __typename?: 'Item' }
    & ItemDetailsFragment
  )>, normative?: Maybe<(
    { __typename?: 'Normative' }
    & NormativeDetailsFragment
  )>, items?: Maybe<Array<(
    { __typename?: 'ProductionOrderItem' }
    & ProductionOrderItemDetailsFragment
  )>>, expense?: Maybe<Array<(
    { __typename?: 'Expense' }
    & ExpenseDetailsFragment
  )>> }
);

export type CategoryDetailsFragment = (
  { __typename?: 'Category' }
  & Pick<Category, 'id' | 'name' | 'description' | 'slug' | 'parentId' | 'clientId' | 'createdAt' | 'updatedAt'>
  & { children?: Maybe<Array<(
    { __typename?: 'CategoryRelationship' }
    & Pick<CategoryRelationship, 'id' | 'parent' | 'child'>
  )>> }
);

export type AddressQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AddressQuery = (
  { __typename?: 'Query' }
  & { address?: Maybe<(
    { __typename?: 'Address' }
    & AddressDetailsFragment
  )> }
);

export type UpdateAddressMutationVariables = Exact<{
  id: Scalars['Int'];
  data: AddressType;
}>;


export type UpdateAddressMutation = (
  { __typename?: 'Mutation' }
  & { address: (
    { __typename?: 'Address' }
    & AddressDetailsFragment
  ) }
);

export type ApplicationDataQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
}>;


export type ApplicationDataQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseApplicationData' }
    & Pick<ResponseApplicationData, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'ApplicationData' }
      & ApplicationDataDetailsFragment
    )> }
  ) }
);

export type InsertApplicationDataMutationVariables = Exact<{
  data: ApplicationDataType;
}>;


export type InsertApplicationDataMutation = (
  { __typename?: 'Mutation' }
  & { applicationData: (
    { __typename?: 'ApplicationData' }
    & ApplicationDataDetailsFragment
  ) }
);

export type UpdateApplicationDataMutationVariables = Exact<{
  data: ApplicationDataType;
  id: Scalars['Int'];
}>;


export type UpdateApplicationDataMutation = (
  { __typename?: 'Mutation' }
  & { applicationData: (
    { __typename?: 'ApplicationData' }
    & ApplicationDataDetailsFragment
  ) }
);

export type AuthLoginQueryVariables = Exact<{
  data: AuthUserLogin;
}>;


export type AuthLoginQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'AuthLoginTokens' }
    & Pick<AuthLoginTokens, 'token'>
    & { user: (
      { __typename?: 'User' }
      & UserDetailsFragment
    ) }
  ) }
);

export type AuthPasswordRecoveryMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AuthPasswordRecoveryMutation = (
  { __typename?: 'Mutation' }
  & { data: Mutation['authPasswordRecovery'] }
);

export type AuthRegistrationMutationVariables = Exact<{
  data: AuthUserRegister;
}>;


export type AuthRegistrationMutation = (
  { __typename?: 'Mutation' }
  & { data: Mutation['authRegistration'] }
);

export type AuthPasswordChangeMutationVariables = Exact<{
  data: AuthUserChangePassword;
}>;


export type AuthPasswordChangeMutation = (
  { __typename?: 'Mutation' }
  & { data: Mutation['authPasswordChange'] }
);

export type AuthConfirmationMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type AuthConfirmationMutation = (
  { __typename?: 'Mutation' }
  & { data: Mutation['authConfirmation'] }
);

export type BanksQueryVariables = Exact<{ [key: string]: never; }>;


export type BanksQuery = (
  { __typename?: 'Query' }
  & { data: Array<(
    { __typename?: 'Bank' }
    & BankDetailsFragment
  )> }
);

export type BankQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BankQuery = (
  { __typename?: 'Query' }
  & { bank?: Maybe<(
    { __typename?: 'Bank' }
    & BankDetailsFragment
  )> }
);

export type BankHeaderTransactionsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type BankHeaderTransactionsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseBankHeaderTransactions' }
    & Pick<ResponseBankHeaderTransactions, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'BankHeaderTransactions' }
      & BankHeaderTransactionDetailsFragment
    )> }
  ) }
);

export type BankHeaderTransactionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BankHeaderTransactionQuery = (
  { __typename?: 'Query' }
  & { bankHeaderTransaction?: Maybe<(
    { __typename?: 'BankHeaderTransactions' }
    & BankHeaderTransactionDetailsFragment
  )> }
);

export type TotalTransactionByAccountQueryVariables = Exact<{
  bankAccountId: Scalars['Int'];
}>;


export type TotalTransactionByAccountQuery = (
  { __typename?: 'Query' }
  & { bankAccountBalance: (
    { __typename?: 'BankHeaderTransactions' }
    & Pick<BankHeaderTransactions, 'financeOwes' | 'financeClaims'>
  ) }
);

export type InsertBankHeaderTransactionsMutationVariables = Exact<{
  data: BankTransactionType;
}>;


export type InsertBankHeaderTransactionsMutation = (
  { __typename?: 'Mutation' }
  & { bankHeaderTransaction: (
    { __typename?: 'BankHeaderTransactions' }
    & BankHeaderTransactionDetailsFragment
  ) }
);

export type UpdateBankHeaderTransactionsMutationVariables = Exact<{
  id: Scalars['Int'];
  data: BankTransactionType;
}>;


export type UpdateBankHeaderTransactionsMutation = (
  { __typename?: 'Mutation' }
  & { bankHeaderTransaction: (
    { __typename?: 'BankHeaderTransactions' }
    & BankHeaderTransactionDetailsFragment
  ) }
);

export type UploadBankReportMutationVariables = Exact<{
  file: Scalars['Upload'];
  id: Scalars['Int'];
}>;


export type UploadBankReportMutation = (
  { __typename?: 'Mutation' }
  & { data: (
    { __typename?: 'BankHeaderTransactions' }
    & BankHeaderTransactionDetailsFragment
  ) }
);

export type BankAccountFilterQueryVariables = Exact<{
  value: Scalars['String'];
}>;


export type BankAccountFilterQuery = (
  { __typename?: 'Query' }
  & { data?: Maybe<Array<(
    { __typename?: 'BankAccount' }
    & BankAccountDetailsFragment
  )>> }
);

export type BankTransactionsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type BankTransactionsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseBankTransactions' }
    & Pick<ResponseBankTransactions, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'BankTransactions' }
      & BankTransactionDetailsFragment
    )> }
  ) }
);

export type InsertBankTransactionsMutationVariables = Exact<{
  data: Array<BankTransactionItemType>;
  bankHeaderTransactionId: Scalars['Int'];
}>;


export type InsertBankTransactionsMutation = (
  { __typename?: 'Mutation' }
  & { bankHeaderTransaction: (
    { __typename?: 'BankHeaderTransactions' }
    & BankHeaderTransactionDetailsFragment
  ) }
);

export type UpdateBankTransactionMutationVariables = Exact<{
  id: Scalars['Int'];
  data: BankTransactionItemType;
}>;


export type UpdateBankTransactionMutation = (
  { __typename?: 'Mutation' }
  & { bankHeaderTransaction: (
    { __typename?: 'BankHeaderTransactions' }
    & BankHeaderTransactionDetailsFragment
  ) }
);

export type DeleteBankTransactionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteBankTransactionMutation = (
  { __typename?: 'Mutation' }
  & { data: (
    { __typename?: 'BankHeaderTransactions' }
    & BankHeaderTransactionDetailsFragment
  ) }
);

export type CalculationsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type CalculationsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseCalculations' }
    & Pick<ResponseCalculations, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Calculation' }
      & CalculationDetailsFragment
    )> }
  ) }
);

export type CalculationQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CalculationQuery = (
  { __typename?: 'Query' }
  & { calculation?: Maybe<(
    { __typename?: 'Calculation' }
    & CalculationDetailsFragment
  )> }
);

export type InsertCalculationMutationVariables = Exact<{
  data: CalculationType;
}>;


export type InsertCalculationMutation = (
  { __typename?: 'Mutation' }
  & { calculation: (
    { __typename?: 'Calculation' }
    & CalculationDetailsFragment
  ) }
);

export type UpdateCalculationMutationVariables = Exact<{
  id: Scalars['Int'];
  data: CalculationType;
}>;


export type UpdateCalculationMutation = (
  { __typename?: 'Mutation' }
  & { calculation: (
    { __typename?: 'Calculation' }
    & CalculationDetailsFragment
  ) }
);

export type InsertUpdateCalculationItemMutationVariables = Exact<{
  id: Scalars['Int'];
  data: CalculationItemType;
  calcId: Scalars['Int'];
}>;


export type InsertUpdateCalculationItemMutation = (
  { __typename?: 'Mutation' }
  & { calculation: (
    { __typename?: 'Calculation' }
    & CalculationDetailsFragment
  ) }
);

export type DeleteCalculationItemMutationVariables = Exact<{
  id: Scalars['Int'];
  calcId: Scalars['Int'];
}>;


export type DeleteCalculationItemMutation = (
  { __typename?: 'Mutation' }
  & { calculation: (
    { __typename?: 'Calculation' }
    & CalculationDetailsFragment
  ) }
);

export type CategoriesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseCategories' }
    & Pick<ResponseCategories, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Category' }
      & CategoryDetailsFragment
    )> }
  ) }
);

export type CategoryQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CategoryQuery = (
  { __typename?: 'Query' }
  & { category?: Maybe<(
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  )> }
);

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories?: Maybe<Array<(
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  )>> }
);

export type InsertCategoryMutationVariables = Exact<{
  data: CategoryType;
}>;


export type InsertCategoryMutation = (
  { __typename?: 'Mutation' }
  & { category: (
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  ) }
);

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCategoryMutation = (
  { __typename?: 'Mutation' }
  & { category: (
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  ) }
);

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
  data: CategoryType;
}>;


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { category: (
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  ) }
);

export type ClientQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ClientQuery = (
  { __typename?: 'Query' }
  & { client?: Maybe<(
    { __typename?: 'Client' }
    & ClientDetailsFragment
  )> }
);

export type GetLoggedClientQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoggedClientQuery = (
  { __typename?: 'Query' }
  & { client?: Maybe<(
    { __typename?: 'Client' }
    & ClientDetailsFragment
  )> }
);

export type GetClientLogoUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientLogoUrlQuery = (
  { __typename?: 'Query' }
  & { data: Query['getClientLogoUrl'] }
);

export type InsertClientMutationVariables = Exact<{
  data: ClientType;
}>;


export type InsertClientMutation = (
  { __typename?: 'Mutation' }
  & { client: (
    { __typename?: 'Client' }
    & ClientDetailsFragment
  ) }
);

export type UpdateClientMutationVariables = Exact<{
  data: ClientType;
  id: Scalars['Int'];
}>;


export type UpdateClientMutation = (
  { __typename?: 'Mutation' }
  & { client: (
    { __typename?: 'Client' }
    & ClientDetailsFragment
  ) }
);

export type UploadLogoMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadLogoMutation = (
  { __typename?: 'Mutation' }
  & { data: Mutation['uploadLogo'] }
);

export type UpdateContactMutationVariables = Exact<{
  id: Scalars['Int'];
  data: ContactType;
}>;


export type UpdateContactMutation = (
  { __typename?: 'Mutation' }
  & { contact: (
    { __typename?: 'Contact' }
    & ContactDetailsFragment
  ) }
);

export type UpdateCurrencyDefinitionMutationVariables = Exact<{
  id: Scalars['Int'];
  data: CurrencyDefinitionType;
}>;


export type UpdateCurrencyDefinitionMutation = (
  { __typename?: 'Mutation' }
  & { currency: (
    { __typename?: 'CurrencyDefinition' }
    & CurrencyDefinitionDetailsFragment
  ) }
);

export type GetCurrencyListQueryVariables = Exact<{
  date?: Maybe<Scalars['DateTime']>;
}>;


export type GetCurrencyListQuery = (
  { __typename?: 'Query' }
  & { data: Array<(
    { __typename?: 'CurrencyValue' }
    & CurrencyValueDetailsFragment
  )> }
);

export type CustomersQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
}>;


export type CustomersQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseCustomers' }
    & Pick<ResponseCustomers, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Customer' }
      & CustomerDetailsFragment
    )> }
  ) }
);

export type CustomerQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CustomerQuery = (
  { __typename?: 'Query' }
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  )> }
);

export type CustomerExternalByNameQueryVariables = Exact<{
  value: Scalars['String'];
}>;


export type CustomerExternalByNameQuery = (
  { __typename?: 'Query' }
  & { data: Array<(
    { __typename?: 'Customer' }
    & Pick<Customer, 'fullName' | 'shortName' | 'taxNumber' | 'uniqueCompanyNumber'>
  )> }
);

export type CustomerExternalByTinQueryVariables = Exact<{
  value: Scalars['String'];
}>;


export type CustomerExternalByTinQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'fullName' | 'shortName' | 'taxNumber' | 'uniqueCompanyNumber'>
    & { addresses?: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'zipCode' | 'state' | 'type'>
    )>>, banks?: Maybe<Array<(
      { __typename?: 'BankAccount' }
      & Pick<BankAccount, 'bankId' | 'account' | 'accountString'>
      & { bank?: Maybe<(
        { __typename?: 'Bank' }
        & Pick<Bank, 'bankName'>
      )> }
    )>> }
  ) }
);

export type CustomerExternalByBankAccountQueryVariables = Exact<{
  value: Scalars['String'];
}>;


export type CustomerExternalByBankAccountQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'fullName' | 'shortName' | 'taxNumber' | 'uniqueCompanyNumber'>
    & { addresses?: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'street' | 'city' | 'zipCode' | 'state' | 'type'>
    )>>, banks?: Maybe<Array<(
      { __typename?: 'BankAccount' }
      & Pick<BankAccount, 'bankId' | 'account' | 'accountString'>
      & { bank?: Maybe<(
        { __typename?: 'Bank' }
        & Pick<Bank, 'bankName'>
      )> }
    )>> }
  ) }
);

export type InsertExternalCustomerByTinMutationVariables = Exact<{
  value: Scalars['String'];
}>;


export type InsertExternalCustomerByTinMutation = (
  { __typename?: 'Mutation' }
  & { customer: (
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  ) }
);

export type InsertCustomerMutationVariables = Exact<{
  data: CustomerType;
}>;


export type InsertCustomerMutation = (
  { __typename?: 'Mutation' }
  & { customer: (
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  ) }
);

export type InsertCustomersMutationVariables = Exact<{
  data: Array<CustomerType>;
}>;


export type InsertCustomersMutation = (
  { __typename?: 'Mutation' }
  & { customers: Mutation['insertCustomers'] }
);

export type UpdateCustomerMutationVariables = Exact<{
  data: CustomerType;
  id: Scalars['Int'];
}>;


export type UpdateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { customer: (
    { __typename?: 'Customer' }
    & CustomerDetailsFragment
  ) }
);

export type UpdateBankAccountMutationVariables = Exact<{
  data: BankAccountType;
  id: Scalars['Int'];
}>;


export type UpdateBankAccountMutation = (
  { __typename?: 'Mutation' }
  & { bankAccount: (
    { __typename?: 'BankAccount' }
    & BankAccountDetailsFragment
  ) }
);

export type DueDatesSummarizeByFilterQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type DueDatesSummarizeByFilterQuery = (
  { __typename?: 'Query' }
  & { data?: Maybe<Array<(
    { __typename?: 'DueDates' }
    & Pick<DueDates, 'flag' | 'status' | 'finance' | 'customerId' | 'date'>
  )>> }
);

export type DueDatesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type DueDatesQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseDueDates' }
    & Pick<ResponseDueDates, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'DueDates' }
      & DueDatesDetailsFragment
    )> }
  ) }
);

export type FinanceTransferDocumentsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type FinanceTransferDocumentsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseFinanceTransferDocuments' }
    & Pick<ResponseFinanceTransferDocuments, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'FinanceTransferDocument' }
      & FinanceTransferDocumentDetailsFragment
    )> }
  ) }
);

export type FinanceTransferDocumentQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FinanceTransferDocumentQuery = (
  { __typename?: 'Query' }
  & { financeTransferDocument?: Maybe<(
    { __typename?: 'FinanceTransferDocument' }
    & FinanceTransferDocumentDetailsFragment
  )> }
);

export type InsertFinanceTransferDocumentMutationVariables = Exact<{
  data: FinanceTransferDocumentInsertType;
}>;


export type InsertFinanceTransferDocumentMutation = (
  { __typename?: 'Mutation' }
  & { financeTransferDocument: (
    { __typename?: 'FinanceTransferDocument' }
    & FinanceTransferDocumentDetailsFragment
  ) }
);

export type UpdateFinanceTransferDocumentMutationVariables = Exact<{
  id: Scalars['Int'];
  data: FinanceTransferDocumentUpdateType;
}>;


export type UpdateFinanceTransferDocumentMutation = (
  { __typename?: 'Mutation' }
  & { financeTransferDocument: (
    { __typename?: 'FinanceTransferDocument' }
    & FinanceTransferDocumentDetailsFragment
  ) }
);

export type InvoicesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type InvoicesQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseInvoices' }
    & Pick<ResponseInvoices, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Invoice' }
      & InvoiceDetailsFragment
    )> }
  ) }
);

export type InvoiceQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InvoiceQuery = (
  { __typename?: 'Query' }
  & { invoice?: Maybe<(
    { __typename?: 'Invoice' }
    & InvoiceDetailsFragment
  )> }
);

export type InsertInvoiceMutationVariables = Exact<{
  data: InvoiceType;
}>;


export type InsertInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { invoice: (
    { __typename?: 'Invoice' }
    & InvoiceDetailsFragment
  ) }
);

export type UpdateInvoiceMutationVariables = Exact<{
  id: Scalars['Int'];
  data: InvoiceType;
}>;


export type UpdateInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { invoice: (
    { __typename?: 'Invoice' }
    & InvoiceDetailsFragment
  ) }
);

export type InsertUpdateInvoiceItemMutationVariables = Exact<{
  additionalData: InvoiceAdditionalType;
  id: Scalars['Int'];
  data: InvoiceItemType;
}>;


export type InsertUpdateInvoiceItemMutation = (
  { __typename?: 'Mutation' }
  & { invoice: (
    { __typename?: 'Invoice' }
    & InvoiceDetailsFragment
  ) }
);

export type DeleteInvoiceItemMutationVariables = Exact<{
  additionalData: InvoiceAdditionalType;
  id: Scalars['Int'];
}>;


export type DeleteInvoiceItemMutation = (
  { __typename?: 'Mutation' }
  & { invoice: (
    { __typename?: 'Invoice' }
    & InvoiceDetailsFragment
  ) }
);

export type InsertInvoiceVersionMutationVariables = Exact<{
  data: InvoiceVersionType;
}>;


export type InsertInvoiceVersionMutation = (
  { __typename?: 'Mutation' }
  & { invoiceVersion: (
    { __typename?: 'InvoiceVersion' }
    & InvoiceVersionDetailsFragment
  ) }
);

export type ItemsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
}>;


export type ItemsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseItems' }
    & Pick<ResponseItems, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Item' }
      & ItemDetailsFragment
    )> }
  ) }
);

export type ItemQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ItemQuery = (
  { __typename?: 'Query' }
  & { item?: Maybe<(
    { __typename?: 'Item' }
    & ItemDetailsFragment
  )> }
);

export type TotalSaleTransactionByItemQueryVariables = Exact<{
  itemId: Scalars['Int'];
  dateStart?: Maybe<Scalars['DateTime']>;
  dateEnd?: Maybe<Scalars['DateTime']>;
}>;


export type TotalSaleTransactionByItemQuery = (
  { __typename?: 'Query' }
  & { saleItem?: Maybe<(
    { __typename?: 'TransactionItemSummarize' }
    & Pick<TransactionItemSummarize, 'quantity' | 'taxFinance' | 'financeVP'>
    & { item?: Maybe<(
      { __typename?: 'Item' }
      & ItemDetailsFragment
    )> }
  )> }
);

export type TotalTransactionBetweenDatesByItemQueryVariables = Exact<{
  itemId: Scalars['Int'];
  dateStart?: Maybe<Scalars['DateTime']>;
  dateEnd?: Maybe<Scalars['DateTime']>;
}>;


export type TotalTransactionBetweenDatesByItemQuery = (
  { __typename?: 'Query' }
  & { saleItems?: Maybe<Array<(
    { __typename?: 'TransactionItemSummarize' }
    & Pick<TransactionItemSummarize, 'date' | 'quantity' | 'taxFinance' | 'financeVP'>
    & { item?: Maybe<(
      { __typename?: 'Item' }
      & ItemDetailsFragment
    )> }
  )>> }
);

export type TotalSaleItemsByYearQueryVariables = Exact<{
  itemId: Scalars['Int'];
}>;


export type TotalSaleItemsByYearQuery = (
  { __typename?: 'Query' }
  & { saleByYear?: Maybe<Array<(
    { __typename?: 'TransactionItemSummarize' }
    & Pick<TransactionItemSummarize, 'date' | 'quantity' | 'taxFinance' | 'financeVP'>
  )>> }
);

export type InsertItemMutationVariables = Exact<{
  data: ItemType;
}>;


export type InsertItemMutation = (
  { __typename?: 'Mutation' }
  & { item: (
    { __typename?: 'Item' }
    & ItemDetailsFragment
  ) }
);

export type InsertItemsMutationVariables = Exact<{
  data: Array<ItemType>;
}>;


export type InsertItemsMutation = (
  { __typename?: 'Mutation' }
  & { items: Mutation['insertItems'] }
);

export type UpdateItemMutationVariables = Exact<{
  data: ItemType;
  id: Scalars['Int'];
}>;


export type UpdateItemMutation = (
  { __typename?: 'Mutation' }
  & { item: (
    { __typename?: 'Item' }
    & ItemDetailsFragment
  ) }
);

export type UpdateItemSupplierMutationVariables = Exact<{
  data: ItemSupplierType;
  id: Scalars['Int'];
}>;


export type UpdateItemSupplierMutation = (
  { __typename?: 'Mutation' }
  & { itemSupplier: (
    { __typename?: 'ItemSupplier' }
    & ItemSupplierDetailsFragment
  ) }
);

export type TestInsertItemsByClientMutationVariables = Exact<{
  data: Array<ItemType>;
}>;


export type TestInsertItemsByClientMutation = (
  { __typename?: 'Mutation' }
  & { items: Mutation['testInsertItemsByClient'] }
);

export type NormativesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type NormativesQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseNormatives' }
    & Pick<ResponseNormatives, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Normative' }
      & NormativeDetailsFragment
    )> }
  ) }
);

export type NormativeQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type NormativeQuery = (
  { __typename?: 'Query' }
  & { normative?: Maybe<(
    { __typename?: 'Normative' }
    & NormativeDetailsFragment
  )> }
);

export type NormativeSummarizeQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type NormativeSummarizeQuery = (
  { __typename?: 'Query' }
  & { normative: (
    { __typename?: 'Normative' }
    & NormativeDetailsFragment
  ) }
);

export type FindItemsWithNormativeQueryVariables = Exact<{
  value: Scalars['String'];
}>;


export type FindItemsWithNormativeQuery = (
  { __typename?: 'Query' }
  & { data?: Maybe<Array<(
    { __typename?: 'Item' }
    & ItemDetailsFragment
  )>> }
);

export type InsertNormativeMutationVariables = Exact<{
  data: NormativeType;
}>;


export type InsertNormativeMutation = (
  { __typename?: 'Mutation' }
  & { normative: (
    { __typename?: 'Normative' }
    & NormativeDetailsFragment
  ) }
);

export type UpdateNormativeMutationVariables = Exact<{
  id: Scalars['Int'];
  data: NormativeType;
}>;


export type UpdateNormativeMutation = (
  { __typename?: 'Mutation' }
  & { normative: (
    { __typename?: 'Normative' }
    & NormativeDetailsFragment
  ) }
);

export type InsertNormativeItemMutationVariables = Exact<{
  data: NormativeItemType;
}>;


export type InsertNormativeItemMutation = (
  { __typename?: 'Mutation' }
  & { normative: (
    { __typename?: 'Normative' }
    & NormativeDetailsFragment
  ) }
);

export type UpdateNormativeItemMutationVariables = Exact<{
  id: Scalars['Int'];
  data: NormativeItemType;
}>;


export type UpdateNormativeItemMutation = (
  { __typename?: 'Mutation' }
  & { normative: (
    { __typename?: 'Normative' }
    & NormativeDetailsFragment
  ) }
);

export type DeleteNormativeItemMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteNormativeItemMutation = (
  { __typename?: 'Mutation' }
  & { normative: (
    { __typename?: 'Normative' }
    & NormativeDetailsFragment
  ) }
);

export type InsertProductionOrderItemMutationVariables = Exact<{
  data: ProductionOrderItemType;
}>;


export type InsertProductionOrderItemMutation = (
  { __typename?: 'Mutation' }
  & { productionOrder: (
    { __typename?: 'ProductionOrder' }
    & ProductionOrderDetailsFragment
  ) }
);

export type UpdateProductionOrderItemMutationVariables = Exact<{
  id: Scalars['Int'];
  data: ProductionOrderItemType;
}>;


export type UpdateProductionOrderItemMutation = (
  { __typename?: 'Mutation' }
  & { productionOrder: (
    { __typename?: 'ProductionOrder' }
    & ProductionOrderDetailsFragment
  ) }
);

export type DeleteProductionOrderItemMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProductionOrderItemMutation = (
  { __typename?: 'Mutation' }
  & { productionOrder: (
    { __typename?: 'ProductionOrder' }
    & ProductionOrderDetailsFragment
  ) }
);

export type ProductionOrdersQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type ProductionOrdersQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseProductionOrders' }
    & Pick<ResponseProductionOrders, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'ProductionOrder' }
      & ProductionOrderDetailsFragment
    )> }
  ) }
);

export type ProductionOrderQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductionOrderQuery = (
  { __typename?: 'Query' }
  & { productionOrder?: Maybe<(
    { __typename?: 'ProductionOrder' }
    & ProductionOrderDetailsFragment
  )> }
);

export type InsertProductionOrderMutationVariables = Exact<{
  data: ProductionOrderType;
}>;


export type InsertProductionOrderMutation = (
  { __typename?: 'Mutation' }
  & { productionOrder: (
    { __typename?: 'ProductionOrder' }
    & ProductionOrderDetailsFragment
  ) }
);

export type UpdateProductionOrderMutationVariables = Exact<{
  id: Scalars['Int'];
  data: ProductionOrderType;
}>;


export type UpdateProductionOrderMutation = (
  { __typename?: 'Mutation' }
  & { productionOrder: (
    { __typename?: 'ProductionOrder' }
    & ProductionOrderDetailsFragment
  ) }
);

export type ProformaInvoicesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type ProformaInvoicesQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseProformaInvoices' }
    & Pick<ResponseProformaInvoices, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'ProformaInvoice' }
      & ProformaInvoiceDetailsFragment
    )> }
  ) }
);

export type ProformaInvoiceQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProformaInvoiceQuery = (
  { __typename?: 'Query' }
  & { proformaInvoice?: Maybe<(
    { __typename?: 'ProformaInvoice' }
    & ProformaInvoiceDetailsFragment
  )> }
);

export type InsertProformaInvoiceMutationVariables = Exact<{
  data: InvoiceType;
}>;


export type InsertProformaInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { proformaInvoice: (
    { __typename?: 'ProformaInvoice' }
    & ProformaInvoiceDetailsFragment
  ) }
);

export type UpdateProformaInvoiceMutationVariables = Exact<{
  id: Scalars['Int'];
  data: InvoiceType;
}>;


export type UpdateProformaInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { proformaInvoice: (
    { __typename?: 'ProformaInvoice' }
    & ProformaInvoiceDetailsFragment
  ) }
);

export type CloneProformaInvoiceMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CloneProformaInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { proformaInvoice: (
    { __typename?: 'ProformaInvoice' }
    & ProformaInvoiceDetailsFragment
  ) }
);

export type GenerateInvoiceMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GenerateInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { proformaInvoice: (
    { __typename?: 'ProformaInvoice' }
    & ProformaInvoiceDetailsFragment
  ) }
);

export type ReceiptsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type ReceiptsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseReceipts' }
    & Pick<ResponseReceipts, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Receipt' }
      & ReceiptDetailsFragment
    )> }
  ) }
);

export type ReceiptQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReceiptQuery = (
  { __typename?: 'Query' }
  & { receipt?: Maybe<(
    { __typename?: 'Receipt' }
    & ReceiptDetailsFragment
  )> }
);

export type InsertReceiptMutationVariables = Exact<{
  data: ReceiptType;
}>;


export type InsertReceiptMutation = (
  { __typename?: 'Mutation' }
  & { receipt: (
    { __typename?: 'Receipt' }
    & ReceiptDetailsFragment
  ) }
);

export type ReturnInvoicesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type ReturnInvoicesQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseReturnInvoices' }
    & Pick<ResponseReturnInvoices, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'ReturnInvoice' }
      & ReturnInvoiceDetailsFragment
    )> }
  ) }
);

export type ReturnInvoiceQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReturnInvoiceQuery = (
  { __typename?: 'Query' }
  & { returnInvoice?: Maybe<(
    { __typename?: 'ReturnInvoice' }
    & ReturnInvoiceDetailsFragment
  )> }
);

export type InsertReturnInvoiceMutationVariables = Exact<{
  data: InvoiceType;
}>;


export type InsertReturnInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { returnInvoice: (
    { __typename?: 'ReturnInvoice' }
    & ReturnInvoiceDetailsFragment
  ) }
);

export type UpdateReturnInvoiceMutationVariables = Exact<{
  id: Scalars['Int'];
  data: InvoiceType;
}>;


export type UpdateReturnInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { returnInvoice: (
    { __typename?: 'ReturnInvoice' }
    & ReturnInvoiceDetailsFragment
  ) }
);

export type GetValidTaxQueryVariables = Exact<{
  date?: Maybe<Scalars['DateTime']>;
}>;


export type GetValidTaxQuery = (
  { __typename?: 'Query' }
  & { validTax: Array<(
    { __typename?: 'Tax' }
    & { values?: Maybe<Array<(
      { __typename?: 'TaxValue' }
      & TaxValueDetailsFragment
    )>> }
    & TaxDetailsFragment
  )> }
);

export type InsertTaxDefinitionMutationVariables = Exact<{
  data: Array<TaxTypeDefine>;
}>;


export type InsertTaxDefinitionMutation = (
  { __typename?: 'Mutation' }
  & { definition: Array<(
    { __typename?: 'Tax' }
    & TaxDetailsFragment
  )> }
);

export type InsertTaxValueMutationVariables = Exact<{
  data: TaxValuesType;
}>;


export type InsertTaxValueMutation = (
  { __typename?: 'Mutation' }
  & { tax: Array<(
    { __typename?: 'Tax' }
    & { values?: Maybe<Array<(
      { __typename?: 'TaxValue' }
      & TaxValueDetailsFragment
    )>> }
    & TaxDetailsFragment
  )> }
);

export type GetTranslateQueryVariables = Exact<{
  lang: Scalars['String'];
  force?: Maybe<Scalars['Boolean']>;
}>;


export type GetTranslateQuery = (
  { __typename?: 'Query' }
  & { data: Array<(
    { __typename?: 'Translation' }
    & Pick<Translation, 'key' | 'translation'>
  )> }
);

export type UsersQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseUsers' }
    & Pick<ResponseUsers, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'User' }
      & UserDetailsFragment
    )> }
  ) }
);

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserDetailsFragment
  )> }
);

export type InsertUserMutationVariables = Exact<{
  data: UserType;
}>;


export type InsertUserMutation = (
  { __typename?: 'Mutation' }
  & { user: (
    { __typename?: 'User' }
    & UserDetailsFragment
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  data: UserType;
  id: Scalars['Int'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { user: (
    { __typename?: 'User' }
    & UserDetailsFragment
  ) }
);

export type ResetPasswordByAdminMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ResetPasswordByAdminMutation = (
  { __typename?: 'Mutation' }
  & { password: Mutation['resetPasswordByAdmin'] }
);

export type UserChangePasswordMutationVariables = Exact<{
  data: UserChangePasswordType;
}>;


export type UserChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { user: Mutation['userChangePassword'] }
);

export type WarehousesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
}>;


export type WarehousesQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseWarehouses' }
    & Pick<ResponseWarehouses, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Warehouse' }
      & WarehouseDetailsFragment
    )> }
  ) }
);

export type WarehouseQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WarehouseQuery = (
  { __typename?: 'Query' }
  & { warehouse?: Maybe<(
    { __typename?: 'Warehouse' }
    & WarehouseDetailsFragment
  )> }
);

export type InsertWarehouseMutationVariables = Exact<{
  data: WarehouseType;
}>;


export type InsertWarehouseMutation = (
  { __typename?: 'Mutation' }
  & { warehouse: (
    { __typename?: 'Warehouse' }
    & WarehouseDetailsFragment
  ) }
);

export type UpdateWarehouseMutationVariables = Exact<{
  data: WarehouseType;
  id: Scalars['Int'];
}>;


export type UpdateWarehouseMutation = (
  { __typename?: 'Mutation' }
  & { warehouse: (
    { __typename?: 'Warehouse' }
    & WarehouseDetailsFragment
  ) }
);

export type InsertWarehousesMutationVariables = Exact<{
  data: Array<WarehouseType>;
}>;


export type InsertWarehousesMutation = (
  { __typename?: 'Mutation' }
  & { warehouses: Mutation['insertWarehouses'] }
);

export type WarehouseFinancesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type WarehouseFinancesQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseWarehouseFinances' }
    & Pick<ResponseWarehouseFinances, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'WarehouseFinance' }
      & WarehouseFinanceDetailsFragment
    )> }
  ) }
);

export type WarehouseFinanceQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WarehouseFinanceQuery = (
  { __typename?: 'Query' }
  & { warehouseFinance?: Maybe<(
    { __typename?: 'WarehouseFinance' }
    & WarehouseFinanceDetailsFragment
  )> }
);

export type InsertWarehouseFinanceMutationVariables = Exact<{
  data: WarehouseFinanceType;
}>;


export type InsertWarehouseFinanceMutation = (
  { __typename?: 'Mutation' }
  & { warehouseFinance: (
    { __typename?: 'WarehouseFinance' }
    & WarehouseFinanceDetailsFragment
  ) }
);

export type WarehouseItemsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type WarehouseItemsQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseWarehouseItems' }
    & Pick<ResponseWarehouseItems, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'WarehouseItem' }
      & WarehouseItemDetailsFragment
    )> }
  ) }
);

export type WarehouseItemQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WarehouseItemQuery = (
  { __typename?: 'Query' }
  & { warehouseItem?: Maybe<(
    { __typename?: 'WarehouseItem' }
    & WarehouseItemDetailsFragment
  )> }
);

export type GetLastWarehouseItemQueryVariables = Exact<{
  warehouseId: Scalars['Int'];
  itemId: Scalars['Int'];
}>;


export type GetLastWarehouseItemQuery = (
  { __typename?: 'Query' }
  & { warehouseItem?: Maybe<(
    { __typename?: 'WarehouseItem' }
    & WarehouseItemDetailsFragment
  )> }
);

export type InsertWarehouseItemMutationVariables = Exact<{
  data: WarehouseItemType;
}>;


export type InsertWarehouseItemMutation = (
  { __typename?: 'Mutation' }
  & { warehouseItem: (
    { __typename?: 'WarehouseItem' }
    & WarehouseItemDetailsFragment
  ) }
);

export type TestInsertWarehouseItemMutationVariables = Exact<{
  data: WarehouseItemsBulk;
}>;


export type TestInsertWarehouseItemMutation = (
  { __typename?: 'Mutation' }
  & { data: Mutation['testInsertWarehouseItem'] }
);

export type WarehouseItemInfoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WarehouseItemInfoQuery = (
  { __typename?: 'Query' }
  & { warehouseItemInfo: (
    { __typename?: 'WarehouseItemInfo' }
    & WarehouseItemInfoDetailsFragment
  ) }
);

export type WarehouseItemsInfoQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type WarehouseItemsInfoQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseWarehouseItemsInfo' }
    & Pick<ResponseWarehouseItemsInfo, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'WarehouseItemInfo' }
      & WarehouseItemInfoDetailsFragment
    )> }
  ) }
);

export type WarehouseItemByFilterQueryVariables = Exact<{
  value: Scalars['String'];
  warehouseId: Scalars['Int'];
}>;


export type WarehouseItemByFilterQuery = (
  { __typename?: 'Query' }
  & { data?: Maybe<Array<(
    { __typename?: 'WarehouseItemInfo' }
    & WarehouseItemInfoDetailsFragment
  )>> }
);

export type WorkOrdersQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type WorkOrdersQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseWorkOrders' }
    & Pick<ResponseWorkOrders, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'WorkOrder' }
      & WorkOrderDetailsFragment
    )> }
  ) }
);

export type WorkOrderQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WorkOrderQuery = (
  { __typename?: 'Query' }
  & { workOrder?: Maybe<(
    { __typename?: 'WorkOrder' }
    & WorkOrderDetailsFragment
  )> }
);

export type InsertWorkOrderMutationVariables = Exact<{
  data: WorkOrderType;
}>;


export type InsertWorkOrderMutation = (
  { __typename?: 'Mutation' }
  & { workOrder: (
    { __typename?: 'WorkOrder' }
    & WorkOrderDetailsFragment
  ) }
);

export type UpdateWorkOrderMutationVariables = Exact<{
  id: Scalars['Int'];
  data: WorkOrderType;
}>;


export type UpdateWorkOrderMutation = (
  { __typename?: 'Mutation' }
  & { workOrder: (
    { __typename?: 'WorkOrder' }
    & WorkOrderDetailsFragment
  ) }
);

export const ApplicationDataDetailsFragmentDoc = gql`
    fragment applicationDataDetails on ApplicationData {
  id
  key
  value
  valueJSON
  status
  createdAt
  updatedAt
}
    `;
export const AddressDetailsFragmentDoc = gql`
    fragment addressDetails on Address {
  id
  street
  zipCode
  city
  state
  description
  type
  status
  createdAt
  updatedAt
}
    `;
export const CustomerDetailsShortFragmentDoc = gql`
    fragment customerDetailsShort on Customer {
  id
  shortName
  fullName
  description
  taxNumber
  uniqueCompanyNumber
  status
  createdAt
  updatedAt
  addresses {
    ...addressDetails
  }
}
    ${AddressDetailsFragmentDoc}`;
export const CurrencyDefinitionDetailsFragmentDoc = gql`
    fragment currencyDefinitionDetails on CurrencyDefinition {
  id
  name
  short
  mark
  country
  status
  createdAt
  updatedAt
}
    `;
export const CurrencyValueDetailsFragmentDoc = gql`
    fragment currencyValueDetails on CurrencyValue {
  id
  date
  unit
  buyingRate
  middleRate
  sellingRate
  currencyDefinitionId
  currencyDefinition {
    ...currencyDefinitionDetails
  }
  createdAt
  updatedAt
}
    ${CurrencyDefinitionDetailsFragmentDoc}`;
export const UserDetailsFragmentDoc = gql`
    fragment userDetails on User {
  id
  firstName
  lastName
  email
  userName
  createdAt
  updatedAt
}
    `;
export const WarehouseSettingsDetailsFragmentDoc = gql`
    fragment warehouseSettingsDetails on WarehouseSettings {
  id
  name
  value
  description
  createdAt
  updatedAt
}
    `;
export const InvoiceVersionDetailsFragmentDoc = gql`
    fragment invoiceVersionDetails on InvoiceVersion {
  id
  name
  description
  status
}
    `;
export const WarehouseDetailsFragmentDoc = gql`
    fragment warehouseDetails on Warehouse {
  id
  name
  description
  flag
  financeTotalClaims
  financeTotalOwes
  addresses {
    ...addressDetails
  }
  status
  createdAt
  updatedAt
}
    ${AddressDetailsFragmentDoc}`;
export const ContactDetailsFragmentDoc = gql`
    fragment contactDetails on Contact {
  id
  type
  value
  description
  status
  createdAt
  updatedAt
}
    `;
export const CustomerInfoDetailsFragmentDoc = gql`
    fragment customerInfoDetails on CustomerInfo {
  id
  key
  value
  valueJSON
  status
  createdAt
  updatedAt
}
    `;
export const BankDetailsFragmentDoc = gql`
    fragment bankDetails on Bank {
  id
  bankName
  status
}
    `;
export const BankAccountDetailsFragmentDoc = gql`
    fragment bankAccountDetails on BankAccount {
  id
  bankId
  account
  accountString
  customer {
    id
    shortName
    fullName
    taxNumber
  }
  bank {
    ...bankDetails
  }
  customerId
  clientId
  status
  createdAt
  updatedAt
}
    ${BankDetailsFragmentDoc}`;
export const CustomerDetailsFragmentDoc = gql`
    fragment customerDetails on Customer {
  id
  shortName
  fullName
  description
  taxNumber
  uniqueCompanyNumber
  status
  createdAt
  updatedAt
  addresses {
    ...addressDetails
  }
  contacts {
    ...contactDetails
  }
  infos {
    ...customerInfoDetails
  }
  banks {
    ...bankAccountDetails
  }
}
    ${AddressDetailsFragmentDoc}
${ContactDetailsFragmentDoc}
${CustomerInfoDetailsFragmentDoc}
${BankAccountDetailsFragmentDoc}`;
export const ItemSupplierDetailsFragmentDoc = gql`
    fragment itemSupplierDetails on ItemSupplier {
  id
  code
  itemId
  supplier {
    ...customerDetails
  }
  createdAt
  updatedAt
}
    ${CustomerDetailsFragmentDoc}`;
export const WarehouseItemDetailsFragmentDoc = gql`
    fragment warehouseItemDetails on WarehouseItem {
  id
  quantityTransactionOwes
  quantityTransactionClaims
  priceTransaction
  quantityOnStack
  financeOnStack
  priceStack
  quantityTotalClaims
  financeTotalClaims
  quantityTotalOwes
  financeTotalOwes
  transactionDate
  itemId
  invoice {
    id
    number
    customer {
      id
      shortName
      fullName
      taxNumber
    }
  }
  calculation {
    id
    invoiceNumber
    number
    supplier {
      id
      shortName
      fullName
      taxNumber
    }
  }
  returnInvoice {
    id
    number
    customer {
      id
      shortName
      fullName
      taxNumber
    }
  }
  status
  createdAt
  updatedAt
}
    `;
export const CategoryDetailsFragmentDoc = gql`
    fragment categoryDetails on Category {
  id
  name
  description
  slug
  children {
    id
    parent
    child
  }
  parentId
  clientId
  createdAt
  updatedAt
}
    `;
export const ItemsCategoryDetailsFragmentDoc = gql`
    fragment itemsCategoryDetails on ItemsCategory {
  id
  itemId
  categoryId
  category {
    ...categoryDetails
  }
  createdAt
  updatedAt
}
    ${CategoryDetailsFragmentDoc}`;
export const ItemImagesDetailsFragmentDoc = gql`
    fragment itemImagesDetails on ItemsImages {
  id
  url
  type
  size
  itemId
  status
  createdAt
  updatedAt
}
    `;
export const ItemDetailsFragmentDoc = gql`
    fragment itemDetails on Item {
  id
  barCode
  code
  type
  shortName
  fullName
  uom
  vp
  mp
  taxId
  status
  itemSuppliers {
    ...itemSupplierDetails
  }
  norms {
    id
    description
    status
    createdAt
    updatedAt
  }
  warehouseItems {
    ...warehouseItemDetails
  }
  itemsCategories {
    ...itemsCategoryDetails
  }
  images {
    ...itemImagesDetails
  }
  createdAt
  updatedAt
}
    ${ItemSupplierDetailsFragmentDoc}
${WarehouseItemDetailsFragmentDoc}
${ItemsCategoryDetailsFragmentDoc}
${ItemImagesDetailsFragmentDoc}`;
export const TaxDetailsFragmentDoc = gql`
    fragment taxDetails on Tax {
  id
  name
  short
  mark
  createdAt
  updatedAt
}
    `;
export const TaxValueDetailsFragmentDoc = gql`
    fragment taxValueDetails on TaxValue {
  id
  value
  date
  createdAt
  updatedAt
}
    `;
export const CalculationItemDetailsFragmentDoc = gql`
    fragment calculationItemDetails on CalculationItem {
  id
  posNumber
  quantity
  taxPercent
  financeVP
  financeMP
  taxId
  financeExpInternalVP
  financeExpInternalMP
  financeFinalVP
  financeFinalMP
  item {
    ...itemDetails
  }
  tax {
    ...taxDetails
    values {
      ...taxValueDetails
    }
  }
  status
  createdAt
}
    ${ItemDetailsFragmentDoc}
${TaxDetailsFragmentDoc}
${TaxValueDetailsFragmentDoc}`;
export const DiscountsDetailsFragmentDoc = gql`
    fragment discountsDetails on Discounts {
  id
  value
  description
  percent
  status
  createdAt
  updatedAt
}
    `;
export const DueDatesDetailsFragmentDoc = gql`
    fragment dueDatesDetails on DueDates {
  id
  date
  finance
  description
  flag
  invoiceId
  returnInvoiceId
  financeTransferDocumentId
  calculationId
  customerId
  calculation {
    id
    number
  }
  returnInvoice {
    id
    number
  }
  invoice {
    id
    number
  }
  financeTransferDocument {
    id
    number
  }
  status
  createdAt
  updatedAt
}
    `;
export const ExpenseItemDetailsFragmentDoc = gql`
    fragment expenseItemDetails on ExpenseItem {
  id
  tax {
    ...taxDetails
    values {
      ...taxValueDetails
    }
  }
  description
  taxId
  taxPercent
  financeMP
}
    ${TaxDetailsFragmentDoc}
${TaxValueDetailsFragmentDoc}`;
export const ExpenseDetailsFragmentDoc = gql`
    fragment expenseDetails on Expense {
  id
  invoiceNumber
  invoiceDate
  dueDate
  financeMP
  financeTax
  customer {
    ...customerDetails
  }
  items {
    ...expenseItemDetails
  }
  status
  createdAt
  updatedAt
}
    ${CustomerDetailsFragmentDoc}
${ExpenseItemDetailsFragmentDoc}`;
export const TaxFinanceDetailsFragmentDoc = gql`
    fragment taxFinanceDetails on TaxFinance {
  id
  date
  taxFinance
  taxPercent
  financeMP
  tax {
    ...taxDetails
    values {
      ...taxValueDetails
    }
  }
  taxId
  proformaInvoiceId
  invoiceId
  returnInvoiceId
  financeTransferDocumentId
  calculationId
  flag
  status
  createdAt
  updatedAt
}
    ${TaxDetailsFragmentDoc}
${TaxValueDetailsFragmentDoc}`;
export const CalculationDetailsFragmentDoc = gql`
    fragment calculationDetails on Calculation {
  id
  number
  invoiceNumber
  totalFinanceVP
  totalFinanceMP
  financeTax
  expenseInternalFinanceMP
  expenseInternalFinanceTax
  expenseTotalFinanceMP
  expenseTotalFinanceTax
  date
  bookDate
  invoiceDate
  supplierId
  warehouseId
  clientId
  supplier {
    ...customerDetails
  }
  items {
    ...calculationItemDetails
  }
  discount {
    ...discountsDetails
  }
  dueDate {
    ...dueDatesDetails
  }
  expense {
    ...expenseDetails
  }
  warehouse {
    ...warehouseDetails
  }
  vats {
    ...taxFinanceDetails
  }
  itemInputType
  status
  createdAt
  updatedAt
}
    ${CustomerDetailsFragmentDoc}
${CalculationItemDetailsFragmentDoc}
${DiscountsDetailsFragmentDoc}
${DueDatesDetailsFragmentDoc}
${ExpenseDetailsFragmentDoc}
${WarehouseDetailsFragmentDoc}
${TaxFinanceDetailsFragmentDoc}`;
export const NotesDetailsFragmentDoc = gql`
    fragment notesDetails on Notes {
  id
  note
  invoiceId
  proformaInvoiceId
  returnInvoiceId
  financeTransferDocumentId
  status
  createdAt
  updatedAt
}
    `;
export const InvoiceItemDiscountDetailsFragmentDoc = gql`
    fragment invoiceItemDiscountDetails on InvoiceItemDiscount {
  id
  percent
  value
  description
  invoiceItemId
  status
  createdAt
  updatedAt
}
    `;
export const InvoiceItemDetailsFragmentDoc = gql`
    fragment invoiceItemDetails on InvoiceItem {
  id
  price
  quantity
  financeVP
  taxFinance
  taxPercent
  financeFinalVP
  taxId
  itemId
  discount {
    ...invoiceItemDiscountDetails
  }
  item {
    ...itemDetails
  }
  warehouse {
    ...warehouseDetails
  }
  tax {
    ...taxDetails
    values {
      ...taxValueDetails
    }
  }
  useDiscountDefault
  warehouseId
  invoiceId
  proformaInvoiceId
  status
}
    ${InvoiceItemDiscountDetailsFragmentDoc}
${ItemDetailsFragmentDoc}
${WarehouseDetailsFragmentDoc}
${TaxDetailsFragmentDoc}
${TaxValueDetailsFragmentDoc}`;
export const InvoiceDetailsFragmentDoc = gql`
    fragment invoiceDetails on Invoice {
  id
  number
  date
  customerId
  customer {
    ...customerDetails
  }
  dueDates {
    ...dueDatesDetails
  }
  expense {
    ...expenseDetails
  }
  notes {
    ...notesDetails
  }
  discount {
    ...discountsDetails
  }
  vats {
    ...taxFinanceDetails
  }
  items {
    ...invoiceItemDetails
  }
  flag
  discountDefault
  totalFinanceTax
  totalFinanceVP
  clientId
  status
  createdAt
  updatedAt
}
    ${CustomerDetailsFragmentDoc}
${DueDatesDetailsFragmentDoc}
${ExpenseDetailsFragmentDoc}
${NotesDetailsFragmentDoc}
${DiscountsDetailsFragmentDoc}
${TaxFinanceDetailsFragmentDoc}
${InvoiceItemDetailsFragmentDoc}`;
export const ReturnInvoiceDetailsFragmentDoc = gql`
    fragment returnInvoiceDetails on ReturnInvoice {
  id
  number
  date
  customerId
  customer {
    ...customerDetails
  }
  dueDates {
    ...dueDatesDetails
  }
  expense {
    ...expenseDetails
  }
  notes {
    ...notesDetails
  }
  vats {
    ...taxFinanceDetails
  }
  items {
    ...invoiceItemDetails
  }
  flag
  totalFinanceTax
  totalFinanceVP
  clientId
  status
  createdAt
  updatedAt
}
    ${CustomerDetailsFragmentDoc}
${DueDatesDetailsFragmentDoc}
${ExpenseDetailsFragmentDoc}
${NotesDetailsFragmentDoc}
${TaxFinanceDetailsFragmentDoc}
${InvoiceItemDetailsFragmentDoc}`;
export const WarehouseFinanceDetailsFragmentDoc = gql`
    fragment warehouseFinanceDetails on WarehouseFinance {
  id
  date
  owes
  claims
  balance
  totalOwes
  totalClaims
  warehouse {
    ...warehouseDetails
  }
  calculation {
    ...calculationDetails
  }
  invoice {
    ...invoiceDetails
  }
  returnInvoice {
    ...returnInvoiceDetails
  }
  returnInvoiceId
  invoiceId
  calculationId
  createdAt
  updatedAt
}
    ${WarehouseDetailsFragmentDoc}
${CalculationDetailsFragmentDoc}
${InvoiceDetailsFragmentDoc}
${ReturnInvoiceDetailsFragmentDoc}`;
export const ReceiptItemDetailsFragmentDoc = gql`
    fragment receiptItemDetails on ReceiptItem {
  id
  price
  quantity
  discountPercent
  discountValue
  taxPercent
  taxFinance
  financeVP
  financeFinalVP
  receiptId
  itemId
  taxId
  warehouseItemId
  item {
    ...itemDetails
  }
  tax {
    ...taxDetails
    values {
      ...taxValueDetails
    }
  }
  status
  createdAt
  updatedAt
}
    ${ItemDetailsFragmentDoc}
${TaxDetailsFragmentDoc}
${TaxValueDetailsFragmentDoc}`;
export const ReceiptPaymentDetailsFragmentDoc = gql`
    fragment receiptPaymentDetails on ReceiptPayment {
  id
  type
  value
  receiptId
  status
  createdAt
  updatedAt
}
    `;
export const ClientDetailsFragmentDoc = gql`
    fragment clientDetails on Client {
  id
  shortName
  fullName
  description
  taxNumber
  uniqueCompanyNumber
  status
  createdAt
  updatedAt
  addresses {
    ...addressDetails
  }
  banks {
    ...bankAccountDetails
  }
  contacts {
    ...contactDetails
  }
}
    ${AddressDetailsFragmentDoc}
${BankAccountDetailsFragmentDoc}
${ContactDetailsFragmentDoc}`;
export const ReceiptDetailsFragmentDoc = gql`
    fragment receiptDetails on Receipt {
  id
  receiptNumber
  currencyValue
  clientId
  currencyId
  items {
    ...receiptItemDetails
  }
  payments {
    ...receiptPaymentDetails
  }
  client {
    ...clientDetails
  }
  status
  createdAt
  updatedAt
}
    ${ReceiptItemDetailsFragmentDoc}
${ReceiptPaymentDetailsFragmentDoc}
${ClientDetailsFragmentDoc}`;
export const TranslateDetailFragmentDoc = gql`
    fragment translateDetail on Translate {
  id
  key
  comment
  en
  sr
}
    `;
export const TransactionAdditionalDataFragmentDoc = gql`
    fragment transactionAdditionalData on BankTransactionAdditionalData {
  id
  accountNumber
  modelString
  description
  transactionKey
  code
  bankTransactionsId
  createdAt
  updatedAt
}
    `;
export const BankTransactionDetailsFragmentDoc = gql`
    fragment bankTransactionDetails on BankTransactions {
  id
  finance
  expenses
  datePaid
  dateProcessed
  flag
  transactionAdditionalData {
    ...transactionAdditionalData
  }
  bankAccount {
    ...bankAccountDetails
  }
  customer {
    ...customerDetails
  }
  customerId
  clientId
  bankAccountId
  bankHeaderTransactionId
  status
  createdAt
  updatedAt
}
    ${TransactionAdditionalDataFragmentDoc}
${BankAccountDetailsFragmentDoc}
${CustomerDetailsFragmentDoc}`;
export const BankHeaderTransactionDetailsFragmentDoc = gql`
    fragment bankHeaderTransactionDetails on BankHeaderTransactions {
  id
  documentId
  financeClaims
  financeOwes
  description
  dateProcessed
  bankAccountId
  bankAccount {
    ...bankAccountDetails
  }
  client {
    ...clientDetails
  }
  bankTransactions {
    ...bankTransactionDetails
  }
  userId
  clientId
  status
  createdAt
  updatedAt
}
    ${BankAccountDetailsFragmentDoc}
${ClientDetailsFragmentDoc}
${BankTransactionDetailsFragmentDoc}`;
export const WarehouseItemInfoDetailsFragmentDoc = gql`
    fragment warehouseItemInfoDetails on WarehouseItemInfo {
  id
  warehouseId
  warehouse {
    ...warehouseDetails
  }
  warehouseItem {
    ...warehouseItemDetails
  }
  item {
    ...itemDetails
  }
}
    ${WarehouseDetailsFragmentDoc}
${WarehouseItemDetailsFragmentDoc}
${ItemDetailsFragmentDoc}`;
export const WorkOrderItemDetailsFragmentDoc = gql`
    fragment workOrderItemDetails on WorkOrderItem {
  id
  quantity
  price
  finance
  taxPercent
  workOrderId
  taxId
  clientId
  warehouseItemInfoId
  warehouseItemInfo {
    ...warehouseItemInfoDetails
  }
  status
  createdAt
  updatedAt
}
    ${WarehouseItemInfoDetailsFragmentDoc}`;
export const WorkOrderDetailsFragmentDoc = gql`
    fragment workOrderDetails on WorkOrder {
  id
  fromWarehouseId
  toWarehouseId
  finance
  clientId
  transferDate
  workOrderItems {
    ...workOrderItemDetails
  }
  fromWarehouse {
    ...warehouseDetails
  }
  toWarehouse {
    ...warehouseDetails
  }
  status
  createdAt
  updatedAt
}
    ${WorkOrderItemDetailsFragmentDoc}
${WarehouseDetailsFragmentDoc}`;
export const InvoiceDiscountDetailsFragmentDoc = gql`
    fragment invoiceDiscountDetails on InvoiceDiscount {
  id
  percent
  value
  description
  invoiceId
  proformaInvoiceId
  status
  createdAt
  updatedAt
}
    `;
export const ProformaInvoiceDetailsFragmentDoc = gql`
    fragment proformaInvoiceDetails on ProformaInvoice {
  id
  number
  date
  customerId
  customer {
    ...customerDetails
  }
  expense {
    ...expenseDetails
  }
  notes {
    ...notesDetails
  }
  discount {
    ...invoiceDiscountDetails
  }
  vats {
    ...taxFinanceDetails
  }
  items {
    ...invoiceItemDetails
  }
  invoice {
    id
    number
    date
  }
  flag
  discountDefault
  totalFinanceTax
  totalFinanceVP
  clientId
  invoiceId
  status
  createdAt
  updatedAt
}
    ${CustomerDetailsFragmentDoc}
${ExpenseDetailsFragmentDoc}
${NotesDetailsFragmentDoc}
${InvoiceDiscountDetailsFragmentDoc}
${TaxFinanceDetailsFragmentDoc}
${InvoiceItemDetailsFragmentDoc}`;
export const InvoiceAdvanceInvoiceDetailsFragmentDoc = gql`
    fragment invoiceAdvanceInvoiceDetails on InvoiceAdvanceInvoice {
  id
  date
  itemDescription
  totalFinanceVP
  totalFinanceTax
  totalFinanceMP
  invoiceId
  financeTransferDocumentId
  status
  createdAt
  updatedAt
}
    `;
export const FinanceTransferDocumentDetailsFragmentDoc = gql`
    fragment financeTransferDocumentDetails on FinanceTransferDocument {
  id
  number
  date
  itemDescription
  documentType
  flag
  customerId
  customer {
    ...customerDetails
  }
  tax {
    ...taxFinanceDetails
  }
  dueDates {
    ...dueDatesDetails
  }
  notes {
    ...notesDetails
  }
  status
  createdAt
  updatedAt
}
    ${CustomerDetailsFragmentDoc}
${TaxFinanceDetailsFragmentDoc}
${DueDatesDetailsFragmentDoc}
${NotesDetailsFragmentDoc}`;
export const NormativeItemDetailsFragmentDoc = gql`
    fragment normativeItemDetails on NormativeItem {
  id
  quantity
  itemId
  normativeId
  activeNormativeId
  item {
    ...itemDetails
  }
  status
  createdAt
  updatedAt
}
    ${ItemDetailsFragmentDoc}`;
export const NormativeDetailsFragmentDoc = gql`
    fragment normativeDetails on Normative {
  id
  description
  clientId
  itemId
  items {
    ...normativeItemDetails
  }
  item {
    ...itemDetails
  }
  status
  createdAt
  updatedAt
}
    ${NormativeItemDetailsFragmentDoc}
${ItemDetailsFragmentDoc}`;
export const ProductionOrderItemDetailsFragmentDoc = gql`
    fragment productionOrderItemDetails on ProductionOrderItem {
  id
  quantity
  itemId
  item {
    ...itemDetails
  }
  productionOrderId
  status
  createdAt
  updatedAt
}
    ${ItemDetailsFragmentDoc}`;
export const ProductionOrderDetailsFragmentDoc = gql`
    fragment productionOrderDetails on ProductionOrder {
  id
  number
  date
  dateFinish
  quantity
  item {
    ...itemDetails
  }
  normative {
    ...normativeDetails
  }
  items {
    ...productionOrderItemDetails
  }
  expense {
    ...expenseDetails
  }
  status
  itemId
  normativeId
  userId
  clientId
  createdAt
  updatedAt
}
    ${ItemDetailsFragmentDoc}
${NormativeDetailsFragmentDoc}
${ProductionOrderItemDetailsFragmentDoc}
${ExpenseDetailsFragmentDoc}`;
export const AddressDocument = gql`
    query address($id: Int!) {
  address(id: $id) {
    ...addressDetails
  }
}
    ${AddressDetailsFragmentDoc}`;

/**
 * __useAddressQuery__
 *
 * To run a query within a React component, call `useAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddressQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AddressQuery, AddressQueryVariables>) {
        return ApolloReactHooks.useQuery<AddressQuery, AddressQueryVariables>(AddressDocument, baseOptions);
      }
export function useAddressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AddressQuery, AddressQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AddressQuery, AddressQueryVariables>(AddressDocument, baseOptions);
        }
export type AddressQueryHookResult = ReturnType<typeof useAddressQuery>;
export type AddressLazyQueryHookResult = ReturnType<typeof useAddressLazyQuery>;
export type AddressQueryResult = ApolloReactCommon.QueryResult<AddressQuery, AddressQueryVariables>;
export const UpdateAddressDocument = gql`
    mutation updateAddress($id: Int!, $data: AddressType!) {
  address: updateAddress(id: $id, data: $data) {
    ...addressDetails
  }
}
    ${AddressDetailsFragmentDoc}`;
export type UpdateAddressMutationFn = ApolloReactCommon.MutationFunction<UpdateAddressMutation, UpdateAddressMutationVariables>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, baseOptions);
      }
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = ApolloReactCommon.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const ApplicationDataDocument = gql`
    query applicationData($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON) {
  data: applicationData(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
    items {
      ...applicationDataDetails
    }
    count
    perPage
    page
  }
}
    ${ApplicationDataDetailsFragmentDoc}`;

/**
 * __useApplicationDataQuery__
 *
 * To run a query within a React component, call `useApplicationDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationDataQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useApplicationDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ApplicationDataQuery, ApplicationDataQueryVariables>) {
        return ApolloReactHooks.useQuery<ApplicationDataQuery, ApplicationDataQueryVariables>(ApplicationDataDocument, baseOptions);
      }
export function useApplicationDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ApplicationDataQuery, ApplicationDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ApplicationDataQuery, ApplicationDataQueryVariables>(ApplicationDataDocument, baseOptions);
        }
export type ApplicationDataQueryHookResult = ReturnType<typeof useApplicationDataQuery>;
export type ApplicationDataLazyQueryHookResult = ReturnType<typeof useApplicationDataLazyQuery>;
export type ApplicationDataQueryResult = ApolloReactCommon.QueryResult<ApplicationDataQuery, ApplicationDataQueryVariables>;
export const InsertApplicationDataDocument = gql`
    mutation insertApplicationData($data: ApplicationDataType!) {
  applicationData: insertApplicationData(data: $data) {
    ...applicationDataDetails
  }
}
    ${ApplicationDataDetailsFragmentDoc}`;
export type InsertApplicationDataMutationFn = ApolloReactCommon.MutationFunction<InsertApplicationDataMutation, InsertApplicationDataMutationVariables>;

/**
 * __useInsertApplicationDataMutation__
 *
 * To run a mutation, you first call `useInsertApplicationDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertApplicationDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertApplicationDataMutation, { data, loading, error }] = useInsertApplicationDataMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertApplicationDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertApplicationDataMutation, InsertApplicationDataMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertApplicationDataMutation, InsertApplicationDataMutationVariables>(InsertApplicationDataDocument, baseOptions);
      }
export type InsertApplicationDataMutationHookResult = ReturnType<typeof useInsertApplicationDataMutation>;
export type InsertApplicationDataMutationResult = ApolloReactCommon.MutationResult<InsertApplicationDataMutation>;
export type InsertApplicationDataMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertApplicationDataMutation, InsertApplicationDataMutationVariables>;
export const UpdateApplicationDataDocument = gql`
    mutation updateApplicationData($data: ApplicationDataType!, $id: Int!) {
  applicationData: updateApplicationData(data: $data, id: $id) {
    ...applicationDataDetails
  }
}
    ${ApplicationDataDetailsFragmentDoc}`;
export type UpdateApplicationDataMutationFn = ApolloReactCommon.MutationFunction<UpdateApplicationDataMutation, UpdateApplicationDataMutationVariables>;

/**
 * __useUpdateApplicationDataMutation__
 *
 * To run a mutation, you first call `useUpdateApplicationDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApplicationDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApplicationDataMutation, { data, loading, error }] = useUpdateApplicationDataMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateApplicationDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateApplicationDataMutation, UpdateApplicationDataMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateApplicationDataMutation, UpdateApplicationDataMutationVariables>(UpdateApplicationDataDocument, baseOptions);
      }
export type UpdateApplicationDataMutationHookResult = ReturnType<typeof useUpdateApplicationDataMutation>;
export type UpdateApplicationDataMutationResult = ApolloReactCommon.MutationResult<UpdateApplicationDataMutation>;
export type UpdateApplicationDataMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateApplicationDataMutation, UpdateApplicationDataMutationVariables>;
export const AuthLoginDocument = gql`
    query authLogin($data: AuthUserLogin!) {
  data: authLogin(data: $data) {
    token
    user {
      ...userDetails
    }
  }
}
    ${UserDetailsFragmentDoc}`;

/**
 * __useAuthLoginQuery__
 *
 * To run a query within a React component, call `useAuthLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthLoginQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAuthLoginQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthLoginQuery, AuthLoginQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthLoginQuery, AuthLoginQueryVariables>(AuthLoginDocument, baseOptions);
      }
export function useAuthLoginLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthLoginQuery, AuthLoginQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthLoginQuery, AuthLoginQueryVariables>(AuthLoginDocument, baseOptions);
        }
export type AuthLoginQueryHookResult = ReturnType<typeof useAuthLoginQuery>;
export type AuthLoginLazyQueryHookResult = ReturnType<typeof useAuthLoginLazyQuery>;
export type AuthLoginQueryResult = ApolloReactCommon.QueryResult<AuthLoginQuery, AuthLoginQueryVariables>;
export const AuthPasswordRecoveryDocument = gql`
    mutation authPasswordRecovery($email: String!) {
  data: authPasswordRecovery(email: $email)
}
    `;
export type AuthPasswordRecoveryMutationFn = ApolloReactCommon.MutationFunction<AuthPasswordRecoveryMutation, AuthPasswordRecoveryMutationVariables>;

/**
 * __useAuthPasswordRecoveryMutation__
 *
 * To run a mutation, you first call `useAuthPasswordRecoveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthPasswordRecoveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authPasswordRecoveryMutation, { data, loading, error }] = useAuthPasswordRecoveryMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAuthPasswordRecoveryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthPasswordRecoveryMutation, AuthPasswordRecoveryMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthPasswordRecoveryMutation, AuthPasswordRecoveryMutationVariables>(AuthPasswordRecoveryDocument, baseOptions);
      }
export type AuthPasswordRecoveryMutationHookResult = ReturnType<typeof useAuthPasswordRecoveryMutation>;
export type AuthPasswordRecoveryMutationResult = ApolloReactCommon.MutationResult<AuthPasswordRecoveryMutation>;
export type AuthPasswordRecoveryMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthPasswordRecoveryMutation, AuthPasswordRecoveryMutationVariables>;
export const AuthRegistrationDocument = gql`
    mutation authRegistration($data: AuthUserRegister!) {
  data: authRegistration(data: $data)
}
    `;
export type AuthRegistrationMutationFn = ApolloReactCommon.MutationFunction<AuthRegistrationMutation, AuthRegistrationMutationVariables>;

/**
 * __useAuthRegistrationMutation__
 *
 * To run a mutation, you first call `useAuthRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authRegistrationMutation, { data, loading, error }] = useAuthRegistrationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAuthRegistrationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthRegistrationMutation, AuthRegistrationMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthRegistrationMutation, AuthRegistrationMutationVariables>(AuthRegistrationDocument, baseOptions);
      }
export type AuthRegistrationMutationHookResult = ReturnType<typeof useAuthRegistrationMutation>;
export type AuthRegistrationMutationResult = ApolloReactCommon.MutationResult<AuthRegistrationMutation>;
export type AuthRegistrationMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthRegistrationMutation, AuthRegistrationMutationVariables>;
export const AuthPasswordChangeDocument = gql`
    mutation authPasswordChange($data: AuthUserChangePassword!) {
  data: authPasswordChange(data: $data)
}
    `;
export type AuthPasswordChangeMutationFn = ApolloReactCommon.MutationFunction<AuthPasswordChangeMutation, AuthPasswordChangeMutationVariables>;

/**
 * __useAuthPasswordChangeMutation__
 *
 * To run a mutation, you first call `useAuthPasswordChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthPasswordChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authPasswordChangeMutation, { data, loading, error }] = useAuthPasswordChangeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAuthPasswordChangeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthPasswordChangeMutation, AuthPasswordChangeMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthPasswordChangeMutation, AuthPasswordChangeMutationVariables>(AuthPasswordChangeDocument, baseOptions);
      }
export type AuthPasswordChangeMutationHookResult = ReturnType<typeof useAuthPasswordChangeMutation>;
export type AuthPasswordChangeMutationResult = ApolloReactCommon.MutationResult<AuthPasswordChangeMutation>;
export type AuthPasswordChangeMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthPasswordChangeMutation, AuthPasswordChangeMutationVariables>;
export const AuthConfirmationDocument = gql`
    mutation authConfirmation($key: String!) {
  data: authConfirmation(key: $key)
}
    `;
export type AuthConfirmationMutationFn = ApolloReactCommon.MutationFunction<AuthConfirmationMutation, AuthConfirmationMutationVariables>;

/**
 * __useAuthConfirmationMutation__
 *
 * To run a mutation, you first call `useAuthConfirmationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthConfirmationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authConfirmationMutation, { data, loading, error }] = useAuthConfirmationMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useAuthConfirmationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthConfirmationMutation, AuthConfirmationMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthConfirmationMutation, AuthConfirmationMutationVariables>(AuthConfirmationDocument, baseOptions);
      }
export type AuthConfirmationMutationHookResult = ReturnType<typeof useAuthConfirmationMutation>;
export type AuthConfirmationMutationResult = ApolloReactCommon.MutationResult<AuthConfirmationMutation>;
export type AuthConfirmationMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthConfirmationMutation, AuthConfirmationMutationVariables>;
export const BanksDocument = gql`
    query banks {
  data: banks {
    ...bankDetails
  }
}
    ${BankDetailsFragmentDoc}`;

/**
 * __useBanksQuery__
 *
 * To run a query within a React component, call `useBanksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBanksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBanksQuery({
 *   variables: {
 *   },
 * });
 */
export function useBanksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BanksQuery, BanksQueryVariables>) {
        return ApolloReactHooks.useQuery<BanksQuery, BanksQueryVariables>(BanksDocument, baseOptions);
      }
export function useBanksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BanksQuery, BanksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BanksQuery, BanksQueryVariables>(BanksDocument, baseOptions);
        }
export type BanksQueryHookResult = ReturnType<typeof useBanksQuery>;
export type BanksLazyQueryHookResult = ReturnType<typeof useBanksLazyQuery>;
export type BanksQueryResult = ApolloReactCommon.QueryResult<BanksQuery, BanksQueryVariables>;
export const BankDocument = gql`
    query bank($id: Int!) {
  bank: bank(id: $id) {
    ...bankDetails
  }
}
    ${BankDetailsFragmentDoc}`;

/**
 * __useBankQuery__
 *
 * To run a query within a React component, call `useBankQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBankQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BankQuery, BankQueryVariables>) {
        return ApolloReactHooks.useQuery<BankQuery, BankQueryVariables>(BankDocument, baseOptions);
      }
export function useBankLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BankQuery, BankQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BankQuery, BankQueryVariables>(BankDocument, baseOptions);
        }
export type BankQueryHookResult = ReturnType<typeof useBankQuery>;
export type BankLazyQueryHookResult = ReturnType<typeof useBankLazyQuery>;
export type BankQueryResult = ApolloReactCommon.QueryResult<BankQuery, BankQueryVariables>;
export const BankHeaderTransactionsDocument = gql`
    query bankHeaderTransactions($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: bankHeaderTransactions(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...bankHeaderTransactionDetails
    }
    count
    perPage
    page
  }
}
    ${BankHeaderTransactionDetailsFragmentDoc}`;

/**
 * __useBankHeaderTransactionsQuery__
 *
 * To run a query within a React component, call `useBankHeaderTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankHeaderTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankHeaderTransactionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useBankHeaderTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BankHeaderTransactionsQuery, BankHeaderTransactionsQueryVariables>) {
        return ApolloReactHooks.useQuery<BankHeaderTransactionsQuery, BankHeaderTransactionsQueryVariables>(BankHeaderTransactionsDocument, baseOptions);
      }
export function useBankHeaderTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BankHeaderTransactionsQuery, BankHeaderTransactionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BankHeaderTransactionsQuery, BankHeaderTransactionsQueryVariables>(BankHeaderTransactionsDocument, baseOptions);
        }
export type BankHeaderTransactionsQueryHookResult = ReturnType<typeof useBankHeaderTransactionsQuery>;
export type BankHeaderTransactionsLazyQueryHookResult = ReturnType<typeof useBankHeaderTransactionsLazyQuery>;
export type BankHeaderTransactionsQueryResult = ApolloReactCommon.QueryResult<BankHeaderTransactionsQuery, BankHeaderTransactionsQueryVariables>;
export const BankHeaderTransactionDocument = gql`
    query bankHeaderTransaction($id: Int!) {
  bankHeaderTransaction: bankHeaderTransaction(id: $id) {
    ...bankHeaderTransactionDetails
  }
}
    ${BankHeaderTransactionDetailsFragmentDoc}`;

/**
 * __useBankHeaderTransactionQuery__
 *
 * To run a query within a React component, call `useBankHeaderTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankHeaderTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankHeaderTransactionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBankHeaderTransactionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BankHeaderTransactionQuery, BankHeaderTransactionQueryVariables>) {
        return ApolloReactHooks.useQuery<BankHeaderTransactionQuery, BankHeaderTransactionQueryVariables>(BankHeaderTransactionDocument, baseOptions);
      }
export function useBankHeaderTransactionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BankHeaderTransactionQuery, BankHeaderTransactionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BankHeaderTransactionQuery, BankHeaderTransactionQueryVariables>(BankHeaderTransactionDocument, baseOptions);
        }
export type BankHeaderTransactionQueryHookResult = ReturnType<typeof useBankHeaderTransactionQuery>;
export type BankHeaderTransactionLazyQueryHookResult = ReturnType<typeof useBankHeaderTransactionLazyQuery>;
export type BankHeaderTransactionQueryResult = ApolloReactCommon.QueryResult<BankHeaderTransactionQuery, BankHeaderTransactionQueryVariables>;
export const TotalTransactionByAccountDocument = gql`
    query totalTransactionByAccount($bankAccountId: Int!) {
  bankAccountBalance: totalTransactionByAccount(bankAccountId: $bankAccountId) {
    financeOwes
    financeClaims
  }
}
    `;

/**
 * __useTotalTransactionByAccountQuery__
 *
 * To run a query within a React component, call `useTotalTransactionByAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalTransactionByAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalTransactionByAccountQuery({
 *   variables: {
 *      bankAccountId: // value for 'bankAccountId'
 *   },
 * });
 */
export function useTotalTransactionByAccountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TotalTransactionByAccountQuery, TotalTransactionByAccountQueryVariables>) {
        return ApolloReactHooks.useQuery<TotalTransactionByAccountQuery, TotalTransactionByAccountQueryVariables>(TotalTransactionByAccountDocument, baseOptions);
      }
export function useTotalTransactionByAccountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TotalTransactionByAccountQuery, TotalTransactionByAccountQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TotalTransactionByAccountQuery, TotalTransactionByAccountQueryVariables>(TotalTransactionByAccountDocument, baseOptions);
        }
export type TotalTransactionByAccountQueryHookResult = ReturnType<typeof useTotalTransactionByAccountQuery>;
export type TotalTransactionByAccountLazyQueryHookResult = ReturnType<typeof useTotalTransactionByAccountLazyQuery>;
export type TotalTransactionByAccountQueryResult = ApolloReactCommon.QueryResult<TotalTransactionByAccountQuery, TotalTransactionByAccountQueryVariables>;
export const InsertBankHeaderTransactionsDocument = gql`
    mutation insertBankHeaderTransactions($data: BankTransactionType!) {
  bankHeaderTransaction: insertBankHeaderTransactions(data: $data) {
    ...bankHeaderTransactionDetails
  }
}
    ${BankHeaderTransactionDetailsFragmentDoc}`;
export type InsertBankHeaderTransactionsMutationFn = ApolloReactCommon.MutationFunction<InsertBankHeaderTransactionsMutation, InsertBankHeaderTransactionsMutationVariables>;

/**
 * __useInsertBankHeaderTransactionsMutation__
 *
 * To run a mutation, you first call `useInsertBankHeaderTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertBankHeaderTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertBankHeaderTransactionsMutation, { data, loading, error }] = useInsertBankHeaderTransactionsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertBankHeaderTransactionsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertBankHeaderTransactionsMutation, InsertBankHeaderTransactionsMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertBankHeaderTransactionsMutation, InsertBankHeaderTransactionsMutationVariables>(InsertBankHeaderTransactionsDocument, baseOptions);
      }
export type InsertBankHeaderTransactionsMutationHookResult = ReturnType<typeof useInsertBankHeaderTransactionsMutation>;
export type InsertBankHeaderTransactionsMutationResult = ApolloReactCommon.MutationResult<InsertBankHeaderTransactionsMutation>;
export type InsertBankHeaderTransactionsMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertBankHeaderTransactionsMutation, InsertBankHeaderTransactionsMutationVariables>;
export const UpdateBankHeaderTransactionsDocument = gql`
    mutation updateBankHeaderTransactions($id: Int!, $data: BankTransactionType!) {
  bankHeaderTransaction: updateBankHeaderTransactions(id: $id, data: $data) {
    ...bankHeaderTransactionDetails
  }
}
    ${BankHeaderTransactionDetailsFragmentDoc}`;
export type UpdateBankHeaderTransactionsMutationFn = ApolloReactCommon.MutationFunction<UpdateBankHeaderTransactionsMutation, UpdateBankHeaderTransactionsMutationVariables>;

/**
 * __useUpdateBankHeaderTransactionsMutation__
 *
 * To run a mutation, you first call `useUpdateBankHeaderTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBankHeaderTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBankHeaderTransactionsMutation, { data, loading, error }] = useUpdateBankHeaderTransactionsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBankHeaderTransactionsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBankHeaderTransactionsMutation, UpdateBankHeaderTransactionsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateBankHeaderTransactionsMutation, UpdateBankHeaderTransactionsMutationVariables>(UpdateBankHeaderTransactionsDocument, baseOptions);
      }
export type UpdateBankHeaderTransactionsMutationHookResult = ReturnType<typeof useUpdateBankHeaderTransactionsMutation>;
export type UpdateBankHeaderTransactionsMutationResult = ApolloReactCommon.MutationResult<UpdateBankHeaderTransactionsMutation>;
export type UpdateBankHeaderTransactionsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateBankHeaderTransactionsMutation, UpdateBankHeaderTransactionsMutationVariables>;
export const UploadBankReportDocument = gql`
    mutation uploadBankReport($file: Upload!, $id: Int!) {
  data: uploadBankReport(file: $file, id: $id) {
    ...bankHeaderTransactionDetails
  }
}
    ${BankHeaderTransactionDetailsFragmentDoc}`;
export type UploadBankReportMutationFn = ApolloReactCommon.MutationFunction<UploadBankReportMutation, UploadBankReportMutationVariables>;

/**
 * __useUploadBankReportMutation__
 *
 * To run a mutation, you first call `useUploadBankReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadBankReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadBankReportMutation, { data, loading, error }] = useUploadBankReportMutation({
 *   variables: {
 *      file: // value for 'file'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUploadBankReportMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadBankReportMutation, UploadBankReportMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadBankReportMutation, UploadBankReportMutationVariables>(UploadBankReportDocument, baseOptions);
      }
export type UploadBankReportMutationHookResult = ReturnType<typeof useUploadBankReportMutation>;
export type UploadBankReportMutationResult = ApolloReactCommon.MutationResult<UploadBankReportMutation>;
export type UploadBankReportMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadBankReportMutation, UploadBankReportMutationVariables>;
export const BankAccountFilterDocument = gql`
    query bankAccountFilter($value: String!) {
  data: bankAccountFilter(value: $value) {
    ...bankAccountDetails
  }
}
    ${BankAccountDetailsFragmentDoc}`;

/**
 * __useBankAccountFilterQuery__
 *
 * To run a query within a React component, call `useBankAccountFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankAccountFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankAccountFilterQuery({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useBankAccountFilterQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BankAccountFilterQuery, BankAccountFilterQueryVariables>) {
        return ApolloReactHooks.useQuery<BankAccountFilterQuery, BankAccountFilterQueryVariables>(BankAccountFilterDocument, baseOptions);
      }
export function useBankAccountFilterLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BankAccountFilterQuery, BankAccountFilterQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BankAccountFilterQuery, BankAccountFilterQueryVariables>(BankAccountFilterDocument, baseOptions);
        }
export type BankAccountFilterQueryHookResult = ReturnType<typeof useBankAccountFilterQuery>;
export type BankAccountFilterLazyQueryHookResult = ReturnType<typeof useBankAccountFilterLazyQuery>;
export type BankAccountFilterQueryResult = ApolloReactCommon.QueryResult<BankAccountFilterQuery, BankAccountFilterQueryVariables>;
export const BankTransactionsDocument = gql`
    query bankTransactions($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: bankTransactions(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...bankTransactionDetails
    }
    count
    perPage
    page
  }
}
    ${BankTransactionDetailsFragmentDoc}`;

/**
 * __useBankTransactionsQuery__
 *
 * To run a query within a React component, call `useBankTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBankTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBankTransactionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useBankTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BankTransactionsQuery, BankTransactionsQueryVariables>) {
        return ApolloReactHooks.useQuery<BankTransactionsQuery, BankTransactionsQueryVariables>(BankTransactionsDocument, baseOptions);
      }
export function useBankTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BankTransactionsQuery, BankTransactionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BankTransactionsQuery, BankTransactionsQueryVariables>(BankTransactionsDocument, baseOptions);
        }
export type BankTransactionsQueryHookResult = ReturnType<typeof useBankTransactionsQuery>;
export type BankTransactionsLazyQueryHookResult = ReturnType<typeof useBankTransactionsLazyQuery>;
export type BankTransactionsQueryResult = ApolloReactCommon.QueryResult<BankTransactionsQuery, BankTransactionsQueryVariables>;
export const InsertBankTransactionsDocument = gql`
    mutation insertBankTransactions($data: [BankTransactionItemType!]!, $bankHeaderTransactionId: Int!) {
  bankHeaderTransaction: insertBankTransactions(data: $data, bankHeaderTransactionId: $bankHeaderTransactionId) {
    ...bankHeaderTransactionDetails
  }
}
    ${BankHeaderTransactionDetailsFragmentDoc}`;
export type InsertBankTransactionsMutationFn = ApolloReactCommon.MutationFunction<InsertBankTransactionsMutation, InsertBankTransactionsMutationVariables>;

/**
 * __useInsertBankTransactionsMutation__
 *
 * To run a mutation, you first call `useInsertBankTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertBankTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertBankTransactionsMutation, { data, loading, error }] = useInsertBankTransactionsMutation({
 *   variables: {
 *      data: // value for 'data'
 *      bankHeaderTransactionId: // value for 'bankHeaderTransactionId'
 *   },
 * });
 */
export function useInsertBankTransactionsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertBankTransactionsMutation, InsertBankTransactionsMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertBankTransactionsMutation, InsertBankTransactionsMutationVariables>(InsertBankTransactionsDocument, baseOptions);
      }
export type InsertBankTransactionsMutationHookResult = ReturnType<typeof useInsertBankTransactionsMutation>;
export type InsertBankTransactionsMutationResult = ApolloReactCommon.MutationResult<InsertBankTransactionsMutation>;
export type InsertBankTransactionsMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertBankTransactionsMutation, InsertBankTransactionsMutationVariables>;
export const UpdateBankTransactionDocument = gql`
    mutation updateBankTransaction($id: Int!, $data: BankTransactionItemType!) {
  bankHeaderTransaction: updateBankTransaction(id: $id, data: $data) {
    ...bankHeaderTransactionDetails
  }
}
    ${BankHeaderTransactionDetailsFragmentDoc}`;
export type UpdateBankTransactionMutationFn = ApolloReactCommon.MutationFunction<UpdateBankTransactionMutation, UpdateBankTransactionMutationVariables>;

/**
 * __useUpdateBankTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateBankTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBankTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBankTransactionMutation, { data, loading, error }] = useUpdateBankTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBankTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBankTransactionMutation, UpdateBankTransactionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateBankTransactionMutation, UpdateBankTransactionMutationVariables>(UpdateBankTransactionDocument, baseOptions);
      }
export type UpdateBankTransactionMutationHookResult = ReturnType<typeof useUpdateBankTransactionMutation>;
export type UpdateBankTransactionMutationResult = ApolloReactCommon.MutationResult<UpdateBankTransactionMutation>;
export type UpdateBankTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateBankTransactionMutation, UpdateBankTransactionMutationVariables>;
export const DeleteBankTransactionDocument = gql`
    mutation deleteBankTransaction($id: Int!) {
  data: deleteBankTransaction(id: $id) {
    ...bankHeaderTransactionDetails
  }
}
    ${BankHeaderTransactionDetailsFragmentDoc}`;
export type DeleteBankTransactionMutationFn = ApolloReactCommon.MutationFunction<DeleteBankTransactionMutation, DeleteBankTransactionMutationVariables>;

/**
 * __useDeleteBankTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteBankTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBankTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBankTransactionMutation, { data, loading, error }] = useDeleteBankTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBankTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteBankTransactionMutation, DeleteBankTransactionMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteBankTransactionMutation, DeleteBankTransactionMutationVariables>(DeleteBankTransactionDocument, baseOptions);
      }
export type DeleteBankTransactionMutationHookResult = ReturnType<typeof useDeleteBankTransactionMutation>;
export type DeleteBankTransactionMutationResult = ApolloReactCommon.MutationResult<DeleteBankTransactionMutation>;
export type DeleteBankTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteBankTransactionMutation, DeleteBankTransactionMutationVariables>;
export const CalculationsDocument = gql`
    query calculations($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: calculations(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...calculationDetails
    }
    count
    perPage
    page
  }
}
    ${CalculationDetailsFragmentDoc}`;

/**
 * __useCalculationsQuery__
 *
 * To run a query within a React component, call `useCalculationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalculationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalculationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useCalculationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CalculationsQuery, CalculationsQueryVariables>) {
        return ApolloReactHooks.useQuery<CalculationsQuery, CalculationsQueryVariables>(CalculationsDocument, baseOptions);
      }
export function useCalculationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CalculationsQuery, CalculationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CalculationsQuery, CalculationsQueryVariables>(CalculationsDocument, baseOptions);
        }
export type CalculationsQueryHookResult = ReturnType<typeof useCalculationsQuery>;
export type CalculationsLazyQueryHookResult = ReturnType<typeof useCalculationsLazyQuery>;
export type CalculationsQueryResult = ApolloReactCommon.QueryResult<CalculationsQuery, CalculationsQueryVariables>;
export const CalculationDocument = gql`
    query calculation($id: Int!) {
  calculation: calculation(id: $id) {
    ...calculationDetails
  }
}
    ${CalculationDetailsFragmentDoc}`;

/**
 * __useCalculationQuery__
 *
 * To run a query within a React component, call `useCalculationQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalculationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalculationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCalculationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CalculationQuery, CalculationQueryVariables>) {
        return ApolloReactHooks.useQuery<CalculationQuery, CalculationQueryVariables>(CalculationDocument, baseOptions);
      }
export function useCalculationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CalculationQuery, CalculationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CalculationQuery, CalculationQueryVariables>(CalculationDocument, baseOptions);
        }
export type CalculationQueryHookResult = ReturnType<typeof useCalculationQuery>;
export type CalculationLazyQueryHookResult = ReturnType<typeof useCalculationLazyQuery>;
export type CalculationQueryResult = ApolloReactCommon.QueryResult<CalculationQuery, CalculationQueryVariables>;
export const InsertCalculationDocument = gql`
    mutation insertCalculation($data: CalculationType!) {
  calculation: insertCalculation(data: $data) {
    ...calculationDetails
  }
}
    ${CalculationDetailsFragmentDoc}`;
export type InsertCalculationMutationFn = ApolloReactCommon.MutationFunction<InsertCalculationMutation, InsertCalculationMutationVariables>;

/**
 * __useInsertCalculationMutation__
 *
 * To run a mutation, you first call `useInsertCalculationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertCalculationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertCalculationMutation, { data, loading, error }] = useInsertCalculationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertCalculationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertCalculationMutation, InsertCalculationMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertCalculationMutation, InsertCalculationMutationVariables>(InsertCalculationDocument, baseOptions);
      }
export type InsertCalculationMutationHookResult = ReturnType<typeof useInsertCalculationMutation>;
export type InsertCalculationMutationResult = ApolloReactCommon.MutationResult<InsertCalculationMutation>;
export type InsertCalculationMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertCalculationMutation, InsertCalculationMutationVariables>;
export const UpdateCalculationDocument = gql`
    mutation updateCalculation($id: Int!, $data: CalculationType!) {
  calculation: updateCalculation(id: $id, data: $data) {
    ...calculationDetails
  }
}
    ${CalculationDetailsFragmentDoc}`;
export type UpdateCalculationMutationFn = ApolloReactCommon.MutationFunction<UpdateCalculationMutation, UpdateCalculationMutationVariables>;

/**
 * __useUpdateCalculationMutation__
 *
 * To run a mutation, you first call `useUpdateCalculationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCalculationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCalculationMutation, { data, loading, error }] = useUpdateCalculationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCalculationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCalculationMutation, UpdateCalculationMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCalculationMutation, UpdateCalculationMutationVariables>(UpdateCalculationDocument, baseOptions);
      }
export type UpdateCalculationMutationHookResult = ReturnType<typeof useUpdateCalculationMutation>;
export type UpdateCalculationMutationResult = ApolloReactCommon.MutationResult<UpdateCalculationMutation>;
export type UpdateCalculationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCalculationMutation, UpdateCalculationMutationVariables>;
export const InsertUpdateCalculationItemDocument = gql`
    mutation insertUpdateCalculationItem($id: Int!, $data: CalculationItemType!, $calcId: Int!) {
  calculation: insertUpdateCalculationItem(id: $id, data: $data, calcId: $calcId) {
    ...calculationDetails
  }
}
    ${CalculationDetailsFragmentDoc}`;
export type InsertUpdateCalculationItemMutationFn = ApolloReactCommon.MutationFunction<InsertUpdateCalculationItemMutation, InsertUpdateCalculationItemMutationVariables>;

/**
 * __useInsertUpdateCalculationItemMutation__
 *
 * To run a mutation, you first call `useInsertUpdateCalculationItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUpdateCalculationItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUpdateCalculationItemMutation, { data, loading, error }] = useInsertUpdateCalculationItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *      calcId: // value for 'calcId'
 *   },
 * });
 */
export function useInsertUpdateCalculationItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertUpdateCalculationItemMutation, InsertUpdateCalculationItemMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertUpdateCalculationItemMutation, InsertUpdateCalculationItemMutationVariables>(InsertUpdateCalculationItemDocument, baseOptions);
      }
export type InsertUpdateCalculationItemMutationHookResult = ReturnType<typeof useInsertUpdateCalculationItemMutation>;
export type InsertUpdateCalculationItemMutationResult = ApolloReactCommon.MutationResult<InsertUpdateCalculationItemMutation>;
export type InsertUpdateCalculationItemMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertUpdateCalculationItemMutation, InsertUpdateCalculationItemMutationVariables>;
export const DeleteCalculationItemDocument = gql`
    mutation deleteCalculationItem($id: Int!, $calcId: Int!) {
  calculation: deleteCalculationItem(id: $id, calcId: $calcId) {
    ...calculationDetails
  }
}
    ${CalculationDetailsFragmentDoc}`;
export type DeleteCalculationItemMutationFn = ApolloReactCommon.MutationFunction<DeleteCalculationItemMutation, DeleteCalculationItemMutationVariables>;

/**
 * __useDeleteCalculationItemMutation__
 *
 * To run a mutation, you first call `useDeleteCalculationItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCalculationItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCalculationItemMutation, { data, loading, error }] = useDeleteCalculationItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      calcId: // value for 'calcId'
 *   },
 * });
 */
export function useDeleteCalculationItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCalculationItemMutation, DeleteCalculationItemMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCalculationItemMutation, DeleteCalculationItemMutationVariables>(DeleteCalculationItemDocument, baseOptions);
      }
export type DeleteCalculationItemMutationHookResult = ReturnType<typeof useDeleteCalculationItemMutation>;
export type DeleteCalculationItemMutationResult = ApolloReactCommon.MutationResult<DeleteCalculationItemMutation>;
export type DeleteCalculationItemMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCalculationItemMutation, DeleteCalculationItemMutationVariables>;
export const CategoriesDocument = gql`
    query categories($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: categories(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...categoryDetails
    }
    count
    perPage
    page
  }
}
    ${CategoryDetailsFragmentDoc}`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = ApolloReactCommon.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryDocument = gql`
    query category($id: Int!) {
  category: category(id: $id) {
    ...categoryDetails
  }
}
    ${CategoryDetailsFragmentDoc}`;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, baseOptions);
      }
export function useCategoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, baseOptions);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = ApolloReactCommon.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const GetAllCategoriesDocument = gql`
    query getAllCategories {
  categories: getAllCategories {
    ...categoryDetails
  }
}
    ${CategoryDetailsFragmentDoc}`;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, baseOptions);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, baseOptions);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesQueryResult = ApolloReactCommon.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const InsertCategoryDocument = gql`
    mutation insertCategory($data: CategoryType!) {
  category: insertCategory(data: $data) {
    ...categoryDetails
  }
}
    ${CategoryDetailsFragmentDoc}`;
export type InsertCategoryMutationFn = ApolloReactCommon.MutationFunction<InsertCategoryMutation, InsertCategoryMutationVariables>;

/**
 * __useInsertCategoryMutation__
 *
 * To run a mutation, you first call `useInsertCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertCategoryMutation, { data, loading, error }] = useInsertCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertCategoryMutation, InsertCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertCategoryMutation, InsertCategoryMutationVariables>(InsertCategoryDocument, baseOptions);
      }
export type InsertCategoryMutationHookResult = ReturnType<typeof useInsertCategoryMutation>;
export type InsertCategoryMutationResult = ApolloReactCommon.MutationResult<InsertCategoryMutation>;
export type InsertCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertCategoryMutation, InsertCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($id: Int!) {
  category: deleteCategory(id: $id) {
    ...categoryDetails
  }
}
    ${CategoryDetailsFragmentDoc}`;
export type DeleteCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, baseOptions);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation updateCategory($id: Int!, $data: CategoryType!) {
  category: updateCategory(id: $id, data: $data) {
    ...categoryDetails
  }
}
    ${CategoryDetailsFragmentDoc}`;
export type UpdateCategoryMutationFn = ApolloReactCommon.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, baseOptions);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = ApolloReactCommon.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const ClientDocument = gql`
    query client($id: Int!) {
  client: client(id: $id) {
    ...clientDetails
  }
}
    ${ClientDetailsFragmentDoc}`;

/**
 * __useClientQuery__
 *
 * To run a query within a React component, call `useClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClientQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClientQuery, ClientQueryVariables>) {
        return ApolloReactHooks.useQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
      }
export function useClientLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
        }
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientQueryResult = ApolloReactCommon.QueryResult<ClientQuery, ClientQueryVariables>;
export const GetLoggedClientDocument = gql`
    query getLoggedClient {
  client: getLoggedClient {
    ...clientDetails
  }
}
    ${ClientDetailsFragmentDoc}`;

/**
 * __useGetLoggedClientQuery__
 *
 * To run a query within a React component, call `useGetLoggedClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoggedClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoggedClientQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoggedClientQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLoggedClientQuery, GetLoggedClientQueryVariables>) {
        return ApolloReactHooks.useQuery<GetLoggedClientQuery, GetLoggedClientQueryVariables>(GetLoggedClientDocument, baseOptions);
      }
export function useGetLoggedClientLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLoggedClientQuery, GetLoggedClientQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetLoggedClientQuery, GetLoggedClientQueryVariables>(GetLoggedClientDocument, baseOptions);
        }
export type GetLoggedClientQueryHookResult = ReturnType<typeof useGetLoggedClientQuery>;
export type GetLoggedClientLazyQueryHookResult = ReturnType<typeof useGetLoggedClientLazyQuery>;
export type GetLoggedClientQueryResult = ApolloReactCommon.QueryResult<GetLoggedClientQuery, GetLoggedClientQueryVariables>;
export const GetClientLogoUrlDocument = gql`
    query getClientLogoUrl {
  data: getClientLogoUrl
}
    `;

/**
 * __useGetClientLogoUrlQuery__
 *
 * To run a query within a React component, call `useGetClientLogoUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientLogoUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientLogoUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClientLogoUrlQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetClientLogoUrlQuery, GetClientLogoUrlQueryVariables>) {
        return ApolloReactHooks.useQuery<GetClientLogoUrlQuery, GetClientLogoUrlQueryVariables>(GetClientLogoUrlDocument, baseOptions);
      }
export function useGetClientLogoUrlLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientLogoUrlQuery, GetClientLogoUrlQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetClientLogoUrlQuery, GetClientLogoUrlQueryVariables>(GetClientLogoUrlDocument, baseOptions);
        }
export type GetClientLogoUrlQueryHookResult = ReturnType<typeof useGetClientLogoUrlQuery>;
export type GetClientLogoUrlLazyQueryHookResult = ReturnType<typeof useGetClientLogoUrlLazyQuery>;
export type GetClientLogoUrlQueryResult = ApolloReactCommon.QueryResult<GetClientLogoUrlQuery, GetClientLogoUrlQueryVariables>;
export const InsertClientDocument = gql`
    mutation insertClient($data: ClientType!) {
  client: insertClient(data: $data) {
    ...clientDetails
  }
}
    ${ClientDetailsFragmentDoc}`;
export type InsertClientMutationFn = ApolloReactCommon.MutationFunction<InsertClientMutation, InsertClientMutationVariables>;

/**
 * __useInsertClientMutation__
 *
 * To run a mutation, you first call `useInsertClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertClientMutation, { data, loading, error }] = useInsertClientMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertClientMutation, InsertClientMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertClientMutation, InsertClientMutationVariables>(InsertClientDocument, baseOptions);
      }
export type InsertClientMutationHookResult = ReturnType<typeof useInsertClientMutation>;
export type InsertClientMutationResult = ApolloReactCommon.MutationResult<InsertClientMutation>;
export type InsertClientMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertClientMutation, InsertClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation updateClient($data: ClientType!, $id: Int!) {
  client: updateClient(data: $data, id: $id) {
    ...clientDetails
  }
}
    ${ClientDetailsFragmentDoc}`;
export type UpdateClientMutationFn = ApolloReactCommon.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, baseOptions);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = ApolloReactCommon.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const UploadLogoDocument = gql`
    mutation uploadLogo($file: Upload!) {
  data: uploadLogo(file: $file)
}
    `;
export type UploadLogoMutationFn = ApolloReactCommon.MutationFunction<UploadLogoMutation, UploadLogoMutationVariables>;

/**
 * __useUploadLogoMutation__
 *
 * To run a mutation, you first call `useUploadLogoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadLogoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadLogoMutation, { data, loading, error }] = useUploadLogoMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadLogoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadLogoMutation, UploadLogoMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadLogoMutation, UploadLogoMutationVariables>(UploadLogoDocument, baseOptions);
      }
export type UploadLogoMutationHookResult = ReturnType<typeof useUploadLogoMutation>;
export type UploadLogoMutationResult = ApolloReactCommon.MutationResult<UploadLogoMutation>;
export type UploadLogoMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadLogoMutation, UploadLogoMutationVariables>;
export const UpdateContactDocument = gql`
    mutation updateContact($id: Int!, $data: ContactType!) {
  contact: updateContact(id: $id, data: $data) {
    ...contactDetails
  }
}
    ${ContactDetailsFragmentDoc}`;
export type UpdateContactMutationFn = ApolloReactCommon.MutationFunction<UpdateContactMutation, UpdateContactMutationVariables>;

/**
 * __useUpdateContactMutation__
 *
 * To run a mutation, you first call `useUpdateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactMutation, { data, loading, error }] = useUpdateContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContactMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateContactMutation, UpdateContactMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateContactMutation, UpdateContactMutationVariables>(UpdateContactDocument, baseOptions);
      }
export type UpdateContactMutationHookResult = ReturnType<typeof useUpdateContactMutation>;
export type UpdateContactMutationResult = ApolloReactCommon.MutationResult<UpdateContactMutation>;
export type UpdateContactMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateContactMutation, UpdateContactMutationVariables>;
export const UpdateCurrencyDefinitionDocument = gql`
    mutation updateCurrencyDefinition($id: Int!, $data: CurrencyDefinitionType!) {
  currency: updateCurrencyDefinition(data: $data, id: $id) {
    ...currencyDefinitionDetails
  }
}
    ${CurrencyDefinitionDetailsFragmentDoc}`;
export type UpdateCurrencyDefinitionMutationFn = ApolloReactCommon.MutationFunction<UpdateCurrencyDefinitionMutation, UpdateCurrencyDefinitionMutationVariables>;

/**
 * __useUpdateCurrencyDefinitionMutation__
 *
 * To run a mutation, you first call `useUpdateCurrencyDefinitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCurrencyDefinitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCurrencyDefinitionMutation, { data, loading, error }] = useUpdateCurrencyDefinitionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCurrencyDefinitionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCurrencyDefinitionMutation, UpdateCurrencyDefinitionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCurrencyDefinitionMutation, UpdateCurrencyDefinitionMutationVariables>(UpdateCurrencyDefinitionDocument, baseOptions);
      }
export type UpdateCurrencyDefinitionMutationHookResult = ReturnType<typeof useUpdateCurrencyDefinitionMutation>;
export type UpdateCurrencyDefinitionMutationResult = ApolloReactCommon.MutationResult<UpdateCurrencyDefinitionMutation>;
export type UpdateCurrencyDefinitionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCurrencyDefinitionMutation, UpdateCurrencyDefinitionMutationVariables>;
export const GetCurrencyListDocument = gql`
    query getCurrencyList($date: DateTime) {
  data: getCurrencyList(date: $date) {
    ...currencyValueDetails
  }
}
    ${CurrencyValueDetailsFragmentDoc}`;

/**
 * __useGetCurrencyListQuery__
 *
 * To run a query within a React component, call `useGetCurrencyListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrencyListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrencyListQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetCurrencyListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrencyListQuery, GetCurrencyListQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrencyListQuery, GetCurrencyListQueryVariables>(GetCurrencyListDocument, baseOptions);
      }
export function useGetCurrencyListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrencyListQuery, GetCurrencyListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrencyListQuery, GetCurrencyListQueryVariables>(GetCurrencyListDocument, baseOptions);
        }
export type GetCurrencyListQueryHookResult = ReturnType<typeof useGetCurrencyListQuery>;
export type GetCurrencyListLazyQueryHookResult = ReturnType<typeof useGetCurrencyListLazyQuery>;
export type GetCurrencyListQueryResult = ApolloReactCommon.QueryResult<GetCurrencyListQuery, GetCurrencyListQueryVariables>;
export const CustomersDocument = gql`
    query customers($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON) {
  data: customers(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
    items {
      ...customerDetails
    }
    count
    perPage
    page
  }
}
    ${CustomerDetailsFragmentDoc}`;

/**
 * __useCustomersQuery__
 *
 * To run a query within a React component, call `useCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CustomersQuery, CustomersQueryVariables>) {
        return ApolloReactHooks.useQuery<CustomersQuery, CustomersQueryVariables>(CustomersDocument, baseOptions);
      }
export function useCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomersQuery, CustomersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CustomersQuery, CustomersQueryVariables>(CustomersDocument, baseOptions);
        }
export type CustomersQueryHookResult = ReturnType<typeof useCustomersQuery>;
export type CustomersLazyQueryHookResult = ReturnType<typeof useCustomersLazyQuery>;
export type CustomersQueryResult = ApolloReactCommon.QueryResult<CustomersQuery, CustomersQueryVariables>;
export const CustomerDocument = gql`
    query customer($id: Int!) {
  customer: customer(id: $id) {
    ...customerDetails
  }
}
    ${CustomerDetailsFragmentDoc}`;

/**
 * __useCustomerQuery__
 *
 * To run a query within a React component, call `useCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCustomerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
        return ApolloReactHooks.useQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, baseOptions);
      }
export function useCustomerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, baseOptions);
        }
export type CustomerQueryHookResult = ReturnType<typeof useCustomerQuery>;
export type CustomerLazyQueryHookResult = ReturnType<typeof useCustomerLazyQuery>;
export type CustomerQueryResult = ApolloReactCommon.QueryResult<CustomerQuery, CustomerQueryVariables>;
export const CustomerExternalByNameDocument = gql`
    query customerExternalByName($value: String!) {
  data: customerExternalByName(value: $value) {
    fullName
    shortName
    taxNumber
    uniqueCompanyNumber
  }
}
    `;

/**
 * __useCustomerExternalByNameQuery__
 *
 * To run a query within a React component, call `useCustomerExternalByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerExternalByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerExternalByNameQuery({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useCustomerExternalByNameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CustomerExternalByNameQuery, CustomerExternalByNameQueryVariables>) {
        return ApolloReactHooks.useQuery<CustomerExternalByNameQuery, CustomerExternalByNameQueryVariables>(CustomerExternalByNameDocument, baseOptions);
      }
export function useCustomerExternalByNameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomerExternalByNameQuery, CustomerExternalByNameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CustomerExternalByNameQuery, CustomerExternalByNameQueryVariables>(CustomerExternalByNameDocument, baseOptions);
        }
export type CustomerExternalByNameQueryHookResult = ReturnType<typeof useCustomerExternalByNameQuery>;
export type CustomerExternalByNameLazyQueryHookResult = ReturnType<typeof useCustomerExternalByNameLazyQuery>;
export type CustomerExternalByNameQueryResult = ApolloReactCommon.QueryResult<CustomerExternalByNameQuery, CustomerExternalByNameQueryVariables>;
export const CustomerExternalByTinDocument = gql`
    query customerExternalByTin($value: String!) {
  data: customerExternalByTin(value: $value) {
    id
    fullName
    shortName
    taxNumber
    uniqueCompanyNumber
    addresses {
      street
      city
      zipCode
      state
      type
    }
    banks {
      bankId
      bank {
        bankName
      }
      account
      accountString
    }
  }
}
    `;

/**
 * __useCustomerExternalByTinQuery__
 *
 * To run a query within a React component, call `useCustomerExternalByTinQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerExternalByTinQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerExternalByTinQuery({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useCustomerExternalByTinQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CustomerExternalByTinQuery, CustomerExternalByTinQueryVariables>) {
        return ApolloReactHooks.useQuery<CustomerExternalByTinQuery, CustomerExternalByTinQueryVariables>(CustomerExternalByTinDocument, baseOptions);
      }
export function useCustomerExternalByTinLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomerExternalByTinQuery, CustomerExternalByTinQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CustomerExternalByTinQuery, CustomerExternalByTinQueryVariables>(CustomerExternalByTinDocument, baseOptions);
        }
export type CustomerExternalByTinQueryHookResult = ReturnType<typeof useCustomerExternalByTinQuery>;
export type CustomerExternalByTinLazyQueryHookResult = ReturnType<typeof useCustomerExternalByTinLazyQuery>;
export type CustomerExternalByTinQueryResult = ApolloReactCommon.QueryResult<CustomerExternalByTinQuery, CustomerExternalByTinQueryVariables>;
export const CustomerExternalByBankAccountDocument = gql`
    query customerExternalByBankAccount($value: String!) {
  data: customerExternalByBankAccount(value: $value) {
    id
    fullName
    shortName
    taxNumber
    uniqueCompanyNumber
    addresses {
      street
      city
      zipCode
      state
      type
    }
    banks {
      bankId
      bank {
        bankName
      }
      account
      accountString
    }
  }
}
    `;

/**
 * __useCustomerExternalByBankAccountQuery__
 *
 * To run a query within a React component, call `useCustomerExternalByBankAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerExternalByBankAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerExternalByBankAccountQuery({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useCustomerExternalByBankAccountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CustomerExternalByBankAccountQuery, CustomerExternalByBankAccountQueryVariables>) {
        return ApolloReactHooks.useQuery<CustomerExternalByBankAccountQuery, CustomerExternalByBankAccountQueryVariables>(CustomerExternalByBankAccountDocument, baseOptions);
      }
export function useCustomerExternalByBankAccountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomerExternalByBankAccountQuery, CustomerExternalByBankAccountQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CustomerExternalByBankAccountQuery, CustomerExternalByBankAccountQueryVariables>(CustomerExternalByBankAccountDocument, baseOptions);
        }
export type CustomerExternalByBankAccountQueryHookResult = ReturnType<typeof useCustomerExternalByBankAccountQuery>;
export type CustomerExternalByBankAccountLazyQueryHookResult = ReturnType<typeof useCustomerExternalByBankAccountLazyQuery>;
export type CustomerExternalByBankAccountQueryResult = ApolloReactCommon.QueryResult<CustomerExternalByBankAccountQuery, CustomerExternalByBankAccountQueryVariables>;
export const InsertExternalCustomerByTinDocument = gql`
    mutation insertExternalCustomerByTin($value: String!) {
  customer: insertExternalCustomerByTin(value: $value) {
    ...customerDetails
  }
}
    ${CustomerDetailsFragmentDoc}`;
export type InsertExternalCustomerByTinMutationFn = ApolloReactCommon.MutationFunction<InsertExternalCustomerByTinMutation, InsertExternalCustomerByTinMutationVariables>;

/**
 * __useInsertExternalCustomerByTinMutation__
 *
 * To run a mutation, you first call `useInsertExternalCustomerByTinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertExternalCustomerByTinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertExternalCustomerByTinMutation, { data, loading, error }] = useInsertExternalCustomerByTinMutation({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useInsertExternalCustomerByTinMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertExternalCustomerByTinMutation, InsertExternalCustomerByTinMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertExternalCustomerByTinMutation, InsertExternalCustomerByTinMutationVariables>(InsertExternalCustomerByTinDocument, baseOptions);
      }
export type InsertExternalCustomerByTinMutationHookResult = ReturnType<typeof useInsertExternalCustomerByTinMutation>;
export type InsertExternalCustomerByTinMutationResult = ApolloReactCommon.MutationResult<InsertExternalCustomerByTinMutation>;
export type InsertExternalCustomerByTinMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertExternalCustomerByTinMutation, InsertExternalCustomerByTinMutationVariables>;
export const InsertCustomerDocument = gql`
    mutation insertCustomer($data: CustomerType!) {
  customer: insertCustomer(data: $data) {
    ...customerDetails
  }
}
    ${CustomerDetailsFragmentDoc}`;
export type InsertCustomerMutationFn = ApolloReactCommon.MutationFunction<InsertCustomerMutation, InsertCustomerMutationVariables>;

/**
 * __useInsertCustomerMutation__
 *
 * To run a mutation, you first call `useInsertCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertCustomerMutation, { data, loading, error }] = useInsertCustomerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertCustomerMutation, InsertCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertCustomerMutation, InsertCustomerMutationVariables>(InsertCustomerDocument, baseOptions);
      }
export type InsertCustomerMutationHookResult = ReturnType<typeof useInsertCustomerMutation>;
export type InsertCustomerMutationResult = ApolloReactCommon.MutationResult<InsertCustomerMutation>;
export type InsertCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertCustomerMutation, InsertCustomerMutationVariables>;
export const InsertCustomersDocument = gql`
    mutation insertCustomers($data: [CustomerType!]!) {
  customers: insertCustomers(data: $data)
}
    `;
export type InsertCustomersMutationFn = ApolloReactCommon.MutationFunction<InsertCustomersMutation, InsertCustomersMutationVariables>;

/**
 * __useInsertCustomersMutation__
 *
 * To run a mutation, you first call `useInsertCustomersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertCustomersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertCustomersMutation, { data, loading, error }] = useInsertCustomersMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertCustomersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertCustomersMutation, InsertCustomersMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertCustomersMutation, InsertCustomersMutationVariables>(InsertCustomersDocument, baseOptions);
      }
export type InsertCustomersMutationHookResult = ReturnType<typeof useInsertCustomersMutation>;
export type InsertCustomersMutationResult = ApolloReactCommon.MutationResult<InsertCustomersMutation>;
export type InsertCustomersMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertCustomersMutation, InsertCustomersMutationVariables>;
export const UpdateCustomerDocument = gql`
    mutation updateCustomer($data: CustomerType!, $id: Int!) {
  customer: updateCustomer(data: $data, id: $id) {
    ...customerDetails
  }
}
    ${CustomerDetailsFragmentDoc}`;
export type UpdateCustomerMutationFn = ApolloReactCommon.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, baseOptions);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = ApolloReactCommon.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const UpdateBankAccountDocument = gql`
    mutation updateBankAccount($data: BankAccountType!, $id: Int!) {
  bankAccount: updateBankAccount(data: $data, id: $id) {
    ...bankAccountDetails
  }
}
    ${BankAccountDetailsFragmentDoc}`;
export type UpdateBankAccountMutationFn = ApolloReactCommon.MutationFunction<UpdateBankAccountMutation, UpdateBankAccountMutationVariables>;

/**
 * __useUpdateBankAccountMutation__
 *
 * To run a mutation, you first call `useUpdateBankAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBankAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBankAccountMutation, { data, loading, error }] = useUpdateBankAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateBankAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBankAccountMutation, UpdateBankAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateBankAccountMutation, UpdateBankAccountMutationVariables>(UpdateBankAccountDocument, baseOptions);
      }
export type UpdateBankAccountMutationHookResult = ReturnType<typeof useUpdateBankAccountMutation>;
export type UpdateBankAccountMutationResult = ApolloReactCommon.MutationResult<UpdateBankAccountMutation>;
export type UpdateBankAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateBankAccountMutation, UpdateBankAccountMutationVariables>;
export const DueDatesSummarizeByFilterDocument = gql`
    query dueDatesSummarizeByFilter($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $group: [String!], $attributes: [String!], $include: JSON) {
  data: dueDatesSummarizeByFilter(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, group: $group, attributes: $attributes, include: $include) {
    flag
    status
    finance
    customerId
    date
  }
}
    `;

/**
 * __useDueDatesSummarizeByFilterQuery__
 *
 * To run a query within a React component, call `useDueDatesSummarizeByFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useDueDatesSummarizeByFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDueDatesSummarizeByFilterQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      group: // value for 'group'
 *      attributes: // value for 'attributes'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useDueDatesSummarizeByFilterQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DueDatesSummarizeByFilterQuery, DueDatesSummarizeByFilterQueryVariables>) {
        return ApolloReactHooks.useQuery<DueDatesSummarizeByFilterQuery, DueDatesSummarizeByFilterQueryVariables>(DueDatesSummarizeByFilterDocument, baseOptions);
      }
export function useDueDatesSummarizeByFilterLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DueDatesSummarizeByFilterQuery, DueDatesSummarizeByFilterQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DueDatesSummarizeByFilterQuery, DueDatesSummarizeByFilterQueryVariables>(DueDatesSummarizeByFilterDocument, baseOptions);
        }
export type DueDatesSummarizeByFilterQueryHookResult = ReturnType<typeof useDueDatesSummarizeByFilterQuery>;
export type DueDatesSummarizeByFilterLazyQueryHookResult = ReturnType<typeof useDueDatesSummarizeByFilterLazyQuery>;
export type DueDatesSummarizeByFilterQueryResult = ApolloReactCommon.QueryResult<DueDatesSummarizeByFilterQuery, DueDatesSummarizeByFilterQueryVariables>;
export const DueDatesDocument = gql`
    query dueDates($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: dueDates(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...dueDatesDetails
    }
    count
    perPage
    page
  }
}
    ${DueDatesDetailsFragmentDoc}`;

/**
 * __useDueDatesQuery__
 *
 * To run a query within a React component, call `useDueDatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDueDatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDueDatesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useDueDatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DueDatesQuery, DueDatesQueryVariables>) {
        return ApolloReactHooks.useQuery<DueDatesQuery, DueDatesQueryVariables>(DueDatesDocument, baseOptions);
      }
export function useDueDatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DueDatesQuery, DueDatesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DueDatesQuery, DueDatesQueryVariables>(DueDatesDocument, baseOptions);
        }
export type DueDatesQueryHookResult = ReturnType<typeof useDueDatesQuery>;
export type DueDatesLazyQueryHookResult = ReturnType<typeof useDueDatesLazyQuery>;
export type DueDatesQueryResult = ApolloReactCommon.QueryResult<DueDatesQuery, DueDatesQueryVariables>;
export const FinanceTransferDocumentsDocument = gql`
    query financeTransferDocuments($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: financeTransferDocuments(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...financeTransferDocumentDetails
    }
    count
    perPage
    page
  }
}
    ${FinanceTransferDocumentDetailsFragmentDoc}`;

/**
 * __useFinanceTransferDocumentsQuery__
 *
 * To run a query within a React component, call `useFinanceTransferDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFinanceTransferDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFinanceTransferDocumentsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useFinanceTransferDocumentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FinanceTransferDocumentsQuery, FinanceTransferDocumentsQueryVariables>) {
        return ApolloReactHooks.useQuery<FinanceTransferDocumentsQuery, FinanceTransferDocumentsQueryVariables>(FinanceTransferDocumentsDocument, baseOptions);
      }
export function useFinanceTransferDocumentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FinanceTransferDocumentsQuery, FinanceTransferDocumentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FinanceTransferDocumentsQuery, FinanceTransferDocumentsQueryVariables>(FinanceTransferDocumentsDocument, baseOptions);
        }
export type FinanceTransferDocumentsQueryHookResult = ReturnType<typeof useFinanceTransferDocumentsQuery>;
export type FinanceTransferDocumentsLazyQueryHookResult = ReturnType<typeof useFinanceTransferDocumentsLazyQuery>;
export type FinanceTransferDocumentsQueryResult = ApolloReactCommon.QueryResult<FinanceTransferDocumentsQuery, FinanceTransferDocumentsQueryVariables>;
export const FinanceTransferDocumentDocument = gql`
    query financeTransferDocument($id: Int!) {
  financeTransferDocument: financeTransferDocument(id: $id) {
    ...financeTransferDocumentDetails
  }
}
    ${FinanceTransferDocumentDetailsFragmentDoc}`;

/**
 * __useFinanceTransferDocumentQuery__
 *
 * To run a query within a React component, call `useFinanceTransferDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFinanceTransferDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFinanceTransferDocumentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFinanceTransferDocumentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FinanceTransferDocumentQuery, FinanceTransferDocumentQueryVariables>) {
        return ApolloReactHooks.useQuery<FinanceTransferDocumentQuery, FinanceTransferDocumentQueryVariables>(FinanceTransferDocumentDocument, baseOptions);
      }
export function useFinanceTransferDocumentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FinanceTransferDocumentQuery, FinanceTransferDocumentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FinanceTransferDocumentQuery, FinanceTransferDocumentQueryVariables>(FinanceTransferDocumentDocument, baseOptions);
        }
export type FinanceTransferDocumentQueryHookResult = ReturnType<typeof useFinanceTransferDocumentQuery>;
export type FinanceTransferDocumentLazyQueryHookResult = ReturnType<typeof useFinanceTransferDocumentLazyQuery>;
export type FinanceTransferDocumentQueryResult = ApolloReactCommon.QueryResult<FinanceTransferDocumentQuery, FinanceTransferDocumentQueryVariables>;
export const InsertFinanceTransferDocumentDocument = gql`
    mutation insertFinanceTransferDocument($data: FinanceTransferDocumentInsertType!) {
  financeTransferDocument: insertFinanceTransferDocument(data: $data) {
    ...financeTransferDocumentDetails
  }
}
    ${FinanceTransferDocumentDetailsFragmentDoc}`;
export type InsertFinanceTransferDocumentMutationFn = ApolloReactCommon.MutationFunction<InsertFinanceTransferDocumentMutation, InsertFinanceTransferDocumentMutationVariables>;

/**
 * __useInsertFinanceTransferDocumentMutation__
 *
 * To run a mutation, you first call `useInsertFinanceTransferDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertFinanceTransferDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertFinanceTransferDocumentMutation, { data, loading, error }] = useInsertFinanceTransferDocumentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertFinanceTransferDocumentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertFinanceTransferDocumentMutation, InsertFinanceTransferDocumentMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertFinanceTransferDocumentMutation, InsertFinanceTransferDocumentMutationVariables>(InsertFinanceTransferDocumentDocument, baseOptions);
      }
export type InsertFinanceTransferDocumentMutationHookResult = ReturnType<typeof useInsertFinanceTransferDocumentMutation>;
export type InsertFinanceTransferDocumentMutationResult = ApolloReactCommon.MutationResult<InsertFinanceTransferDocumentMutation>;
export type InsertFinanceTransferDocumentMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertFinanceTransferDocumentMutation, InsertFinanceTransferDocumentMutationVariables>;
export const UpdateFinanceTransferDocumentDocument = gql`
    mutation updateFinanceTransferDocument($id: Int!, $data: FinanceTransferDocumentUpdateType!) {
  financeTransferDocument: updateFinanceTransferDocument(id: $id, data: $data) {
    ...financeTransferDocumentDetails
  }
}
    ${FinanceTransferDocumentDetailsFragmentDoc}`;
export type UpdateFinanceTransferDocumentMutationFn = ApolloReactCommon.MutationFunction<UpdateFinanceTransferDocumentMutation, UpdateFinanceTransferDocumentMutationVariables>;

/**
 * __useUpdateFinanceTransferDocumentMutation__
 *
 * To run a mutation, you first call `useUpdateFinanceTransferDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFinanceTransferDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFinanceTransferDocumentMutation, { data, loading, error }] = useUpdateFinanceTransferDocumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFinanceTransferDocumentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateFinanceTransferDocumentMutation, UpdateFinanceTransferDocumentMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateFinanceTransferDocumentMutation, UpdateFinanceTransferDocumentMutationVariables>(UpdateFinanceTransferDocumentDocument, baseOptions);
      }
export type UpdateFinanceTransferDocumentMutationHookResult = ReturnType<typeof useUpdateFinanceTransferDocumentMutation>;
export type UpdateFinanceTransferDocumentMutationResult = ApolloReactCommon.MutationResult<UpdateFinanceTransferDocumentMutation>;
export type UpdateFinanceTransferDocumentMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateFinanceTransferDocumentMutation, UpdateFinanceTransferDocumentMutationVariables>;
export const InvoicesDocument = gql`
    query invoices($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: invoices(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...invoiceDetails
    }
    count
    perPage
    page
  }
}
    ${InvoiceDetailsFragmentDoc}`;

/**
 * __useInvoicesQuery__
 *
 * To run a query within a React component, call `useInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoicesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useInvoicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InvoicesQuery, InvoicesQueryVariables>) {
        return ApolloReactHooks.useQuery<InvoicesQuery, InvoicesQueryVariables>(InvoicesDocument, baseOptions);
      }
export function useInvoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InvoicesQuery, InvoicesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InvoicesQuery, InvoicesQueryVariables>(InvoicesDocument, baseOptions);
        }
export type InvoicesQueryHookResult = ReturnType<typeof useInvoicesQuery>;
export type InvoicesLazyQueryHookResult = ReturnType<typeof useInvoicesLazyQuery>;
export type InvoicesQueryResult = ApolloReactCommon.QueryResult<InvoicesQuery, InvoicesQueryVariables>;
export const InvoiceDocument = gql`
    query invoice($id: Int!) {
  invoice: invoice(id: $id) {
    ...invoiceDetails
  }
}
    ${InvoiceDetailsFragmentDoc}`;

/**
 * __useInvoiceQuery__
 *
 * To run a query within a React component, call `useInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInvoiceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InvoiceQuery, InvoiceQueryVariables>) {
        return ApolloReactHooks.useQuery<InvoiceQuery, InvoiceQueryVariables>(InvoiceDocument, baseOptions);
      }
export function useInvoiceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InvoiceQuery, InvoiceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InvoiceQuery, InvoiceQueryVariables>(InvoiceDocument, baseOptions);
        }
export type InvoiceQueryHookResult = ReturnType<typeof useInvoiceQuery>;
export type InvoiceLazyQueryHookResult = ReturnType<typeof useInvoiceLazyQuery>;
export type InvoiceQueryResult = ApolloReactCommon.QueryResult<InvoiceQuery, InvoiceQueryVariables>;
export const InsertInvoiceDocument = gql`
    mutation insertInvoice($data: InvoiceType!) {
  invoice: insertInvoice(data: $data) {
    ...invoiceDetails
  }
}
    ${InvoiceDetailsFragmentDoc}`;
export type InsertInvoiceMutationFn = ApolloReactCommon.MutationFunction<InsertInvoiceMutation, InsertInvoiceMutationVariables>;

/**
 * __useInsertInvoiceMutation__
 *
 * To run a mutation, you first call `useInsertInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertInvoiceMutation, { data, loading, error }] = useInsertInvoiceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertInvoiceMutation, InsertInvoiceMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertInvoiceMutation, InsertInvoiceMutationVariables>(InsertInvoiceDocument, baseOptions);
      }
export type InsertInvoiceMutationHookResult = ReturnType<typeof useInsertInvoiceMutation>;
export type InsertInvoiceMutationResult = ApolloReactCommon.MutationResult<InsertInvoiceMutation>;
export type InsertInvoiceMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertInvoiceMutation, InsertInvoiceMutationVariables>;
export const UpdateInvoiceDocument = gql`
    mutation updateInvoice($id: Int!, $data: InvoiceType!) {
  invoice: updateInvoice(id: $id, data: $data) {
    ...invoiceDetails
  }
}
    ${InvoiceDetailsFragmentDoc}`;
export type UpdateInvoiceMutationFn = ApolloReactCommon.MutationFunction<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;

/**
 * __useUpdateInvoiceMutation__
 *
 * To run a mutation, you first call `useUpdateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInvoiceMutation, { data, loading, error }] = useUpdateInvoiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>(UpdateInvoiceDocument, baseOptions);
      }
export type UpdateInvoiceMutationHookResult = ReturnType<typeof useUpdateInvoiceMutation>;
export type UpdateInvoiceMutationResult = ApolloReactCommon.MutationResult<UpdateInvoiceMutation>;
export type UpdateInvoiceMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;
export const InsertUpdateInvoiceItemDocument = gql`
    mutation insertUpdateInvoiceItem($additionalData: InvoiceAdditionalType!, $id: Int!, $data: InvoiceItemType!) {
  invoice: insertUpdateInvoiceItem(additionalData: $additionalData, id: $id, data: $data) {
    ...invoiceDetails
  }
}
    ${InvoiceDetailsFragmentDoc}`;
export type InsertUpdateInvoiceItemMutationFn = ApolloReactCommon.MutationFunction<InsertUpdateInvoiceItemMutation, InsertUpdateInvoiceItemMutationVariables>;

/**
 * __useInsertUpdateInvoiceItemMutation__
 *
 * To run a mutation, you first call `useInsertUpdateInvoiceItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUpdateInvoiceItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUpdateInvoiceItemMutation, { data, loading, error }] = useInsertUpdateInvoiceItemMutation({
 *   variables: {
 *      additionalData: // value for 'additionalData'
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertUpdateInvoiceItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertUpdateInvoiceItemMutation, InsertUpdateInvoiceItemMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertUpdateInvoiceItemMutation, InsertUpdateInvoiceItemMutationVariables>(InsertUpdateInvoiceItemDocument, baseOptions);
      }
export type InsertUpdateInvoiceItemMutationHookResult = ReturnType<typeof useInsertUpdateInvoiceItemMutation>;
export type InsertUpdateInvoiceItemMutationResult = ApolloReactCommon.MutationResult<InsertUpdateInvoiceItemMutation>;
export type InsertUpdateInvoiceItemMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertUpdateInvoiceItemMutation, InsertUpdateInvoiceItemMutationVariables>;
export const DeleteInvoiceItemDocument = gql`
    mutation deleteInvoiceItem($additionalData: InvoiceAdditionalType!, $id: Int!) {
  invoice: deleteInvoiceItem(id: $id, additionalData: $additionalData) {
    ...invoiceDetails
  }
}
    ${InvoiceDetailsFragmentDoc}`;
export type DeleteInvoiceItemMutationFn = ApolloReactCommon.MutationFunction<DeleteInvoiceItemMutation, DeleteInvoiceItemMutationVariables>;

/**
 * __useDeleteInvoiceItemMutation__
 *
 * To run a mutation, you first call `useDeleteInvoiceItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInvoiceItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInvoiceItemMutation, { data, loading, error }] = useDeleteInvoiceItemMutation({
 *   variables: {
 *      additionalData: // value for 'additionalData'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteInvoiceItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteInvoiceItemMutation, DeleteInvoiceItemMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteInvoiceItemMutation, DeleteInvoiceItemMutationVariables>(DeleteInvoiceItemDocument, baseOptions);
      }
export type DeleteInvoiceItemMutationHookResult = ReturnType<typeof useDeleteInvoiceItemMutation>;
export type DeleteInvoiceItemMutationResult = ApolloReactCommon.MutationResult<DeleteInvoiceItemMutation>;
export type DeleteInvoiceItemMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteInvoiceItemMutation, DeleteInvoiceItemMutationVariables>;
export const InsertInvoiceVersionDocument = gql`
    mutation insertInvoiceVersion($data: InvoiceVersionType!) {
  invoiceVersion: insertInvoiceVersion(data: $data) {
    ...invoiceVersionDetails
  }
}
    ${InvoiceVersionDetailsFragmentDoc}`;
export type InsertInvoiceVersionMutationFn = ApolloReactCommon.MutationFunction<InsertInvoiceVersionMutation, InsertInvoiceVersionMutationVariables>;

/**
 * __useInsertInvoiceVersionMutation__
 *
 * To run a mutation, you first call `useInsertInvoiceVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertInvoiceVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertInvoiceVersionMutation, { data, loading, error }] = useInsertInvoiceVersionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertInvoiceVersionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertInvoiceVersionMutation, InsertInvoiceVersionMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertInvoiceVersionMutation, InsertInvoiceVersionMutationVariables>(InsertInvoiceVersionDocument, baseOptions);
      }
export type InsertInvoiceVersionMutationHookResult = ReturnType<typeof useInsertInvoiceVersionMutation>;
export type InsertInvoiceVersionMutationResult = ApolloReactCommon.MutationResult<InsertInvoiceVersionMutation>;
export type InsertInvoiceVersionMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertInvoiceVersionMutation, InsertInvoiceVersionMutationVariables>;
export const ItemsDocument = gql`
    query items($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON) {
  data: items(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
    items {
      ...itemDetails
    }
    count
    perPage
    page
  }
}
    ${ItemDetailsFragmentDoc}`;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        return ApolloReactHooks.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, baseOptions);
      }
export function useItemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, baseOptions);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = ApolloReactCommon.QueryResult<ItemsQuery, ItemsQueryVariables>;
export const ItemDocument = gql`
    query item($id: Int!) {
  item: item(id: $id) {
    ...itemDetails
  }
}
    ${ItemDetailsFragmentDoc}`;

/**
 * __useItemQuery__
 *
 * To run a query within a React component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useItemQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ItemQuery, ItemQueryVariables>) {
        return ApolloReactHooks.useQuery<ItemQuery, ItemQueryVariables>(ItemDocument, baseOptions);
      }
export function useItemLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ItemQuery, ItemQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ItemQuery, ItemQueryVariables>(ItemDocument, baseOptions);
        }
export type ItemQueryHookResult = ReturnType<typeof useItemQuery>;
export type ItemLazyQueryHookResult = ReturnType<typeof useItemLazyQuery>;
export type ItemQueryResult = ApolloReactCommon.QueryResult<ItemQuery, ItemQueryVariables>;
export const TotalSaleTransactionByItemDocument = gql`
    query totalSaleTransactionByItem($itemId: Int!, $dateStart: DateTime, $dateEnd: DateTime) {
  saleItem: totalSaleTransactionByItem(itemId: $itemId, dateStart: $dateStart, dateEnd: $dateEnd) {
    item {
      ...itemDetails
    }
    quantity
    taxFinance
    financeVP
  }
}
    ${ItemDetailsFragmentDoc}`;

/**
 * __useTotalSaleTransactionByItemQuery__
 *
 * To run a query within a React component, call `useTotalSaleTransactionByItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalSaleTransactionByItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalSaleTransactionByItemQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      dateStart: // value for 'dateStart'
 *      dateEnd: // value for 'dateEnd'
 *   },
 * });
 */
export function useTotalSaleTransactionByItemQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TotalSaleTransactionByItemQuery, TotalSaleTransactionByItemQueryVariables>) {
        return ApolloReactHooks.useQuery<TotalSaleTransactionByItemQuery, TotalSaleTransactionByItemQueryVariables>(TotalSaleTransactionByItemDocument, baseOptions);
      }
export function useTotalSaleTransactionByItemLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TotalSaleTransactionByItemQuery, TotalSaleTransactionByItemQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TotalSaleTransactionByItemQuery, TotalSaleTransactionByItemQueryVariables>(TotalSaleTransactionByItemDocument, baseOptions);
        }
export type TotalSaleTransactionByItemQueryHookResult = ReturnType<typeof useTotalSaleTransactionByItemQuery>;
export type TotalSaleTransactionByItemLazyQueryHookResult = ReturnType<typeof useTotalSaleTransactionByItemLazyQuery>;
export type TotalSaleTransactionByItemQueryResult = ApolloReactCommon.QueryResult<TotalSaleTransactionByItemQuery, TotalSaleTransactionByItemQueryVariables>;
export const TotalTransactionBetweenDatesByItemDocument = gql`
    query totalTransactionBetweenDatesByItem($itemId: Int!, $dateStart: DateTime, $dateEnd: DateTime) {
  saleItems: totalTransactionBetweenDatesByItem(itemId: $itemId, dateStart: $dateStart, dateEnd: $dateEnd) {
    date
    item {
      ...itemDetails
    }
    quantity
    taxFinance
    financeVP
  }
}
    ${ItemDetailsFragmentDoc}`;

/**
 * __useTotalTransactionBetweenDatesByItemQuery__
 *
 * To run a query within a React component, call `useTotalTransactionBetweenDatesByItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalTransactionBetweenDatesByItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalTransactionBetweenDatesByItemQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      dateStart: // value for 'dateStart'
 *      dateEnd: // value for 'dateEnd'
 *   },
 * });
 */
export function useTotalTransactionBetweenDatesByItemQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TotalTransactionBetweenDatesByItemQuery, TotalTransactionBetweenDatesByItemQueryVariables>) {
        return ApolloReactHooks.useQuery<TotalTransactionBetweenDatesByItemQuery, TotalTransactionBetweenDatesByItemQueryVariables>(TotalTransactionBetweenDatesByItemDocument, baseOptions);
      }
export function useTotalTransactionBetweenDatesByItemLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TotalTransactionBetweenDatesByItemQuery, TotalTransactionBetweenDatesByItemQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TotalTransactionBetweenDatesByItemQuery, TotalTransactionBetweenDatesByItemQueryVariables>(TotalTransactionBetweenDatesByItemDocument, baseOptions);
        }
export type TotalTransactionBetweenDatesByItemQueryHookResult = ReturnType<typeof useTotalTransactionBetweenDatesByItemQuery>;
export type TotalTransactionBetweenDatesByItemLazyQueryHookResult = ReturnType<typeof useTotalTransactionBetweenDatesByItemLazyQuery>;
export type TotalTransactionBetweenDatesByItemQueryResult = ApolloReactCommon.QueryResult<TotalTransactionBetweenDatesByItemQuery, TotalTransactionBetweenDatesByItemQueryVariables>;
export const TotalSaleItemsByYearDocument = gql`
    query totalSaleItemsByYear($itemId: Int!) {
  saleByYear: totalSaleItemsByYear(itemId: $itemId) {
    date
    quantity
    taxFinance
    financeVP
  }
}
    `;

/**
 * __useTotalSaleItemsByYearQuery__
 *
 * To run a query within a React component, call `useTotalSaleItemsByYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalSaleItemsByYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalSaleItemsByYearQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useTotalSaleItemsByYearQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TotalSaleItemsByYearQuery, TotalSaleItemsByYearQueryVariables>) {
        return ApolloReactHooks.useQuery<TotalSaleItemsByYearQuery, TotalSaleItemsByYearQueryVariables>(TotalSaleItemsByYearDocument, baseOptions);
      }
export function useTotalSaleItemsByYearLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TotalSaleItemsByYearQuery, TotalSaleItemsByYearQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TotalSaleItemsByYearQuery, TotalSaleItemsByYearQueryVariables>(TotalSaleItemsByYearDocument, baseOptions);
        }
export type TotalSaleItemsByYearQueryHookResult = ReturnType<typeof useTotalSaleItemsByYearQuery>;
export type TotalSaleItemsByYearLazyQueryHookResult = ReturnType<typeof useTotalSaleItemsByYearLazyQuery>;
export type TotalSaleItemsByYearQueryResult = ApolloReactCommon.QueryResult<TotalSaleItemsByYearQuery, TotalSaleItemsByYearQueryVariables>;
export const InsertItemDocument = gql`
    mutation insertItem($data: ItemType!) {
  item: insertItem(data: $data) {
    ...itemDetails
  }
}
    ${ItemDetailsFragmentDoc}`;
export type InsertItemMutationFn = ApolloReactCommon.MutationFunction<InsertItemMutation, InsertItemMutationVariables>;

/**
 * __useInsertItemMutation__
 *
 * To run a mutation, you first call `useInsertItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertItemMutation, { data, loading, error }] = useInsertItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertItemMutation, InsertItemMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertItemMutation, InsertItemMutationVariables>(InsertItemDocument, baseOptions);
      }
export type InsertItemMutationHookResult = ReturnType<typeof useInsertItemMutation>;
export type InsertItemMutationResult = ApolloReactCommon.MutationResult<InsertItemMutation>;
export type InsertItemMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertItemMutation, InsertItemMutationVariables>;
export const InsertItemsDocument = gql`
    mutation insertItems($data: [ItemType!]!) {
  items: insertItems(data: $data)
}
    `;
export type InsertItemsMutationFn = ApolloReactCommon.MutationFunction<InsertItemsMutation, InsertItemsMutationVariables>;

/**
 * __useInsertItemsMutation__
 *
 * To run a mutation, you first call `useInsertItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertItemsMutation, { data, loading, error }] = useInsertItemsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertItemsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertItemsMutation, InsertItemsMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertItemsMutation, InsertItemsMutationVariables>(InsertItemsDocument, baseOptions);
      }
export type InsertItemsMutationHookResult = ReturnType<typeof useInsertItemsMutation>;
export type InsertItemsMutationResult = ApolloReactCommon.MutationResult<InsertItemsMutation>;
export type InsertItemsMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertItemsMutation, InsertItemsMutationVariables>;
export const UpdateItemDocument = gql`
    mutation updateItem($data: ItemType!, $id: Int!) {
  item: updateItem(data: $data, id: $id) {
    ...itemDetails
  }
}
    ${ItemDetailsFragmentDoc}`;
export type UpdateItemMutationFn = ApolloReactCommon.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, baseOptions);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = ApolloReactCommon.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;
export const UpdateItemSupplierDocument = gql`
    mutation updateItemSupplier($data: ItemSupplierType!, $id: Int!) {
  itemSupplier: updateItemSupplier(data: $data, id: $id) {
    ...itemSupplierDetails
  }
}
    ${ItemSupplierDetailsFragmentDoc}`;
export type UpdateItemSupplierMutationFn = ApolloReactCommon.MutationFunction<UpdateItemSupplierMutation, UpdateItemSupplierMutationVariables>;

/**
 * __useUpdateItemSupplierMutation__
 *
 * To run a mutation, you first call `useUpdateItemSupplierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemSupplierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemSupplierMutation, { data, loading, error }] = useUpdateItemSupplierMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateItemSupplierMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateItemSupplierMutation, UpdateItemSupplierMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateItemSupplierMutation, UpdateItemSupplierMutationVariables>(UpdateItemSupplierDocument, baseOptions);
      }
export type UpdateItemSupplierMutationHookResult = ReturnType<typeof useUpdateItemSupplierMutation>;
export type UpdateItemSupplierMutationResult = ApolloReactCommon.MutationResult<UpdateItemSupplierMutation>;
export type UpdateItemSupplierMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateItemSupplierMutation, UpdateItemSupplierMutationVariables>;
export const TestInsertItemsByClientDocument = gql`
    mutation testInsertItemsByClient($data: [ItemType!]!) {
  items: testInsertItemsByClient(data: $data)
}
    `;
export type TestInsertItemsByClientMutationFn = ApolloReactCommon.MutationFunction<TestInsertItemsByClientMutation, TestInsertItemsByClientMutationVariables>;

/**
 * __useTestInsertItemsByClientMutation__
 *
 * To run a mutation, you first call `useTestInsertItemsByClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestInsertItemsByClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testInsertItemsByClientMutation, { data, loading, error }] = useTestInsertItemsByClientMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTestInsertItemsByClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TestInsertItemsByClientMutation, TestInsertItemsByClientMutationVariables>) {
        return ApolloReactHooks.useMutation<TestInsertItemsByClientMutation, TestInsertItemsByClientMutationVariables>(TestInsertItemsByClientDocument, baseOptions);
      }
export type TestInsertItemsByClientMutationHookResult = ReturnType<typeof useTestInsertItemsByClientMutation>;
export type TestInsertItemsByClientMutationResult = ApolloReactCommon.MutationResult<TestInsertItemsByClientMutation>;
export type TestInsertItemsByClientMutationOptions = ApolloReactCommon.BaseMutationOptions<TestInsertItemsByClientMutation, TestInsertItemsByClientMutationVariables>;
export const NormativesDocument = gql`
    query normatives($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: normatives(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...normativeDetails
    }
    count
    perPage
    page
  }
}
    ${NormativeDetailsFragmentDoc}`;

/**
 * __useNormativesQuery__
 *
 * To run a query within a React component, call `useNormativesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNormativesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNormativesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useNormativesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NormativesQuery, NormativesQueryVariables>) {
        return ApolloReactHooks.useQuery<NormativesQuery, NormativesQueryVariables>(NormativesDocument, baseOptions);
      }
export function useNormativesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NormativesQuery, NormativesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NormativesQuery, NormativesQueryVariables>(NormativesDocument, baseOptions);
        }
export type NormativesQueryHookResult = ReturnType<typeof useNormativesQuery>;
export type NormativesLazyQueryHookResult = ReturnType<typeof useNormativesLazyQuery>;
export type NormativesQueryResult = ApolloReactCommon.QueryResult<NormativesQuery, NormativesQueryVariables>;
export const NormativeDocument = gql`
    query normative($id: Int!) {
  normative: normative(id: $id) {
    ...normativeDetails
  }
}
    ${NormativeDetailsFragmentDoc}`;

/**
 * __useNormativeQuery__
 *
 * To run a query within a React component, call `useNormativeQuery` and pass it any options that fit your needs.
 * When your component renders, `useNormativeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNormativeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNormativeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NormativeQuery, NormativeQueryVariables>) {
        return ApolloReactHooks.useQuery<NormativeQuery, NormativeQueryVariables>(NormativeDocument, baseOptions);
      }
export function useNormativeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NormativeQuery, NormativeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NormativeQuery, NormativeQueryVariables>(NormativeDocument, baseOptions);
        }
export type NormativeQueryHookResult = ReturnType<typeof useNormativeQuery>;
export type NormativeLazyQueryHookResult = ReturnType<typeof useNormativeLazyQuery>;
export type NormativeQueryResult = ApolloReactCommon.QueryResult<NormativeQuery, NormativeQueryVariables>;
export const NormativeSummarizeDocument = gql`
    query normativeSummarize($id: Int!) {
  normative: normativeSummarize(id: $id) {
    ...normativeDetails
  }
}
    ${NormativeDetailsFragmentDoc}`;

/**
 * __useNormativeSummarizeQuery__
 *
 * To run a query within a React component, call `useNormativeSummarizeQuery` and pass it any options that fit your needs.
 * When your component renders, `useNormativeSummarizeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNormativeSummarizeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNormativeSummarizeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NormativeSummarizeQuery, NormativeSummarizeQueryVariables>) {
        return ApolloReactHooks.useQuery<NormativeSummarizeQuery, NormativeSummarizeQueryVariables>(NormativeSummarizeDocument, baseOptions);
      }
export function useNormativeSummarizeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NormativeSummarizeQuery, NormativeSummarizeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NormativeSummarizeQuery, NormativeSummarizeQueryVariables>(NormativeSummarizeDocument, baseOptions);
        }
export type NormativeSummarizeQueryHookResult = ReturnType<typeof useNormativeSummarizeQuery>;
export type NormativeSummarizeLazyQueryHookResult = ReturnType<typeof useNormativeSummarizeLazyQuery>;
export type NormativeSummarizeQueryResult = ApolloReactCommon.QueryResult<NormativeSummarizeQuery, NormativeSummarizeQueryVariables>;
export const FindItemsWithNormativeDocument = gql`
    query findItemsWithNormative($value: String!) {
  data: findItemsWithNormative(value: $value) {
    ...itemDetails
  }
}
    ${ItemDetailsFragmentDoc}`;

/**
 * __useFindItemsWithNormativeQuery__
 *
 * To run a query within a React component, call `useFindItemsWithNormativeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindItemsWithNormativeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindItemsWithNormativeQuery({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useFindItemsWithNormativeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindItemsWithNormativeQuery, FindItemsWithNormativeQueryVariables>) {
        return ApolloReactHooks.useQuery<FindItemsWithNormativeQuery, FindItemsWithNormativeQueryVariables>(FindItemsWithNormativeDocument, baseOptions);
      }
export function useFindItemsWithNormativeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindItemsWithNormativeQuery, FindItemsWithNormativeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindItemsWithNormativeQuery, FindItemsWithNormativeQueryVariables>(FindItemsWithNormativeDocument, baseOptions);
        }
export type FindItemsWithNormativeQueryHookResult = ReturnType<typeof useFindItemsWithNormativeQuery>;
export type FindItemsWithNormativeLazyQueryHookResult = ReturnType<typeof useFindItemsWithNormativeLazyQuery>;
export type FindItemsWithNormativeQueryResult = ApolloReactCommon.QueryResult<FindItemsWithNormativeQuery, FindItemsWithNormativeQueryVariables>;
export const InsertNormativeDocument = gql`
    mutation insertNormative($data: NormativeType!) {
  normative: insertNormative(data: $data) {
    ...normativeDetails
  }
}
    ${NormativeDetailsFragmentDoc}`;
export type InsertNormativeMutationFn = ApolloReactCommon.MutationFunction<InsertNormativeMutation, InsertNormativeMutationVariables>;

/**
 * __useInsertNormativeMutation__
 *
 * To run a mutation, you first call `useInsertNormativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertNormativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertNormativeMutation, { data, loading, error }] = useInsertNormativeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertNormativeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertNormativeMutation, InsertNormativeMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertNormativeMutation, InsertNormativeMutationVariables>(InsertNormativeDocument, baseOptions);
      }
export type InsertNormativeMutationHookResult = ReturnType<typeof useInsertNormativeMutation>;
export type InsertNormativeMutationResult = ApolloReactCommon.MutationResult<InsertNormativeMutation>;
export type InsertNormativeMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertNormativeMutation, InsertNormativeMutationVariables>;
export const UpdateNormativeDocument = gql`
    mutation updateNormative($id: Int!, $data: NormativeType!) {
  normative: updateNormative(id: $id, data: $data) {
    ...normativeDetails
  }
}
    ${NormativeDetailsFragmentDoc}`;
export type UpdateNormativeMutationFn = ApolloReactCommon.MutationFunction<UpdateNormativeMutation, UpdateNormativeMutationVariables>;

/**
 * __useUpdateNormativeMutation__
 *
 * To run a mutation, you first call `useUpdateNormativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNormativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNormativeMutation, { data, loading, error }] = useUpdateNormativeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateNormativeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateNormativeMutation, UpdateNormativeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateNormativeMutation, UpdateNormativeMutationVariables>(UpdateNormativeDocument, baseOptions);
      }
export type UpdateNormativeMutationHookResult = ReturnType<typeof useUpdateNormativeMutation>;
export type UpdateNormativeMutationResult = ApolloReactCommon.MutationResult<UpdateNormativeMutation>;
export type UpdateNormativeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateNormativeMutation, UpdateNormativeMutationVariables>;
export const InsertNormativeItemDocument = gql`
    mutation insertNormativeItem($data: NormativeItemType!) {
  normative: insertNormativeItem(data: $data) {
    ...normativeDetails
  }
}
    ${NormativeDetailsFragmentDoc}`;
export type InsertNormativeItemMutationFn = ApolloReactCommon.MutationFunction<InsertNormativeItemMutation, InsertNormativeItemMutationVariables>;

/**
 * __useInsertNormativeItemMutation__
 *
 * To run a mutation, you first call `useInsertNormativeItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertNormativeItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertNormativeItemMutation, { data, loading, error }] = useInsertNormativeItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertNormativeItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertNormativeItemMutation, InsertNormativeItemMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertNormativeItemMutation, InsertNormativeItemMutationVariables>(InsertNormativeItemDocument, baseOptions);
      }
export type InsertNormativeItemMutationHookResult = ReturnType<typeof useInsertNormativeItemMutation>;
export type InsertNormativeItemMutationResult = ApolloReactCommon.MutationResult<InsertNormativeItemMutation>;
export type InsertNormativeItemMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertNormativeItemMutation, InsertNormativeItemMutationVariables>;
export const UpdateNormativeItemDocument = gql`
    mutation updateNormativeItem($id: Int!, $data: NormativeItemType!) {
  normative: updateNormativeItem(id: $id, data: $data) {
    ...normativeDetails
  }
}
    ${NormativeDetailsFragmentDoc}`;
export type UpdateNormativeItemMutationFn = ApolloReactCommon.MutationFunction<UpdateNormativeItemMutation, UpdateNormativeItemMutationVariables>;

/**
 * __useUpdateNormativeItemMutation__
 *
 * To run a mutation, you first call `useUpdateNormativeItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNormativeItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNormativeItemMutation, { data, loading, error }] = useUpdateNormativeItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateNormativeItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateNormativeItemMutation, UpdateNormativeItemMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateNormativeItemMutation, UpdateNormativeItemMutationVariables>(UpdateNormativeItemDocument, baseOptions);
      }
export type UpdateNormativeItemMutationHookResult = ReturnType<typeof useUpdateNormativeItemMutation>;
export type UpdateNormativeItemMutationResult = ApolloReactCommon.MutationResult<UpdateNormativeItemMutation>;
export type UpdateNormativeItemMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateNormativeItemMutation, UpdateNormativeItemMutationVariables>;
export const DeleteNormativeItemDocument = gql`
    mutation deleteNormativeItem($id: Int!) {
  normative: deleteNormativeItem(id: $id) {
    ...normativeDetails
  }
}
    ${NormativeDetailsFragmentDoc}`;
export type DeleteNormativeItemMutationFn = ApolloReactCommon.MutationFunction<DeleteNormativeItemMutation, DeleteNormativeItemMutationVariables>;

/**
 * __useDeleteNormativeItemMutation__
 *
 * To run a mutation, you first call `useDeleteNormativeItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNormativeItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNormativeItemMutation, { data, loading, error }] = useDeleteNormativeItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNormativeItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteNormativeItemMutation, DeleteNormativeItemMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteNormativeItemMutation, DeleteNormativeItemMutationVariables>(DeleteNormativeItemDocument, baseOptions);
      }
export type DeleteNormativeItemMutationHookResult = ReturnType<typeof useDeleteNormativeItemMutation>;
export type DeleteNormativeItemMutationResult = ApolloReactCommon.MutationResult<DeleteNormativeItemMutation>;
export type DeleteNormativeItemMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteNormativeItemMutation, DeleteNormativeItemMutationVariables>;
export const InsertProductionOrderItemDocument = gql`
    mutation insertProductionOrderItem($data: ProductionOrderItemType!) {
  productionOrder: insertProductionOrderItem(data: $data) {
    ...productionOrderDetails
  }
}
    ${ProductionOrderDetailsFragmentDoc}`;
export type InsertProductionOrderItemMutationFn = ApolloReactCommon.MutationFunction<InsertProductionOrderItemMutation, InsertProductionOrderItemMutationVariables>;

/**
 * __useInsertProductionOrderItemMutation__
 *
 * To run a mutation, you first call `useInsertProductionOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertProductionOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertProductionOrderItemMutation, { data, loading, error }] = useInsertProductionOrderItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertProductionOrderItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertProductionOrderItemMutation, InsertProductionOrderItemMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertProductionOrderItemMutation, InsertProductionOrderItemMutationVariables>(InsertProductionOrderItemDocument, baseOptions);
      }
export type InsertProductionOrderItemMutationHookResult = ReturnType<typeof useInsertProductionOrderItemMutation>;
export type InsertProductionOrderItemMutationResult = ApolloReactCommon.MutationResult<InsertProductionOrderItemMutation>;
export type InsertProductionOrderItemMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertProductionOrderItemMutation, InsertProductionOrderItemMutationVariables>;
export const UpdateProductionOrderItemDocument = gql`
    mutation updateProductionOrderItem($id: Int!, $data: ProductionOrderItemType!) {
  productionOrder: updateProductionOrderItem(id: $id, data: $data) {
    ...productionOrderDetails
  }
}
    ${ProductionOrderDetailsFragmentDoc}`;
export type UpdateProductionOrderItemMutationFn = ApolloReactCommon.MutationFunction<UpdateProductionOrderItemMutation, UpdateProductionOrderItemMutationVariables>;

/**
 * __useUpdateProductionOrderItemMutation__
 *
 * To run a mutation, you first call `useUpdateProductionOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductionOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductionOrderItemMutation, { data, loading, error }] = useUpdateProductionOrderItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductionOrderItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProductionOrderItemMutation, UpdateProductionOrderItemMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProductionOrderItemMutation, UpdateProductionOrderItemMutationVariables>(UpdateProductionOrderItemDocument, baseOptions);
      }
export type UpdateProductionOrderItemMutationHookResult = ReturnType<typeof useUpdateProductionOrderItemMutation>;
export type UpdateProductionOrderItemMutationResult = ApolloReactCommon.MutationResult<UpdateProductionOrderItemMutation>;
export type UpdateProductionOrderItemMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProductionOrderItemMutation, UpdateProductionOrderItemMutationVariables>;
export const DeleteProductionOrderItemDocument = gql`
    mutation deleteProductionOrderItem($id: Int!) {
  productionOrder: deleteProductionOrderItem(id: $id) {
    ...productionOrderDetails
  }
}
    ${ProductionOrderDetailsFragmentDoc}`;
export type DeleteProductionOrderItemMutationFn = ApolloReactCommon.MutationFunction<DeleteProductionOrderItemMutation, DeleteProductionOrderItemMutationVariables>;

/**
 * __useDeleteProductionOrderItemMutation__
 *
 * To run a mutation, you first call `useDeleteProductionOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductionOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductionOrderItemMutation, { data, loading, error }] = useDeleteProductionOrderItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductionOrderItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProductionOrderItemMutation, DeleteProductionOrderItemMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteProductionOrderItemMutation, DeleteProductionOrderItemMutationVariables>(DeleteProductionOrderItemDocument, baseOptions);
      }
export type DeleteProductionOrderItemMutationHookResult = ReturnType<typeof useDeleteProductionOrderItemMutation>;
export type DeleteProductionOrderItemMutationResult = ApolloReactCommon.MutationResult<DeleteProductionOrderItemMutation>;
export type DeleteProductionOrderItemMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProductionOrderItemMutation, DeleteProductionOrderItemMutationVariables>;
export const ProductionOrdersDocument = gql`
    query productionOrders($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: productionOrders(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...productionOrderDetails
    }
    count
    perPage
    page
  }
}
    ${ProductionOrderDetailsFragmentDoc}`;

/**
 * __useProductionOrdersQuery__
 *
 * To run a query within a React component, call `useProductionOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductionOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductionOrdersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useProductionOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductionOrdersQuery, ProductionOrdersQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductionOrdersQuery, ProductionOrdersQueryVariables>(ProductionOrdersDocument, baseOptions);
      }
export function useProductionOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductionOrdersQuery, ProductionOrdersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductionOrdersQuery, ProductionOrdersQueryVariables>(ProductionOrdersDocument, baseOptions);
        }
export type ProductionOrdersQueryHookResult = ReturnType<typeof useProductionOrdersQuery>;
export type ProductionOrdersLazyQueryHookResult = ReturnType<typeof useProductionOrdersLazyQuery>;
export type ProductionOrdersQueryResult = ApolloReactCommon.QueryResult<ProductionOrdersQuery, ProductionOrdersQueryVariables>;
export const ProductionOrderDocument = gql`
    query productionOrder($id: Int!) {
  productionOrder: productionOrder(id: $id) {
    ...productionOrderDetails
  }
}
    ${ProductionOrderDetailsFragmentDoc}`;

/**
 * __useProductionOrderQuery__
 *
 * To run a query within a React component, call `useProductionOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductionOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductionOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductionOrderQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductionOrderQuery, ProductionOrderQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductionOrderQuery, ProductionOrderQueryVariables>(ProductionOrderDocument, baseOptions);
      }
export function useProductionOrderLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductionOrderQuery, ProductionOrderQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductionOrderQuery, ProductionOrderQueryVariables>(ProductionOrderDocument, baseOptions);
        }
export type ProductionOrderQueryHookResult = ReturnType<typeof useProductionOrderQuery>;
export type ProductionOrderLazyQueryHookResult = ReturnType<typeof useProductionOrderLazyQuery>;
export type ProductionOrderQueryResult = ApolloReactCommon.QueryResult<ProductionOrderQuery, ProductionOrderQueryVariables>;
export const InsertProductionOrderDocument = gql`
    mutation insertProductionOrder($data: ProductionOrderType!) {
  productionOrder: insertProductionOrder(data: $data) {
    ...productionOrderDetails
  }
}
    ${ProductionOrderDetailsFragmentDoc}`;
export type InsertProductionOrderMutationFn = ApolloReactCommon.MutationFunction<InsertProductionOrderMutation, InsertProductionOrderMutationVariables>;

/**
 * __useInsertProductionOrderMutation__
 *
 * To run a mutation, you first call `useInsertProductionOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertProductionOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertProductionOrderMutation, { data, loading, error }] = useInsertProductionOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertProductionOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertProductionOrderMutation, InsertProductionOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertProductionOrderMutation, InsertProductionOrderMutationVariables>(InsertProductionOrderDocument, baseOptions);
      }
export type InsertProductionOrderMutationHookResult = ReturnType<typeof useInsertProductionOrderMutation>;
export type InsertProductionOrderMutationResult = ApolloReactCommon.MutationResult<InsertProductionOrderMutation>;
export type InsertProductionOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertProductionOrderMutation, InsertProductionOrderMutationVariables>;
export const UpdateProductionOrderDocument = gql`
    mutation updateProductionOrder($id: Int!, $data: ProductionOrderType!) {
  productionOrder: updateProductionOrder(id: $id, data: $data) {
    ...productionOrderDetails
  }
}
    ${ProductionOrderDetailsFragmentDoc}`;
export type UpdateProductionOrderMutationFn = ApolloReactCommon.MutationFunction<UpdateProductionOrderMutation, UpdateProductionOrderMutationVariables>;

/**
 * __useUpdateProductionOrderMutation__
 *
 * To run a mutation, you first call `useUpdateProductionOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductionOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductionOrderMutation, { data, loading, error }] = useUpdateProductionOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductionOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProductionOrderMutation, UpdateProductionOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProductionOrderMutation, UpdateProductionOrderMutationVariables>(UpdateProductionOrderDocument, baseOptions);
      }
export type UpdateProductionOrderMutationHookResult = ReturnType<typeof useUpdateProductionOrderMutation>;
export type UpdateProductionOrderMutationResult = ApolloReactCommon.MutationResult<UpdateProductionOrderMutation>;
export type UpdateProductionOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProductionOrderMutation, UpdateProductionOrderMutationVariables>;
export const ProformaInvoicesDocument = gql`
    query proformaInvoices($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: proformaInvoices(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...proformaInvoiceDetails
    }
    count
    perPage
    page
  }
}
    ${ProformaInvoiceDetailsFragmentDoc}`;

/**
 * __useProformaInvoicesQuery__
 *
 * To run a query within a React component, call `useProformaInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProformaInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProformaInvoicesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useProformaInvoicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProformaInvoicesQuery, ProformaInvoicesQueryVariables>) {
        return ApolloReactHooks.useQuery<ProformaInvoicesQuery, ProformaInvoicesQueryVariables>(ProformaInvoicesDocument, baseOptions);
      }
export function useProformaInvoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProformaInvoicesQuery, ProformaInvoicesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProformaInvoicesQuery, ProformaInvoicesQueryVariables>(ProformaInvoicesDocument, baseOptions);
        }
export type ProformaInvoicesQueryHookResult = ReturnType<typeof useProformaInvoicesQuery>;
export type ProformaInvoicesLazyQueryHookResult = ReturnType<typeof useProformaInvoicesLazyQuery>;
export type ProformaInvoicesQueryResult = ApolloReactCommon.QueryResult<ProformaInvoicesQuery, ProformaInvoicesQueryVariables>;
export const ProformaInvoiceDocument = gql`
    query proformaInvoice($id: Int!) {
  proformaInvoice: proformaInvoice(id: $id) {
    ...proformaInvoiceDetails
  }
}
    ${ProformaInvoiceDetailsFragmentDoc}`;

/**
 * __useProformaInvoiceQuery__
 *
 * To run a query within a React component, call `useProformaInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useProformaInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProformaInvoiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProformaInvoiceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProformaInvoiceQuery, ProformaInvoiceQueryVariables>) {
        return ApolloReactHooks.useQuery<ProformaInvoiceQuery, ProformaInvoiceQueryVariables>(ProformaInvoiceDocument, baseOptions);
      }
export function useProformaInvoiceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProformaInvoiceQuery, ProformaInvoiceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProformaInvoiceQuery, ProformaInvoiceQueryVariables>(ProformaInvoiceDocument, baseOptions);
        }
export type ProformaInvoiceQueryHookResult = ReturnType<typeof useProformaInvoiceQuery>;
export type ProformaInvoiceLazyQueryHookResult = ReturnType<typeof useProformaInvoiceLazyQuery>;
export type ProformaInvoiceQueryResult = ApolloReactCommon.QueryResult<ProformaInvoiceQuery, ProformaInvoiceQueryVariables>;
export const InsertProformaInvoiceDocument = gql`
    mutation insertProformaInvoice($data: InvoiceType!) {
  proformaInvoice: insertProformaInvoice(data: $data) {
    ...proformaInvoiceDetails
  }
}
    ${ProformaInvoiceDetailsFragmentDoc}`;
export type InsertProformaInvoiceMutationFn = ApolloReactCommon.MutationFunction<InsertProformaInvoiceMutation, InsertProformaInvoiceMutationVariables>;

/**
 * __useInsertProformaInvoiceMutation__
 *
 * To run a mutation, you first call `useInsertProformaInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertProformaInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertProformaInvoiceMutation, { data, loading, error }] = useInsertProformaInvoiceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertProformaInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertProformaInvoiceMutation, InsertProformaInvoiceMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertProformaInvoiceMutation, InsertProformaInvoiceMutationVariables>(InsertProformaInvoiceDocument, baseOptions);
      }
export type InsertProformaInvoiceMutationHookResult = ReturnType<typeof useInsertProformaInvoiceMutation>;
export type InsertProformaInvoiceMutationResult = ApolloReactCommon.MutationResult<InsertProformaInvoiceMutation>;
export type InsertProformaInvoiceMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertProformaInvoiceMutation, InsertProformaInvoiceMutationVariables>;
export const UpdateProformaInvoiceDocument = gql`
    mutation updateProformaInvoice($id: Int!, $data: InvoiceType!) {
  proformaInvoice: updateProformaInvoice(id: $id, data: $data) {
    ...proformaInvoiceDetails
  }
}
    ${ProformaInvoiceDetailsFragmentDoc}`;
export type UpdateProformaInvoiceMutationFn = ApolloReactCommon.MutationFunction<UpdateProformaInvoiceMutation, UpdateProformaInvoiceMutationVariables>;

/**
 * __useUpdateProformaInvoiceMutation__
 *
 * To run a mutation, you first call `useUpdateProformaInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProformaInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProformaInvoiceMutation, { data, loading, error }] = useUpdateProformaInvoiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProformaInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProformaInvoiceMutation, UpdateProformaInvoiceMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProformaInvoiceMutation, UpdateProformaInvoiceMutationVariables>(UpdateProformaInvoiceDocument, baseOptions);
      }
export type UpdateProformaInvoiceMutationHookResult = ReturnType<typeof useUpdateProformaInvoiceMutation>;
export type UpdateProformaInvoiceMutationResult = ApolloReactCommon.MutationResult<UpdateProformaInvoiceMutation>;
export type UpdateProformaInvoiceMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProformaInvoiceMutation, UpdateProformaInvoiceMutationVariables>;
export const CloneProformaInvoiceDocument = gql`
    mutation cloneProformaInvoice($id: Int!) {
  proformaInvoice: cloneProformaInvoice(id: $id) {
    ...proformaInvoiceDetails
  }
}
    ${ProformaInvoiceDetailsFragmentDoc}`;
export type CloneProformaInvoiceMutationFn = ApolloReactCommon.MutationFunction<CloneProformaInvoiceMutation, CloneProformaInvoiceMutationVariables>;

/**
 * __useCloneProformaInvoiceMutation__
 *
 * To run a mutation, you first call `useCloneProformaInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloneProformaInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cloneProformaInvoiceMutation, { data, loading, error }] = useCloneProformaInvoiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCloneProformaInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CloneProformaInvoiceMutation, CloneProformaInvoiceMutationVariables>) {
        return ApolloReactHooks.useMutation<CloneProformaInvoiceMutation, CloneProformaInvoiceMutationVariables>(CloneProformaInvoiceDocument, baseOptions);
      }
export type CloneProformaInvoiceMutationHookResult = ReturnType<typeof useCloneProformaInvoiceMutation>;
export type CloneProformaInvoiceMutationResult = ApolloReactCommon.MutationResult<CloneProformaInvoiceMutation>;
export type CloneProformaInvoiceMutationOptions = ApolloReactCommon.BaseMutationOptions<CloneProformaInvoiceMutation, CloneProformaInvoiceMutationVariables>;
export const GenerateInvoiceDocument = gql`
    mutation generateInvoice($id: Int!) {
  proformaInvoice: generateInvoice(id: $id) {
    ...proformaInvoiceDetails
  }
}
    ${ProformaInvoiceDetailsFragmentDoc}`;
export type GenerateInvoiceMutationFn = ApolloReactCommon.MutationFunction<GenerateInvoiceMutation, GenerateInvoiceMutationVariables>;

/**
 * __useGenerateInvoiceMutation__
 *
 * To run a mutation, you first call `useGenerateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateInvoiceMutation, { data, loading, error }] = useGenerateInvoiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGenerateInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GenerateInvoiceMutation, GenerateInvoiceMutationVariables>) {
        return ApolloReactHooks.useMutation<GenerateInvoiceMutation, GenerateInvoiceMutationVariables>(GenerateInvoiceDocument, baseOptions);
      }
export type GenerateInvoiceMutationHookResult = ReturnType<typeof useGenerateInvoiceMutation>;
export type GenerateInvoiceMutationResult = ApolloReactCommon.MutationResult<GenerateInvoiceMutation>;
export type GenerateInvoiceMutationOptions = ApolloReactCommon.BaseMutationOptions<GenerateInvoiceMutation, GenerateInvoiceMutationVariables>;
export const ReceiptsDocument = gql`
    query receipts($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: receipts(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...receiptDetails
    }
    count
    perPage
    page
  }
}
    ${ReceiptDetailsFragmentDoc}`;

/**
 * __useReceiptsQuery__
 *
 * To run a query within a React component, call `useReceiptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useReceiptsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReceiptsQuery, ReceiptsQueryVariables>) {
        return ApolloReactHooks.useQuery<ReceiptsQuery, ReceiptsQueryVariables>(ReceiptsDocument, baseOptions);
      }
export function useReceiptsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReceiptsQuery, ReceiptsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReceiptsQuery, ReceiptsQueryVariables>(ReceiptsDocument, baseOptions);
        }
export type ReceiptsQueryHookResult = ReturnType<typeof useReceiptsQuery>;
export type ReceiptsLazyQueryHookResult = ReturnType<typeof useReceiptsLazyQuery>;
export type ReceiptsQueryResult = ApolloReactCommon.QueryResult<ReceiptsQuery, ReceiptsQueryVariables>;
export const ReceiptDocument = gql`
    query receipt($id: Int!) {
  receipt: receipt(id: $id) {
    ...receiptDetails
  }
}
    ${ReceiptDetailsFragmentDoc}`;

/**
 * __useReceiptQuery__
 *
 * To run a query within a React component, call `useReceiptQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReceiptQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReceiptQuery, ReceiptQueryVariables>) {
        return ApolloReactHooks.useQuery<ReceiptQuery, ReceiptQueryVariables>(ReceiptDocument, baseOptions);
      }
export function useReceiptLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReceiptQuery, ReceiptQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReceiptQuery, ReceiptQueryVariables>(ReceiptDocument, baseOptions);
        }
export type ReceiptQueryHookResult = ReturnType<typeof useReceiptQuery>;
export type ReceiptLazyQueryHookResult = ReturnType<typeof useReceiptLazyQuery>;
export type ReceiptQueryResult = ApolloReactCommon.QueryResult<ReceiptQuery, ReceiptQueryVariables>;
export const InsertReceiptDocument = gql`
    mutation insertReceipt($data: ReceiptType!) {
  receipt: insertReceipt(data: $data) {
    ...receiptDetails
  }
}
    ${ReceiptDetailsFragmentDoc}`;
export type InsertReceiptMutationFn = ApolloReactCommon.MutationFunction<InsertReceiptMutation, InsertReceiptMutationVariables>;

/**
 * __useInsertReceiptMutation__
 *
 * To run a mutation, you first call `useInsertReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertReceiptMutation, { data, loading, error }] = useInsertReceiptMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertReceiptMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertReceiptMutation, InsertReceiptMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertReceiptMutation, InsertReceiptMutationVariables>(InsertReceiptDocument, baseOptions);
      }
export type InsertReceiptMutationHookResult = ReturnType<typeof useInsertReceiptMutation>;
export type InsertReceiptMutationResult = ApolloReactCommon.MutationResult<InsertReceiptMutation>;
export type InsertReceiptMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertReceiptMutation, InsertReceiptMutationVariables>;
export const ReturnInvoicesDocument = gql`
    query returnInvoices($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: returnInvoices(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...returnInvoiceDetails
    }
    count
    perPage
    page
  }
}
    ${ReturnInvoiceDetailsFragmentDoc}`;

/**
 * __useReturnInvoicesQuery__
 *
 * To run a query within a React component, call `useReturnInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useReturnInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReturnInvoicesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useReturnInvoicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReturnInvoicesQuery, ReturnInvoicesQueryVariables>) {
        return ApolloReactHooks.useQuery<ReturnInvoicesQuery, ReturnInvoicesQueryVariables>(ReturnInvoicesDocument, baseOptions);
      }
export function useReturnInvoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReturnInvoicesQuery, ReturnInvoicesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReturnInvoicesQuery, ReturnInvoicesQueryVariables>(ReturnInvoicesDocument, baseOptions);
        }
export type ReturnInvoicesQueryHookResult = ReturnType<typeof useReturnInvoicesQuery>;
export type ReturnInvoicesLazyQueryHookResult = ReturnType<typeof useReturnInvoicesLazyQuery>;
export type ReturnInvoicesQueryResult = ApolloReactCommon.QueryResult<ReturnInvoicesQuery, ReturnInvoicesQueryVariables>;
export const ReturnInvoiceDocument = gql`
    query returnInvoice($id: Int!) {
  returnInvoice: returnInvoice(id: $id) {
    ...returnInvoiceDetails
  }
}
    ${ReturnInvoiceDetailsFragmentDoc}`;

/**
 * __useReturnInvoiceQuery__
 *
 * To run a query within a React component, call `useReturnInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useReturnInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReturnInvoiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReturnInvoiceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReturnInvoiceQuery, ReturnInvoiceQueryVariables>) {
        return ApolloReactHooks.useQuery<ReturnInvoiceQuery, ReturnInvoiceQueryVariables>(ReturnInvoiceDocument, baseOptions);
      }
export function useReturnInvoiceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReturnInvoiceQuery, ReturnInvoiceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReturnInvoiceQuery, ReturnInvoiceQueryVariables>(ReturnInvoiceDocument, baseOptions);
        }
export type ReturnInvoiceQueryHookResult = ReturnType<typeof useReturnInvoiceQuery>;
export type ReturnInvoiceLazyQueryHookResult = ReturnType<typeof useReturnInvoiceLazyQuery>;
export type ReturnInvoiceQueryResult = ApolloReactCommon.QueryResult<ReturnInvoiceQuery, ReturnInvoiceQueryVariables>;
export const InsertReturnInvoiceDocument = gql`
    mutation insertReturnInvoice($data: InvoiceType!) {
  returnInvoice: insertReturnInvoice(data: $data) {
    ...returnInvoiceDetails
  }
}
    ${ReturnInvoiceDetailsFragmentDoc}`;
export type InsertReturnInvoiceMutationFn = ApolloReactCommon.MutationFunction<InsertReturnInvoiceMutation, InsertReturnInvoiceMutationVariables>;

/**
 * __useInsertReturnInvoiceMutation__
 *
 * To run a mutation, you first call `useInsertReturnInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertReturnInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertReturnInvoiceMutation, { data, loading, error }] = useInsertReturnInvoiceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertReturnInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertReturnInvoiceMutation, InsertReturnInvoiceMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertReturnInvoiceMutation, InsertReturnInvoiceMutationVariables>(InsertReturnInvoiceDocument, baseOptions);
      }
export type InsertReturnInvoiceMutationHookResult = ReturnType<typeof useInsertReturnInvoiceMutation>;
export type InsertReturnInvoiceMutationResult = ApolloReactCommon.MutationResult<InsertReturnInvoiceMutation>;
export type InsertReturnInvoiceMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertReturnInvoiceMutation, InsertReturnInvoiceMutationVariables>;
export const UpdateReturnInvoiceDocument = gql`
    mutation updateReturnInvoice($id: Int!, $data: InvoiceType!) {
  returnInvoice: updateReturnInvoice(id: $id, data: $data) {
    ...returnInvoiceDetails
  }
}
    ${ReturnInvoiceDetailsFragmentDoc}`;
export type UpdateReturnInvoiceMutationFn = ApolloReactCommon.MutationFunction<UpdateReturnInvoiceMutation, UpdateReturnInvoiceMutationVariables>;

/**
 * __useUpdateReturnInvoiceMutation__
 *
 * To run a mutation, you first call `useUpdateReturnInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReturnInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReturnInvoiceMutation, { data, loading, error }] = useUpdateReturnInvoiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateReturnInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateReturnInvoiceMutation, UpdateReturnInvoiceMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateReturnInvoiceMutation, UpdateReturnInvoiceMutationVariables>(UpdateReturnInvoiceDocument, baseOptions);
      }
export type UpdateReturnInvoiceMutationHookResult = ReturnType<typeof useUpdateReturnInvoiceMutation>;
export type UpdateReturnInvoiceMutationResult = ApolloReactCommon.MutationResult<UpdateReturnInvoiceMutation>;
export type UpdateReturnInvoiceMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateReturnInvoiceMutation, UpdateReturnInvoiceMutationVariables>;
export const GetValidTaxDocument = gql`
    query getValidTax($date: DateTime) {
  validTax: getValidTax(date: $date) {
    ...taxDetails
    values {
      ...taxValueDetails
    }
  }
}
    ${TaxDetailsFragmentDoc}
${TaxValueDetailsFragmentDoc}`;

/**
 * __useGetValidTaxQuery__
 *
 * To run a query within a React component, call `useGetValidTaxQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetValidTaxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetValidTaxQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetValidTaxQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetValidTaxQuery, GetValidTaxQueryVariables>) {
        return ApolloReactHooks.useQuery<GetValidTaxQuery, GetValidTaxQueryVariables>(GetValidTaxDocument, baseOptions);
      }
export function useGetValidTaxLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetValidTaxQuery, GetValidTaxQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetValidTaxQuery, GetValidTaxQueryVariables>(GetValidTaxDocument, baseOptions);
        }
export type GetValidTaxQueryHookResult = ReturnType<typeof useGetValidTaxQuery>;
export type GetValidTaxLazyQueryHookResult = ReturnType<typeof useGetValidTaxLazyQuery>;
export type GetValidTaxQueryResult = ApolloReactCommon.QueryResult<GetValidTaxQuery, GetValidTaxQueryVariables>;
export const InsertTaxDefinitionDocument = gql`
    mutation insertTaxDefinition($data: [TaxTypeDefine!]!) {
  definition: insertTaxDefinition(data: $data) {
    ...taxDetails
  }
}
    ${TaxDetailsFragmentDoc}`;
export type InsertTaxDefinitionMutationFn = ApolloReactCommon.MutationFunction<InsertTaxDefinitionMutation, InsertTaxDefinitionMutationVariables>;

/**
 * __useInsertTaxDefinitionMutation__
 *
 * To run a mutation, you first call `useInsertTaxDefinitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertTaxDefinitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertTaxDefinitionMutation, { data, loading, error }] = useInsertTaxDefinitionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertTaxDefinitionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertTaxDefinitionMutation, InsertTaxDefinitionMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertTaxDefinitionMutation, InsertTaxDefinitionMutationVariables>(InsertTaxDefinitionDocument, baseOptions);
      }
export type InsertTaxDefinitionMutationHookResult = ReturnType<typeof useInsertTaxDefinitionMutation>;
export type InsertTaxDefinitionMutationResult = ApolloReactCommon.MutationResult<InsertTaxDefinitionMutation>;
export type InsertTaxDefinitionMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertTaxDefinitionMutation, InsertTaxDefinitionMutationVariables>;
export const InsertTaxValueDocument = gql`
    mutation insertTaxValue($data: TaxValuesType!) {
  tax: insertTaxValue(data: $data) {
    ...taxDetails
    values {
      ...taxValueDetails
    }
  }
}
    ${TaxDetailsFragmentDoc}
${TaxValueDetailsFragmentDoc}`;
export type InsertTaxValueMutationFn = ApolloReactCommon.MutationFunction<InsertTaxValueMutation, InsertTaxValueMutationVariables>;

/**
 * __useInsertTaxValueMutation__
 *
 * To run a mutation, you first call `useInsertTaxValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertTaxValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertTaxValueMutation, { data, loading, error }] = useInsertTaxValueMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertTaxValueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertTaxValueMutation, InsertTaxValueMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertTaxValueMutation, InsertTaxValueMutationVariables>(InsertTaxValueDocument, baseOptions);
      }
export type InsertTaxValueMutationHookResult = ReturnType<typeof useInsertTaxValueMutation>;
export type InsertTaxValueMutationResult = ApolloReactCommon.MutationResult<InsertTaxValueMutation>;
export type InsertTaxValueMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertTaxValueMutation, InsertTaxValueMutationVariables>;
export const GetTranslateDocument = gql`
    query getTranslate($lang: String!, $force: Boolean) {
  data: getTranslate(lang: $lang, force: $force) {
    key
    translation
  }
}
    `;

/**
 * __useGetTranslateQuery__
 *
 * To run a query within a React component, call `useGetTranslateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTranslateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTranslateQuery({
 *   variables: {
 *      lang: // value for 'lang'
 *      force: // value for 'force'
 *   },
 * });
 */
export function useGetTranslateQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTranslateQuery, GetTranslateQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTranslateQuery, GetTranslateQueryVariables>(GetTranslateDocument, baseOptions);
      }
export function useGetTranslateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTranslateQuery, GetTranslateQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTranslateQuery, GetTranslateQueryVariables>(GetTranslateDocument, baseOptions);
        }
export type GetTranslateQueryHookResult = ReturnType<typeof useGetTranslateQuery>;
export type GetTranslateLazyQueryHookResult = ReturnType<typeof useGetTranslateLazyQuery>;
export type GetTranslateQueryResult = ApolloReactCommon.QueryResult<GetTranslateQuery, GetTranslateQueryVariables>;
export const UsersDocument = gql`
    query users($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON) {
  data: users(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
    items {
      ...userDetails
    }
    count
    perPage
    page
  }
}
    ${UserDetailsFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query user($id: Int!) {
  user: user(id: $id) {
    ...userDetails
  }
}
    ${UserDetailsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const InsertUserDocument = gql`
    mutation insertUser($data: UserType!) {
  user: insertUser(data: $data) {
    ...userDetails
  }
}
    ${UserDetailsFragmentDoc}`;
export type InsertUserMutationFn = ApolloReactCommon.MutationFunction<InsertUserMutation, InsertUserMutationVariables>;

/**
 * __useInsertUserMutation__
 *
 * To run a mutation, you first call `useInsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUserMutation, { data, loading, error }] = useInsertUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertUserMutation, InsertUserMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertUserMutation, InsertUserMutationVariables>(InsertUserDocument, baseOptions);
      }
export type InsertUserMutationHookResult = ReturnType<typeof useInsertUserMutation>;
export type InsertUserMutationResult = ApolloReactCommon.MutationResult<InsertUserMutation>;
export type InsertUserMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertUserMutation, InsertUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($data: UserType!, $id: Int!) {
  user: updateUser(data: $data, id: $id) {
    ...userDetails
  }
}
    ${UserDetailsFragmentDoc}`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const ResetPasswordByAdminDocument = gql`
    mutation resetPasswordByAdmin($id: Int!) {
  password: resetPasswordByAdmin(id: $id)
}
    `;
export type ResetPasswordByAdminMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordByAdminMutation, ResetPasswordByAdminMutationVariables>;

/**
 * __useResetPasswordByAdminMutation__
 *
 * To run a mutation, you first call `useResetPasswordByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordByAdminMutation, { data, loading, error }] = useResetPasswordByAdminMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResetPasswordByAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordByAdminMutation, ResetPasswordByAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordByAdminMutation, ResetPasswordByAdminMutationVariables>(ResetPasswordByAdminDocument, baseOptions);
      }
export type ResetPasswordByAdminMutationHookResult = ReturnType<typeof useResetPasswordByAdminMutation>;
export type ResetPasswordByAdminMutationResult = ApolloReactCommon.MutationResult<ResetPasswordByAdminMutation>;
export type ResetPasswordByAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordByAdminMutation, ResetPasswordByAdminMutationVariables>;
export const UserChangePasswordDocument = gql`
    mutation userChangePassword($data: UserChangePasswordType!) {
  user: userChangePassword(data: $data)
}
    `;
export type UserChangePasswordMutationFn = ApolloReactCommon.MutationFunction<UserChangePasswordMutation, UserChangePasswordMutationVariables>;

/**
 * __useUserChangePasswordMutation__
 *
 * To run a mutation, you first call `useUserChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userChangePasswordMutation, { data, loading, error }] = useUserChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserChangePasswordMutation, UserChangePasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<UserChangePasswordMutation, UserChangePasswordMutationVariables>(UserChangePasswordDocument, baseOptions);
      }
export type UserChangePasswordMutationHookResult = ReturnType<typeof useUserChangePasswordMutation>;
export type UserChangePasswordMutationResult = ApolloReactCommon.MutationResult<UserChangePasswordMutation>;
export type UserChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<UserChangePasswordMutation, UserChangePasswordMutationVariables>;
export const WarehousesDocument = gql`
    query warehouses($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON) {
  data: warehouses(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
    items {
      ...warehouseDetails
    }
    count
    perPage
    page
  }
}
    ${WarehouseDetailsFragmentDoc}`;

/**
 * __useWarehousesQuery__
 *
 * To run a query within a React component, call `useWarehousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehousesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useWarehousesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WarehousesQuery, WarehousesQueryVariables>) {
        return ApolloReactHooks.useQuery<WarehousesQuery, WarehousesQueryVariables>(WarehousesDocument, baseOptions);
      }
export function useWarehousesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WarehousesQuery, WarehousesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WarehousesQuery, WarehousesQueryVariables>(WarehousesDocument, baseOptions);
        }
export type WarehousesQueryHookResult = ReturnType<typeof useWarehousesQuery>;
export type WarehousesLazyQueryHookResult = ReturnType<typeof useWarehousesLazyQuery>;
export type WarehousesQueryResult = ApolloReactCommon.QueryResult<WarehousesQuery, WarehousesQueryVariables>;
export const WarehouseDocument = gql`
    query warehouse($id: Int!) {
  warehouse: warehouse(id: $id) {
    ...warehouseDetails
  }
}
    ${WarehouseDetailsFragmentDoc}`;

/**
 * __useWarehouseQuery__
 *
 * To run a query within a React component, call `useWarehouseQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehouseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehouseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWarehouseQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WarehouseQuery, WarehouseQueryVariables>) {
        return ApolloReactHooks.useQuery<WarehouseQuery, WarehouseQueryVariables>(WarehouseDocument, baseOptions);
      }
export function useWarehouseLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WarehouseQuery, WarehouseQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WarehouseQuery, WarehouseQueryVariables>(WarehouseDocument, baseOptions);
        }
export type WarehouseQueryHookResult = ReturnType<typeof useWarehouseQuery>;
export type WarehouseLazyQueryHookResult = ReturnType<typeof useWarehouseLazyQuery>;
export type WarehouseQueryResult = ApolloReactCommon.QueryResult<WarehouseQuery, WarehouseQueryVariables>;
export const InsertWarehouseDocument = gql`
    mutation insertWarehouse($data: WarehouseType!) {
  warehouse: insertWarehouse(data: $data) {
    ...warehouseDetails
  }
}
    ${WarehouseDetailsFragmentDoc}`;
export type InsertWarehouseMutationFn = ApolloReactCommon.MutationFunction<InsertWarehouseMutation, InsertWarehouseMutationVariables>;

/**
 * __useInsertWarehouseMutation__
 *
 * To run a mutation, you first call `useInsertWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertWarehouseMutation, { data, loading, error }] = useInsertWarehouseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertWarehouseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertWarehouseMutation, InsertWarehouseMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertWarehouseMutation, InsertWarehouseMutationVariables>(InsertWarehouseDocument, baseOptions);
      }
export type InsertWarehouseMutationHookResult = ReturnType<typeof useInsertWarehouseMutation>;
export type InsertWarehouseMutationResult = ApolloReactCommon.MutationResult<InsertWarehouseMutation>;
export type InsertWarehouseMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertWarehouseMutation, InsertWarehouseMutationVariables>;
export const UpdateWarehouseDocument = gql`
    mutation updateWarehouse($data: WarehouseType!, $id: Int!) {
  warehouse: updateWarehouse(data: $data, id: $id) {
    ...warehouseDetails
  }
}
    ${WarehouseDetailsFragmentDoc}`;
export type UpdateWarehouseMutationFn = ApolloReactCommon.MutationFunction<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;

/**
 * __useUpdateWarehouseMutation__
 *
 * To run a mutation, you first call `useUpdateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWarehouseMutation, { data, loading, error }] = useUpdateWarehouseMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateWarehouseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>(UpdateWarehouseDocument, baseOptions);
      }
export type UpdateWarehouseMutationHookResult = ReturnType<typeof useUpdateWarehouseMutation>;
export type UpdateWarehouseMutationResult = ApolloReactCommon.MutationResult<UpdateWarehouseMutation>;
export type UpdateWarehouseMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;
export const InsertWarehousesDocument = gql`
    mutation insertWarehouses($data: [WarehouseType!]!) {
  warehouses: insertWarehouses(data: $data)
}
    `;
export type InsertWarehousesMutationFn = ApolloReactCommon.MutationFunction<InsertWarehousesMutation, InsertWarehousesMutationVariables>;

/**
 * __useInsertWarehousesMutation__
 *
 * To run a mutation, you first call `useInsertWarehousesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertWarehousesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertWarehousesMutation, { data, loading, error }] = useInsertWarehousesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertWarehousesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertWarehousesMutation, InsertWarehousesMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertWarehousesMutation, InsertWarehousesMutationVariables>(InsertWarehousesDocument, baseOptions);
      }
export type InsertWarehousesMutationHookResult = ReturnType<typeof useInsertWarehousesMutation>;
export type InsertWarehousesMutationResult = ApolloReactCommon.MutationResult<InsertWarehousesMutation>;
export type InsertWarehousesMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertWarehousesMutation, InsertWarehousesMutationVariables>;
export const WarehouseFinancesDocument = gql`
    query warehouseFinances($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: warehouseFinances(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...warehouseFinanceDetails
    }
    count
    perPage
    page
  }
}
    ${WarehouseFinanceDetailsFragmentDoc}`;

/**
 * __useWarehouseFinancesQuery__
 *
 * To run a query within a React component, call `useWarehouseFinancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehouseFinancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehouseFinancesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useWarehouseFinancesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WarehouseFinancesQuery, WarehouseFinancesQueryVariables>) {
        return ApolloReactHooks.useQuery<WarehouseFinancesQuery, WarehouseFinancesQueryVariables>(WarehouseFinancesDocument, baseOptions);
      }
export function useWarehouseFinancesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WarehouseFinancesQuery, WarehouseFinancesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WarehouseFinancesQuery, WarehouseFinancesQueryVariables>(WarehouseFinancesDocument, baseOptions);
        }
export type WarehouseFinancesQueryHookResult = ReturnType<typeof useWarehouseFinancesQuery>;
export type WarehouseFinancesLazyQueryHookResult = ReturnType<typeof useWarehouseFinancesLazyQuery>;
export type WarehouseFinancesQueryResult = ApolloReactCommon.QueryResult<WarehouseFinancesQuery, WarehouseFinancesQueryVariables>;
export const WarehouseFinanceDocument = gql`
    query warehouseFinance($id: Int!) {
  warehouseFinance: warehouseFinance(id: $id) {
    ...warehouseFinanceDetails
  }
}
    ${WarehouseFinanceDetailsFragmentDoc}`;

/**
 * __useWarehouseFinanceQuery__
 *
 * To run a query within a React component, call `useWarehouseFinanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehouseFinanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehouseFinanceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWarehouseFinanceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WarehouseFinanceQuery, WarehouseFinanceQueryVariables>) {
        return ApolloReactHooks.useQuery<WarehouseFinanceQuery, WarehouseFinanceQueryVariables>(WarehouseFinanceDocument, baseOptions);
      }
export function useWarehouseFinanceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WarehouseFinanceQuery, WarehouseFinanceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WarehouseFinanceQuery, WarehouseFinanceQueryVariables>(WarehouseFinanceDocument, baseOptions);
        }
export type WarehouseFinanceQueryHookResult = ReturnType<typeof useWarehouseFinanceQuery>;
export type WarehouseFinanceLazyQueryHookResult = ReturnType<typeof useWarehouseFinanceLazyQuery>;
export type WarehouseFinanceQueryResult = ApolloReactCommon.QueryResult<WarehouseFinanceQuery, WarehouseFinanceQueryVariables>;
export const InsertWarehouseFinanceDocument = gql`
    mutation insertWarehouseFinance($data: WarehouseFinanceType!) {
  warehouseFinance: insertWarehouseFinance(data: $data) {
    ...warehouseFinanceDetails
  }
}
    ${WarehouseFinanceDetailsFragmentDoc}`;
export type InsertWarehouseFinanceMutationFn = ApolloReactCommon.MutationFunction<InsertWarehouseFinanceMutation, InsertWarehouseFinanceMutationVariables>;

/**
 * __useInsertWarehouseFinanceMutation__
 *
 * To run a mutation, you first call `useInsertWarehouseFinanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertWarehouseFinanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertWarehouseFinanceMutation, { data, loading, error }] = useInsertWarehouseFinanceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertWarehouseFinanceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertWarehouseFinanceMutation, InsertWarehouseFinanceMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertWarehouseFinanceMutation, InsertWarehouseFinanceMutationVariables>(InsertWarehouseFinanceDocument, baseOptions);
      }
export type InsertWarehouseFinanceMutationHookResult = ReturnType<typeof useInsertWarehouseFinanceMutation>;
export type InsertWarehouseFinanceMutationResult = ApolloReactCommon.MutationResult<InsertWarehouseFinanceMutation>;
export type InsertWarehouseFinanceMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertWarehouseFinanceMutation, InsertWarehouseFinanceMutationVariables>;
export const WarehouseItemsDocument = gql`
    query warehouseItems($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: warehouseItems(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...warehouseItemDetails
    }
    count
    perPage
    page
  }
}
    ${WarehouseItemDetailsFragmentDoc}`;

/**
 * __useWarehouseItemsQuery__
 *
 * To run a query within a React component, call `useWarehouseItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehouseItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehouseItemsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useWarehouseItemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WarehouseItemsQuery, WarehouseItemsQueryVariables>) {
        return ApolloReactHooks.useQuery<WarehouseItemsQuery, WarehouseItemsQueryVariables>(WarehouseItemsDocument, baseOptions);
      }
export function useWarehouseItemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WarehouseItemsQuery, WarehouseItemsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WarehouseItemsQuery, WarehouseItemsQueryVariables>(WarehouseItemsDocument, baseOptions);
        }
export type WarehouseItemsQueryHookResult = ReturnType<typeof useWarehouseItemsQuery>;
export type WarehouseItemsLazyQueryHookResult = ReturnType<typeof useWarehouseItemsLazyQuery>;
export type WarehouseItemsQueryResult = ApolloReactCommon.QueryResult<WarehouseItemsQuery, WarehouseItemsQueryVariables>;
export const WarehouseItemDocument = gql`
    query warehouseItem($id: Int!) {
  warehouseItem: warehouseItem(id: $id) {
    ...warehouseItemDetails
  }
}
    ${WarehouseItemDetailsFragmentDoc}`;

/**
 * __useWarehouseItemQuery__
 *
 * To run a query within a React component, call `useWarehouseItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehouseItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehouseItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWarehouseItemQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WarehouseItemQuery, WarehouseItemQueryVariables>) {
        return ApolloReactHooks.useQuery<WarehouseItemQuery, WarehouseItemQueryVariables>(WarehouseItemDocument, baseOptions);
      }
export function useWarehouseItemLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WarehouseItemQuery, WarehouseItemQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WarehouseItemQuery, WarehouseItemQueryVariables>(WarehouseItemDocument, baseOptions);
        }
export type WarehouseItemQueryHookResult = ReturnType<typeof useWarehouseItemQuery>;
export type WarehouseItemLazyQueryHookResult = ReturnType<typeof useWarehouseItemLazyQuery>;
export type WarehouseItemQueryResult = ApolloReactCommon.QueryResult<WarehouseItemQuery, WarehouseItemQueryVariables>;
export const GetLastWarehouseItemDocument = gql`
    query getLastWarehouseItem($warehouseId: Int!, $itemId: Int!) {
  warehouseItem: getLastWarehouseItem(warehouseId: $warehouseId, itemId: $itemId) {
    ...warehouseItemDetails
  }
}
    ${WarehouseItemDetailsFragmentDoc}`;

/**
 * __useGetLastWarehouseItemQuery__
 *
 * To run a query within a React component, call `useGetLastWarehouseItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastWarehouseItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastWarehouseItemQuery({
 *   variables: {
 *      warehouseId: // value for 'warehouseId'
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useGetLastWarehouseItemQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLastWarehouseItemQuery, GetLastWarehouseItemQueryVariables>) {
        return ApolloReactHooks.useQuery<GetLastWarehouseItemQuery, GetLastWarehouseItemQueryVariables>(GetLastWarehouseItemDocument, baseOptions);
      }
export function useGetLastWarehouseItemLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLastWarehouseItemQuery, GetLastWarehouseItemQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetLastWarehouseItemQuery, GetLastWarehouseItemQueryVariables>(GetLastWarehouseItemDocument, baseOptions);
        }
export type GetLastWarehouseItemQueryHookResult = ReturnType<typeof useGetLastWarehouseItemQuery>;
export type GetLastWarehouseItemLazyQueryHookResult = ReturnType<typeof useGetLastWarehouseItemLazyQuery>;
export type GetLastWarehouseItemQueryResult = ApolloReactCommon.QueryResult<GetLastWarehouseItemQuery, GetLastWarehouseItemQueryVariables>;
export const InsertWarehouseItemDocument = gql`
    mutation insertWarehouseItem($data: WarehouseItemType!) {
  warehouseItem: insertWarehouseItem(data: $data) {
    ...warehouseItemDetails
  }
}
    ${WarehouseItemDetailsFragmentDoc}`;
export type InsertWarehouseItemMutationFn = ApolloReactCommon.MutationFunction<InsertWarehouseItemMutation, InsertWarehouseItemMutationVariables>;

/**
 * __useInsertWarehouseItemMutation__
 *
 * To run a mutation, you first call `useInsertWarehouseItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertWarehouseItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertWarehouseItemMutation, { data, loading, error }] = useInsertWarehouseItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertWarehouseItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertWarehouseItemMutation, InsertWarehouseItemMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertWarehouseItemMutation, InsertWarehouseItemMutationVariables>(InsertWarehouseItemDocument, baseOptions);
      }
export type InsertWarehouseItemMutationHookResult = ReturnType<typeof useInsertWarehouseItemMutation>;
export type InsertWarehouseItemMutationResult = ApolloReactCommon.MutationResult<InsertWarehouseItemMutation>;
export type InsertWarehouseItemMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertWarehouseItemMutation, InsertWarehouseItemMutationVariables>;
export const TestInsertWarehouseItemDocument = gql`
    mutation testInsertWarehouseItem($data: WarehouseItemsBulk!) {
  data: testInsertWarehouseItem(data: $data)
}
    `;
export type TestInsertWarehouseItemMutationFn = ApolloReactCommon.MutationFunction<TestInsertWarehouseItemMutation, TestInsertWarehouseItemMutationVariables>;

/**
 * __useTestInsertWarehouseItemMutation__
 *
 * To run a mutation, you first call `useTestInsertWarehouseItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestInsertWarehouseItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testInsertWarehouseItemMutation, { data, loading, error }] = useTestInsertWarehouseItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTestInsertWarehouseItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TestInsertWarehouseItemMutation, TestInsertWarehouseItemMutationVariables>) {
        return ApolloReactHooks.useMutation<TestInsertWarehouseItemMutation, TestInsertWarehouseItemMutationVariables>(TestInsertWarehouseItemDocument, baseOptions);
      }
export type TestInsertWarehouseItemMutationHookResult = ReturnType<typeof useTestInsertWarehouseItemMutation>;
export type TestInsertWarehouseItemMutationResult = ApolloReactCommon.MutationResult<TestInsertWarehouseItemMutation>;
export type TestInsertWarehouseItemMutationOptions = ApolloReactCommon.BaseMutationOptions<TestInsertWarehouseItemMutation, TestInsertWarehouseItemMutationVariables>;
export const WarehouseItemInfoDocument = gql`
    query warehouseItemInfo($id: Int!) {
  warehouseItemInfo: warehouseItemInfo(id: $id) {
    ...warehouseItemInfoDetails
  }
}
    ${WarehouseItemInfoDetailsFragmentDoc}`;

/**
 * __useWarehouseItemInfoQuery__
 *
 * To run a query within a React component, call `useWarehouseItemInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehouseItemInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehouseItemInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWarehouseItemInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WarehouseItemInfoQuery, WarehouseItemInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<WarehouseItemInfoQuery, WarehouseItemInfoQueryVariables>(WarehouseItemInfoDocument, baseOptions);
      }
export function useWarehouseItemInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WarehouseItemInfoQuery, WarehouseItemInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WarehouseItemInfoQuery, WarehouseItemInfoQueryVariables>(WarehouseItemInfoDocument, baseOptions);
        }
export type WarehouseItemInfoQueryHookResult = ReturnType<typeof useWarehouseItemInfoQuery>;
export type WarehouseItemInfoLazyQueryHookResult = ReturnType<typeof useWarehouseItemInfoLazyQuery>;
export type WarehouseItemInfoQueryResult = ApolloReactCommon.QueryResult<WarehouseItemInfoQuery, WarehouseItemInfoQueryVariables>;
export const WarehouseItemsInfoDocument = gql`
    query warehouseItemsInfo($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: warehouseItemsInfo(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...warehouseItemInfoDetails
    }
    count
    perPage
    page
  }
}
    ${WarehouseItemInfoDetailsFragmentDoc}`;

/**
 * __useWarehouseItemsInfoQuery__
 *
 * To run a query within a React component, call `useWarehouseItemsInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehouseItemsInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehouseItemsInfoQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useWarehouseItemsInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WarehouseItemsInfoQuery, WarehouseItemsInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<WarehouseItemsInfoQuery, WarehouseItemsInfoQueryVariables>(WarehouseItemsInfoDocument, baseOptions);
      }
export function useWarehouseItemsInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WarehouseItemsInfoQuery, WarehouseItemsInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WarehouseItemsInfoQuery, WarehouseItemsInfoQueryVariables>(WarehouseItemsInfoDocument, baseOptions);
        }
export type WarehouseItemsInfoQueryHookResult = ReturnType<typeof useWarehouseItemsInfoQuery>;
export type WarehouseItemsInfoLazyQueryHookResult = ReturnType<typeof useWarehouseItemsInfoLazyQuery>;
export type WarehouseItemsInfoQueryResult = ApolloReactCommon.QueryResult<WarehouseItemsInfoQuery, WarehouseItemsInfoQueryVariables>;
export const WarehouseItemByFilterDocument = gql`
    query warehouseItemByFilter($value: String!, $warehouseId: Int!) {
  data: warehouseItemByFilter(value: $value, warehouseId: $warehouseId) {
    ...warehouseItemInfoDetails
  }
}
    ${WarehouseItemInfoDetailsFragmentDoc}`;

/**
 * __useWarehouseItemByFilterQuery__
 *
 * To run a query within a React component, call `useWarehouseItemByFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehouseItemByFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehouseItemByFilterQuery({
 *   variables: {
 *      value: // value for 'value'
 *      warehouseId: // value for 'warehouseId'
 *   },
 * });
 */
export function useWarehouseItemByFilterQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WarehouseItemByFilterQuery, WarehouseItemByFilterQueryVariables>) {
        return ApolloReactHooks.useQuery<WarehouseItemByFilterQuery, WarehouseItemByFilterQueryVariables>(WarehouseItemByFilterDocument, baseOptions);
      }
export function useWarehouseItemByFilterLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WarehouseItemByFilterQuery, WarehouseItemByFilterQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WarehouseItemByFilterQuery, WarehouseItemByFilterQueryVariables>(WarehouseItemByFilterDocument, baseOptions);
        }
export type WarehouseItemByFilterQueryHookResult = ReturnType<typeof useWarehouseItemByFilterQuery>;
export type WarehouseItemByFilterLazyQueryHookResult = ReturnType<typeof useWarehouseItemByFilterLazyQuery>;
export type WarehouseItemByFilterQueryResult = ApolloReactCommon.QueryResult<WarehouseItemByFilterQuery, WarehouseItemByFilterQueryVariables>;
export const WorkOrdersDocument = gql`
    query workOrders($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: workOrders(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...workOrderDetails
    }
    count
    perPage
    page
  }
}
    ${WorkOrderDetailsFragmentDoc}`;

/**
 * __useWorkOrdersQuery__
 *
 * To run a query within a React component, call `useWorkOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkOrdersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useWorkOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WorkOrdersQuery, WorkOrdersQueryVariables>) {
        return ApolloReactHooks.useQuery<WorkOrdersQuery, WorkOrdersQueryVariables>(WorkOrdersDocument, baseOptions);
      }
export function useWorkOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WorkOrdersQuery, WorkOrdersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WorkOrdersQuery, WorkOrdersQueryVariables>(WorkOrdersDocument, baseOptions);
        }
export type WorkOrdersQueryHookResult = ReturnType<typeof useWorkOrdersQuery>;
export type WorkOrdersLazyQueryHookResult = ReturnType<typeof useWorkOrdersLazyQuery>;
export type WorkOrdersQueryResult = ApolloReactCommon.QueryResult<WorkOrdersQuery, WorkOrdersQueryVariables>;
export const WorkOrderDocument = gql`
    query workOrder($id: Int!) {
  workOrder: workOrder(id: $id) {
    ...workOrderDetails
  }
}
    ${WorkOrderDetailsFragmentDoc}`;

/**
 * __useWorkOrderQuery__
 *
 * To run a query within a React component, call `useWorkOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWorkOrderQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WorkOrderQuery, WorkOrderQueryVariables>) {
        return ApolloReactHooks.useQuery<WorkOrderQuery, WorkOrderQueryVariables>(WorkOrderDocument, baseOptions);
      }
export function useWorkOrderLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WorkOrderQuery, WorkOrderQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WorkOrderQuery, WorkOrderQueryVariables>(WorkOrderDocument, baseOptions);
        }
export type WorkOrderQueryHookResult = ReturnType<typeof useWorkOrderQuery>;
export type WorkOrderLazyQueryHookResult = ReturnType<typeof useWorkOrderLazyQuery>;
export type WorkOrderQueryResult = ApolloReactCommon.QueryResult<WorkOrderQuery, WorkOrderQueryVariables>;
export const InsertWorkOrderDocument = gql`
    mutation insertWorkOrder($data: WorkOrderType!) {
  workOrder: insertWorkOrder(data: $data) {
    ...workOrderDetails
  }
}
    ${WorkOrderDetailsFragmentDoc}`;
export type InsertWorkOrderMutationFn = ApolloReactCommon.MutationFunction<InsertWorkOrderMutation, InsertWorkOrderMutationVariables>;

/**
 * __useInsertWorkOrderMutation__
 *
 * To run a mutation, you first call `useInsertWorkOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertWorkOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertWorkOrderMutation, { data, loading, error }] = useInsertWorkOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertWorkOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertWorkOrderMutation, InsertWorkOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertWorkOrderMutation, InsertWorkOrderMutationVariables>(InsertWorkOrderDocument, baseOptions);
      }
export type InsertWorkOrderMutationHookResult = ReturnType<typeof useInsertWorkOrderMutation>;
export type InsertWorkOrderMutationResult = ApolloReactCommon.MutationResult<InsertWorkOrderMutation>;
export type InsertWorkOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertWorkOrderMutation, InsertWorkOrderMutationVariables>;
export const UpdateWorkOrderDocument = gql`
    mutation updateWorkOrder($id: Int!, $data: WorkOrderType!) {
  workOrder: updateWorkOrder(id: $id, data: $data) {
    ...workOrderDetails
  }
}
    ${WorkOrderDetailsFragmentDoc}`;
export type UpdateWorkOrderMutationFn = ApolloReactCommon.MutationFunction<UpdateWorkOrderMutation, UpdateWorkOrderMutationVariables>;

/**
 * __useUpdateWorkOrderMutation__
 *
 * To run a mutation, you first call `useUpdateWorkOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkOrderMutation, { data, loading, error }] = useUpdateWorkOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateWorkOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateWorkOrderMutation, UpdateWorkOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateWorkOrderMutation, UpdateWorkOrderMutationVariables>(UpdateWorkOrderDocument, baseOptions);
      }
export type UpdateWorkOrderMutationHookResult = ReturnType<typeof useUpdateWorkOrderMutation>;
export type UpdateWorkOrderMutationResult = ApolloReactCommon.MutationResult<UpdateWorkOrderMutation>;
export type UpdateWorkOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateWorkOrderMutation, UpdateWorkOrderMutationVariables>;