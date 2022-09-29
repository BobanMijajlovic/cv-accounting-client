import {
  _$and,
  _$like,
  _$OR,
  _$or
} from '../util/apolloUtil'
import {
  CONSTANT_CALCULATION,
  CONSTANT_INVOICE,
  CONSTANT_MODEL
} from '../application/constants'

const defaultLimit = 25

export const queryVariablesForItems = (value: string, limit: number = defaultLimit) => {
  const q = {
    offset: 0,
    limit: limit
  }

  return (value.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['barCode', 'code', 'shortName', 'fullName'], `%${value}%`)
    }
  } : q
}
export const queryVariablesForCustomers = (value: string, limit: number = defaultLimit, fields: string[] = ['taxNumber', 'uniqueCompanyNumber', 'shortName', 'fullName']) => {
  const q = {
    offset: 0,
    limit
  }
  return (value.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(fields, `%${value}%`)
    }
  } : q
}

export const queryVariablesForAppData = (value: string, limit: number = defaultLimit) => {
  const q = {
    offset: 0,
    limit: limit
  }
  return (value.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['key'], `%${value}%`)
    }
  } : q
}

export const queryVariablesForAutoComplete = (variables: string[], searchString: string, limit: number = 10) => {
  const q = {
    offset: 0,
    limit: limit
  }
  return (searchString.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(variables, `%${searchString}%`)
    }
  } : q
}

export const queryVariablesForSale = (variables: string[], searchString: string, limit: number = 10) => {
  const q = {
    offset: 0,
    limit: limit
  }
  return (searchString.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$or(variables, searchString)
    }
  } : q
}

export const queryVariablesForUsers = (value: string, limit: number = defaultLimit) => {
  const q = {
    offset: 0,
    limit: limit
  }
  return (value.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['firstName', 'lastName', 'userName', 'email'], `%${value}%`)
    }
  } : q
}

export const queryVariablesForWarehouse = (value: string, limit: number = defaultLimit) => {
  const q = {
    offset: 0,
    limit: limit
  }
  return (value.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['name'], `%${value}%`)
    }
  } : q
}

export const queryWarehouseItemsTransferInfo = (warehouseSource: string, warehouseDest: string, itemIds: number[]) => {
  const q = {
    offset: 0,
    limit: 1000,
    filter: _$OR([{ field: 'warehouseId', value: warehouseSource }, { field: 'warehouseId', value: warehouseDest }])
  }

  return {
    ...q,
    ...{
      include: [
        {
          required: true,
          model: 'Item',
          filter: {
            id: itemIds
          }
        },
        {
          required: true,
          model: 'WarehouseItem'
        }
      ]
    }
  }
}

export const queryVariablesForWarehouseItemsInfo = (warehouseId: string, value: string, limit: number = defaultLimit, offset: number = 0) => {
  const q = {
    offset,
    limit,
    filter: _$and([{ field: 'warehouseId', value: warehouseId }]),
  }

  return (value.trim().length > 0) ? {
    ...q,
    ...{
      include: [
        {
          required: true,
          model: 'Item',
          filter: _$like(['barCode', 'code', 'shortName', 'fullName'], `%${value}%`)
        },
        {
          required: true,
          model: 'WarehouseItem'
        }
      ]
    }
  } : {
    ...q,
    ...{
      include: [
        {
          required: true,
          model: 'Item'
        },
        {
          required: true,
          model: 'WarehouseItem'
        }
      ]
    }
  }
}

export interface IWarehouseItemSearchProps {
  clientId?: number | string,
  dateFrom?: Date | string,
  dateTo?: Date | string
}

/** on table warehouseItemsInfo   select all */
export const queryVariablesWarehouseItemsLastRecords = (offset: number = 0, limit: number = 25, warehouseId: string, itemId: string[] = [], likeString: string = '') => {
  const filter = [
    { warehouseId }
  ]
  likeString = likeString.trim()
  const andItemArray = []
  if (likeString) {
    andItemArray.push(_$like(['shortName'], `%${likeString}%`))
  }
  if (itemId) {
    andItemArray.push({ id: itemId })
  }

  const filterItem = andItemArray.length ? {
    filter: {
      $and: [...andItemArray]
    }
  } : {}

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      Object.assign({
        model: 'Item',
        required: true
      }, filterItem),

      {
        model: 'Warehouse',
        required: true
      },
      {
        model: 'WarehouseItem',
        required: true
      },
    ]
  }
}

