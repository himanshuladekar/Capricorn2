"use client"

import { useState, useEffect } from "react"
import { ClockIcon, XIcon } from "./Icons"
import "../styles/AppointmentModal.css"

const AppointmentModal = ({ isOpen, onClose, selectedDate, onSave }) => {
  const [formData, setFormData] = useState({
    doctorId: "",
    time: "",
    reason: "",
    notes: "",
  })

  const [doctors, setDoctors] = useState([
    { id: "1", name: "Dr. Sarah Johnson", specialty: "Cardiologist" },
    { id: "2", name: "Dr. Michael Chen", specialty: "Dermatologist" },
    { id: "3", name: "Dr. Emily Rodriguez", specialty: "Pediatrician" },
    { id: "4", name: "Dr. David Kim", specialty: "Neurologist" },
  ])

  const [availableTimes, setAvailableTimes] = useState([
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ])

  useEffect(() => {
    if (selectedDate) {
      // Reset form when date changes
      setFormData({
        doctorId: "",
        time: "",
        reason: "",
        notes: "",
      })
    }
  }, [selectedDate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.doctorId || !formData.time) {
      alert("Please select a doctor and time")
      return
    }

    const selectedDoctor = doctors.find((doc) => doc.id === formData.doctorId)

    const appointmentData = {
      id: Date.now().toString(),
      date: selectedDate,
      time: formData.time,
      doctor: selectedDoctor,
      reason: formData.reason,
      notes: formData.notes,
    }

    onSave(appointmentData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="appointment-modal">
        <div className="modal-header">
          <h2>Book Appointment</h2>
          <button className="close-btn" onClick={onClose}>
            <XIcon />
          </button>
        </div>

        <div className="modal-body">
          <div className="selected-date">
            <h3>
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="doctorId">Select Doctor</label>
              <select id="doctorId" name="doctorId" value={formData.doctorId} onChange={handleChange} required>
                <option value="">-- Select a doctor --</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Select Time</label>
              <div className="time-slots">
                {availableTimes.map((time) => (
                  <div
                    key={time}
                    className={`time-slot ${formData.time === time ? "selected" : ""}`}
                    onClick={() => setFormData((prev) => ({ ...prev, time }))}
                  >
                    <ClockIcon />
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Visit</label>
              <input
                type="text"
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Brief description of your visit"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any additional information for the doctor"
                rows="3"
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AppointmentModal

