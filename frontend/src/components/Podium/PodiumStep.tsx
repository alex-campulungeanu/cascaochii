import React from 'react'
import {motion} from 'framer-motion'

import { IPodiumPlayer } from 'components/Podium'

interface IPodiumStepProps {
  podium: IPodiumPlayer[];
  player: IPodiumPlayer;
}

const PodiumStep = ({podium, player}: IPodiumStepProps) => {
  const offset = podium.length - player.position

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center'
      }}
    >
      <motion.div
        style={{
          alignSelf: 'center',
          marginBottom: '.25rem'
        }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              // delay: 1 + (offset + 2),
              delay: 0,
              duration: 0.75
            }
          },
          hidden: { opacity: 0 }
        }}
      >
        <div>{player.player_name}</div>
      </motion.div>

      <motion.div
        style={{
          width: '4rem',
          placeContent: 'center',
          display: 'flex',
          borderTopLeftRadius: '.5rem',
          borderTopRightRadius: '.5rem',
          borderColor: 'rgba(190,24,93,1)',
          backgroundColor: '#24778c',
          marginBottom: -1,
          filter: `opacity(${0.1 + offset / podium.length})`
        }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            height: 200 * (offset / podium.length),
            opacity: 1,
            transition: {
              // delay: 1 + offset,
              delay: 0,
              duration: 2,
              ease: 'backInOut'
            }
          },
          hidden: { opacity: 0, height: 0 }
        }}
      >
        <span style={{ color: 'white', alignSelf: 'flex-end' }}>
          {player.score}
        </span>
      </motion.div>
    </div>
  )
}

export default PodiumStep
