import Head from 'next/head'
import { HomeLayout } from 'src/components/layouts/HomeLayout'

export default function Home() {
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
        <HomeLayout>Home</HomeLayout>
      </main>
    </>
  )
}
