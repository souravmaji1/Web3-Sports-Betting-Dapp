'use client'
import { useSportsNavigation } from '@azuro-org/sdk'
import { ActiveLink } from '@/components'
import { FaBasketballBall, FaBaseballBall, FaGolfBall, FaHome, FaFootballBall } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Days_One } from 'next/font/google'
import { useEffect, useState } from 'react';
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



const sportIcons: Record<string, IconType> = {
  football: FaFootballBall,
  basketball: FaBasketballBall,
  baseball: FaBaseballBall,
  golf: FaGolfBall,
  // Add more as needed
};

export default function SportsNavigation() {
  const { loading, data } = useSportsNavigation({
    withGameCount: true,
  })

  console.log(data);

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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
     <Button sx={{fontWeight:'100'}}  onClick={onOpen}>
        Categories
     </Button>

        <Modal isOpen={isOpen} onClose={onClose}  >
        <ModalContent>
          
    <div className="w-80  overflow-hidden bg-black rounded-md "  style={{ width: isMobile ? 'auto' : '', margin:'10px auto 8px' }}  >
      <div className="overflow-x-auto no-scrollbar">
        <div className={`flex flex-col items-start `}>
          <ActiveLink
            className={`flex items-center py-2 px-4 bg-zinc-100 gap-1 whitespace-nowrap m-3 rounded-md w-72  ${daysone.className}`}
            activeClassName="!bg-purple-200"
            href="/events/top"
          >
            <FaHome /> {/* Icon for Top */}
            Home
          </ActiveLink>
          {
            [ ...data?.sports || [] ] 
              .sort((a, b) => b.games!.length - a.games!.length)
              .map(({ slug, name, games }) => {
                const Icon = sportIcons[slug] || FaFootballBall; // Default to football icon if not found
                return (
                  <ActiveLink
                    key={slug}
                    className={`flex items-center py-2 px-4 gap-1 bg-zinc-700  whitespace-nowrap m-3 w-72 rounded-md  border-b text-gray-500 border-gray-400 ${daysone.className}`}
                    activeClassName="!bg-purple-200"
                    href={`/events/${slug}`}
                  >
                    <Icon /> {/* Display the corresponding icon */}
                    <span>{name}</span>
                    {
                      games && (
                        <span className="pl-1.5 text-zinc-400">{games.length}</span>
                      )
                    }
                  </ActiveLink>
                );
              })
          }
         
          <div className="flex-none w-3 h-4" />
        </div>
      </div>
    </div>
    <ModalFooter>
                <Button sx={{margin:'auto',background:'black',color:'white'}} color="danger" variant="light"  onClick={onClose}>
                  Close
                </Button>
               
              </ModalFooter>
    
      </ModalContent>
      </Modal>
    </>
  )
}