import Link from 'next/link'
import { useRef } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import API from 'src/api'

type SubscribeFormProps = {
  className?: string
}

export const SubscribeForm = ({ className }: SubscribeFormProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const subscribeNewsletter = async (): Promise<void> => {
    if (ref.current?.value) {
      await API.user.suscribeNewsletter(ref.current?.value)
      //toast.success('You have been subscribed properly, check your email')
    }
  }
  return (
    <div className={className}>
      <div className="flex w-full">
        <input className="flex-1" type="text" ref={ref} placeholder="YOUR EMAIL HERE" />
        <button className="btn-primary px-4" onClick={subscribeNewsletter}>
          <AiOutlineArrowRight />
        </button>
      </div>
      <div className="mt-6 child:text-xs child:text-gray-500">
        <p>MANAGEMENT OF DATA PROCESSING: GUZZU S.L.</p>
        <p>PURPOSE: MANAGING AND ATTENDING YOUR SUBSCRIPTION REQUEST TO THE NEWSLETTER.</p>
        <p>
          RIGHTS: YOU CAN EXERCISE THE RIGHTS INDICATED IN THE PRIVACY POLICY BY WRITING TO{' '}
          <Link href="mailTo:PRIVACY@GUZZU.IO">PRIVACY@GUZZU.IO</Link>
        </p>
      </div>
    </div>
  )
}
