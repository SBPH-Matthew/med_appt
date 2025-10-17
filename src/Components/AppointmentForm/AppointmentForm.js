import React, { useState } from 'react';

const AppointmentForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const appointmentData = {
      name,
      phoneNumber,
      date: appointmentDate,
      time: selectedSlot,
    };

    // ✅ Store appointment data locally
    const storedDoctor = JSON.parse(localStorage.getItem('doctorData'));
    if (storedDoctor && storedDoctor.name) {
      localStorage.setItem(storedDoctor.name, JSON.stringify(appointmentData));
    }

    // Notify parent (optional)
    onSubmit(appointmentData);

    // Clear form
    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setSelectedSlot('');
  };

  return (
    <div>
      {/* Doctor Header */}


      {/* Appointment Form */}
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Date of Appointment:</label>
          <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="timeSlot">Book Time Slot:</label>
          <select
            id="timeSlot"
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            required
          >
            <option value="">Select a time slot</option>
            <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
            <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
            <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
            <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
          </select>
        </div>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
