import React, { useEffect, useState, useRef } from 'react'
import webFont from "webfontloader"
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom'
import LoginSignUp from './components/Authentication/LoginSignup'
import Home from './components/ListUsers/Home'
import store from "./store/store"
import Footer from './components/layout/Footer/Footer'
// import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import UpdateUser from './components/UpdateUser/UpdateUser'
import DeleteUser from './components/UpdateUser/DeleteUser'
import Header from './components/layout/Header/Header'

const App = () => {


  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })


  }, [])


  return (
    <>
      <div className="body">
        <BrowserRouter>
        <Header/>
          <Routes>
            {/* <Route path="/" element={<Home />}></Route> */}
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<LoginSignUp/>}></Route>
            <Route path="/update/:id" element={<UpdateUser/>}></Route>
            <Route path="/delete/:id" element={<DeleteUser/>}></Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App