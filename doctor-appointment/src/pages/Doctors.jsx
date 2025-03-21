

import { useState } from "react"
import "../styles/Doctors.css"

const Doctors = () => {
  const [doctors] = useState([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.8,
      patients: 1200,
      image: "/placeholder.svg?height=150&width=150",
      availability: ["Mon", "Wed", "Fri"],
      bio: "Dr. Johnson is a board-certified cardiologist specializing in preventive cardiology and heart disease management.",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      experience: "10 years",
      rating: 4.7,
      patients: 950,
      image: "/placeholder.svg?height=150&width=150",
      availability: ["Tue", "Thu", "Sat"],
      bio: "Dr. Chen specializes in medical and cosmetic dermatology, with expertise in treating skin conditions and performing minimally invasive procedures.",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      experience: "12 years",
      rating: 4.9,
      patients: 1500,
      image: "/placeholder.svg?height=150&width=150",
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      bio: "Dr. Rodriguez is passionate about child health and development, providing comprehensive care from infancy through adolescence.",
    },
    {
      id: "4",
      name: "Dr. David Kim",
      specialty: "Neurologist",
      experience: "18 years",
      rating: 4.6,
      patients: 1100,
      image: "/placeholder.svg?height=150&width=150",
      availability: ["Wed", "Thu", "Fri"],
      bio: "Dr. Kim is an experienced neurologist specializing in headache disorders, stroke management, and neurodegenerative diseases.",
    },
    {
      id: "5",
      name: "Dr. Lisa Patel",
      specialty: "Orthopedic Surgeon",
      experience: "14 years",
      rating: 4.8,
      patients: 980,
      image: "/placeholder.svg?height=150&width=150",
      availability: ["Mon", "Tue", "Thu"],
      bio: "Dr. Patel specializes in sports medicine and joint replacement surgery, helping patients regain mobility and improve quality of life.",
    },
    {
      id: "6",
      name: "Dr. James Wilson",
      specialty: "Psychiatrist",
      experience: "16 years",
      rating: 4.7,
      patients: 850,
      image: "/placeholder.svg?height=150&width=150",
      availability: ["Tue", "Wed", "Fri"],
      bio: "Dr. Wilson provides compassionate mental health care, specializing in mood disorders, anxiety, and PTSD treatment.",
    },
  ])

  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState("")

  const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = filterSpecialty === "" || doctor.specialty === filterSpecialty

    return matchesSearch && matchesSpecialty
  })

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor)
  }

  return (
    <div className="doctors-page">
      <h1>Our Doctors</h1>

      <div className="doctors-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search doctors by name or specialty"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="specialty-filter">
          <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)}>
            <option value="">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="doctors-container">
        <div className="doctors-list">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`doctor-card ${selectedDoctor?.id === doctor.id ? "selected" : ""}`}
                onClick={() => handleDoctorClick(doctor)}
              >
                <div className="doctor-image">
                  <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                </div>
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialty">{doctor.specialty}</p>
                  <div className="doctor-stats">
                    <span className="experience">{doctor.experience} exp</span>
                    <span className="rating">⭐ {doctor.rating}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No doctors found matching your search criteria.</p>
            </div>
          )}
        </div>

        {selectedDoctor && (
          <div className="doctor-details">
            <div className="doctor-profile">
              <div className="profile-header">
                <img src={selectedDoctor.image || "/placeholder.svg"} alt={selectedDoctor.name} />
                <div>
                  <h2>{selectedDoctor.name}</h2>
                  <p className="specialty">{selectedDoctor.specialty}</p>
                </div>
              </div>

              <div className="profile-stats">
                <div className="stat">
                  <span className="value">{selectedDoctor.experience}</span>
                  <span className="label">Experience</span>
                </div>
                <div className="stat">
                  <span className="value">{selectedDoctor.patients}+</span>
                  <span className="label">Patients</span>
                </div>
                <div className="stat">
                  <span className="value">⭐ {selectedDoctor.rating}</span>
                  <span className="label">Rating</span>
                </div>
              </div>

              <div className="profile-bio">
                <h3>About</h3>
                <p>{selectedDoctor.bio}</p>
              </div>

              <div className="profile-availability">
                <h3>Availability</h3>
                <div className="days">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <span key={day} className={selectedDoctor.availability.includes(day) ? "available" : "unavailable"}>
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <button className="book-appointment">Book Appointment</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctors

