import { GamesQuery } from '@azuro-org/sdk'
import Link from 'next/link'
import dayjs from 'dayjs'
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


type Props = {
  game: GamesQuery['games'][0]
}

export function GameCard(props: Props) {
  const { gameId, sport, league, participants, startsAt } = props.game

  return (
  
    <Link
      className="p-8 bg-zinc-900 rounded transition"
      style={{display:'flow',marginBottom:'10px'}}
      href={`/events/${sport.slug}/${gameId}`}
    >
      <div className={`flex justify-between bg-zinc-700  ${daysone.className}`} style={{padding:'8px',borderRadius:'6px', color:'white'}}>
        <span>{sport.name}</span>
        <span>{dayjs(startsAt * 1000).format('DD MMM HH:mm')}</span>
      </div>
      <div className={`mt-2 text-sm text-gray-400  ${daysone.className}`}>
        {league.country.name} &middot; {league.name}
      </div>
      <div className="mt-3 space-y-1 bg-zinc-700 p-3" style={{borderRadius:'6px'}} >
        {
          participants.map(({ image, name }) => (
            <div key={name} className="flex items-center" >
              <div className="flex items-center justify-center w-8 h-8 mr-2 border border-zinc-300 rounded-full">
                {
                  Boolean(image) && (
                    <img className="w-4 h-4" src={image!} alt="" />
                  )
                }
              </div>
              <span className={`text-md  text-white ${daysone.className}`}>{name}</span>
            </div>
          ))
        }
      </div>
    </Link>
  )
}
