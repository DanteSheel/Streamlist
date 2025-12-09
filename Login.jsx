import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="login-page">
      <div className="login-card">
        <h1>StreamList Login</h1>
        <p>Sign in with your Google account to continue.</p>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);

            const userData = {
              name: decoded.name,
              email: decoded.email,
              picture: decoded.picture
            };

            login(userData);
            navigate("/");
          }}
          onError={() => {
            alert("Google Login Failed");
          }}
        />
      </div>
    </section>
  );
}