export const queryVariablesWarehouseItem = (offset: number = 0, limit: number = 25, warehouseId: string, itemId: string, searchParams: IWarehouseItemSearchProps = {}) => {

  const filter = [
    { warehouseId },
    { itemId }
  ] as any

  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      transactionDate: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      transactionDate: { $lte: date }
    } as any)
  }
  if (searchParams.clientId) {
    filter.push({
      customerId: searchParams.clientId
    })
  }

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        required: false,
        model: 'Calculation',
        include: [
          {
            required: true,
            model: 'Customer',
          }
        ]
      },
      {
        required: false,
        model: 'Invoice',
        include: [
          {
            required: true,
            model: 'Customer'
          }
        ]
      },
      {
        required: false,
        model: 'ReturnInvoice',
        include: [
          {
            required: true,
            model: 'Customer',
          }
        ]
      },
    ],
    sort: {
      field: 'id',
      direction: 'DESC'
    }
  }
}

export const queryVariablesWarehouseFinance = (warehouseId: string, searchParams: IWarehouseItemSearchProps = {}) => {

  const filter = [
    { warehouseId }
  ] as any

  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      date: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      date: { $lte: date }
    } as any)
  }

  return {
    filter: { $and: filter },
    include: [
      {
        required: false,
        model: 'Calculation',
        include: [
          {
            required: true,
            model: 'Customer',
            as: 'supplier'
          }
        ]
      },
      {
        required: false,
        model: 'Invoice',
        include: [
          {
            required: true,
            model: 'Customer'
          }
        ]
      },
      {
        required: false,
        model: 'ReturnInvoice'
      },
      {
        required: true,
        model: 'Warehouse',
      }
    ],
    sort: {
      field: 'date',
      direction: 'ASC'
    }
  }
}

export const queryVariablesWarehouseFinanceInvoice = (warehouseIds: string[]) => {
  const filter = [
    { warehouseId: warehouseIds }
  ] as any

  return {
    offset: 0,
    limit: 1000,
    filter: { $and: filter },
    include: [
      {
        required: true,
        model: 'Warehouse',
      }
    ],
    sort: {
      direction: 'DESC',
      field: 'id',
    }
  }
}

export const queryVariablesWarehouseFinanceByCalculation = (warehouseId: string) => {
  const filter = [
    { warehouseId }
  ] as any

  return {
    offset: 0,
    limit: 1,
    filter: { $and: filter },
    include: [
      {
        required: false,
        model: 'Calculation',
        include: [
          {
            required: true,
            model: 'Customer',
            as: 'supplier'
          }
        ]
      },
      {
        required: false,
        model: 'Invoice',
        include: [
          {
            required: true,
            model: 'Customer'
          }
        ]
      },
      {
        required: true,
        model: 'Warehouse',
      }
    ],
    sort: {
      direction: 'DESC',
      field: 'id',
    }
  }
}

export const queryVariablesWarehouseItemStock = (offset: number = 0, limit: number = 25, itemId: string) => {

  const filter = [
    { itemId }
  ] as any

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        required: false,
        model: 'Warehouse',
      },
      {
        required: false,
        model: 'WarehouseItem',
      }
    ],
    sort: {
      field: 'id',
      direction: 'DESC'
    }
  }
}

export const queryVariablesItemPurchasePrices = (offset: number = 0, limit: number = 25, itemId: string) => {

  const filter = [
    { itemId },
    {
      calculationId: {
        $ne: null
      }
    }

  ] as any

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        required: false,
        model: 'Item',
      },
      {
        required: true,
        model: 'Customer',
      },
      {
        model: 'Calculation',
        required: false,
        include: [
          {
            model: 'Customer',
            required: true,
            as: 'supplier'
          }
        ]
      },
      {
        model: 'Invoice',
        required: false,
        include: [
          {
            model: 'Customer',
            required: true,
          }
        ]
      }
    ],
    sort: {
      field: 'id',
      direction: 'DESC'
    }
  }
}

export const _queryVariablesForCalculations = (value: string, limit: number = defaultLimit) => {
  const q = {
    offset: 0,
    limit: limit
  }

  return (value.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['number'], `%${value}%`),
      include: [
        {
          required: false,
          model: 'Customer'
        }
      ]
    }
  } : {
    ...q,
    ...{
      include: [
        {
          required: false,
          model: 'Customer'
        }
      ]
    }
  }
}

