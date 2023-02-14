import Image from 'next/image'
import { useRouter } from 'next/router'
import { Moment } from 'src/model/Moment'
import HeaderBackground from '../../../public/images/header-background-orange.png'
import { Button } from '../atoms/Button'
import { HomeHeaderCTA } from '../molecules/HomeHeaderCTA'

export const HomeHeader = ({ featuredDrop, className }: { featuredDrop: Moment; className?: string }) => {
  const router = useRouter()
  return (
    <div className="relative">
      <Image src={HeaderBackground} fill className="object-contain object-bottom" alt="background image" />
      <div className={className}>
        <div className="py-16 flex gap-7 items-center">
          <h1 className="flex-1 uppercase font-thin leading-[50px]">
            Digital merchandising by your favorite music creators
          </h1>
          <div className="relative h-[500px] w-[500px] rounded-md  overflow-hidden">
            <Image
              className="object-cover"
              priority
              src={featuredDrop.displayImage}
              alt={featuredDrop.nft_collection.name}
              fill
              onClick={() => router.push(`/collection/${featuredDrop.nft_collection.slug}`)}
            />
          </div>
          <div className="flex flex-col items-end flex-1 gap-4 text-right">
            <span className="text-4xl">{`${featuredDrop.nft_collection.name} New Exclusive Drop`}</span>
            <Button
              className="btn-secondary btn-alternate"
              onClick={() => router.push(`/collection/${featuredDrop.nft_collection.slug}`)}
            >
              VIEW COLLECTION
            </Button>
          </div>
        </div>
        <HomeHeaderCTA />
      </div>
    </div>
  )
}
