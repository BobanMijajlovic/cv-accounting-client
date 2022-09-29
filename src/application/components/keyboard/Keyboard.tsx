import React             from 'react'
import {IconProp}        from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faAsterisk,
  faBackspace,
  faMoneyBill,
  faSearch,
  faUpload
}                        from '@fortawesome/free-solid-svg-icons'

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

export const Key = ({subTitle, label, value, icon, className} : IKeyProps) => {

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
}

const Keyboard = ({onClick} : IKeyboardProps) => {
  
  const rootProps = Object.assign({}, onClick ? {onClick} : {})
  return (
    <div className={'keyboard border shadow-sm p-2 m-2'} data-action-root  {...rootProps}>

      <div className={'d-flex mb-3 justify-content-center'}>

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

        <Key label={'search'}
                     icon={faSearch}
                     className={'half-double-key mx-1 ml-2 color-primary background-primary border-color-primary  '}
                     subTitle={[
                       {
                         label: 'search',
                         position: 'left-down'
                       },
                       {
                         label: 'F6',
                         position: 'right-top'
                       }
                     ]}
        />

      </div>

      <div className={'d-flex justify-content-center '}>
        {['7', '8', '9'].map((x) => <Key
                    className={'font-bigger-12 font-weight-400 mx-1 color-primary color-header-gradient'} key={x}
                    label={x}/>)}
      </div>
      <div className={'d-flex mt-2 justify-content-center'}>
        {['4', '5', '6'].map((x) => <Key
                    className={'font-bigger-12  font-weight-400 mx-1 color-primary color-header-gradient'} key={x}
                    label={x}/>)}
      </div>
      <div className={'d-flex mt-2 justify-content-center'}>
        {['1', '2', '3'].map((x) => <Key
                    className={'font-bigger-12 font-weight-400  mx-1 color-primary color-header-gradient '} key={x}
                    label={x}/>)}
      </div>
      <div className={'d-flex mt-2 justify-content-center'}>
        <Key
                    label={'X'}
                    className={'font-bigger-12 font-weight-400 mx-1 color-header-gradient'}
                    subTitle={[
                      {
                        label: '',
                        position: 'right-down',
                        icon: faAsterisk
                      }
                    ]}
        />
        <Key label={'0'} className={'font-bigger-12 font-weight-400 mx-1 color-header-gradient '}/>
        <Key label={'.'} className={'font-bigger-12 font-weight-400 mx-1 color-header-gradient'}/>
      </div>

      <div className={'d-flex mt-3 justify-content-center '}>
        <Key label={'payment'}
                     className={'half-double-key font-bigger-6 mx-1 mr-2 color-primary border-color-primary color-header-gradient '}
                     icon={faMoneyBill}
                     subTitle={[
                       {
                         label: 'payment',
                         position: 'left-down'
                       },
                       {
                         label: 'F10',
                         position: 'right-top'
                       }
                     ]}
        />
        <Key
                    label={'plu'}
                    className={'half-double-key mx-1 ml-2 color-primary border-color-primary color-header-gradient'}
                    icon={faUpload}
                    subTitle={[
                      {
                        label: 'PLU',
                        position: 'right-down'
                      },
                      {
                        label: 'ENTER',
                        position: 'left-top'
                      }
                    ]}
        />
      </div>
    </div>
  )
}

export default Keyboard
