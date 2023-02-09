import localFont from '@next/font/local'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'

const simplon_mono = localFont({
  src: [
    {
      path: './fonts/SimplonMono-Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/Simplon-Mono-Medium-Regular.woff',
      weight: '700',
      style: 'bold'
    }
  ],
  variable: '--font-simplon-mono'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-simplon-mono: ${simplon_mono.style.fontFamily};
          }
          html {
            font-family: var(--font-simplon-mono);
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  )
}
