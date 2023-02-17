import { Collection } from 'src/model/Collection'
import { CollectionCard } from '../molecules/CollectionCard'

type LatestCollectionsProps = {
  className?: string
  collections: Collection[]
}
export const LatestCollections = ({ className, collections }: LatestCollectionsProps) => {
  return (
    <div className={className}>
      <h2>LATEST COLLECTIONS</h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  )
}
