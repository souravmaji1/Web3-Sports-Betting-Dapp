






'use client'
import { useState } from 'react'
import { type GameMarkets, MarketOutcome } from '@azuro-org/sdk'
import { PlaceBetModal, OutcomeButton } from '@/components'
import { Days_One } from 'next/font/google'
import { Dela_Gothic_One } from 'next/font/google'


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

  const handleOutcomeClick = (outcome: any) => {
    setSelectedOutcome(outcome)
  }

  const handleModalClose = () => {
    setSelectedOutcome(undefined)
  }

  return (
    <>
      <div className="max-w-[600px] mx-auto mt-12 space-y-6" style={{marginTop: "-830px",marginLeft:'323px'}}>
      <div className="scroll-container" style={{ maxHeight: '800px', overflowY: 'auto', width:"172%" }}>
        {
          markets.map(({ name, description, outcomeRows }) => (
            <div key={name} className='bg-zinc-900' style={{padding:"30px", borderBottom:'2px solid gray'}}>
              <div className={`mb-2 text-lg font-semibold text-white  ${daysone.className}`} >{name}</div>
              <div className="space-y-1">
                {
                  outcomeRows.map((outcomes, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex gap-2 w-full">
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