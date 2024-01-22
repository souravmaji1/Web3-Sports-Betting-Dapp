






'use client'
import { useState } from 'react'
import { type GameMarkets, MarketOutcome } from '@azuro-org/sdk'
import { PlaceBetModal, OutcomeButton } from '@/components'
import { Days_One } from 'next/font/google'
import { Dela_Gothic_One } from 'next/font/google'
import { useEffect } from 'react';

const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});

const dela = Dela_Gothic_One({
  subsets: ['latin'],
  weight: '400'
});

type GameMarketsProps = {
  markets: GameMarkets
}

export function GameMarkets(props: GameMarketsProps) {
  const { markets } = props

  const [ selectedOutcome, setSelectedOutcome ] = useState<MarketOutcome>()

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

  const handleOutcomeClick = (outcome: any) => {
    setSelectedOutcome(outcome)
  }

  const handleModalClose = () => {
    setSelectedOutcome(undefined)
  }

  return (
    <>
      <div className="max-w-[600px] mx-auto mt-12 space-y-6" style={{marginTop: isMobile ? "-738px" : "-768px",marginLeft: isMobile ? '0' : '323px', display: isMobile ? 'flex' : 'grid'}}>
      <div className="scroll-container" style={{ maxHeight: '736px', overflowY: 'auto', width:"172%" }}>
        {
          markets.map(({ name, description, outcomeRows }) => (
            <div key={name} className='bg-zinc-900' style={{padding:"30px", borderBottom:'2px solid gray'}}>
              <div className={`mb-2 text-lg font-semibold text-white  ${daysone.className}`} >{name}</div>
              <div className="space-y-1">
                {
                  outcomeRows.map((outcomes, index) => (
                    <div key={index} className="flex justify-between">
                      <div className={`flex gap-2 w-full  ${
          isMobile ? 'flex gap-2 w-full flex-wrap' : ' '
        } `}>
                        {
                          outcomes.map((outcome) => (
                            <OutcomeButton 
                              key={outcome.selectionName} 
                              outcome={outcome} 
                              onClick={() => handleOutcomeClick(outcome)} 
                            />
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
              
            </div>
          ))
        }
        </div>
      </div>
      {
        Boolean(selectedOutcome) && (
          <PlaceBetModal
            outcome={selectedOutcome!}
            closeModal={handleModalClose}
          />
        )
      }
    </>
  )
}