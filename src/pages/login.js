import React, { useState, useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3000/login');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const customersData = await response.json();
        console.log(customersData); // Check what the actual response is

        if (Array.isArray(customersData)) {
          setCustomers(customersData);
        } else {
          console.error('Unexpected response format from the server.');
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleLogin = () => {
    const user = customers.find((customer) => customer.email === username && customer.password === password);

    if (user) {
      setMessage('Login successful!');
      // Perform additional actions on successful login, e.g., redirect
    } else {
      setMessage('Invalid email or password.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Email:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
