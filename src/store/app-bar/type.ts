import {IButtonShortcutProps} from '../../components/Button/ButtonShortcut'

export interface IUseAppBarState {
  headerRendered ?: boolean
  currentButtonsId ?: string,
  buttonsForPage : IButtonShortcutProps[]
}
