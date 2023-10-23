export const APPLICATION_MAIN_SUB_DOMAIN = 'application'
export const TABLE_SETTINGS_PREFIX = 'hwt_table_settings_width_visible-'
export const CALCULATION_ITEMS_TABLE_NAME = 'calculation-items-table-deal-479328745839274ddd27'
export const INVOICE_FORM_ITEMS_TABLE_NAME = 'invoice-form-table-deal-47932874583927495727'
export const INVOICE_PREVIEW_ITEMS_TABLE_NAME = 'invoice-preview-table-deal-28752074707'
export const SALE_FIND_ITEM_TABLE_NAME = 'sale-find-item-table-4165294195871259617'
export const BANK_TRANSACTION_TABLE_NAME = 'bank-transaction-table-0450704210101'
export const BANK_TRANSACTION_INSERT_FORM_TABLE_NAME = 'bank-transaction-insert-form-table-1589156155656156'
export const BANK_TRANSACTION_PREVIEW_TABLE_NAME = 'bank-transaction-preview-table-72707047407'
export const WAREHOUSE_TRANSFER_TABLE_NAME = 'warehouse-transfer-table-04040404040454'
export const WAREHOUSE_TRANSFER_ITEMS_TABLE_NAME = 'warehouse-transfer-items-table-deal-07058707407410'
export const WAREHOUSE_TRANSFER_PREVIEW_ITEMS_TABLE_NAME = 'warehouse-transfer-preview-table-deal-28752074707'
export const PROFORMA_INVOICE_TABLE_NAME = 'proforma-invoice-table-7074070474070570755741'
export const PROFORMA_INVOICE_FORM_ITEMS_TABLE_NAME = 'proforma-invoice-items-table-021554174501404'
export const PROFORMA_INVOICE_PREVIEW_ITEMS_TABLE_NAME = 'proforma-invoice-preview-table-deal-0472074077401707'
export const ITEM_WAREHOUSE_BALANCE_PREVIEW_TABLE_NAME = 'item-warehouse-balance-preview-table-52052510505461505'
export const CUSTOMER_TAB_PAYMENTS_TABLE_NAME = 'customer-tab-payments-table-name-123123123412t1t1gh1'
export const ITEM_PURCHASE_PRICE_TABLE_NAME = 'item-purchase-price-table-deal-704170170710707'
export const INVOICE_FORM_ITEMS_TABLE_SUMMARY = 'invoice-form-table-summary-deal-0792016405610120'
export const RETURN_INVOICE_MAIN_VIEW_TABLE = 'return-invoice-main-view-table-deal-515691919884'
export const RETURN_INVOICE_FORM_ITEMS_TABLE_NAME = 'return-invoice-form-table-deal-07540410704074104'
export const RETURN_INVOICE_PREVIEW_ITEMS_TABLE_NAME = 'return-invoice-preview-table-deal-2875207070745010074707'
export const ADVANCE_INVOICE_MAIN_VIEW_TABLE = 'advance-invoice-main-view-table-deal-0740574012704210'
export const ADVANCE_INVOICE_PREVIEW_ITEMS_TABLE_NAME = 'advance-invoice-preview-table-deal-2318952305623'
export const FINANCE_TRANSFER_DOCUMENT_MAIN_VIEW_TABLE = 'finance-transfer-document-main-view-table-deal-07041207445120445210'
export const BANK_TRANSACTION_BANK_ACCOUNT_BALANCE_TABLE_NAME = 'bank-transaction-bank-account-balance-table-70741070107417404'
export const NORMS_TABLE_NAME = 'norms-table-name-2015608556156'
export const NORMATIVE_ITEMS_TABLE_NAME = 'normative-items-table-name-0702025052150251045159'
export const NORMATIVE_PREVIEW_ITEMS_TABLE_NAME = 'normative-preview-items-table-deal-070541020534215487120'
export const PRODUCTION_ORDER_MAIN_TABLE_NAME = 'production-order-main-table-deal-0450720720740707454'
export const PRODUCTION_ORDER_ITEMS_TABLE_NAME = 'production-order-items-table-deal-7727070704107047540'
export const PRODUCTION_ORDER_ITEMS_PREVIEW_TABLE_NAME = 'production-order-items-preview-table-deal-72012780478576578'

