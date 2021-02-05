import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '@pages/Login'
import Home from '@pages/Home'
import Resume from '@pages/Resume'

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/resume">
            <Resume />
          </Route>

          <Redirect from='/' to='/home' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
