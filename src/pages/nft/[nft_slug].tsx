import { GetStaticPaths, GetStaticPropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BsCalendarEvent, BsLightningFill } from 'react-icons/bs'
import { FaAsterisk } from 'react-icons/fa'
import NftApi from 'src/api/nft'
import { Chip } from 'src/components/atoms/Chip'
import { ProfileImage } from 'src/components/atoms/ProfileImage'
import { HomeLayout } from 'src/components/layouts/HomeLayout'
import { cripto_price_helper } from 'src/helper/price_helper'
import { useExchangeRates } from 'src/hooks/useExchangeRates'
import { Nft } from 'src/model/Nft'

export default function NftDetail({ nft }: { nft: Nft }) {
  const { eurUsdtRate } = useExchangeRates()

  return (
    <HomeLayout>
      <div className="grid grid-cols-2">
        <div className="relative h-[500px] child:w-full child:h-full child:object-contain child:object-center">
          {nft.packageImage?.includes('.mp4') ? (
            <video controls autoPlay loop muted>
              <source src={nft.packageImage} type="video/mp4" />
            </video>
          ) : (
            <Image src={nft.packageImage} alt={nft.title} fill />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <h1>{nft.title}</h1>
          <div className="flex items-center gap-3">
            <ProfileImage className="h-8 w-8 mr-3 rounded-full" profilePicture={nft.user.profilePicture} />
            BY <Link href={`/timeline/${nft.user.name}`}>{nft.user.name}</Link>
          </div>
          <div className="div-with-default-styles">
            <div dangerouslySetInnerHTML={{ __html: nft.description }} />
          </div>
          <Chip className="text-white bg-black flex flex-row self-start">
            <div className="flex items-center gap-2 text-sm">
              <FaAsterisk /> INCLUDES EXCLUSIVE CONTENT
            </div>
          </Chip>
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 text-gray-400 p-1 rounded">
              <BsLightningFill />
            </div>
            Edition of {nft.numberOfCopies}
          </div>
          {nft.endDate && (
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 text-gray-400 p-1 rounded">
                <BsCalendarEvent />
              </div>
              <span>{`This drop is available until ${new Date(nft.endDate).toLocaleDateString()}`}</span>
            </div>
          )}
          <div>
            <span>{nft.priceEur} EUR</span>
            <span>
              {nft.priceEur > 0 && <span>{cripto_price_helper(nft.priceEur * eurUsdtRate)}</span>}
              USDT
            </span>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

// Generates `/collection/1` and `/collection/2`
export const getStaticPaths: GetStaticPaths = async () => {
  const collections = await NftApi.fetchAllSlugs()
  const paths = collections.map((nft_slug) => ({
    params: { nft_slug }
  }))
  return { paths, fallback: false }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }: GetStaticPropsContext<{ nft_slug: string }>) {
  const nft_slug = params?.nft_slug
  const nft = await NftApi.fetchBySlug(nft_slug)
  return {
    // Passed to the page component as props
    props: { nft }
  }
}
