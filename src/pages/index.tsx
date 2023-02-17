import { collectionsApi } from 'src/api/collections'
import MomentsAPI from 'src/api/moments'
import { Head } from 'src/components/atoms/Head'
import { HomeLayout } from 'src/components/layouts/HomeLayout'
import { CommunityJoin } from 'src/components/molecules/CommunityJoin'
import { GetYourFree } from 'src/components/molecules/GetYourFree'
import { HomeHeader } from 'src/components/organisms/HomeHeader'
import { LatestCollections } from 'src/components/organisms/LatestCollections'
import { Collection } from 'src/model/Collection'
import { Moment } from 'src/model/Nft'

type HomeProps = {
  featuredDrop: Moment
  latestCollections: Collection[]
}

export default function Home({ featuredDrop, latestCollections }: HomeProps) {
  return (
    <>
      <Head
        title="Guzzu"
        description="Web3 community for creators and music fans. Welcome to the new era of Digital Merchandising."
      />
      <main className="mb-10">
        <HomeLayout>
          <HomeHeader className="px-20" featuredDrop={featuredDrop} />
          <LatestCollections className="mt-20 px-20" collections={latestCollections} />
          <CommunityJoin className="mt-20 px-20" />
          <GetYourFree id="getYourFree" className="mt-20 mx-20" />
        </HomeLayout>
      </main>
    </>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  let featuredDropResponse: Moment | undefined
  let collectionsResponse: Collection[] | undefined
  try {
    featuredDropResponse = await MomentsAPI.fetchFeaturedDrop()
    collectionsResponse = await collectionsApi.fetchLatest(8)
  } catch (error) {
    console.log(error)
  }

  // By returning { props: { featuredDrop } }, the component
  // will receive `featured drop` as a prop at build time
  return {
    props: {
      featuredDrop: featuredDropResponse,
      latestCollections: collectionsResponse
    }
  }
}
