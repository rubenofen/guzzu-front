import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { DialogsContext } from 'src/context/DialogsContext'
import { useUserState } from 'src/context/UserContext'
import { Guzzu } from '../icons/Guzzu'
import { LoginDialog } from './LoginDialog'
import { SignUpDialog } from './SignUpDialog'

export const Header = () => {
  const userContext = useUserState()
  const { setLoginDialogIsOpen, setSignUpDialogIsOpen } = useContext(DialogsContext)

  useEffect(() => {
    console.log('userContext.user', userContext.user)
    if (userContext.user) {
      setLoginDialogIsOpen(false)
      setSignUpDialogIsOpen(false)
    }
  }, [userContext.user])

  return (
    <header className="flex justify-between items-center w-full py-12 px-20">
      <div className="flex-1 flex gap-x-10 uppercase child-hover:text-primary child:text-black child:no-underline">
        <Link href="/">Expore</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        <Link href="/">HOW TO</Link>
      </div>
      <div className="flex-1 flex justify-center ">
        <Link href="/">
          <Guzzu />
        </Link>
      </div>
      <div className="flex-1 flex justify-end gap-x-2">
        {userContext.user?.role !== 'artist' && <button className="btn-primary">BECOME A CREATOR</button>}
        {!userContext.user && (
          <>
            <button className="btn-secondary btn-alternate" onClick={() => setLoginDialogIsOpen(true)}>
              LOGIN
            </button>
            <button className="btn-secondary" onClick={() => setSignUpDialogIsOpen(true)}>
              SIGN UP
            </button>
          </>
        )}
      </div>
      <LoginDialog />
      <SignUpDialog />
    </header>
  )
}
