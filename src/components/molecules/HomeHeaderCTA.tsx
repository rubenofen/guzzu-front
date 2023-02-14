import Image from 'next/image'
import { AiOutlineArrowRight } from 'react-icons/ai'
import freeNftPic from '../../../public/images/get-a-free-nft.png'
import { Button } from '../atoms/Button'

export const HomeHeaderCTA = ({ className }: { className?: string }) => {
  return (
    <div
      className={`p-6 h-fit flex justify-between rounded border border-gray-400 bg-white drop-shadow-guzzu ${className}`}
    >
      <div className="relative w-96">
        <Image className="object-contain" src={freeNftPic} fill alt="Get a free nft" />
      </div>
      <Button className="btn-primary" icon={<AiOutlineArrowRight />}>
        CLAIM YOU NFT NOW
      </Button>
    </div>
  )
}
