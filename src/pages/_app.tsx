import { Space_Grotesk } from '@next/font/google'
import localFont from '@next/font/local'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'

const space_grotesk = Space_Grotesk({ subsets: ['latin'] })
const pp_editorial_new = localFont({
  src: [
    {
      path: './fonts/PPEditorialNew-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/PPEditorialNew-Ultrabold.otf',
      weight: '800',
      style: 'bold',
    },
    {
      path: './fonts/PPEditorialNew-Ultralight.otf',
      weight: '300',
      style: 'light',
    },
  ],
  variable: '--font-pp-editorial-new',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-pp-editorial-new: ${pp_editorial_new.style.fontFamily};
          }
          html {
            font-family: ${space_grotesk.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  )
}
