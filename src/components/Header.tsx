'use client'
import React, { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ActiveLink, SelectAppChain } from '@/components'
import { useConfig } from 'wagmi';
import { Days_One } from 'next/font/google'
import Gift from './Gift'


const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});

export function Header() {
  const config = useConfig()

  useEffect(() => {
    ;(async () => {
      try {
        await config.autoConnect()
      }
      catch {}
    })()
  }, [])

  return (
    <header className="p-6 bg-black flex items-center py-3.5 border-b border-zinc-200">
      <div className={`text-white font-semibold  ${daysone.className}`}>BetX</div>
     
      <div className={`ml-auto flex items-center ${daysone.className}`}>
      <Gift />
      <div className="flex ml-10" style={{padding:'7px 26px 7px 7px', background:'white', borderRadius:'5px',marginRight:'25px'}}>
       
        <ActiveLink
          className={`text-black hover:text-black transition ml-4 ${daysone.className}`}
          activeClassName="!text-gray-800 font-semibold !cursor-default"
          href="/bets"
          regex="^\/bets"
        >
          BETS
        </ActiveLink>
      </div>
        <SelectAppChain />
        <ConnectButton chainStatus="none"  />
      </div>
    </header>
  )
}
