import '@rainbow-me/rainbowkit/styles.css'
import './globals.css'
import { Providers, Header, Watchers } from '@/components'


export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <Watchers />
        </Providers>
      </body>
    </html>
  )
}
