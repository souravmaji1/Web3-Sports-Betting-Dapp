import '@rainbow-me/rainbowkit/styles.css'
import './globals.css'
import { Providers, Header, Watchers } from '@/components'
import { ChakraProvider } from '@chakra-ui/react'


export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
      <script src="https://widget.mtpelerin.com/mtp-widget.js"></script>
      </head>
      <body>
        <ChakraProvider>
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <Watchers />
        </Providers>
        </ChakraProvider>
      </body>
    </html>
  )
}