export const CURRENCY_RSD_ID = 999999
export const APPLICATION_DEFAULT_DATE_FORMAT = 'us-EN'
export const CONSTANT_UNITS  = {
  KILOGRAM: 0,
  LITER: 1,
  PIECE: 2,
  METER: 3
}
export const APPLICATION_DEFAULT_UNITS = [CONSTANT_UNITS.KILOGRAM,CONSTANT_UNITS.LITER,CONSTANT_UNITS.PIECE]
export const APPLICATION_DEFAULT_LANGUAGE = 'en'

export enum APP_LAYOUT {
  AUTH = 'auth',
  MAIN = 'main'
}

/** date formats types */

export const FORMAT_DATES = {
  /** day 2-digit: month: 2-digit; year: numeric (YYYYY) */
  formatDateLong: {day:'2-digit', month:'2-digit', year:'numeric'},
  /** day 2-digit: month: 2-digit; year: 2-digit (YY) */
  formatDateShort:  {day:'2-digit', month:'2-digit', year:'2-digit'},
  /** day 2-digit: month: 2-digit; */
  formatMonthDay: {day:'2-digit', month:'2-digit'},
  /** month: name, year: numeric (YYYY) **/
  formatMonthLongYear: {month: 'long', year: 'numeric'}
}

/** constants for all models in system */
export const CONSTANT_MODEL = {
  STATUS: {
    DELETED: 0,
    ACTIVE: 1,
    NOT_ACTIVE: 2
  },
  DUE_DATES_STATUS: {
    OPENED: 1,
    ACTIVE: 2,
    DELETED: 3,
  },
  TAX_FINANCE_FLAG: {
    IN: 0,
    OUT: 1
  },
  CUSTOMER_INFO_KEYS: {
    BANK_ACCOUNT: 'BANK_ACCOUNT'
  },
  APPLICATION_KEYS: {
    BANK_DATA: 'BANK_DATA'
  },
  FINANCE_TRANSFER_DOCUMENT_TYPE: {
    TRANSFER: 1,
    ADVANCE: 2
  },
  BANK_TRANSACTION_STATUS: {
    DELETED: 0,
    ACTIVE: 1,
    OPENED: 2
  },
  NORMATIVE_STATUS: {
    ACTIVE: 1,
    NOT_ACTIVE: 2,
  },
  PRODUCTION_ORDER: {
    OPENED: 1,
    IN_PROGRESS: 2,
    FINISHED: 3,
    DELETED: 4
  },
}

/** CUSTOMER */

export const CONSTANT_CUSTOMER = {
  EVENTS: {
    ADD_NEW: 'CUSTOMER-ADD-NEW-1237843',
    SEARCH_EVENT: 'CUSTOMER-SEARCH-EVENT-489308245',
    SELECTED_ONE: 'CUSTOMER-SELECTED-ONE-748392745372',
    EDIT: 'CUSTOMER-EDIT-GENERAL-DETAILS-31156564',
  }
}

/** UNIT OF MEASURE */
export const CONSTANT_UOM = [
  {
    label: 'Weight',
    value: '1',
    short: 'kg'
  },
  {
    label: 'Piece',
    value: '2',
    short: 'kom'
  }
]

/** ITEM */
export const CONSTANT_ITEM = {
  EVENTS: {
    SELECTED_ONE: 'ITEM-SELECTED-ONE-7123783434',
    ADD_NEW: 'ITEM-ADD-NEW-746378901',
    SEARCH_EVENT: 'ITEM-SEARCH-EVENT-4354737717',
    EDIT: 'ITEM-EDIT-GENERAL-DETAILS-2341387417',
    ADD_SUPPLIER_CODE: 'ITEM-SUPPLIER-CODE-ADD-21512512',
    EDIT_SUPPLIER_CODE: 'ITEM-SUPPLIER-CODE-EDIT-65445415',
    DELETE_SUPPLIER_CODE: 'ITEM-SUPPLIER-CODE-DELETE-78214582',
    SHOW_PURCHASE_PRICE_HISTORY: 'ITEM-PURCHASE-PRICE-HISTORY-3214523165'
  }
}

/** ADDRESS */

const CONSTANT_ADDRESS_TYPES = {
  HOME: '0',
  HEADQUARTERS: '1',
  WAREHOUSE: '2',
  SHOP: '3'
}

