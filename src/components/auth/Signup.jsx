import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FaEnvelope, FaLock, FaUserPlus, FaGithub } from "react-icons/fa";

function Signup({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp(
      { email, password },
      { emailRedirectTo: window.location.origin }
    );
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
        <h1>Create Account</h1>
        <button className="github-btn" onClick={handleGitHubLogin}>
          <FaGithub /> Sign up with GitHub
        </button>
        <div className="divider">OR</div>
        <form onSubmit={handleSignup}>
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
            <FaUserPlus /> Sign Up
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
