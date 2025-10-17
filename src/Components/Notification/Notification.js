import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = () => {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Retrieve data when component mounts
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = storedDoctorData
      ? JSON.parse(localStorage.getItem(storedDoctorData.name))
      : null;

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) setDoctorData(storedDoctorData);
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true); // show notification initially
    }

    // Listen for cancellation updates (from localStorage/sessionStorage changes)
    const handleStorageChange = () => {
      const updatedAppointment = storedDoctorData
        ? JSON.parse(localStorage.getItem(storedDoctorData.name))
        : null;
      if (!updatedAppointment) {
        // Appointment removed → hide notification
        setShowNotification(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Hide notification if appointment canceled manually
  const handleCancel = () => {
    if (doctorData?.name) {
      localStorage.removeItem(doctorData.name);
    }
    setAppointmentData(null);
    setShowNotification(false);
  };


  console.log("isLoggedin", isLoggedIn);
  console.log("showNotification", showNotification);
  console.log("appointmentData", appointmentData);
  return (
    <div>
      <Navbar />
      {/* Show notification only if user logged in and showNotification is true */}
      {isLoggedIn && showNotification && appointmentData && (
        <div className="notification-container">
          <div className="notification-card">
            <h3>Appointment Booked!</h3>
            <p><strong>User:</strong> {username}</p>
            <p><strong>Doctor:</strong> {doctorData?.name}</p>
            <p><strong>Date:</strong> {appointmentData.date}</p>
            <p><strong>Time:</strong> {appointmentData.time}</p>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
