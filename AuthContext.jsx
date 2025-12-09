import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const saved = localStorage.getItem("streamlist_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
  }, []);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem("streamlist_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("streamlist_user");
    }
  }, [user]);

  function login(googleUser) {
    
    setUser(googleUser);
  }

  function logout() {
    setUser(null);
  }

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
