import NextHead from 'next/head'

type HeadProps = {
  title: string
  description: string
}

export const Head = ({ title, description }: HeadProps) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <meta name="description" content={description} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="@weareguzzu" />
    <meta
      name="twitter:image"
      content="https://dqpzvxknjobdx.cloudfront.net/images/initial-collections/HeaderNfts.png"
    />
    <meta name="twitter:creator" content="@weareguzzu" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
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
  </NextHead>
)
