import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FaEnvelope, FaLock, FaSignInAlt, FaGithub } from "react-icons/fa";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data.user) setUser(data.user);
    if (error) alert(error.message);
  };

  const handleGitHubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
    if (error) alert(error.message);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo-container">
          <FaGithub className="github-logo" />
        </div>
        <h1>Sign In</h1>
        <button className="github-btn" onClick={handleGitHubLogin}>
          <FaGithub /> Sign in with GitHub
        </button>
        <div className="divider">OR</div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            <FaSignInAlt /> Sign In
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
