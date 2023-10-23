import React   from 'react'
import { Key } from './Keyboard'

interface IKeyboardDefaultProps {
  handlerKeyEvent: (key: string) => void
}

const KeyboardDefault = () => {

  return (
    <div className={'keyboard p-2'}>

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
        <Key label={'C'} className={'font-bigger-12 font-weight-400 mx-1 color-header-gradient'}/>
        <Key label={'0'} className={'font-bigger-12 font-weight-400 mx-1 color-header-gradient '}/>
        <Key label={'.'} className={'font-bigger-12 font-weight-400 mx-1 color-header-gradient'}/>
      </div>
    </div>
  )
}

export default KeyboardDefault

