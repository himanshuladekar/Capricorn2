"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase/config"
import "../styles/Auth.css"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        // Login logic
        await signInWithEmailAndPassword(auth, email, password)
        navigate("/")
      } else {
        // Register logic
        if (password !== confirmPassword) {
          setError("Passwords do not match")
          setLoading(false)
          return
        }

        if (password.length < 6) {
          setError("Password must be at least 6 characters")
          setLoading(false)
          return
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        // Update profile with display name
        await updateProfile(userCredential.user, {
          displayName: name,
        })

        navigate("/")
      }
    } catch (error) {
      console.error("Authentication error:", error)

      if (isLogin) {
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          setError("Invalid email or password")
        } else {
          setError("An error occurred during login. Please try again.")
        }
      } else {
        if (error.code === "auth/email-already-in-use") {
          setError("Email is already in use")
        } else {
          setError("An error occurred during registration. Please try again.")
        }
      }

      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>MediCare</h1>
          <p>{isLogin ? "Sign in to your account" : "Create a new account"}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required={!isLogin} />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (isLogin ? "Signing in..." : "Creating Account...") : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="toggle-auth-btn" onClick={toggleMode}>
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth

