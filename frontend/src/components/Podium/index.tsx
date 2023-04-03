import React from 'react'

import PodiumStep from 'components/Podium/PodiumStep'
import { IPlayerGameResponse } from 'interfaces/player-interface'

export interface IPodiumProps {
  players: IPlayerGameResponse[]
}

export interface IPodiumPlayer extends IPlayerGameResponse {
  position: number
}

const Podium = ({players}: IPodiumProps) => {
  const createPodium = (len: number): number[] => {
    let half1: number[] = []
    let half2: number[] = []
    let res: number[] = []
    for (let i = len; i >= 0; i--) {
      if (i % 2 == 0) {
        half1.push(i)
      } else {
        half2.unshift(i)
      }
    }
    res = half1.concat(half2)
    return res
  }

  // PLAYERS VARIABLE SHOULD NOT BE MUTATED SO WE NEED TO SPREAD THE ARRAY
  const playersOrdered = [...players]
    .sort((a, b) => { return b.score - a.score})
    .map((player, position) => ({ ...player, position }))
  
  // TODO: fix podiumOrder: any[]
  const podium: IPodiumPlayer[] = createPodium(playersOrdered.length)
    .reduce((podiumOrder: any[], position: number) => [...podiumOrder, playersOrdered[position]], [])
    .filter(Boolean)

  return (
    <div
      style={{
        display: 'grid',
        gridAutoFlow: 'column dense',
        gap: '.5rem',
        marginTop: '2rem',
        justifyContent: 'center',
        justifyItems: 'center',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        borderBottom: '1px solid #e5e7eb',
        height: 250
      }}
    >
      {podium.map((player, i) => (
        <PodiumStep key={player.player_id} podium={podium} player={player} />
      ))}
    </div>
  )
}

export default Podium
