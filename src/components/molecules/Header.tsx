import Link from 'next/link'
import { Guzzu } from '../icons/Guzzu'

export const Header = () => {
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
      <div className="flex-1 flex justify-end">
        <button className="btn-primary">BECOME A CREATOR</button>
      </div>
    </header>
  )
}
