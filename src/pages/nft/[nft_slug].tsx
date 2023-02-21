import { GetStaticPaths, GetStaticPropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useContext } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BsCalendarEvent, BsLightningFill } from 'react-icons/bs'
import { FaAsterisk } from 'react-icons/fa'
import NftApi from 'src/api/nft'
import { Button } from 'src/components/atoms/Button'
import { Chip } from 'src/components/atoms/Chip'
import { ProfileImage } from 'src/components/atoms/ProfileImage'
import { HomeLayout } from 'src/components/layouts/HomeLayout'
import { DialogsContext } from 'src/context/DialogsContext'
import { dayjs } from 'src/helper/dates'
import { cripto_price_helper, price_helper } from 'src/helper/price_helper'
import { useDataLayer } from 'src/hooks/useDataLayer'
import { useExchangeRates } from 'src/hooks/useExchangeRates'
import { Nft } from 'src/model/Nft'
import { useUser } from 'src/swr/useUser'

export default function NftDetail({ nft }: { nft: Nft }) {
  const { eurUsdtRate } = useExchangeRates()
  const { setLoginDialogIsOpen } = useContext(DialogsContext)
  const router = useRouter()
  const { pushAddToCart } = useDataLayer()

  const { user } = useUser()

  const launchLogin = () => setLoginDialogIsOpen(true)

  const isBuyable = useCallback(() => {
    if (!nft.dropId) return false
    if (nft.isComingSoon) return false
    if (nft.launchDate) {
      return dayjs(nft.launchDate).utc().isBefore(new Date()) && nft.numberOfCopies > (nft.minteds?.length || 0)
    }
    return nft.numberOfCopies > (nft.minteds?.length || 0)
  }, [nft])

  const startBuyinngProccess = async () => {
    if (!isBuyable()) return

    if (!user) {
      launchLogin()
      return
    }
    pushAddToCart(nft)
    router.push(`/checkout/${nft.slug}`)
  }

  return (
    <HomeLayout>
      <div className="grid grid-cols-2 m-10 gap-x-20 gap-y-5">
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
          <div className="flex flex-col justify-between mt-5 gap-5 child:text-3xl">
            {nft.priceEur <= 0 ? (
              <span>FREE</span>
            ) : (
              <div className="flex gap-10">
                <span>{price_helper(nft.priceEur)} EUR</span>
                <span>{cripto_price_helper(nft.priceEur * eurUsdtRate)} USDT</span>
              </div>
            )}
            <Button
              className="btn-secondary btn-big"
              icon={isBuyable() && <AiOutlineArrowRight />}
              onClick={startBuyinngProccess}
              disabled={!isBuyable()}
            >
              {isBuyable()
                ? 'BUY'
                : nft.numberOfCopies <= (nft.minteds?.length || 0)
                ? 'SOLD OUT'
                : nft.isComingSoon || !nft.dropId //Si no tiene dropId de MK tambien sale is comming soon
                ? 'AVAILABLE SOON'
                : `AVAILABLE ON ${new Date(nft.launchDate || '').toLocaleDateString()}`}
            </Button>
          </div>
        </div>
        <div>
          <div className="border border-gray-400 rounded-md bg-white drop-shadow-big-black">
            <span className="p-5 flex gap-5 items-center">
              <div className="bg-gray-200 p-3 rounded-full text-xl">
                <FaAsterisk />
              </div>{' '}
              EXCLUSIVE CONTENT
            </span>
            <p className="p-5 border-t border-t-black">
              This content can only be unlocked and revealed by the owner of this item.
            </p>
          </div>
          <div className="mt-10 border border-gray-400 rounded-md bg-white drop-shadow-big-black p-5">
            <span className="text-xl">DETAILS</span>
            <div className="mt-10 grid grid-cols-[1fr_2fr] gap-5">
              <span>COLLECTION</span>
              <span>{nft.nft_collection.name}</span>
              <span>BLOCKCHAIN</span>
              <span>POLYGON</span>
              <span>CONTRACT</span>
              <Link
                className="truncate"
                href={`https://polygonscan.com/address/${nft.nft_collection.contract?.contractAddress}`}
              >
                {nft.nft_collection.contract?.contractAddress}
              </Link>
              <span>COLLECTION</span>
              <span>{nft.nft_collection.name}</span>
            </div>
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
