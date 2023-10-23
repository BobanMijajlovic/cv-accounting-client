import { IUseValidation } from 'react-hook-custom-validation'
import * as _             from 'lodash'

const parseError = (error : any) => {
  if (!error?.extensions?.exception) {
    return 'Unknown Error'
  }
  const data : any = {}
  const err = error.extensions.exception
  for (const [, value] of Object.entries(err)) {
    if (Array.isArray(value) && value.length > 0) {
      value.forEach(e => {
        if (!e.property || !e.constraints) {
          return
        }
        data[e.property] = Object.values(e.constraints)[0]
      })
    }
  }

  if (Object.keys(data).length === 0) {
    return error.message ? error.message : {}
  }

  return data
}

export const parseGQError = (errorGQ : any) => {
  if (!errorGQ.graphQLErrors || !Array.isArray(errorGQ.graphQLErrors) || errorGQ.graphQLErrors.length === 0) {
    return errorGQ.message ? errorGQ.message : 'Unknown Error'
  }
  return parseError(errorGQ.graphQLErrors[0])
}

export const processError = (error : any, validation ?: IUseValidation<any>) => {
  const err = parseGQError(error)
  if (typeof err === 'string') {
    return err
  }
  let evenOne = false
  if (validation) {
    const state = validation.state
    for (const [key, value] of Object.entries(err)) {
      if (!_.has(state, key)) {
        continue
      }
      validation.setFieldError(key, value as string)
      evenOne = true
    }
  }
  if (!evenOne && error.message === 'GraphQL error: Argument Validation Error') {
    const message = Object.values(err)?.[0]
    if (message) {
      return message
    }
  }
    /** **/
  if (!evenOne) {
    return error.message ? error.message : 'Unknown Error'
  }
  return void(0)
}