export interface ICalculationsSearchProps {
  supplierId?: number | string,
  dateFrom?: Date | string,
  dateTo?: Date | string
  status?: string
}

export const queryVariablesForCalculations = (offset: number = 0, limit: number = 25, searchParams: ICalculationsSearchProps = {}) => {
  const filter = [] as any
  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      date: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      date: { $lte: date }
    } as any)
  }
  if (searchParams.supplierId) {
    filter.push({
      supplierId: searchParams.supplierId
    })
  }

  if (searchParams.status && Number(searchParams.status) !== 0) {
    filter.push({
      status: Number(searchParams.status)
    })
  }

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        required: true,
        model: 'Customer'
      },
      {
        required: false,
        model: 'Discounts'
      }
    ]
  }
}

export interface IInvoicesSearchProps {
  customerId?: number | string,
  dateFrom?: Date | string,
  dateTo?: Date | string
  status?: string
}

export const queryVariablesForProformaInvoices = (offset: number = 0, limit: number = 25, searchParams: IInvoicesSearchProps = {}) => {
  const filter = [] as any
  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      date: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      date: { $lte: date }
    } as any)
  }
  if (searchParams.customerId) {
    filter.push({
      customerId: searchParams.customerId
    })
  }

  if (searchParams.status && Number(searchParams.status) !== 0) {
    filter.push({
      status: Number(searchParams.status)
    })
  }

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        required: true,
        model: 'Customer'
      },
      {
        required: false,
        model: 'Client'
      },
      {
        required: false,
        model: 'Invoice'
      }
    ]
  }
}

export interface IFinanceTransferDocumentSearchProps {
  customerId?: number | string,
  dateFrom?: Date | string,
  dateTo?: Date | string
  status?: string
  flag?: string
}

export const queryVariablesForFinanceTransferDocuments = (offset: number = 0, limit: number = 25, documentType: number, searchParams: IFinanceTransferDocumentSearchProps = {}) => {
  const filter = [{ documentType }] as any

  if (searchParams.status && Number(searchParams.status) !== 0) {
    filter.push({
      status: Number(searchParams.status)
    })
  }

  if (searchParams.customerId) {
    filter.push({
      customerId: searchParams.customerId
    })
  }

  if (searchParams.flag) {
    filter.push({
      flag: Number(searchParams.flag)
    })
  }

  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      date: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      date: { $lte: date }
    } as any)
  }

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        required: false,
        model: 'Customer'
      },
      {
        required: false,
        model: 'Client'
      },
      {
        required: false,
        model: 'TaxFinance'
      }
    ]
  }
}

export const queryVariablesForInvoices = (offset: number = 0, limit: number = 25, searchParams: IInvoicesSearchProps = {}) => {
  const filter = [] as any
  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      date: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      date: { $lte: date }
    } as any)
  }
  if (searchParams.customerId) {
    filter.push({
      customerId: searchParams.customerId
    })
  }

  if (searchParams.status && Number(searchParams.status) !== 0) {
    filter.push({
      status: Number(searchParams.status)
    })
  }

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        required: true,
        model: 'Customer'
      },
      {
        required: false,
        model: 'Client'
      },
    ]
  }
}

export const queryVariablesFindReceiptByNumber = (receiptNumber: string) => {

  const filter = [
    { receiptNumber }
  ] as any

  return {
    offset: 0,
    limit: 100,
    filter: { $and: filter },
    include: [
      {
        model: 'ReceiptItem',
        include: [
          {
            required: false,
            model: 'Item'
          },
          {
            required: false,
            model: 'Tax',
            include: [
              {
                model: 'TaxValue',
              }
            ]
          }
        ]
      },
      {
        model: 'ReceiptPayment',
      },
      {
        required: false,
        model: 'Client',
        include: [
          {
            model: 'Address'
          }
        ]
      }
    ]
  }
}

export const queryVariablesFindLastReceipt = () => {

  return {
    offset: 0,
    limit: 1,
    include: [
      {
        required: false,
        model: 'Client',
        include: [
          {
            model: 'Address'
          }
        ]
      }
    ],
    sort: {
      field: 'id',
      direction: 'DESC'
    }
  }
}

export interface IBankTransactionSearchProps {
  customerId?: number | string,
  dateFrom?: Date | string,
  dateTo?: Date | string,
  bankAccountId?: Date | string
}

