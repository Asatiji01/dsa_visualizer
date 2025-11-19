import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Visualizer from './components/Visualizer'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import PrivateRoute from './components/PrivateRoute'
import Theory from "./components/Theory";
export default function App(){
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<PrivateRoute><Visualizer/></PrivateRoute>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/theory/:algo" element={<Theory />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
