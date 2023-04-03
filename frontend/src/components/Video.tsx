import React from 'react'
import ReactPlayer from 'react-player' 

const Video = ({url}) => {
  return (
    <div>
      <ReactPlayer
          controls={true}
          url={url}
          playing={ false}
          width='800px'
          height='500px'
          // className='react-player'
        />
    </div>
  )
}

export default Video
