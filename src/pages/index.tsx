import Head from 'next/head'
import { LoginForm } from 'src/components/forms/LoginForm'
import { LoginLayout } from 'src/components/layouts/LoginLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Review</title>
        <meta name="description" content="Home Review" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginLayout>
          <LoginForm />
        </LoginLayout>
      </main>
    </>
  )
}