export const CONSTANT_ADDRESS = {
  EVENTS: {
    ADD_NEW: 'ADDRESS-ADD-NEW-1237843',
    EDIT: 'ADDRESS-EDIT-78978797',
    DELETE: 'ADDRESS-DELETE-47839274'
  },
  TYPES: {
    HOME: CONSTANT_ADDRESS_TYPES.HOME,
    HEADQUARTERS: CONSTANT_ADDRESS_TYPES.HEADQUARTERS,
    WAREHOUSE: CONSTANT_ADDRESS_TYPES.WAREHOUSE,
    SHOP: CONSTANT_ADDRESS_TYPES.SHOP
  },
  TYPES_SELECT: [
    {
      label: 'HOME',
      value: CONSTANT_ADDRESS_TYPES.HOME
    },
    {
      label: 'HEADQUARTERS',
      value: CONSTANT_ADDRESS_TYPES.HEADQUARTERS
    },
    {
      label: 'WAREHOUSE',
      value: CONSTANT_ADDRESS_TYPES.WAREHOUSE
    },
    {
      label: 'SHOP',
      value: CONSTANT_ADDRESS_TYPES.SHOP
    }
  ]
}

/** END ADDRESS */

/** CONTACT */

const CONSTANT_CONTACT_TYPES = {
  PHONE: '0',
  MOBILE: '1',
  FAX: '2',
  EMAIL: '3',
  WEBSITE: '4'
}

export const CONSTANT_CONTACT = {
  EVENTS: {
    ADD_NEW: 'CONTACT-ADD-NEW-1237843',
    EDIT: 'CONTACT-EDIT-78978797',
    DELETE: 'CONTACT-DELETE-47839274'
  },
  TYPES: {
    PHONE: CONSTANT_CONTACT_TYPES.PHONE,
    MOBILE: CONSTANT_CONTACT_TYPES.MOBILE,
    FAX: CONSTANT_CONTACT_TYPES.FAX,
    EMAIL: CONSTANT_CONTACT_TYPES.EMAIL,
    WEBSITE: CONSTANT_CONTACT_TYPES.WEBSITE
  },
  TYPES_SELECT: [
    {
      label: 'PHONE',
      value: CONSTANT_CONTACT_TYPES.PHONE
    },
    {
      label: 'MOBILE',
      value: CONSTANT_CONTACT_TYPES.MOBILE
    },
    {
      label: 'FAX',
      value: CONSTANT_CONTACT_TYPES.FAX
    },
    {
      label: 'EMAIL',
      value: CONSTANT_CONTACT_TYPES.EMAIL
    },
    {
      label: 'WEBSITE',
      value: CONSTANT_CONTACT_TYPES.WEBSITE
    }
  ]
}

/** END CONTACT */

/** BANK ACCOUNT */

export const CONSTANT_BANK_ACCOUNT = {
  EVENTS: {
    ADD_NEW: 'BANK-ACCOUNT-ADD-NEW-785421',
    EDIT: 'BANK-ACCOUNT-EDIT-78674531231',
    DELETE: 'BANK-ACCOUNT-DELETE-12342211'
  },
  TYPES_SELECT: [
    {
      value: 'RAIFFEISEN_BANK',
      label: 'RAIFFEISEN BANK'
    },
    {
      value: 'CREDIT_AGRICOLE',
      label: 'CRÉDIT AGRICOLE'
    }
  ]
}

/** END BANK ACCOUNT */

/** USERS */

export const CONSTANT_USERS = {
  EVENTS: {
    ADD_NEW: 'USER-ADD-NEW-1231657',
    EDIT: 'USER-EDIT-5654545245',
    DELETE: 'USER-DELETE-24765214625',
    SELECTED_ONE: 'USER-SELECTED-ONE-142987412879',
    RESET_PASSWORD: 'RESET-PASSWORD-12312312514',
    CHANGE_PASSWORD: 'CHANGE-PASSWORD-56454116541'
  }
}

/** WAREHOUSE */

export const WAREHOUSE_TYPES = {
  WHOLESALE : 1,
  RETAIL: 2
}

export const CONSTANT_WAREHOUSE = {
  EVENTS: {
    SELECTED_ONE: 'WAREHOUSE-SELECTED-ONE-125479545',
    SELECT_ITEM: 'WAREHOUSE-SELECT-ITEM-213214161',
    ADD_NEW: 'WAREHOUSE-ADD-NEW-654654564645',
    EDIT: 'WAREHOUSE-EDIT-75763273',
    TAB_CHANGE: 'WAREHOUSE-TAB-CHANGE-345136465',
    TRANSFER_FORM_EDIT: 'WAREHOUSE-TRANSFER-FORM-EDIT-2154521051',
    TRANSFER_FORM_DELETE: 'WAREHOUSE-TRANSFER-FORM-DELETE-70870740521'
  },
  TYPES: WAREHOUSE_TYPES,
  TYPES_SELECT: [
    {
      value: `${WAREHOUSE_TYPES.WHOLESALE}`,
      label: 'WHOLESALE'
    },
    {
      value: `${WAREHOUSE_TYPES.RETAIL}`,
      label: 'RETAIL'
    }
  ]
}

