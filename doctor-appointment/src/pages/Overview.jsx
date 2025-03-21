"use client"

import { useState, useEffect } from "react"
import CalendarView from "../components/CalendarView"
import "../styles/Overview.css"

const Overview = () => {
  const [appointments, setAppointments] = useState([])
  const [upcomingAppointments, setUpcomingAppointments] = useState([])

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem("appointments")
    if (savedAppointments) {
      try {
        const parsedAppointments = JSON.parse(savedAppointments).map((appt) => ({
          ...appt,
          date: new Date(appt.date),
        }))
        setAppointments(parsedAppointments)

        // Filter upcoming appointments (today and future)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const upcoming = parsedAppointments
          .filter((appt) => new Date(appt.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3) // Get only the next 3 appointments

        setUpcomingAppointments(upcoming)
      } catch (error) {
        console.error("Error parsing appointments:", error)
      }
    }
  }, [])

  return (
    <div className="overview-page">
      <h1>Dashboard Overview</h1>

      <div className="overview-stats">
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <p className="stat-value">{appointments.length}</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Appointments</h3>
          <p className="stat-value">{upcomingAppointments.length}</p>
        </div>
        <div className="stat-card">
          <h3>Doctors Consulted</h3>
          <p className="stat-value">{new Set(appointments.map((a) => a.doctor?.id)).size}</p>
        </div>
      </div>

      <div className="overview-sections">
        <div className="upcoming-section">
          <h2>Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="upcoming-list">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="upcoming-card">
                  <div className="appointment-date">
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="appointment-time">{appointment.time}</div>
                  <div className="appointment-details">
                    <h4>{appointment.doctor.name}</h4>
                    <p>{appointment.doctor.specialty}</p>
                    <p className="reason">{appointment.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No upcoming appointments</p>
          )}
        </div>

        <div className="calendar-section">
          <h2>Calendar</h2>
          <CalendarView appointments={appointments} />
        </div>
      </div>

      <div className="health-tips">
        <h2>Health Tips</h2>
        <div className="tips-container">
          <div className="tip-card">
            <h3>Stay Hydrated</h3>
            <p>Drink at least 8 glasses of water daily to maintain good health.</p>
          </div>
          <div className="tip-card">
            <h3>Regular Exercise</h3>
            <p>Aim for at least 30 minutes of moderate exercise most days of the week.</p>
          </div>
          <div className="tip-card">
            <h3>Balanced Diet</h3>
            <p>Include a variety of fruits, vegetables, and whole grains in your diet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview

