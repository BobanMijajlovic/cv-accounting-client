/* eslint-disable @typescript-eslint/type-annotation-spacing */
import React, {useEffect} from 'react'
import {useTranslation}   from './useTranslation'

interface ITranslationProps {
  translationKey: string
}

const TranslationDiv = (props: ITranslationProps) => {
  const {translationKey, ...rest} = props
  const {translated} = useTranslation(translationKey)
  useEffect(() => {
    console.log('translated ', translated)
  })
  return <div {...rest}>{translated}</div>
}

export default TranslationDiv
