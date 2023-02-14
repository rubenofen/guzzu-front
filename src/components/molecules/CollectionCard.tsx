import Image from 'next/image'
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
    </div>
  )
}
