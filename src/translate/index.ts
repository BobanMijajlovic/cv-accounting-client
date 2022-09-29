import creds                 from './DealTransalte.json'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import fs                    from 'fs'
import util                  from 'util'
import { translate }         from '../application/constants/translate'
import { set as _set }       from 'lodash'

const googleSheetID = '1LIGZli7H1EJHd7ar0XOvPy2zMcOUwkxVPnGIdfbnraM'
const translateFilePath = 'src/application/constants/_translate.ts'
const _translateFilePath = 'src/application/constants/translateNew.ts'

const translatesKeysGoogleSheets = async () => {
  const doc = new GoogleSpreadsheet(googleSheetID)
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[1]
  const rows = await sheet.getRows()
  return  rows.map((x) => {
    return {
      key: x.key
    }
  })
}

const addTranslateKeys = async (data: any) => {
  const doc = new GoogleSpreadsheet(googleSheetID)
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[1]
  const rows = await sheet.getRows()
  const newMap = [] as any
  await data.forEach((x:any) => {
    const index = rows.findIndex((y:any) => y.key === x.key)
    if (index === -1) {
      newMap.push( {
        key: x.key
      })
    }
  })
  console.log('test')
 /* if (newMap.length !== 0 ) {
    await sheet.addRows(newMap)
  }*/
}

const generateFile = async () => {
  const keys = await translatesKeysGoogleSheets()
  const object = {} as any
  keys.forEach((x) => {
    const arr = x.key.split('.')
    if (arr.length !== 0) {
      let path = ''
      arr.forEach((p:any) => {
        path += path.length !== 0 ? `.${p}` : `${p}`
      })
      _set(object,path,x.key)
    }
  })

  const data = util.inspect(object, false, 100, false)
  let file = 'export const _translate = '
  file += data
  fs.writeFileSync(_translateFilePath,  file)
}

const addTranslateConstantsToGoogleSheet = async () => {
  const arr:any = []
  const obj:any = translate
  if (typeof translate !== 'object') {
    return 
  }
  const func = (_obj:any) =>  {
    for (const key in _obj) {
      const child = _obj[key]
      if (typeof child !== 'object') {
        arr.push(child)
      } else {
        func(child)
      }     
    }
  }
  await func(obj)
  /** insert into google sheets */
  const rows = arr.map((x:any) => {
    return {
      key: x
    }
  })
  await addTranslateKeys(rows)
}

generateFile()
  .then()
  .catch((e) => {
    console.log(e)
  })
/*
addTranslateConstantsToGoogleSheet()
  .then()*/

