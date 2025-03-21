

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"

// Components
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Auth from "./pages/Auth"
import Overview from "./pages/Overview"
import Appointments from "./pages/Appointments"
import Doctors from "./pages/Doctors"
import PathologyResults from "./pages/PathologyResults"
import Chats from "./pages/Chats"
import Settings from "./pages/Settings"

// CSS
import "./App.css"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Router>
      <div className="app">
        {user ? (
          <>
            <Navbar user={user} />
            <div className="content-container">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/pathology" element={<PathologyResults />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App

