"use client"

import { useState, useEffect } from "react"
import CalendarView from "../components/CalendarView"
import AppointmentModal from "../components/AppointmentModal"
import "../styles/Appointments.css"

const Appointments = () => {
  const [appointments, setAppointments] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments")
    if (savedAppointments) {
      try {
        const parsedAppointments = JSON.parse(savedAppointments).map((appt) => ({
          ...appt,
          date: new Date(appt.date),
        }))
        setAppointments(parsedAppointments)
      } catch (error) {
        console.error("Error parsing appointments:", error)
      }
    }
  }, [])

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments))
  }, [appointments])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedAppointment(null)
  }

  const handleAddAppointment = () => {
    if (!selectedDate) {
      setSelectedDate(new Date())
    }
    setIsModalOpen(true)
  }

  const handleSaveAppointment = (appointmentData) => {
    setAppointments((prev) => [...prev, appointmentData])
  }

  const getAppointmentsForSelectedDate = () => {
    if (!selectedDate) return []

    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date)
      return (
        appointmentDate.getDate() === selectedDate.getDate() &&
        appointmentDate.getMonth() === selectedDate.getMonth() &&
        appointmentDate.getFullYear() === selectedDate.getFullYear()
      )
    })
  }

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment)
  }

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <h1>Appointments</h1>
        <button className="add-appointment-btn" onClick={handleAddAppointment}>
          + New Appointment
        </button>
      </div>

      <div className="appointments-container">
        <div className="calendar-section">
          <CalendarView onDateSelect={handleDateSelect} appointments={appointments} />
        </div>

        <div className="appointments-details">
          {selectedDate ? (
            <>
              <h2>
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>

              <div className="appointments-list">
                {getAppointmentsForSelectedDate().length > 0 ? (
                  getAppointmentsForSelectedDate().map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`appointment-card ${selectedAppointment?.id === appointment.id ? "selected" : ""}`}
                      onClick={() => handleViewAppointment(appointment)}
                    >
                      <div className="appointment-time">{appointment.time}</div>
                      <div className="appointment-doctor">{appointment.doctor.name}</div>
                      <div className="appointment-reason">{appointment.reason}</div>
                    </div>
                  ))
                ) : (
                  <div className="no-appointments">
                    <p>No appointments scheduled for this date.</p>
                    <button onClick={handleAddAppointment}>Schedule Appointment</button>
                  </div>
                )}
              </div>

              {selectedAppointment && (
                <div className="appointment-details">
                  <h3>Appointment Details</h3>
                  <div className="detail-row">
                    <span className="label">Doctor:</span>
                    <span>{selectedAppointment.doctor.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Specialty:</span>
                    <span>{selectedAppointment.doctor.specialty}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Date:</span>
                    <span>{new Date(selectedAppointment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Time:</span>
                    <span>{selectedAppointment.time}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Reason:</span>
                    <span>{selectedAppointment.reason}</span>
                  </div>
                  {selectedAppointment.notes && (
                    <div className="detail-row">
                      <span className="label">Notes:</span>
                      <span>{selectedAppointment.notes}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="select-date-prompt">
              <p>Select a date to view or schedule appointments</p>
            </div>
          )}
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onSave={handleSaveAppointment}
      />
    </div>
  )
}

export default Appointments

