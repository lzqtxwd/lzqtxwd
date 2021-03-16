import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import intl from 'react-intl-universal';
import locales from '@locales/index'
import Login from '@pages/Login'
import Home from '@pages/Home'
import Resume from '@pages/Resume'

const App = () => {
  const language = localStorage.getItem('lzqLang') || 'zh-CN'

  localStorage.setItem('lzqLang', language)

  // 设置全局语言环境
  intl.init({
    currentLocale: language,
    locales
  })

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
