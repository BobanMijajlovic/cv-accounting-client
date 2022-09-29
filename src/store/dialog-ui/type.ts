

export interface IDialogUI {
  guid : string
}

export enum ACTIONS {
  openNewDialog = 'DIALOG_UI_OPEN_NEW_ONE_468723',
  closeActiveDialog = 'DIALOG_UI_CLOSE_ONE_7594343'
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    id ?: string,
    action ?: (data ?: any) => void,
  }
}

