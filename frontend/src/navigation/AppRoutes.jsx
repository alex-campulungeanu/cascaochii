import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import LayoutContainer from './Layouts/LayoutContainer'
import MainLayout from '../layouts/MainLayout'

import GameRun from '../pages/GameRun'
import GameList from '../pages/GameList'
import GameUpdate from '../pages/GameCRUD/index'
import GameTab from '../pages/GameCRUD/GameTab'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <LayoutContainer layout={MainLayout} isPublic={true}>
          {/* a Switch is needed here for ambigous routing */}
          <Switch>
            <Route path={'/games'} exact component={() => <GameList />} />
            <Route path={'/games/create'} exact component={() => <GameTab />} />
            <Route path={'/games/:id'} exact component={() => <GameRun />} />
            <Route path={'/games/:id/edit'} exact component={() => <GameUpdate />} />
          </Switch>
        </LayoutContainer>
        <Route component={() => <div>404 page not found</div>}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRoutes
