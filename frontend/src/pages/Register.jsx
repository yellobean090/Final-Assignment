import { useState } from "react";
import api from "../api/axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .auth-root {
    min-height: 100vh;
    background: #0F1117;
    font-family: 'Inter', sans-serif;
    color: #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
  }

  .auth-card {
    width: 100%;
    max-width: 400px;
    background: #1A1D2E;
    border: 1px solid #2A2D3E;
    border-radius: 16px;
    padding: 36px 32px;
  }

  .auth-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
  }
  .auth-logo-dot {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    background: linear-gradient(135deg, #6C63FF, #22D3A5);
    flex-shrink: 0;
  }
  .auth-logo-text {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: #F1F5F9;
  }

  .auth-heading {
    font-size: 22px;
    font-weight: 800;
    color: #F1F5F9;
    letter-spacing: -0.4px;
    margin-bottom: 4px;
  }
  .auth-subtext {
    font-size: 13px;
    color: #64748B;
    margin-bottom: 28px;
  }
  .auth-subtext a {
    color: #6C63FF;
    text-decoration: none;
    font-weight: 500;
  }
  .auth-subtext a:hover { text-decoration: underline; }

  .auth-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #94A3B8;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 6px;
    margin-top: 16px;
  }
  .auth-label:first-of-type { margin-top: 0; }

  .auth-input {
    width: 100%;
    background: #0F1117;
    border: 1px solid #2A2D3E;
    border-radius: 8px;
    padding: 11px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #E2E8F0;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .auth-input::placeholder { color: #4A5068; }
  .auth-input:focus {
    border-color: #6C63FF;
    box-shadow: 0 0 0 3px rgba(108,99,255,0.15);
  }

  .auth-btn {
    width: 100%;
    margin-top: 24px;
    background: #6C63FF;
    color: #fff;
    border: none;
    border-radius: 9px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    padding: 12px;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    letter-spacing: 0.01em;
  }
  .auth-btn:hover { background: #7C74FF; }
  .auth-btn:active { transform: scale(0.98); }

  .auth-divider {
    height: 1px;
    background: #2A2D3E;
    margin: 20px 0;
  }
  .auth-hint {
    font-size: 11px;
    color: #4A5068;
    margin-top: 8px;
  }
`;

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Account created! You can now sign in.");
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="auth-logo-dot" />
            <span className="auth-logo-text">Taskboard</span>
          </div>

          <h1 className="auth-heading">Create an account</h1>
          <p className="auth-subtext">
            Already have one? <a href="/">Sign in</a>
          </p>

          <form onSubmit={handleSubmit}>
            <label className="auth-label" htmlFor="name">Name</label>
            <input
              id="name"
              className="auth-input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="auth-label" htmlFor="email">Email</label>
            <input
              id="email"
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="auth-label" htmlFor="password">Password</label>
            <input
              id="password"
              className="auth-input"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="auth-hint">Use a strong password you don't use elsewhere.</p>

            <button className="auth-btn" type="submit">Create account</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;