import React from 'react'

import TopBar from './TopBar'

const MainLayout = ({children}) => {
  return (
    <div>
      <TopBar/>
      <div>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
