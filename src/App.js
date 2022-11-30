import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Checkout from './Pages/Checkout'
import Restoapp from './Pages/maincontent'

function App () {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Restoapp /> } />
    <Route path='/viewcart' element={<Checkout /> } />
      </Routes>
    </BrowserRouter>

  )
}

export default App
