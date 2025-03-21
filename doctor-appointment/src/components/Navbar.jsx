"use client"

import { useState } from "react"
import "../styles/Navbar.css"

const Navbar = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>MediCare</h1>
        </div>

        <div className="navbar-right">
          <div className="notification-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="notification-badge">3</span>
          </div>

          <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="avatar">{user?.email?.charAt(0).toUpperCase() || "U"}</div>
            <div className="user-info">
              <p className="user-name">{user?.displayName || "User"}</p>
              <p className="user-role">Patient</p>
            </div>

            {showDropdown && (
              <div className="dropdown-menu">
                <ul>
                  <li>Profile</li>
                  <li>Settings</li>
                  <li>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

