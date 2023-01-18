import React, { ComponentType } from 'react'
import { Redirect, Route } from 'react-router'

import { useAuth } from 'context/AuthContext'

interface IPrivateRouteProps {
  path: string,
  exact: boolean,
  component: ComponentType<any>,
  children?: React.ReactNode
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({children, ...rest}) => {
  const { user } = useAuth()
  return (
    <Route {...rest}>
      {
        !user ? <Redirect to="/login" /> : children
      }
    </Route>
  )
}

export default PrivateRoute
