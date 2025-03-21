"use client"

import { useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import "../styles/Settings.css"

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    dob: "1990-01-01",
    address: "123 Main St, Anytown, USA",
    emergencyContact: "Jane Doe",
    emergencyPhone: "(555) 987-6543",
    notifications: {
      email: true,
      sms: false,
      appointments: true,
      reminders: true,
      marketing: false,
    },
    language: "english",
    theme: "light",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save settings logic would go here
    alert("Settings saved successfully!")
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-container">
        <div className="settings-tabs">
          <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
            Profile
          </button>
          <button
            className={activeTab === "notifications" ? "active" : ""}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button className={activeTab === "preferences" ? "active" : ""} onClick={() => setActiveTab("preferences")}>
            Preferences
          </button>
          <button className={activeTab === "security" ? "active" : ""} onClick={() => setActiveTab("security")}>
            Security
          </button>
        </div>

        <div className="settings-content">
          {activeTab === "profile" && (
            <form onSubmit={handleSubmit}>
              <h2>Personal Information</h2>

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>

              <h2>Emergency Contact</h2>

              <div className="form-group">
                <label htmlFor="emergencyContact">Contact Name</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyPhone">Contact Phone</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === "notifications" && (
            <form onSubmit={handleSubmit}>
              <h2>Notification Preferences</h2>

              <div className="notification-options">
                <div className="notification-group">
                  <h3>Notification Channels</h3>

                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="email"
                      name="email"
                      checked={formData.notifications.email}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="email">Email Notifications</label>
                  </div>

                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="sms"
                      name="sms"
                      checked={formData.notifications.sms}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="sms">SMS Notifications</label>
                  </div>
                </div>

                <div className="notification-group">
                  <h3>Notification Types</h3>

                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="appointments"
                      name="appointments"
                      checked={formData.notifications.appointments}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="appointments">Appointment Confirmations</label>
                  </div>

                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="reminders"
                      name="reminders"
                      checked={formData.notifications.reminders}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="reminders">Medication Reminders</label>
                  </div>

                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="marketing"
                      name="marketing"
                      checked={formData.notifications.marketing}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="marketing">Marketing & Promotions</label>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === "preferences" && (
            <form onSubmit={handleSubmit}>
              <h2>App Preferences</h2>

              <div className="form-group">
                <label htmlFor="language">Language</label>
                <select id="language" name="language" value={formData.language} onChange={handleChange}>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="theme">Theme</label>
                <select id="theme" name="theme" value={formData.theme} onChange={handleChange}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === "security" && (
            <div className="security-settings">
              <h2>Account Security</h2>

              <div className="security-option">
                <h3>Change Password</h3>
                <p>Update your password to keep your account secure.</p>
                <button className="change-password-btn">Change Password</button>
              </div>

              <div className="security-option">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account.</p>
                <button className="enable-2fa-btn">Enable 2FA</button>
              </div>

              <div className="security-option">
                <h3>Login History</h3>
                <p>View your recent login activity.</p>
                <button className="view-history-btn">View History</button>
              </div>

              <div className="security-option">
                <h3>Sign Out</h3>
                <p>Sign out from your account on this device.</p>
                <button className="logout-btn" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>

              <div className="security-option danger-zone">
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all associated data.</p>
                <button className="delete-account-btn">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings

