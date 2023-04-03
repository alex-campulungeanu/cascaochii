import React from 'react'

import TopBar from './TopBar'
import GoBack from  'components/common/GoBack'

const MainLayout = ({children}) => {
  return (
    <div>
      <TopBar/>
      <div style={{margin: '20px'}}>
        <GoBack />
      </div>
      <div style={{margin: '20px'}}>
        {children}
      </div>
    </div>
  )
}

export default MainLayout
