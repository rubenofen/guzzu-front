import Head from 'next/head'
import MomentsAPI from 'src/api/moments'
import { HomeLayout } from 'src/components/layouts/HomeLayout'
import { HomeHeaderCTA } from 'src/components/molecules/HomeHeaderCTA'
import { HomeHeader } from 'src/components/organisms/HomeHeader'
import { Moment } from 'src/model/Moment'

type HomeProps = {
  featuredDrop: Moment
}

export default function Home({ featuredDrop }: HomeProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Web3 community for creators and music fans. Welcome to the new era of Digital Merchandising."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Guzzu" />
        <meta
          name="twitter:description"
          content="Web3 community for creators and music fans. Welcome to the new era of Digital Merchandising."
        />
        <meta name="twitter:site" content="@weareguzzu" />
        <meta
          name="twitter:image"
          content="https://dqpzvxknjobdx.cloudfront.net/images/initial-collections/HeaderNfts.png"
        />
        <meta name="twitter:creator" content="@weareguzzu" />
        <meta property="og:title" content="Guzzu" />
        <meta
          property="og:description"
          content="Web3 community for creators and music fans. Welcome to the new era of Digital Merchandising."
        />
        <meta property="og:url" content="https://www.guzzu.io/" />
        <meta
          property="og:image"
          content="https://dqpzvxknjobdx.cloudfront.net/images/initial-collections/HeaderNfts.png"
        />
        <meta property="og:type" content="website" />
        <meta name="author" content="Guzzu" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="facebook-domain-verification" content="2ktmsa00e5lnefqvaqq84h7zmqi1w8" />
        <title>Guzzu</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomeLayout>
          <div className="px-20">
            <HomeHeader className="my-16" featuredDrop={featuredDrop} />
            <HomeHeaderCTA />
          </div>
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
  try {
    featuredDropResponse = await MomentsAPI.fetchFeaturedDrop()
  } catch (error) {
    console.log(error)
  }

  // By returning { props: { featuredDrop } }, the component
  // will receive `featured drop` as a prop at build time
  return {
    props: {
      featuredDrop: featuredDropResponse
    }
  }
}
