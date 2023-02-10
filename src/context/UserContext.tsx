import { Magic } from 'magic-sdk'
import React, { Dispatch } from 'react'

import API from '../api'
import { isTokenAvailable, updateApiToken } from '../api/tools'
import { User } from '../model/User'
import { Action } from '../types'

interface State {
  user: User | null
  isInit: boolean
  isThereAnyProblemOnLogin: boolean
  artistTransactions: Array<any>
  isArtistTransactionsFetch: boolean
}

const defaultState: State = {
  isInit: false,
  user: null,
  isThereAnyProblemOnLogin: false,
  artistTransactions: [],
  isArtistTransactionsFetch: false
}
const defaultDispatch: Dispatch<any> = () => {}

const UserContext = React.createContext(defaultState)
const UserDispatch = React.createContext(defaultDispatch)

export async function InitializeUserContextAction(): Promise<Action<User | null>> {
  // try to find token on localstorage, if exists ask to the api for me
  const token = isTokenAvailable()
  let user = null

  if (token) {
    user = await API.user.me()
  }

  return {
    type: 'initialize',
    payload: user
  }
}

export async function UpdateMetamaskWalletId(walletId: string): Promise<Action<User>> {
  const me = await API.user.updateMetamaskWalletId(walletId)

  return {
    type: 'initialize',
    payload: me
  }
}

export const RegisterUserWithMagicLink = async (
  email: string,
  name: string,
  username: string
): Promise<{ type: string; payload: User }> => {
  const status = await API.user.checkEmail(email)
  if (status.result === 'ok') {
    throw new Error('Email already exists')
  } else {
    const did = await new Magic('pk_live_A0F5E1B7E6E38C80').auth.loginWithMagicLink({ email })
    const { token, user } = await API.user.registerWithMagicLink(name, username, did)
    updateApiToken(token)
    return { type: 'initialize', payload: user }
  }
}

export const LoginUserWithMagicLink = async (email: string): Promise<any> => {
  const { result } = await API.user.checkEmail(email)
  if (result === 'ok') {
    const did = await new Magic('pk_live_A0F5E1B7E6E38C80').auth.loginWithMagicLink({ email })
    const { token, user } = await API.user.loginWithMagicLink(did)
    updateApiToken(token)
    return { type: 'initialize', payload: user }
  } else {
    throw new Error('User not found')
  }
}

export async function BuyMomentAction(momentId: string, pi: string | null = null): Promise<Action<User>> {
  const resp = await API.moments.buyNft(momentId, pi)
  if (resp && resp.status === 'error_payment_next_action') {
    throw {
      resp
    }
  }
  const me = await API.user.me()

  return {
    type: 'update_user',
    payload: me
  }
}

export async function UpdateUserBasicInfoAction(
  email: string,
  username: string,
  name: string,
  profilePicture?: string,
  bio?: string,
  showcasePicture?: string
): Promise<Action<User>> {
  const result = await API.user.updateBasicInfo(email, username, name, profilePicture, bio, showcasePicture)

  return {
    type: 'update_user',
    payload: result
  }
}

const ContextReducer: React.Reducer<State, Action<any>> = (state, action) => {
  switch (action.type) {
    case 'initialize':
      return {
        ...state,
        user: action.payload,
        isInit: true,
        isThereAnyProblemOnLogin: false
      }

    case 'update_user':
      return {
        ...state,
        user: action.payload
      }

    case 'error_on_login':
      return {
        ...state,
        isThereAnyProblemOnLogin: true
      }

    case 'fetch_transactions':
      return {
        ...state,
        artistTransactions: action.payload,
        isArtistTransactionsFetch: true
      }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const UserProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = React.useReducer(ContextReducer, defaultState)

  return (
    <UserContext.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>{children}</UserDispatch.Provider>
    </UserContext.Provider>
  )
}

export const UserConsumer = (props: any) => {
  return (
    <UserDispatch.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error('YearConsumer must be used within a UserProvider=')
        }
        return props.children(context)
      }}
    </UserDispatch.Consumer>
  )
}

export const useUserState = (): State => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

export const useUserDispatcher = (): any => {
  const context = React.useContext(UserDispatch)
  if (context === undefined) {
    throw new Error('useUserDispatcher must be used within a UserProvider')
  }
  return context
}
