import React, {
  useEffect,
  useRef
}                 from 'react'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBackspace,
  faCreditCard
}                        from '@fortawesome/free-solid-svg-icons'
import {faMoneyBillAlt}  from '@fortawesome/free-solid-svg-icons/faMoneyBillAlt'
import {faMoneyCheck}    from '@fortawesome/free-solid-svg-icons/faMoneyCheck'

interface IKeySubTitle {
  label : string,
  position : 'left-down' | 'right-down' | 'right-top' | 'left-top'
  icon ?: IconProp
}

interface IKeyProps {
  label : string,
  value ?: string,
  icon ?: IconProp,
  className ?: string,
  subTitle ?: IKeySubTitle[]
}

const Key = ({subTitle, label, value, icon, className} : IKeyProps) => {

  return (
    <div
            className={`relative key d-flex justify-content-center align-items-center${className ? ` ${className}` : ''}`}
            data-action='key-event' data-action-id={value || label}>
      {icon ?
        <FontAwesomeIcon icon={icon as IconProp}/>
        :
        <span>{label}</span>
      }
      {subTitle ? subTitle.map((sub, index) => <small key={index}
                                                        className={`absolute-${sub.position} font-smaller-6 text-upper m-1`}>{!sub.icon ? sub.label :
          <FontAwesomeIcon icon={sub.icon}/>}</small>) : <></>}
    </div>

  )
}

export interface IKeyboardProps {
  onClick ? : (e : any) => void
  disablePaymentsButtons ?: boolean
}

const KeyboardPayment = ({onClick,disablePaymentsButtons} : IKeyboardProps) => {
  const rootProps = Object.assign({}, onClick ? {onClick} : {})

  const keyboardRef = useRef(null)

  useEffect(() => {
    if (keyboardRef.current) {
      (keyboardRef.current as any).focus()
    }
  },[keyboardRef])

  return (
    <div className={'keyboard  p-2 m-2'} data-action-root  {...rootProps} ref={keyboardRef}>

      <div className={'d-flex justify-content-left'}>
        {['7', '8', '9',].map((x) => <Key
                    className={'font-bigger-12 color-header-gradient font-weight-400 mx-1 color-primary'} key={x}
                    label={x}/>)}
        <Key label={'delete'}
                     icon={faBackspace}
                     className={'half-double-key mx-1 mr-2 color-danger background-danger border-color-danger '}
                     subTitle={[
                       {
                         label: 'delete',
                         position: 'left-down'
                       },
                       {
                         label: 'backspace',
                         position: 'right-top'
                       }
                     ]}
        />
      </div>
      <div className={'d-flex mt-2 justify-content-left'}>
        {['4', '5', '6'].map((x) => <Key
                    className={'font-bigger-12 color-header-gradient font-weight-400 mx-1 color-primary'} key={x}
                    label={x}/>)}
        <Key label={'CASH'}
                     icon={faMoneyBillAlt}
                     className={`half-double-key mx-1 mr-2 color-primary border-color-primary color-header-gradient${disablePaymentsButtons ? ' disabled' : ''}`}
                     subTitle={[
                       {
                         label: 'CASH',
                         position: 'left-down',
                       },
                       {
                         label: 'F2',
                         position: 'right-top'
                       }
                     ]}
        />
      </div>
      <div className={'d-flex mt-2 justify-content-left'}>
        {['1', '2', '3'].map((x) => <Key
                    className={'font-bigger-12 font-weight-400 color-header-gradient mx-1 color-primary  color-header-gradient '}
                    key={x} label={x}/>)}
        <Key label={'CARD'}
                     icon={faCreditCard}
             className={`half-double-key mx-1 mr-2 color-primary border-color-primary color-header-gradient${disablePaymentsButtons ? ' disabled' : ''}`}
             subTitle={[
               {
                 label: 'CARD',
                 position: 'left-down',
               },
               {
                 label: 'F3',
                 position: 'right-top'
               }
             ]}
        />
      </div>
      <div className={'d-flex mt-2 justify-content-left'}>
        {['0', '00', '.'].map((x) => <Key
                    className={'font-bigger-12 color-header-gradient font-weight-400 mx-1 color-primary'} key={x}
                    label={x}/>)}
        <Key label={'CHEQUE'}
                     icon={faMoneyCheck}
                     className={`half-double-key mx-1 mr-2 color-primary border-color-primary color-header-gradient${disablePaymentsButtons ? ' disabled' : ''}`}
                     subTitle={[
                       {
                         label: 'CHEQUE',
                         position: 'left-down',
                       },
                       {
                         label: 'F4',
                         position: 'right-top'
                       }
                     ]}
        />
      </div>
    </div>
  )
}

export default KeyboardPayment
