import Image from 'next/image'
import now from '../../../public/images/now.webp'
import { SubscribeForm } from '../forms/SubscribeForm'

type GetYourFreeProps = {
  className?: string
}

export const GetYourFree = ({ className }: GetYourFreeProps) => {
  return (
    <div className={className}>
      <div className="bg-white border border-gray-200 drop-shadow-big-black rounded p-6">
        <Image src={now} alt="now" className="py-8 object-contain w-full" />
        <SubscribeForm />
      </div>
    </div>
  )
}
