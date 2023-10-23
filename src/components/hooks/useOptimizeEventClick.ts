import React from 'react'

/**
 * data-action = 'string like: delete, add ....'
 * data-action-id= 'id of data'
 * data-action-param='addition-param-that can be handle'
 *
 * data-action-root = last point up to event valid
 *
 *
 */

export const ATTRIBUTE_DATA_SUB_ACTION = 'data-sub-action'
export const ATTRIBUTE_DATA_ACTION = 'data-action'
export const ATTRIBUTE_DATA_ACTION_ID = 'data-action-id'
export const ATTRIBUTE_DATA_ACTION_PARAM = 'data-action-param'
export const ATTRIBUTE_DATA_ACTION_ROOT = 'data-action-root'
export const ATTRIBUTE_TABLE_ACTION_ROW = 'table-param-row'
export const ATTRIBUTE_TABLE_ACTION_COLUMN = 'table-param-column'

export interface IUseOptimizeEventData {
  event: React.MouseEvent<HTMLTableSectionElement>,
  action: string
  subAction: string
  id?: string
  param?: string,
  row?: string,
  column?: string
}

export interface IUseOptimizeEventClickProps {
  eventHandler: (data: IUseOptimizeEventData)=> void,
  stopPropagation?: boolean
}

/** use optimize event click is used to handle all events on one place
 *
 *  action is defined as data-action
 *
 *
 * **/

export const useOptimizeEventClick = ({eventHandler, stopPropagation}: IUseOptimizeEventClickProps) => {

  const onClickHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (stopPropagation) {
      event.stopPropagation()
      event.preventDefault()
    }

    const object = {
      action: undefined,
      id: undefined,
      param: undefined,
      event: event
    } as Partial<IUseOptimizeEventData>
    let target: HTMLElement | null = event.target as HTMLSelectElement
    while (target) {
      if (target.hasAttribute(ATTRIBUTE_DATA_ACTION)) {
        if (object.action) {
          /** if object action exists then it is another action and search is stop */
          break
        }
        object.action = target.getAttribute(ATTRIBUTE_DATA_ACTION) as string
      }
      target.hasAttribute(ATTRIBUTE_DATA_SUB_ACTION) && !object.id && (object.subAction = target.getAttribute(ATTRIBUTE_DATA_SUB_ACTION) as string)
      target.hasAttribute(ATTRIBUTE_DATA_ACTION_ID) && !object.id && (object.id = target.getAttribute(ATTRIBUTE_DATA_ACTION_ID) as string)
      target.hasAttribute(ATTRIBUTE_DATA_ACTION_PARAM) && !object.param && (object.param = target.getAttribute(ATTRIBUTE_DATA_ACTION_PARAM) as string)
      target.hasAttribute(ATTRIBUTE_TABLE_ACTION_COLUMN) && !object.column && (object.column = target.getAttribute(ATTRIBUTE_TABLE_ACTION_COLUMN) as string)
      target.hasAttribute(ATTRIBUTE_TABLE_ACTION_ROW) && !object.row && (object.row = target.getAttribute(ATTRIBUTE_TABLE_ACTION_ROW) as string)

      if (target.hasAttribute(ATTRIBUTE_DATA_ACTION_ROOT)) {
        event.preventDefault()
        event.stopPropagation()
        break
      }
      target = target.parentElement

    }
    object.action && eventHandler && eventHandler(object as IUseOptimizeEventData)
  }

  return {
    onClickHandler
  }
}

/**
 * function search attribute 'mouse-click-controlled-area'  in parent structure of clicked html element
 * and if find it return true
 * @param event
 * @constructor
 * @return true/false depends if element is found or not
 */
export const MouseEventIsControlledArea = (eventMouse: any, value: string) => {
  let target: HTMLElement | null = eventMouse.target as HTMLElement
  while (target) {
    if (target.hasAttribute('mouse-click-controlled-area')) {
      const val = target.getAttribute('mouse-click-controlled-area')
      if (value === val) {
        return true
      }
    }
    target = target.parentElement
  }
  return false
}
