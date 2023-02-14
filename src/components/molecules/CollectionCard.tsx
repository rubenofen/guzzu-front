import Image from 'next/image'
import Link from 'next/link'
import { Collection } from 'src/model/Collection'

type CollectionCardProps = {
  className?: string
  collection: Collection
}
export const CollectionCard = ({ className, collection }: CollectionCardProps) => {
  return (
    <div className={className}>
      <div className="relative h-56 w-full rounded-md overflow-hidden">
        <Image className="object-cover" src={collection.displayImage} alt={collection.name} fill />
      </div>
      <div className="-mt-7 relative flex items-end">
        <div className="w-14 h-14 mx-2 relative rounded-full overflow-hidden">
          <Image
            className="object-cover"
            src={collection.user?.profilePicture || ''}
            alt={collection.user?.name || ''}
            fill
          />
        </div>
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
