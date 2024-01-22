'use client'
import { useBets, OrderDirection } from '@azuro-org/sdk';
import { useAccount } from 'wagmi';
import { BetCard, RedeemAll, SportsNavigation } from '@/components';
import { useState, useEffect } from 'react';
import Foots from '../../components/footer';

const useData = () => {
  const { address } = useAccount()


  const props = {
    filter: {
      bettor: address!,
    },
    orderDir: OrderDirection.Desc,
  }

  return useBets(props)
}

export default function Bets() {
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

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data?.length) {
    return  <div> 
    <SportsNavigation />
  <div  className='bg-zinc-800'  style={{ display: 'flow', marginTop: '-1022px', marginLeft: isMobile ? '0' : '321px',maxHeight: '990px', overflowY: 'auto' }}  >
    <RedeemAll bets={data} />
    <div style={{margin:"5px",paddingBottom:'1000px',paddingTop:'51px',textAlign:'center',maxHeight:'1055px',background:'#4a4949'}}>
      <div>
      <h1 style={{color:'white',padding:'20px',margin:'10px 10px 40px',background:'#1b1c1c', borderRadius:'4px'}}>No, Bets have been Placed</h1>
      </div>
    </div>
  </div>
  <Foots />
  </div>
  }

  return (
    <div> 
      <SportsNavigation />
    <div  className='bg-zinc-800'  style={{ display: 'flow', marginTop: '-1022px', marginLeft: isMobile ? '0' : '321px',maxHeight: '990px', overflowY: 'auto' }}  >
      <RedeemAll bets={data} />
      {
        data.map(bet => (
          <BetCard key={`${bet.createdAt}-${bet.tokenId}`} bet={bet} />
        ))
      }
    </div>
    <Foots />
    </div>
  )
}
