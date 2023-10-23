import { renderHookQuery } from "../TestComponent";
import {
    useBanksQuery,
    useCalculationQuery,
    useCalculationsQuery,
    useCategoriesQuery,
    useCategoryQuery,
    useCustomersQuery,
    useGetValidTaxQuery,
    useInvoicesQuery,
    useItemsQuery,
    useWarehouseFinancesQuery,
    useWarehouseItemsInfoQuery,
    useWarehousesQuery
} from '../../graphql/graphql';
import { act }             from "react-dom/test-utils";
import {
    TBank,
    TCalculation,
    TCategory,
    TCustomer,
    TInvoice,
    TItem,
    TTax,
    TWarehouse,
    TWarehouseItemInfo
} from '../../graphql/type_logic/types';
import {
    queryVariablesWarehouseFinanceByCalculation,
    queryVariablesWarehouseFinanceInvoice,
    queryVariablesWarehouseItemsLastRecords
} from '../../graphql/variablesQ';
import _                   from 'lodash'

export const getTaxes = async () => {
    let queryItems = renderHookQuery(useGetValidTaxQuery)
    let result
    await act(async () => {
        result = await queryItems
    })
    const taxes:TTax[] = _.get(result, 'validTax', [])
    return taxes;
}

export const getItems = async (defLimit ?: number) => {
    let queryItems = renderHookQuery(useItemsQuery, {
        variables: {
            offset: 0,
            limit: defLimit ? defLimit: 200
        }
    })
    let result
    await act(async () => {
        result = await queryItems
    })
    const items: TItem[] = _.get(result, 'data.items', [])
    return items;
}

export const getCustomers = async (defLimit ?:number) => {
    let queryCustomer = renderHookQuery(useCustomersQuery, {
        fetchPolicy: 'network-only',
        variables: {
            offset: 0,
            limit: defLimit ? defLimit: 200
        }
    })
    let result
    await act(async () => {
        result = await queryCustomer
    })
    const customers: TCustomer[] = _.get(result, 'data.items', [])
    return customers
}

export const getBanks = async () => {
    let queryBanks = renderHookQuery(useBanksQuery, {
        fetchPolicy: 'network-only'
    })
    let result
    await act(async () => {
        result = await queryBanks
    })
    const banks: TBank[] = _.get(result, 'data', [])
    return banks
}

export const getWarehouses = async (defLimit ?:number) => {
    let query = renderHookQuery(useWarehousesQuery, {
        fetchPolicy: 'network-only',
        variables: {
            offset: 0,
            limit: defLimit ? defLimit: 200
        }
    })
    let result
    await act(async () => {
        result = await query
    })
    const warehouses: TWarehouse[] = _.get(result, 'data.items', [])
    return warehouses
}

export const getCalculations = async (defLimit = 20) => {
    let query = renderHookQuery(useCalculationsQuery, {
        fetchPolicy: 'network-only',
        variables: {
            offset: 0,
            limit: defLimit,
            include: [
                {
                  model: 'CalculationItem',
                  include: [
                     {
                        model: 'Item',
                         include: [
                             {
                                 model: 'Tax',
                                 include: [{
                                     model: 'TaxValue'
                                 }]
                             }
                         ]
                     },
                      {
                          model: 'Tax'
                      }
                  ]
                },
                {
                    model: 'CalculationTax',
                    as: 'vats',
                    include: [
                        {
                            model: 'Tax'
                        }
                    ]
                }
            ]
        }
    })
    let result
    await act(async () => {
        result = await query
    })
    const calculations: TCalculation[] = _.get(result, 'data.items', [])
    return calculations
}

