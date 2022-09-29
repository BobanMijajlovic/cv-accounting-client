import React, {
    useEffect,
    useMemo,
    useState
}                               from 'react'
import {
    FORMAT_CURRENCY_STANDARD,
    IFieldsRefs,
    minLength,
    required,
    useValidation
}                               from '../../../../validation'
import {
    TItem,
    TItemImages,
    TItemsCategory
}                               from '../../../../graphql/type_logic/types'
import InputTextWithValidation  from '../../../../components/withValidation/InputTextWithValidation'
import SelectTextWithValidation from '../../../../components/withValidation/SelectTextWithValidation'
import {faArrowLeft}            from '@fortawesome/free-solid-svg-icons'
import {
    formatPrice,
    toNumberFixed
}                               from '../../../utils/Utils'
import * as _                   from 'lodash'
import {processErrorGraphQL}    from '../../../../apollo'
import {useTranslationFunction} from '../../../../components/Translation/useTranslation'
import {useVats}                from '../../../../store/vats/useVats'
import {
    LocalStorage,
    STORAGE_APPLICATION_SETTINGS
}                               from '../../../utils/LocalStorage'
import {CONSTANT_UNITS}         from '../../../constants'
import {Button}                 from '../../../../components/Button'
import ItemCategoryTreeView     from './ItemCategoryTreeView'
import ItemImagesPart           from './ItemImagesPart'
import {ICategoryTreeView}      from '../../../../store/category/useCategory'
import {
    KeyboardEventCodes,
    useExternalKeyboard
}                               from '../../../../components/hooks/useExternalKeybaord'
import {SpinnerLoadingTimer}    from '../../../../components/Spinner/SpinnerLoading'

type TItemAdvance = TItem & {
    categoryId?: string
    images?: TItemImages[]
    imagesTmp?: File[]
    imagesTmpUrl?: string[]
}

interface IItemFormOnePageProps {
    item?: TItem
    cancelFun: () => void
    submitFun: (item: TItem, callback?: () => void, errorFn ?: (e: any) => void) => Promise<any> | void
}

