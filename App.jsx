import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import StreamList from './pages/StreamList';
import MovieSearch from './pages/MovieSearch';
import Movies from './pages/Movies';
import CartPage from './pages/Cart';
import About from './pages/About';
import Subscriptions from './pages/Subscriptions';
import Login from './pages/Login'; 
import ProtectedRoute from './components/ProtectedRoute';
import CreditCard from "./pages/CreditCard";
import './App.css';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved cart', e);
      }
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  
  function handleAddToCart(product) {
    const isSubscription = product.type === 'subscription'; 

    if (isSubscription) {
      const alreadyHasSubscription = cartItems.some(
        (item) => item.type === 'subscription'
      );
      if (alreadyHasSubscription) {
        
        return 'subscription-exists';
      }
    }

    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          ...product,
          quantity: 1
        }
      ]);
    }

    return null; 
  }


  function handleRemoveItem(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  
  function handleUpdateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
      
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }


  return (
    <div className="app">
      {/* NavBar should not show on login screen for separation */}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <>
                <NavBar cartCount={cartCount} />
                <main className="main">
                  <Routes>
                    <Route path="/" element={<StreamList />} />
                    <Route path="/moviesearch" element={<MovieSearch />} />
                    <Route
                      path="/subscriptions"
                      element={<Subscriptions onAddToCart={handleAddToCart} />}
                    />
                    <Route
                      path="/cart"
                      element={
                        <CartPage
                          cartItems={cartItems}
                          total={cartTotal}
                          onRemoveItem={handleRemoveItem}
                          onUpdateQuantity={handleUpdateQuantity}
                        />
                      }
                    />
                    <Route path="/checkout" element={<CreditCard />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </main>
                <footer className="footer">
                  © {new Date().getFullYear()} EZTechMovie - StreamList
                </footer>
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
