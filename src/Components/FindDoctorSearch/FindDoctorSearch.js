import { useState } from "react";
import "./FindDoctorSearch.css";

const doctors = [
  { name: "Dentist" },
  { name: "Gynecologist / Obstetrician" },
  { name: "General Physician" },
  { name: "Dermatologist" },
  { name: "Ear-nose-throat (ent) Specialist" },
  { name: "Homeopath" },
];

export default function FindDoctorSearch() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <section className="doctor-search">
      <h2 className="doctor-title">Find a doctor at your own ease</h2>

      <div className="doctor-image-container">
        <img
          src="https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Doctor"
          className="doctor-image"
        />
      </div>

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search doctors by specialty"
            className="search-input"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          <button className="search-btn">
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
        </div>

        {isFocused && (
          <div className="doctor-list">
            {doctors.map((doctor, index) => (
              <div
                key={index}
                className={`doctor-item ${index === 0 ? "active" : ""}`}
              >
                <span className="doctor-icon">🔎</span>
                <span className="doctor-name">{doctor.name}</span>
                <span className="doctor-specialty">SPECIALITY</span>
              </div>
            ))}
          </div>
        )}
        </div>
    </section>
  );
}
