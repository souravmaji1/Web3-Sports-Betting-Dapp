'use client'
import React, { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ActiveLink, SelectAppChain } from '@/components'
import { useConfig } from 'wagmi';
import { Days_One } from 'next/font/google'
import Gift from './Gift'
import Mobilebar from './MobileNav'
import Image from 'next/image';

const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});

export function Header() {
  const config = useConfig()

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check on component mount
    handleResize();

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    ;(async () => {
      try {
        await config.autoConnect()
      }
      catch {}
    })()
  }, [])

  return (
    <header className={`p-6 bg-black flex items-center py-3.5 border-b border-zinc-200 flex-wrap justify-between`} style={{ width: isMobile ? 'auto' : '' }}>
      <div className={`text-white font-semibold  ${daysone.className}`}>
        <a href="/">
          <Image src='/images/logo.png' width={100} height={100} alt='' />
          
          </a></div>
     
      {isMobile ? (
        <Mobilebar />
      ) : (
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
      )}
    </header>
  )
}
