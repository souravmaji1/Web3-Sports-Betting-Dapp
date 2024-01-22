'use client'
import { useParams } from 'next/navigation'
import { useGames, Game_OrderBy } from '@azuro-org/sdk'
import { GameCard, SportsNavigation } from '@/components'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Foots from '../../../components/footer';

const useData = () => {
  const params = useParams()

  const props =
    params.sport === 'top'
      ? {
        orderBy: Game_OrderBy.Turnover,
        filter: {
          limit: 6,
        },
      }
      : {
        filter: {
          sportSlug: params.sport,
        },
      }

  return useGames(props)
}



export default function Events() {
  const { loading, data } = useData()

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
    <>
      <SportsNavigation />
   
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-zinc-800" style={{ display: 'flow', marginTop: '-1022px',  marginLeft: isMobile ? '0' : '321px',maxHeight: '990px', overflowY: 'auto' }}  >
             <Image style={{ padding:'3px 3px 10px'}} width={1010} height={300} src="/images/banner.png" alt="" />
            {
              data?.games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            }
          </div>
        )
      }
      <Foots />
    </>
  )
}
