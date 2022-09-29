import React, {
  useEffect,
  useState
}                      from 'react'
import ApolloAsyncCall from '../../graphql/ApolloAsyncCallClass'
import { Translation } from '../../graphql/graphql'

const map = new Map()

export const NOT_FOUND_TRANSLATION = 'NOT FOUND TRANSLATION'

let listeners = [] as any

const $translate = (key: string) => {
  const firstChar = key.charAt(0)
  const m = map.get(firstChar)
  if (!m) {
    return NOT_FOUND_TRANSLATION
  }
  const ts = m.get(key)
  return !ts ? NOT_FOUND_TRANSLATION : ts
}

export const useTranslationFunction = () => {

  const [state, setState] = useState(1)

  const newReferenceTrigger = React.useCallback(() => {
    setState(s => s + 1)
  }, [setState])

  useEffect(() => {
    listeners.push(newReferenceTrigger)
    return () => {
      listeners = listeners.filter((x: any) => x !== newReferenceTrigger)
    }
  }, [newReferenceTrigger])

  const translate = React.useCallback((key: string, capitalize ?: boolean) => {
    const trans = $translate(key)
    return capitalize ? `${trans.charAt(0).toUpperCase()}${trans.slice(1)}` : trans
  }, [state])

  return {
    translate
  }
}

export const useTranslation = (key ?: string) => {

  const [state, setState] = useState(NOT_FOUND_TRANSLATION)

  const newTranslation = React.useCallback(() => {
    const newValue = $translate(key || '')
    key && setState($translate(key))
  }, [key, setState])

  useEffect(() => {
    listeners.push(newTranslation)
    return () => {
      listeners = listeners.filter((f: any) => f !== newTranslation)
    }
  }, [newTranslation])

  useEffect(() => {
    newTranslation()
  }, [newTranslation])

  return {
    translated: state
  }

}

const setTranslationMapObject = (array: Translation[]) => {
  array.forEach(t => {
    const firstChar = t.key.charAt(0)
    let m = map.get(firstChar)
    if (!m) {
      m = new Map()
      map.set(firstChar, m)
    }
    m.set(t.key, t.translation)
  })
}

export const translationGetLanguage = async (lang: string) => {
  let data = await ApolloAsyncCall.getLanguage(lang)
  setTranslationMapObject(data as Translation[])
  listeners.forEach((l: any) => l())
  data = await ApolloAsyncCall.getLanguage(lang, true)
  setTranslationMapObject(data as Translation[])
  listeners.forEach((l: any) => l())
}