/** CALCULATION */

export enum DISCOUNT_SURCHARGE {
  DISCOUNT,
  SURCHARGE
}

export enum DISCOUNT_SURCHARGE_TYPE {
  FINANCE,
  PERCENT
}

export const CONSTANT_CALCULATION = {
  TYPES: {
    ITEM_FORM: {
      FINANCE_NO_VAT: 1,
      FINANCE_WITH_VAT: 2,
      PRICE_NO_VAT: 4,
      PRICE_WITH_VAT: 8
    },
  },
  TYPES_SELECT: {
    ITEM_FORM_SETTINGS: [
      {
        label: 'Finance no vat',
        value: 1
      },
      {
        label: 'Finance with vat',
        value: 2
      },
      /*  {
          label: 'Price no vat',
          value: 4
        },
         {
          label: 'Price with vat',
          value: 8
        }*/
    ],
    CALCULATION_STATUS: [
      {
        label: 'ALL',
        value: '0'
      },
      {
        label: 'OPEN',
        value: '1'
      },
      {
        label: 'SAVED',
        value: '2'
      },
      {
        label: 'BOOKED',
        value: '3'
      },
    ]
  },
  STATUS: {
    OPENED: 1,
    SAVED: 2,
    BOOKED: 3,
    VOID: 4,
    VALIDATE: 5,
    RECALCULATE: 6
  },
  EVENTS: {
    HEADER: {
      INVOICE_EXPENSE_ADD: 'CALCULATION_HEADER_FORM_INVOICE_EXPENSE_ADD_ONE',
      INVOICE_EXPENSE_REMOVE: 'CALCULATION_HEADER_FORM_INVOICE_EXPENSE_REMOVE_ONE',
      DUE_DATES_ADD: 'CALCULATION_HEADER_FORM_DUE_DATES_ADD_ONE',
      DUE_DATES_REMOVE: 'CALCULATION_HEADER_FORM_DUE_DATES_REMOVE_ONE',
      EXTRA_EXPENSE_ADD: 'CALCULATION_HEADER_FORM_EXTRA_EXPENSE_ADD_ONE',
      EXTRA_EXPENSE_REMOVE: 'CALCULATION_HEADER_FORM_EXTRA_EXPENSE_REMOVE_ONE',
      EXTRA_EXPENSE_TAX_ADD: 'CALCULATION_HEADER_FORM_EXTRA_EXPENSE_TAX_ADD_ONE',
      EXTRA_EXPENSE_TAX_REMOVE: 'CALCULATION_HEADER_FORM_EXTRA_EXPENSE_TAX_REMOVE_ONE',
      INVOICE_TAX_ADD: 'CALCULATION_HEADER_FORM_INVOICE_TAX_ADD_ONE',
      INVOICE_TAX_REMOVE: 'CALCULATION_HEADER_FORM_INVOICE_TAX_REMOVE_ONE',
      CHANGE_CLICK_EVENT_HEADER_PARTS: 'CALCULATION_HEADER_CLICK_EVENT_PARTS'
    },
    ITEMS: {
      ACTION_CHANGE_ITEM_FORM_TYPE: 'CALCULATION_ITEM_FORM_CHANGE_TYPE'
    }
  },
}

export const PAGINATION = {
  EVENTS: {
    PAGINATION_PAGE_CHANGED: 'pagination-button-changed-123',
    PAGINATION_PAGE_MOVE_UP_DOWN: 'pagination-page-move-up-down-2321431',
    PAGINATION_PAGE_CHANGE_PER_PAGE: 'pagination-page-change-per-page-2321431'
  }
}

