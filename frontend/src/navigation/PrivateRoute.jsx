import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'

import AuthContext from 'context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
  const { user } = useContext(AuthContext)
  return (
    <Route {...rest}>
      {
        !user ? <Redirect to="/login" /> : children
      }
    </Route>
  )
}

export default PrivateRoute
