import React, { useState } from 'react';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    slot_id: '',
    customer_id: '',
    customer_name: '',
    contact_number: '',
    booking_date: '',
    num_guests: ''
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Reservation created successfully! Booking ID: ${data.booking_id}`);
        // You can handle success, e.g., redirect the user or display a success message
      } else {
        const errorData = await response.json();
        setMessage(`Error creating reservation: ${errorData.message}`);
        // You can handle the error, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
      // You can handle network errors here
    }
  };

  return (
    <div>
      <h1>Reservation Form</h1>
      <form onSubmit={handleReservationSubmit}>
        <label>
          Slot ID:
          <input type="text" name="slot_id" value={formData.slot_id} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Customer ID:
          <input type="text" name="customer_id" value={formData.customer_id} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Customer Name:
          <input type="text" name="customer_name" value={formData.customer_name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Contact Number:
          <input type="text" name="contact_number" value={formData.contact_number} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Booking Date:
          <input type="text" name="booking_date" value={formData.booking_date} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Number of Guests:
          <input type="text" name="num_guests" value={formData.num_guests} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Make Reservation</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReservationForm;