export const getInvoices = async (defLimit = 20) => {
    let query = renderHookQuery(useInvoicesQuery, {
        fetchPolicy: 'network-only',
        variables: {
            offset: 0,
            limit: defLimit,
            include: [
                {
                    model: 'InvoiceItem',
                    required: false,
                    include: [
                        {
                            model: 'Item',
                            include: [
                                {
                                    model: 'Tax',
                                    include: [{
                                        model: 'TaxValue'
                                    }]
                                }
                            ]
                        },
                        {
                            model: 'Warehouse'
                        },
                        {
                            model: 'Tax'
                        }
                    ]
                },
                {
                    model: 'Expense',
                    required: false,
                    include: [
                        {
                            model: 'ExpenseItem',
                            include: [
                                {
                                    model: 'Tax',
                                    include: [{model: 'TaxValue'}]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    })
    let result
    await act(async () => {
        result = await query
    })
    const invoices: TInvoice[] = _.get(result, 'data.items', [])
    return invoices
}


export const getWarehouseItemsInfo = async (warehouseId:number, itemId: number, defLimit = 20) => {
    let query = renderHookQuery(useWarehouseItemsInfoQuery, {
        fetchPolicy: 'network-only',
        variables: {
            offset: 0,
            limit: defLimit,
            filter: {
                $and:[
                    {warehouseId},
                    {itemId},
                    {clientId: 1}
                ]
            },
            include: [
                {
                    model: 'WarehouseItem',
                    required: true
                }
            ]
        }
    })
    let result
    await act(async () => {
        result = await query
    })
    const warehouseItems: TWarehouseItemInfo[] = _.get(result, 'data.items', [])
    return warehouseItems
}

export const getRandomItems = async (defLimit = 100, total = 10) => {
    let _items = await getItems(defLimit)
    const items = [..._items]
    const array = []
    for (let i = 0; i < total; i++) {
        if (items.length === 0) break;
        if (items.length === 1) {
            array.push(items[0])
            break;
        }
        const random = _.random(0, items.length - 1)
        array.push(items[random])
        items.splice(random, 1)
    }
    return array;
}

export const getWarehouseItemStates = async (warehouseId: string, itemsIds: string[]) => {
    const variables = queryVariablesWarehouseItemsLastRecords(0, 1000, `${warehouseId}`, itemsIds)
    const query = renderHookQuery(useWarehouseItemsInfoQuery, {variables, fetchPolicy: 'network-only'})
    let result;
    await act(async () => {
        result = await query
    })
    const data: any[] = _.get(result, 'data.items', [])
    return data
}

export const getLastWarehouseFinance = async (warehouseId: string)=> {
    const variables = queryVariablesWarehouseFinanceByCalculation(`${warehouseId}`)
    const query = renderHookQuery(useWarehouseFinancesQuery, {
        variables,fetchPolicy: 'network-only'})
    let result;
    await act(async () => {
        result = await query
    })
    const data  = _.get(result, 'data.items', [])
    return  data && data.length !== 0  ? data[0] : void(0)
}

export const getWarehouseFinanceState = async (warehouseIds: string[]) => {
    const variables = queryVariablesWarehouseFinanceInvoice(warehouseIds)
    const query = renderHookQuery(useWarehouseFinancesQuery, {
        variables,fetchPolicy: 'network-only'})
    let result;
    await act(async () => {
        result = await query
    })
    const data  = _.get(result, 'data.items', [])
    return  data
}


export const getCalculation = async (calcId: number)=> {
    let query = renderHookQuery(useCalculationQuery,{
        fetchPolicy: 'network-only',
        variables: {
            id: calcId
        }
    })
    let result
    await act(async () => {
        result = await query
    })
    return _.get(result, 'data.calculation', {})
}

export const getCategory = async (categoryId: number)=> {
    let query = renderHookQuery(useCategoryQuery,{
        fetchPolicy: 'network-only',
        variables: {
            id: categoryId
        }
    })
    let result
    await act(async () => {
        result = await query
    })
    return _.get(result, 'category', {})
}


export const getCategories= async (defLimit ?:number) => {
    let queryCategories = renderHookQuery(useCategoriesQuery, {
        fetchPolicy: 'network-only',
        variables: {
            offset: 0,
            limit: defLimit ? defLimit: 200
        }
    })
    let result
    await act(async () => {
        result = await queryCategories
    })
    const categories: TCategory[] = _.get(result, 'data.items', [])
    return categories
}

