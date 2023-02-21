import localFont from '@next/font/local'
import type { AppProps } from 'next/app'
import { useCallback, useEffect, useMemo, useState } from 'react'
import TagManager from 'react-gtm-module'
import { hotjar } from 'react-hotjar'
import { DialogsContext } from 'src/context/DialogsContext'
import { InitializeUserContextAction, UserProvider, useUserDispatcher } from 'src/context/UserContext'
import '../styles/globals.scss'

const simplon_mono = localFont({
  src: [
    {
      path: './fonts/SimplonMono-Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/Simplon-Mono-Medium-Regular.woff',
      weight: '700',
      style: 'bold'
    }
  ]
})

export default function App({ Component, pageProps }: AppProps) {
  const [loginDialogIsOpen, setLoginDialogIsOpen] = useState(false)
  const [signUpDialogIsOpen, setSignUpDialogIsOpen] = useState(false)
  const userDispatcher = useUserDispatcher()

  const tagManagerArgs = useMemo(() => {
    return {
      gtmId: 'GTM-TD2HSN3'
    }
  }, [])

  const initializeGA = useCallback(() => {
    TagManager.initialize(tagManagerArgs)
  }, [tagManagerArgs])

  useEffect(() => {
    console.log('Y bien, que pasa?')
    InitializeUserContextAction().then((r) => userDispatcher(r))
    if (localStorage.consent === 'true' && process.env.GOAL === 'prod') {
      initializeGA()
    }
    hotjar.initialize(3215464, 6)
  }, [initializeGA, userDispatcher])

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-simplon-mono: ${simplon_mono.style.fontFamily};
          }
        `}
      </style>
      <UserProvider>
        <DialogsContext.Provider
          value={{ loginDialogIsOpen, signUpDialogIsOpen, setLoginDialogIsOpen, setSignUpDialogIsOpen }}
        >
          <Component {...pageProps} />
        </DialogsContext.Provider>
      </UserProvider>
    </>
  )
}
