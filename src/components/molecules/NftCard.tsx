import Image from 'next/image'
import Link from 'next/link'
import { AiFillEuroCircle } from 'react-icons/ai'
import { FaAsterisk } from 'react-icons/fa'
import { Nft } from 'src/model/Nft'
import { Chip } from '../atoms/Chip'
import { ProfileImage } from '../atoms/ProfileImage'

type NftCardProps = {
  className?: string
  nft: Nft
}

export const NftCard = ({ className, nft }: NftCardProps) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-4 mb-5">
        <ProfileImage className="w-10 h-10 rounded-full" profilePicture={nft.user?.profilePicture} />
        <span>{nft.user?.name}</span>
      </div>
      <div className="relative w-full pb-[100%] rounded-lg overflow-hidden">
        <Link href={`/nft/${nft.slug}`}>
          <Image
            className="object-cover obejct-center"
            src={nft.packageImage?.endsWith('.mp4') ? nft.displayImage : nft.packageImage}
            alt={nft.title}
            fill
          />
        </Link>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-400">Edition of {nft.numberOfCopies}</span>
        {nft.exclContent && (
          <Chip className="bg-black text-white">
            <div className="flex items-center gap-2">
              <FaAsterisk /> EXCLUSIVE CONTENT
            </div>
          </Chip>
        )}
      </div>
      <div className="text-2xl">{nft.title}</div>
      <div className="flex items-center">
        <AiFillEuroCircle />
        <span>{!nft.priceEur || nft.priceEur === 0 ? 'FREE' : nft.priceEur}</span>
      </div>
    </div>
  )
}
