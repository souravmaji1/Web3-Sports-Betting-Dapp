'use client'
import { useParams } from 'next/navigation'
import { useGames, Game_OrderBy } from '@azuro-org/sdk'
import { GameCard, SportsNavigation } from '@/components'
import WalletInfo from '../../../components/WalletInfo'
import BettingImage from '../../../../public/betting.png'
import Image from 'next/image';

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

  return (
    <>
      <SportsNavigation />
   
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-zinc-800" style={{ display: 'flow', marginTop: '-1087px', marginLeft: '321px',maxHeight: '1055px', overflowY: 'auto' }}  >
             <Image style={{width:'100%', padding:'3px 3px 10px'}} src={BettingImage} alt="" />
            {
              data?.games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            }
          </div>
        )
      }
    </>
  )
}
