export const STORAGE_TABLE_SETTINGS = 'hwt_table_settings_width_visible'
export const STORAGE_CALCULATION_TEMP = 'hwt_deal_calculation_temp_74983274983274'
export const STORAGE_APPLICATION_SETTINGS = 'hwt_deal_application_settings'
export const STORAGE_CURRENT_RECEIPT = 'hw_deal_current_receipt_temp_565817654649'
export const STORAGE_APPLICATION_CURRENCIES = 'hw_deal_application_currencies'

export class LocalStorage {

  static getData = (storage : string, suffix ?: string) => {
    if (suffix) {
      storage = `${storage}-${suffix}`
    }
    const data = localStorage.getItem(storage)
    if (!data) {
      return
    }
    try {
      const jsonObj = JSON.parse(data)
      if (!jsonObj) {
        return undefined
      }
      return jsonObj
    } catch (e) { /** some error */ }
    return undefined

  }

  static saveData = (data : any, storage : string, suffix ?: string) => {
    if (suffix) {
      storage = `${storage}-${suffix}`
    }
    localStorage.setItem(storage, JSON.stringify(data))
  }
}

