'use client'
import { type MarketOutcome, useOutcome } from '@azuro-org/sdk'
import { Days_One } from 'next/font/google'


const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});


type OutcomeProps = {
  className?: string
  outcome: MarketOutcome
  onClick: (outcome: MarketOutcome) => void
}

export function OutcomeButton(props: OutcomeProps) {
  const { className, outcome, onClick } = props

  const { odds, isLocked, isOddsFetching } = useOutcome({
    selection: outcome,
    initialOdds: outcome.odds,
    initialStatus: outcome.status,
  })

  const buttonClassName = `flex justify-between p-5  hover:bg-zinc-100 transition bg-zinc-700 rounded-md cursor-pointer w-full disabled:cursor-not-allowed ${daysone.className}  ${className}`

  return (
    <button
      className={buttonClassName}
      onClick={() => onClick(outcome)}
      disabled={isLocked}
    >
      <span className="text-zinc-500">{outcome.selectionName}</span>
      <span className="font-medium">{isOddsFetching ? '--' : parseFloat(odds).toFixed(2)}</span>
    </button>
  )
}
