import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar(){
  return (
    <nav className='nav'>
      <div className='brand'>
        <span className="material-icons">live_tv</span>
        <h1>StreamList</h1>
      </div>
      <ul className='menu'>
        <li><NavLink to='/' end className={({isActive})=> isActive? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to='/movies' className={({isActive})=> isActive? 'active' : ''}>Movies</NavLink></li>
        <li><NavLink to='/cart' className={({isActive})=> isActive? 'active' : ''}>Cart</NavLink></li>
        <li><NavLink to='/about' className={({isActive})=> isActive? 'active' : ''}>About</NavLink></li>
      </ul>
    </nav>
  );
}
