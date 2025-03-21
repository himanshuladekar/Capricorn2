"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import {
  HomeIcon,
  CalendarIcon,
  UserIcon,
  FileTextIcon,
  MessageCircleIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from "./Icons"
import "../styles/Sidebar.css"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <>
      <button className="mobile-toggle" onClick={toggleSidebar}>
        {isOpen ? <XIcon /> : <MenuIcon />}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>MediCare</h2>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setIsOpen(false)}>
                <HomeIcon />
                <span>Overview</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointments"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsOpen(false)}
              >
                <CalendarIcon />
                <span>Appointments</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctors"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsOpen(false)}
              >
                <UserIcon />
                <span>Doctors</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pathology"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsOpen(false)}
              >
                <FileTextIcon />
                <span>Pathology Results</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/chats"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsOpen(false)}
              >
                <MessageCircleIcon />
                <span>Chats</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsOpen(false)}
              >
                <SettingsIcon />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

