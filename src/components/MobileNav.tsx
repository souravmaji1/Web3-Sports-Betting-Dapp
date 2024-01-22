'use client'
import React, { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ActiveLink, SelectAppChain } from '@/components'
import { useConfig } from 'wagmi';
import { Days_One } from 'next/font/google'
import Gift from './Gift'

import MobileCategories from './MobileCate';
import {
  Modal,
  ModalContent,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});

export default function Header() {
  const config = useConfig()

  const [isMobile, setIsMobile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    <>

   
      <Button onClick={onOpen}> <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg></Button>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalContent>
         
      <div className={`ml-auto contents items-center ${daysone.className}`}>
     
      <Gift />
      
      <div className="flex ml-10" style={{padding:'7px 26px 7px 7px', background:'white', borderRadius:'5px',margin:'auto'}}>
      
        <ActiveLink
          className={`text-black hover:text-black transition ml-4 ${daysone.className}`}
          activeClassName="!text-gray-800 font-semibold !cursor-default"
          href="/bets"
          regex="^\/bets"
        >
          BETS
        </ActiveLink>
       
      </div>
    
      <MobileCategories />
      <br>
      </br>
        <SelectAppChain />
        <br></br>
        <div style={{margin:"auto"}}>
        <ConnectButton chainStatus="none"  />
        </div>
        
      </div>
      <ModalFooter>
                <Button  sx={{margin:'auto',background:'black',color:'white'}}   color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
               
              </ModalFooter>
      
      </ModalContent>
      </Modal>
    
    </>
  )
}