const ItemFormOnePage = ({item, cancelFun, submitFun}: IItemFormOnePageProps) => {

    const {translate} = useTranslationFunction()
    const [treeView, setTreeView] = useState({} as ICategoryTreeView)
    const [loading, setLoading] = useState(true as boolean)
    const validation = useValidation<TItemAdvance>()

    const {setFieldValue, state, getFieldRef} = validation
    const settings = LocalStorage.getData(STORAGE_APPLICATION_SETTINGS)

    const unitsOptions = useMemo(() => settings && settings.units ? settings.units.map((x: string) => {
        const label = Object.keys(CONSTANT_UNITS).find(key => (CONSTANT_UNITS as any)[key] === Number(x))
        return {
            label: `${label}`,
            value: `${x}`
        }
    }) : [], [settings])

    useEffect(() => {
        if (!item) {
            setFieldValue('vp', '1.00', false)
            setFieldValue('mp', '1.00', false)
        } else {

            if (item.vp) {
                setFieldValue('vp', formatPrice(item.vp as any), false)
            }

            if (item.mp) {
                setFieldValue('mp', formatPrice(item.mp as any), false)
            }

            if (item.itemsCategories) {
                const categories = _.get(item, 'itemsCategories', []) as TItemsCategory[]
                const checked = categories ? [`${categories[0].categoryId}`] : void (0)
                setTreeView({
                    ...treeView,
                    checked: checked
                })
            }

            if (_.get(item, 'images')) {
                const imagesUrl = (item.images as any).map((x: any) => x.url)
                setFieldValue('imagesTmpUrl', imagesUrl as any, true)
            }

            ['uom', 'barCode', 'code', 'shortName', 'fullName', 'taxId'].forEach((s: string) => _.get(item, s) ? setFieldValue(s, _.get(item, s).toString(), false) : null)
        }
    }, [item, setFieldValue, setTreeView])

    const {data} = useVats()

    const vatsOptions = React.useMemo(() => {
        let vatData: any = []
        if (data) {
            vatData = data.map((vat: any) => {
                const vatValue = vat.values[0]
                return {
                    label: `${vat.short} ${formatPrice(vatValue.value)} %`,
                    value: `${vat.id}`
                }
            })
        }
        return [
            {
                label: 'Tax %',
                value: ''
            },
            ...vatData
        ]
    }, [data])

    const changeImage = (file: any) => {
        setFieldValue('imagesTmp', [file] as any, false)
        setFieldValue('imagesTmpUrl', [URL.createObjectURL(file)] as any, false)

    }

    const handlerOnSubmit = async () => {
        const {error, data, validations, refs} = await validation.validate()
        if (error) {
            const fieldRef: IFieldsRefs | undefined = refs.find(({field}) => _.get(validations, `validations.${field}.error`))
            fieldRef && fieldRef.ref.current.focus()
            return
        }
        try {
            const obj = Object.assign({}, {
                    ..._.omit(data, ['imagesTmp', 'imagesTmpUrl', 'images']),
                    vp: toNumberFixed(data.vp as any),
                    mp: toNumberFixed(data.mp as any),
                    code: Number(data.code),
                    taxId: Number(data.taxId),
                    uom: Number(data.uom)
                },
                state.imagesTmp && state.imagesTmp.length !== 0 ? {image: (state.imagesTmp as any)[0]} : {},
                (treeView as any).checked ? {categoryId: Number((treeView as any).checked[0])} : {}) as TItem
            const errorFn = (e: any) => {
                processErrorGraphQL(e, validation)
            }
            await submitFun(obj, cancelFun, errorFn)

        } catch (e) {
            /** process the error */
            processErrorGraphQL(e, validation)
        }
    }

    const handlerChangeChecked = (checked: string[]) => {
        setTreeView({
            ...treeView,
            checked
        })
    }

    const handlerChangeExpanded = (expanded: string[]) => {
        setTreeView({
            ...treeView,
            expanded
        })
    }

    const handlerClickTreeView = (node: any) => {
        if (!node || !node.value) {
            return
        }
        setTreeView({
            ...treeView,
            checked: [node.value]
        })
    }

    const {setRef, ref} = useExternalKeyboard((e: KeyboardEvent) => {
        switch (e.key) {
            case KeyboardEventCodes.Esc:
                cancelFun()
                return
            case KeyboardEventCodes.F12:
                handlerOnSubmit().then()
                return
        }
    }, true, [KeyboardEventCodes.Esc, KeyboardEventCodes.F12], 'items-one-page-form')

    const handlerTaxChange = () => {
        const fieldRef = getFieldRef('fullName')
        if (fieldRef && fieldRef.ref && fieldRef.ref.current) {
            fieldRef.ref.current.focus()
        }
    }

    const handlerOnClickImage = (e: any) => {
        const target = e.target
        if (target.value.length == 0) {
            const fieldRef = getFieldRef('uom')
            if (fieldRef && fieldRef.ref && fieldRef.ref.current) {
                fieldRef.ref.current.focus()
            }
        }
    }

    return (
        <>
            {loading ? <SpinnerLoadingTimer timer={1200}/> : null}
            <div className={'py-2 hw-item-form-one-page-root'} ref={setRef}>
                <div className={'col-md-12'}>
                    <div className={'d-flex justify-content-between align-items-center pb-2 mb-4 border-bottom-double border-color-blue-light'}>
                        <Button
                            classNames={'text-upper'}
                            label={'BACK'}
                            onClick={cancelFun}
                            outline
                            icon={faArrowLeft}
                            shortcut={'ESC'}
                            color={'danger'}
                        />
                        <div className={'color-primary'}>{item ? 'Edit item' : 'Define new item'}</div>
                        <Button
                            classNames={'text-upper'}
                            label={item ? 'UPDATE' : 'SAVE'}
                            onClick={handlerOnSubmit}
                            outline
                            shortcut={'F12'}
                            color={'primary'}
                        />
                    </div>
                </div>
                <div className={'container'}>
                    <div className={'col-md-4'}>
                        <InputTextWithValidation
                            required
                            disabled={item}
                            align={'align-center'}
                            label={translate('BARCODE')}
                            helperText={translate('HELPER_TEXT_ENTER_BARCODE')}
                            validation={{
                                useValidation: validation,
                                model: 'barCode',
                                rule: {
                                    required: required({message: translate('REQUIRED_FIELD')}),
                                    minLength: minLength({min: 6, message: translate('VALIDATION_MESSAGE_MIN_LENGTH')})
                                },
                                format: {
                                    rule: {
                                        format: '################',
                                        mask: ' ',
                                        validSize: 6
                                    },
                                    validationMessage: translate('ITEM_FORM_VALIDATION_FORMAT_BARCODE')
                                }
                            }}
                            focusOnMount={!item}
                            selectOnFocus
                        />
                    </div>
                    <div className={'col-md-4'}>
                        <InputTextWithValidation
                            align={'align-center'}
                            label={translate('CODE')}
                            helperText={translate('HELPER_TEXT_ENTER_CODE')}
                            validation={{
                                useValidation: validation,
                                model: 'code',
                                format: {
                                    rule: {
                                        format: '########',
                                        mask: ' ',
                                        validSize: 1
                                    },
                                    validationMessage: 'Code is not valid'
                                }
                            }}
                            focusOnMount={item}
                            selectOnFocus={true}
                        />
                    </div>

                    <div className={'col-md-4'}>
                        <SelectTextWithValidation
                            required
                            label={translate('LABEL_TAX')}
                            helperText={translate('HELPER_TEXT_CHOOSE_TAX')}
                            options={vatsOptions}
                            validation={{
                                useValidation: validation,
                                model: 'taxId',
                                rule: {
                                    required: required({message: translate('REQUIRED_FIELD')})
                                }
                            }}
                            onChange={handlerTaxChange}
                        />
                    </div>

                    <div className={'col-md-6'}>
                        <InputTextWithValidation
                            label={translate('LABEL_FULL_NAME')}
                            selectOnFocus
                            helperText={translate('HELPER_TEXT_FULL_NAME')}
                            maxLength={64}
                            validation={{
                                useValidation: validation,
                                model: 'fullName',
                            }}
                        />
                    </div>
                    <div className={'col-md-6'}>
                        <InputTextWithValidation
                            required
                            selectOnFocus
                            label={translate('LABEL_SHORT_NAME')}
                            helperText={translate('HELPER_TEXT_SHORT_NAME')}
                            maxLength={32}
                            validation={{
                                useValidation: validation,
                                model: 'shortName',
                                rule: {
                                    required: required({message: translate('REQUIRED_FIELD')})
                                }
                            }}
                        />
                    </div>
                    <div className={'col-md-3'}>
                        <InputTextWithValidation
                            align={'align-right'}
                            selectOnFocus
                            label={translate('ITEMS_WHOLESALE_PRICE')}
                            helperText={translate('HELPER_TEXT_WHOLESALE_PRICE')}
                            validation={{
                                useValidation: validation,
                                model: 'vp',
                                format: {
                                    rule: {
                                        ...FORMAT_CURRENCY_STANDARD,
                                        ...{
                                            decimalPlace: 2
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className={'col-md-3'}>
                        <InputTextWithValidation
                            align={'align-right'}
                            selectOnFocus
                            label={translate('ITEMS_RETAIL_PRICE')}
                            helperText={translate('HELPER_TEXT_RETAIL_PRICE')}
                            validation={{
                                useValidation: validation,
                                model: 'mp',
                                format: {
                                    rule: {
                                        ...FORMAT_CURRENCY_STANDARD,
                                        ...{
                                            decimalPlace: 2
                                        }
                                    }
                                }
                            }}
                        />
                    </div>

                    <div className={'col-md-3'}>
                        <SelectTextWithValidation
                            required
                            label={translate('LABEL_UNIT_OF_MEASURE')}
                            helperText={translate('HELPER_TEXT_UNIT_OF_MEASURE')}
                            options={unitsOptions}
                            validation={{
                                useValidation: validation,
                                model: 'uom',
                                rule: {
                                    required,
                                }
                            }}
                        />
                    </div>

                    <div className={'col-md-6 pt-4'}>
                        <ItemCategoryTreeView
                            checked={treeView.checked}
                            expanded={treeView.expanded}
                            onClick={handlerClickTreeView}
                            onCheck={handlerChangeChecked}
                            onExpand={handlerChangeExpanded}
                        />
                    </div>

                    <div className={'col-md-6 pt-4'}>
                        <ItemImagesPart onChange={changeImage} onClick={handlerOnClickImage} imagesTmp={state.imagesTmpUrl}/>
                    </div>

                    {/*
          {
            supplier ?
              (
                <div className={'container p-0'}>

                  <div
                    className={'col-md-12 d-flex flex-column justify-content-start font-smaller-2 text-left my-2 color-primary'}>
                    <div className={'px-1 font-bold text-upper'}><EmptyTag model={supplier}
                                                                           field={'shortName'}
                                                                           placeholder={translate('ITEM_LABEL_SUPPLIER_NAME')}/>
                    </div>
                    <small className={'px-1'}><EmptyTag model={supplier} field={'fullName'}
                                                        placeholder={translate('ITEM_LABEL_SUPPLIER_FULL_NAME')}/>
                    </small>
                    <div className={'d-flex flex-column justify-content-between p-1'}>
                      <div className={'d-flex flex-row align-items-center'}>
                        <sub className={'opacity-4'}>{translate('ITEM_LABEL_SUPPLIER_TAX_ID')}&nbsp;:</sub>
                        <div className={'px-1'}><EmptyTag model={supplier} field={'taxNumber'}
                                                          placeholder={'#########'}/>
                        </div>
                      </div>
                      <div className={'d-flex flex-row align-items-center'}>
                        <sub className={'opacity-4'}>{translate('ITEM_LABEL_SUPPLIER_NUM')}&nbsp;:</sub>
                        <div className={'px-1'}><EmptyTag model={supplier}
                                                          field={'uniqueCompanyNumber'}
                                                          placeholder={'#########'}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={'col-md-6'}>
                    <InputTextWithValidation
                      selectOnFocus
                      label={'Supplier Barcode'}
                      helperText={'enter supplier barcode'}
                      validation={{
                        useValidation: validation,
                        model: 'itemSupplier.barCode',
                      }}
                    />
                  </div>

                  <div className={'col-md-6'}>
                    <InputTextWithValidation
                      selectOnFocus
                      label={translate('ITEM_LABEL_SUPPLIER_CODE')}
                      helperText={translate('HELPER_TEXT_ENTER_CODE')}
                      validation={{
                        useValidation: validation,
                        model: 'itemSupplier.code',
                      }}
                    />
                  </div>

                </div>
              ) : null
          }*/}

                    {/* <DialogButtonsSaveUpdate
            cancelFun={() => {}}
            submitFun={handlerOnSubmit}
            update={!!item}
            icon={faPlusCircle}
          />*/}
                </div>
            </div>
        </>

    )
}

export default ItemFormOnePage

