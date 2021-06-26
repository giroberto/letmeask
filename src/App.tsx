import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route} from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import './styles/global.scss';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRoom} />
        <Route path="/rooms/:id" exact component={Room} />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
