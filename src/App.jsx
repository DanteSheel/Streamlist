import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import StreamList from './pages/StreamList';
import Movies from './pages/Movies';
import Cart from './pages/Cart';
import About from './pages/About';
import './App.css';

export default function App(){
  return (
    <div className='app'>
      <NavBar />
      <main className='main'>
        <Routes>
          <Route path='/' element={<StreamList />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
      <footer className='footer'>© EZTechMovie - StreamList</footer>
    </div>
  );
}
