import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Collection } from 'src/model/Collection'
import { Chip } from '../atoms/Chip'
import { ProfileImage } from '../atoms/ProfileImage'

type CollectionCardProps = {
  className?: string
  collection: Collection
}
export const CollectionCard = ({ className, collection }: CollectionCardProps) => {
  const router = useRouter()
  const isSoldOut = useMemo(
    () => collection.nfts.reduce((prev, nft) => prev && (nft.minteds?.length || 0) >= nft.numberOfCopies, true),
    [collection]
  )
  return (
    <div className={`relative mb-10 ${className}`}>
      <div
        className="relative h-56 w-full rounded-md overflow-hidden cursor-pointer"
        onClick={() => router.push(`/collection/${collection.slug}`)}
      >
        <Image
          className={`${isSoldOut && 'opacity-60'} object-cover`}
          src={collection.displayImage}
          alt={collection.name}
          fill
        />
      </div>
      {isSoldOut && <Chip className="absolute top-0 right-0 text-white bg-black">Sold out</Chip>}
      <div className="absolute -bottom-7 w-full flex items-end">
        <ProfileImage profilePicture={collection.user?.profilePicture} className="w-14 h-14 mx-2 rounded-full" />
        <div className="p-2 flex-1 rounded text-sm bg-white border border-gray-500 drop-shadow-black">
          <div>{collection.name}</div>
          BY{' '}
          <Link className="uppercase" href={`/timeline/${collection.user?.username}`}>
            {collection.user?.name}
          </Link>
        </div>
      </div>
    </div>
  )
}
