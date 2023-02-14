import { createContext } from 'react'

type DialogsContextType = {
  loginDialogIsOpen: boolean
  signUpDialogIsOpen: boolean
  setLoginDialogIsOpen: (value: boolean) => void
  setSignUpDialogIsOpen: (value: boolean) => void
}

export const DialogsContext = createContext<DialogsContextType>({
  loginDialogIsOpen: false,
  signUpDialogIsOpen: false,
  setLoginDialogIsOpen: () => {},
  setSignUpDialogIsOpen: () => {}
})
