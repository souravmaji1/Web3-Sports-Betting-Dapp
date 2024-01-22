'use client'
import React from 'react'
import { ChainProvider } from '@azuro-org/sdk'
import { ApolloProvider } from '@azuro-org/sdk/nextjs/apollo'
import { RainbowKitProvider, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { polygonMumbai, arbitrumGoerli, polygon } from 'viem/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import {NextUIProvider} from '@nextui-org/react'

const rpcUrls: Record<number, string> = {
  [polygonMumbai.id]: 'https://rpc.ankr.com/polygon_mumbai',
  [polygon.id]: 'https://rpc.ankr.com/polygon',
}

const { chains, publicClient } = configureChains(
  [ polygonMumbai, polygon ],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: rpcUrls[chain.id],
      }),
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Azuro',
  projectId: '2f82a1608c73932cfc64ff51aa38a87b', // get your own project ID - https://cloud.walletconnect.com/sign-in
  chains,
})

const wagmiConfig = createConfig({
  connectors,
  publicClient,
})

export function Providers(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <NextUIProvider>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider theme={lightTheme({
        accentColor: '#e75109',
       })} chains={chains}>
        <ChainProvider initialChainId={polygon.id}>
          <ApolloProvider>
            {children}
          </ApolloProvider>
        </ChainProvider>
      </RainbowKitProvider>
    </WagmiConfig>
    </NextUIProvider>
  )
}
