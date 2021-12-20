import React from 'react'

const Logo = (props) => {
  return (
    <img
      alt='Logo'
      src='/static/logo.png'
      height='40px'
      width='40px'
      {...props}
    />
  )
}

export default Logo
