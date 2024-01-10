'use client'
import { useChain, type ChainId } from '@azuro-org/sdk';
import { polygonMumbai, arbitrumGoerli } from 'viem/chains';
import { Days_One } from 'next/font/google'


const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});

export function SelectAppChain() {
  const { appChain, setAppChainId } = useChain()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAppChainId(+event.target.value as ChainId)
  }

  return (
    <select className={`mr-4 cursor-pointer rounded-lg ${daysone.className}`} value={appChain.id} onChange={handleChange}>
      <option value={polygonMumbai.id}>{polygonMumbai.name}</option>
      <option value={arbitrumGoerli.id}>{arbitrumGoerli.name}</option>
    </select>
  )
}
