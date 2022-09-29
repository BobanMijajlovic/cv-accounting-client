interface IActiveBackground {
  action ?: (data ?: any) => void,
  unique : number
  zIndex : number
}

export enum ACTIONS {
  openNewActiveBackground = 'ACTIVE_BACKGROUND_OPEN_NEW_ONE',
  closeActiveBackground = 'ACTIVE_BACKGROUND_CLOSE_ONE'
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    unique : number,
    action ?: (data ?: any) => void,
  }
}

export interface IStoreActiveBackground {
  activeBackgrounds : IActiveBackground[]
}