export const queryVariablesForBankTransactions = (offset: number = 0, limit: number = 25, searchParams: IBankTransactionSearchProps = {}) => {
  const filter = [] as any

  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setHours(12)
    filter.push({
      dateProcessed: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setHours(12)
    filter.push({
      dateProcessed: { $lte: date }
    } as any)
  }

  if (searchParams.bankAccountId) {
    filter.push({
      bankAccountId: searchParams.bankAccountId
    })
  }

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        required: false,
        model: 'BankAccount'
      }
    ]
  }
}

export const queryVariablesGetLastBankTransactionByAccount = (account: number) => {
  const filter = [
    { bankAccountId: account }
  ] as any

  return {
    offset: 0,
    limit: 1,
    filter: { $and: filter },
    include: [
      {
        model: 'BankAccount'
      },
      {
        model: 'Client'
      }
    ],
    sort: {
      direction: 'DESC',
      field: 'id',
    }
  }
}

export const queryVariablesForCustomerOwes = (offset: number = 0, limit: number = 25, searchParams: { customerId: number }) => {
  const filter = [{
    status: CONSTANT_CALCULATION.STATUS.BOOKED
  }] as any
  if (searchParams.customerId) {
    filter.push({
      supplierId: searchParams.customerId
    })
  }

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        model: 'CalculationDueDate',
      }
    ]
  }
}

export interface IWarehouseTransferSearchProps {
  fromWarehouseId?: number | string,
  toWarehouseId?: Date | string,
  dateFrom?: Date | string
  dateTo?: Date | string
  status?: string
}

export const queryVariablesForWorkOrders = (offset: number = 0, limit: number = 25, warehouseId: number, searchParams: IWarehouseTransferSearchProps) => {
  const filter = [{
    fromWarehouseId: Number(warehouseId)
  }] as any

  if (searchParams.toWarehouseId) {
    filter.push({
      toWarehouseId: Number(searchParams.toWarehouseId)
    })
  }

  if (searchParams.status && Number(searchParams.status) !== 0) {
    filter.push({
      status: Number(searchParams.status)
    })
  }

  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      transferDate: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      transferDate: { $lte: date }
    } as any)
  }

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        model: 'Warehouse',
        as: 'fromWarehouse'
      },
      {
        model: 'Warehouse',
        as: 'toWarehouse'
      }
    ]
  }
}

export interface ICustomerCardSearchProps {
  customerId: number | string,
  dateFrom?: Date | string
  dateTo?: Date | string
}

export const queryVariablesForCustomerCardTableCalculation = (searchParams: ICustomerCardSearchProps) => {
  const filter = [
    {
      supplierId: Number(searchParams.customerId),
    },
    {
      status: CONSTANT_CALCULATION.STATUS.BOOKED
    }
  ] as any

  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      date: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      date: { $lte: date }
    } as any)
  }

  return {
    filter: { $and: filter },
    include: [
      {
        model: 'Customer'
      },
      {
        model: 'CalculationDueDate'
      }
    ]
  }
}

export const queryVariablesForCustomerCardTableInvoice = (searchParams: ICustomerCardSearchProps) => {
  const filter = [
    {
      customerId: Number(searchParams.customerId)
    },
    {
      status: CONSTANT_INVOICE.STATUS.SAVED
    }
  ] as any

  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      date: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      date: { $lte: date }
    } as any)
  }

  return {
    filter: { $and: filter },
    include: [
      {
        model: 'Customer'
      },
      {
        model: 'InvoiceDueDate'
      }
    ]
  }
}

export interface ICustomerPaymentsProps {
  dateFrom?: Date | string,
  dateTo?: Date | string,
}

export const queryVariablesForCustomerPayments = (offset: number = 0, limit: number = 25, customerId: string, searchParams: ICustomerPaymentsProps = {}) => {
  const filter = [{
    customerId
  }] as any

  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      dateProcessed: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      dateProcessed: { $lte: date }
    } as any)
  }

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        model: 'BankAccount'
      }
    ]
  }
}

export type TQueryDueDatesSummarizeByFilterProps = {
  customerId: number
  flag: number,
  status: number,
  dateFrom: Date | string,
  dateTo: Date | string,
  group: string[]
  attributes: string[]
}

