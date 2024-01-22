'use client'
import dayjs from 'dayjs'
import { type GameQuery } from '@azuro-org/sdk'
import { ParticipantLogo } from '@/components'
import { Days_One } from 'next/font/google'
import { useEffect, useState } from 'react';

const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});
  
type Props = {
  game: GameQuery['games'][0]
}



export function GameInfo(props: Props) {
  const { sport, league, participants, startsAt } = props.game

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
 

  return (
    <div className="flex flex-col items-center pt-6 pb-8 bg-zinc-900" style={{position:'absolute',width:"-webkit-fill-available",marginLeft: isMobile ? '0' : '323px'}}>
      
      <div className="flex flex-col items-center text-md">
        <div className={`text-white ${daysone.className} `}>{sport.name}</div>
        <div className={`mt-2 text-zinc-500  ${daysone.className} `}>
          {league.country.name} &middot; {league.name}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr]">
        <ParticipantLogo {...participants[0]} />
        <div className={`mx-5 pt-7 text-md text-zinc-500  ${daysone.className}  `}>
          {dayjs(startsAt * 1000).format('DD MMM HH:mm')}
        </div>
        <ParticipantLogo {...participants[1]} />
      </div>
    </div>
  )
}
