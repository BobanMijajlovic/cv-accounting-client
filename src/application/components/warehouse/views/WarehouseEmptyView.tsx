import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faPlusSquare,
  faWarehouse
}                        from '@fortawesome/free-solid-svg-icons'

import ButtonShortcut from '../../../../components/Button/ButtonShortcut'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                     from '../../../../components/hooks/useExternalKeybaord'

const WarehouseEmptyView = ({addNew} : {addNew : () => void}) => {

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F3:
        addNew()
        return
    }
  }, true, [KeyboardEventCodes.F3], 'warehouse-empty-dashboard')

  return (
    <>
      <div className={'d-flex flex-column justify-content-center align-items-center mt-4'} ref={setRef}>
        <div className={'opacity-4'} style={{fontSize: '160px'}}><FontAwesomeIcon icon={faWarehouse}/></div>
        <div className={'text-upper opacity-3 font-weight-600'} style={{fontSize: '20px'}}>You do not have a defined warehouse, please create one!</div>

        <div className={'mt-4 '}>
          <ButtonShortcut
                        icon={faPlusSquare}
                        onClick={addNew}
                        style={{minWidth: 80}}
                        label={'create new'}
                        shortcut={KeyboardEventCodes.F3}
                        classNames={'hw-shortcut-button-white-version sm hw-button-border-color modern'}
          />
        </div>

      </div>
    </>
  )
}

export default WarehouseEmptyView