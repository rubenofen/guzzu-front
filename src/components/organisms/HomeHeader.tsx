import Image from 'next/image'
import { useRouter } from 'next/router'
import { Moment } from 'src/model/Moment'
import { Button } from '../atoms/Button'

export const HomeHeader = ({ featuredDrop }: { featuredDrop: Moment }) => {
  const router = useRouter()
  return (
    <div className="flex gap-7 items-center">
      <h1 className="flex-1 uppercase font-normal">Digital merchandising by your favorite music creators</h1>
      <div className="flex-1 h-[500px] w-[500px] rounded-md relative overflow-hidden">
        <Image
          className="object-cover"
          src={featuredDrop.displayImage}
          alt={featuredDrop.nft_collection.name}
          fill
          onClick={() => router.push(`/collection/${featuredDrop.nft_collection.slug}`)}
        />
      </div>
      <div className="flex flex-col items-end flex-1 gap-4 text-right">
        <span className="text-4xl font-semibold">{`${featuredDrop.nft_collection.name} New Exclusive Drop`}</span>
        <Button
          className="btn-secondary btn-alternate"
          onClick={() => router.push(`/collection/${featuredDrop.nft_collection.slug}`)}
        >
          VIEW COLLECTION
        </Button>
      </div>
    </div>
  )
}
