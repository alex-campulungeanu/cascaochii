import React from 'react'
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'

import LayoutContainer from './layouts/LayoutContainer'
import MainLayout from 'navigation/layouts/MainLayout'

import GameRun from '../pages/GameRun'
import GameList from '../pages/GameList'
import GameUpdate from '../pages/GameCRUD/index'
import GameTab from '../pages/GameCRUD/GameTab'
import Login from '../pages/Login'
import PrivateRoute from 'navigation/PrivateRoute'
import { AuthProvider } from 'context/AuthContext'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path={'/login'} exact component={() => <Login />} />
          <LayoutContainer layout={MainLayout} isPublic={true}>
            {/* a Switch is needed here for ambigous routing */}
            <Switch>
              <PrivateRoute path={'/games'} exact component={() => <GameList />} />
              <PrivateRoute path={'/games/create'} exact component={() => <GameTab />} />
              <PrivateRoute path={'/games/:id'} exact component={() => <GameRun />} />
              <PrivateRoute path={'/games/:id/edit'} exact component={() => <GameUpdate />} />
              {/* <Redirect from="/" to="/games" /> */}
            </Switch>
          </LayoutContainer>
          {/* <Route component={() => <div>404 page not found</div>}></Route> */}
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRoutes
