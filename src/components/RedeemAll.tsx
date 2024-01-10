'use client'
import React from 'react';
import { type Bet, useRedeemBet } from '@azuro-org/sdk'
import cx from 'clsx';
import BettingImage from '../../public/betting.png'
import Image from 'next/image';
import { Days_One } from 'next/font/google'


const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});


type Props = {
  bets: Bet[]
}

export function RedeemAll(props: Props) {
  const { bets } = props

  const { submit, isPending, isProcessing } = useRedeemBet()

  const unredeemedBets = bets?.filter((bet) => (
    !bet.freebetContractAddress
    && bet.isRedeemable
  ))

  const isDisabled = !unredeemedBets.length || isPending || isProcessing

  const handleRedeem = async () => {
    try {
      await submit({ bets: unredeemedBets })
    } catch {}
  }

  let buttonTitle = 'Redeem Your Price'
  
  if (isPending) {
    buttonTitle = 'Waiting for approval'
  }
  else if (isProcessing) {
    buttonTitle = 'Processing...'
  }

  return (
    <div>
       <Image style={{width:'100%',padding:'3px'}} src={BettingImage} alt="" />
    <button
      className={cx(`py-3.5 text-white font-semibold text-center rounded mb-4 w-full ${daysone.className}`, {
        'bg-blue-500 hover:bg-blue-600 transition shadow-md ': !isDisabled,
        'bg-zinc-300 cursor-not-allowed ': isDisabled,
      })}
      disabled={isDisabled}
      onClick={handleRedeem}
    >
      {buttonTitle}
    </button>
    </div>
  );
};
