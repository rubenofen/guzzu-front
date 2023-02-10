import Link from 'next/link'
import { useUserState } from 'src/context/UserContext'
import { Guzzu } from '../icons/Guzzu'

export const Header = () => {
  const userContext = useUserState()
  return (
    <header className="flex justify-between items-center w-full py-12 px-20">
      <div className="flex-1 flex gap-x-10 uppercase child-hover:text-primary">
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
            <button className="btn-secondary btn-alternate">LOGIN</button>
            <button className="btn-secondary">SIGN UP</button>
          </>
        )}
      </div>
    </header>
  )
}
