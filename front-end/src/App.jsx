import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import MainPage from './components/MainPage'
import WelcomePage from './components/WelcomePage'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* http://localhost:8080 */}
       <Route path='/' element = {<WelcomePage/>}></Route>
      {/* http://localhost:8080/register */}
      <Route path='/register' element = {<RegisterComponent/>}></Route>
      {/* http://localhost:8080/login */}
      <Route path='/login' element = {<LoginComponent/>}></Route>
      {/* http://localhost:8080/main */}
      <Route path='/main' element = {<MainPage/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