export const queryDueDatesSummarizeByFilter = (props: Partial<TQueryDueDatesSummarizeByFilterProps>) => {

  const filter = []
  if (props.customerId) {
    filter.push({ customerId: props.customerId })
  }
  if ( props.flag ) {
    filter.push({ flag: props.flag })
  }
  if (props.status) {
    filter.push({ status: props.status })
  }

  if (props.dateFrom) {
    const date = new Date(props.dateFrom)
    date.setHours(12)
    filter.push({
      date: { $gte: date }
    } as any)
  }

  if (props.dateTo) {
    const date = new Date(props.dateTo)
    date.setHours(12)
    filter.push({
      date: { $lte: date }
    } as any)
  }

  return Object.assign({
    filter: { $and: filter }
  }, props.group ? {group: props.group} : {}, props.attributes ? {attributes: props.attributes} : {})
}

export const queryVariablesDueDates = (props: Partial<TQueryDueDatesSummarizeByFilterProps>) => {

  const filter = [
    {
      status: CONSTANT_MODEL.DUE_DATES_STATUS.ACTIVE
    }
  ]

  if (props.customerId) {
    filter.push({ customerId: props.customerId } as any)
  }

  if (props.dateFrom) {
    const date = new Date(props.dateFrom)
    date.setHours(12)
    filter.push({
      date: { $gte: date }
    } as any)
  }

  if (props.dateTo) {
    const date = new Date(props.dateTo)
    date.setHours(12)
    filter.push({
      date: { $lte: date }
    } as any)
  }

  return {
    filter: { $and: filter },
    include: [
      {
        model: 'Calculation'
      },
      {
        model: 'Invoice'
      },
      {
        model: 'ReturnInvoice'
      },
      {
        model: 'FinanceTransferDocument'
      }
    ],
    sort: {
      direction: 'DESC',
      field: 'date'
    },
  }
}

export const queryVariablesForNorms = (value: string, limit: number = defaultLimit) => {
  const q = {
    offset: 0,
    limit: limit
  }

  return (value.trim().length > 0) ? {
    ...q,
    ...{
      filter: _$like(['barCode', 'code', 'shortName', 'fullName'], `%${value}%`),
      include: [
        {
          required: true,
          model: 'Normative',
          filter: {
            status: CONSTANT_MODEL.NORMATIVE_STATUS.ACTIVE
          }
        },
      ]
    }
  } : q
}

export const queryVariablesNormatives = (itemId: number) => {

  const filter = [
    {itemId},
    {status: CONSTANT_MODEL.NORMATIVE_STATUS.ACTIVE}
  ]

  return {
    filter: { $and: filter },
    include: [
      {
        model: 'Item',
        include: [
          {
            model: 'Normative',
            required: false,
            as: 'norms'
          }
        ]
      },
    ],
  }
}

export interface IProductionOrderSearch {
  itemId?: number | string,
  dateFrom?: Date | string,
  dateTo?: Date | string
  status?: string
}

export const queryVariablesForProductionOrders = (offset: number = 0, limit: number = 25, searchParams: IProductionOrderSearch = {}) => {
  const filter = [] as any
  if (searchParams.dateFrom) {
    const date = new Date(searchParams.dateFrom)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setHours(0)
    filter.push({
      date: { $gte: date }
    } as any)
  }

  if (searchParams.dateTo) {
    const date = new Date(searchParams.dateTo)
    date.setMinutes(59)
    date.setSeconds(59)
    date.setHours(23)
    filter.push({
      date: { $lte: date }
    } as any)
  }
  if (searchParams.itemId) {
    filter.push({
      itemId: searchParams.itemId
    })
  }

  if (searchParams.status && Number(searchParams.status) !== 0) {
    filter.push({
      status: Number(searchParams.status)
    })
  }

  return {
    offset,
    limit,
    filter: { $and: filter },
    include: [
      {
        required: true,
        model: 'Item'
      },
    ]
  }
}

export const queryVariablesForAutoCompleteNormativeItems = (variables: string[], searchString: string, limit: number = 10) => {
  const q = {
    offset: 0,
    limit: limit,
  }
  return (searchString.trim().length > 0) ? {
    ...q,
    ...{
      filter: {
        itemId: {
          $ne: null
        }
      },
      include: [
        {
          required: true,
          model: 'Normative',
          filter:_$like(variables, `%${searchString}%`),
        }
      ],
    }
  } : q
}