export const CONSTANT_INVOICE = {
  STATUS: {
    OPENED: 1,
    SAVED: 2,
    CANCELED: 3
  },
  TYPE: {
    DEFAULT_DISCOUNT: {
      NOT_ACTIVE: 0,
      ACTIVE: 1
    }
  },
  EVENTS: {
    HEADER: {
      DUE_DATES_ADD: 'INVOICE_DUE_DATES_ADD_ONE',
      DUE_DATES_REMOVE: 'INVOICE_DUE_DATES_REMOVE_ONE',
      EXTRA_EXPENSE_ADD: 'INVOICE_EXTRA_EXPENSE_ADD_ONE',
      EXTRA_EXPENSE_REMOVE: 'INVOICE_EXTRA_EXPENSE_REMOVE_ONE',
      EXTRA_EXPENSE_TAX_ADD: 'EXTRA_EXPENSE_TAX_ADD_ONE',
      EXTRA_EXPENSE_TAX_REMOVE: 'EXTRA_EXPENSE_TAX_REMOVE_ONE'
    },
    ITEMS: {
      ACTION_CHANGE_ITEM_FORM_TYPE: 'INVOICE_ITEM_FORM_CHANGE_TYPE'
    }
  },
  TYPES_SELECT: {
    STATUS: [
      {
        label: 'ALL',
        value: '0'
      },
      {
        label: 'OPEN',
        value: '1'
      },
      {
        label: 'SAVED',
        value: '2'
      },
      {
        label: 'CANCELED',
        value: '3'
      },
    ]
  }
}

export const CONSTANT_FINANCE_TRANSFER_DOCUMENT = {
  STATUS: {
    DELETED: 3,
    ACTIVE: 2,
  },
  FLAG: {
    IN: 0,
    OUT: 1
  },
  TYPES_SELECT: {
    STATUS: [
      {
        label: 'ALL',
        value: '0'
      },
      {
        label: 'SAVED',
        value: '2'
      },
      {
        label: 'CANCELED',
        value: '3'
      },
    ],
    FLAG: [
      {
        label: 'ALL',
        value: ''
      },
      {
        label: 'IN',
        value: '0'
      },
      {
        label: 'OUT',
        value: '1'
      }
    ]
  }
}

export const CONSTANT_SALE = {
  PAYMENTS_TYPES : {
    CASH : 0,
    CARD : 1,
    CHEQUE : 2
  },
  EVENTS: {
    SALE_KEYBOARD_KEY_EVENT: 'key-event',
    SALE_REMOVE_ITEM : 'SALE_REMOVE_ITEM',
    SALE_EDIT_PRICE: 'SALE_EDIT_PRICE',
    SALE_EDIT_QUANTITY: 'SALE_EDIT_QUANTITY',
    SALE_CLEAR_RECEIPT: 'SALE_CLEAR_RECEIPT',
    SALE_REMOVE_PAYMENT : 'SALE_REMOVE_PAYMENT'
  }
}

export const CONSTANT_BANK_TRANSACTION = {
  TYPES: {
    TRANSACTION_TYPE: {
      OWES: 0,
      CLAIMS: 1
    }
  }
}

/** CUSTOMER */

export const CONSTANT_WAREHOUSE_TRANSFER = {
  STATUS: {
    OPENED: 1,
    SAVED: 2,
    CANCELED: 3
  },
  TYPES_SELECT: {
    WORK_ORDER_STATUS: [
      {
        label: 'ALL',
        value: '0'
      },
      {
        label: 'OPEN',
        value: '1'
      },
      {
        label: 'SAVED',
        value: '2'
      },
      {
        label: 'CANCELED',
        value: '3'
      },
    ]
  },
}

export const CONSTANT_PROFORMA_INVOICE = {
  STATUS: {
    OPENED: 1,
    SAVED: 2,
    CANCELED: 3
  },
  TYPES_SELECT: {
    WORK_ORDER_STATUS: [
      {
        label: 'ALL',
        value: '0'
      },
      {
        label: 'OPEN',
        value: '1'
      },
      {
        label: 'SAVED',
        value: '2'
      },
      {
        label: 'CANCELED',
        value: '3'
      },
    ]
  },
}

export const CONSTANT_CLIENT = {
  EVENTS: {
    CLIENT_UPLOAD_LOGO: 'CLIENT_UPLOAD_LOGO_20546026045'
  }
}

export const CONSTANT_PRODUCTION_ORDER = {
  TYPES_SELECT: {
    STATUS: [
      {
        label: 'ALL',
        value: '0'
      },
      {
        label: 'OPENED',
        value: '1'
      },
      {
        label: 'IN_PROGRESS',
        value: '2'
      },
      {
        label: 'FINISHED',
        value: '3'
      },
      {
        label: 'DELETED',
        value: '4'
      },
    ]
  },
}

export const CONSTANT_SETTINGS = {
  EVENTS: {
    CATEGORY: {
      EDIT_CATEGORY: 'SETTINGS-CATEGORY-EDIT-ONE-4207070774',
      DELETE_CATEGORY: 'SETTINGS-CATEGORY-DELETE-ONE-51556569',
      MOVE_CATEGORY: 'SETTINGS-CATEGORY-MOVE-ONE-544654645610245'
    }
  }
}