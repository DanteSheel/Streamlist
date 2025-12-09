// src/components/NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ cartCount }) {
  return (
    <nav className="nav">
      <div className="brand">
        <span className="material-icons">live_tv</span>
        <span className="brand-text">StreamList</span>
      </div>
      <ul className="menu">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/subscriptions"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Subscriptions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/moviesearch"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Trending
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={({ isActive }) => (isActive ? 'active' : '')}>
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
            Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
