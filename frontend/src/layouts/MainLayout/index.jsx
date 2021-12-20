import React from 'react'
import {Outlet} from 'react-router-dom'

import TopBar from './TopBar'

const MainLayout = ({children}) => {
  return (
    <div>
      <TopBar/>
      {/* <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      /> */}
      <div>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
