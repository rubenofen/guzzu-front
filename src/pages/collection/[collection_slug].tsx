import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { collectionsApi } from 'src/api/collections'
import { ProfileImage } from 'src/components/atoms/ProfileImage'
import { HomeLayout } from 'src/components/layouts/HomeLayout'

export default function Collection({ collection }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <HomeLayout>
      <div className="flex flex-col items-center gap-3">
        <ProfileImage className="w-40 h-40 rounded-full" profilePicture={collection.displayImage} />
        <h1 className="font-normal">{collection.name}</h1>
        <div className="flex items-center gap-3">
          <ProfileImage className="w-10 h-10 rounded-full" profilePicture={collection.user?.profilePicture} />
          BY <Link href={`/timeline/${collection.user?.username}`}>{collection.user?.name}</Link>
        </div>
        <p className="my-10 w-[600px] text-center">{collection.user?.bio}</p>
      </div>
      <hr />
      <div className="m-20">
        <h3>COLLECTION</h3>
        <span>{collection.nfts.length} ITEMS</span>
      </div>
    </HomeLayout>
  )
}

// Generates `/collection/1` and `/collection/2`
export const getStaticPaths: GetStaticPaths = async () => {
  const collections = await collectionsApi.fetchAllSlugs()
  const paths = collections.map((collection_slug) => ({
    params: { collection_slug }
  }))
  return { paths, fallback: false }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }: GetStaticPropsContext<{ collection_slug: string }>) {
  const collection_slug = params?.collection_slug
  const collection = await collectionsApi.fetchCollectionBySlug(collection_slug)
  return {
    // Passed to the page component as props
    props: { collection }
  }
}
