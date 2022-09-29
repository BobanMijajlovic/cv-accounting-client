import React                from 'react'
import {TItemSupplier}      from '../../../../graphql/type_logic/types'
import {FontAwesomeIcon}    from '@fortawesome/react-fontawesome'
import {
  faBarcode,
  faTimes,
  faUsersCog
}                                 from '@fortawesome/free-solid-svg-icons'
import ConditionalRendering       from '../../../../components/Util/ConditionalRender'
import {CONSTANT_ITEM}            from '../../../constants'
import ButtonShortcut             from '../../../../components/Button/ButtonShortcut'
import {KeyboardEventCodes}       from '../../../../components/hooks/useExternalKeybaord'
import EmptyTag                   from '../../../../components/Util/EmptyTag'
import {faEdit}                   from '@fortawesome/free-regular-svg-icons'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'

interface ISuppliersCodesProps {
  itemSuppliers ?: TItemSupplier[]
  notShowAddButton ?: boolean
  notShowEditButton ?: boolean
}

const SuppliersCodes = ({itemSuppliers, notShowAddButton, notShowEditButton} : ISuppliersCodesProps) => {

  const {translate} = useTranslationFunction()

  return (
    <div className={'m-2 text-upper letter-spacing'}>
      <div className={'d-flex flex-column mb-2'}>
        <div className={'d-flex justify-content-between mb-1 color-primary'}>
          <div className={'d-flex font-smaller-2 align-items-center '}>
            <div className={'pr-2'}><FontAwesomeIcon icon={faUsersCog}/></div>
            <div className={'text-upper'}>{translate('ITEMS_SUPPLIERS_CODES_LABEL')}</div>
          </div>
          <ConditionalRendering condition={!notShowAddButton}>
            <div data-action={CONSTANT_ITEM.EVENTS.ADD_SUPPLIER_CODE}>
              <ButtonShortcut
                  icon={faBarcode}
                  label={translate('SMALL_BUTTON_ADD')}
                  shortcut={KeyboardEventCodes.F6}
                  classNames={'hw-shortcut-button primary sm hw-button-border-color mr-2'}
              />
            </div>
          </ConditionalRendering>
        </div>
        <div className={'border-top-double'}>
          <ConditionalRendering condition={!itemSuppliers || itemSuppliers.length === 0}>
            <div className={'m-8 p-8'} style={{minWidth: '300px'}}>&nbsp;</div>
          </ConditionalRendering>
          <table data-action-root className={'w-100'}>
            <tbody>
              {itemSuppliers && itemSuppliers.map((itemSupplier : TItemSupplier, index : number) => {
                const id = itemSupplier.id ? itemSupplier.id : index
                return (
                  <tr
                      key={id}
                      className={`font-weight-300 border-bottom${index % 2 === 1 ? ' row-odd' : ' row-even'}`}
                  >
                    <td style={{minWidth: 70}}>
                      <div className={'py-2 d-flex flex-column'}>
                        <div className={'px-1 font-smaller-2 font-weight-600'}>
                          {
                            itemSupplier.supplier && itemSupplier.supplier?.shortName  && itemSupplier.supplier.shortName.length > 0
                              ? <EmptyTag model={itemSupplier.supplier} field={'shortName'} placeholder={translate('LABEL_SHORT_NAME')}/>
                              : <EmptyTag model={itemSupplier.supplier} field={'fullName'} maxLength={32} placeholder={translate('LABEL_SHORT_NAME')}/>
                          }
                        </div>
                      </div>
                    </td>
                    <td className={'px-1 font-smaller-1 relative'}>
                      <div className={'font-smaller-8 font-weight-600 text-left opacity-4 absolute-left-top'}>{translate('CODE')}</div>
                      {itemSupplier.code}
                    </td>
                    <td style={{width: 50}}>
                      <div className={'d-flex justify-content-between align-items-center'}>
                        <ConditionalRendering condition={!notShowEditButton}>
                          <div className={'px-1 button-effect '}
                                                     data-action={CONSTANT_ITEM.EVENTS.EDIT_SUPPLIER_CODE}
                                                     data-action-id={id}
                          >
                            <FontAwesomeIcon className={'color-primary'} icon={faEdit}/>
                          </div>
                        </ConditionalRendering>
                        <div className={'px-1 button-effect'}
                                                 data-action={CONSTANT_ITEM.EVENTS.DELETE_SUPPLIER_CODE}
                                                 data-action-id={id}
                        >
                          <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SuppliersCodes
