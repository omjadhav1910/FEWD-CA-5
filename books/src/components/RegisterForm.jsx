
import React, { useState } from 'react';
import '../App.css'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic (you can use a library like Yup for more complex validation)
    if (
      formData.name.length < 3 ||
      formData.name.length > 30 ||
      !formData.email.includes('@') ||
      formData.password.length < 10 ||
      formData.password !== formData.repeatPassword
    ) {
      alert('Invalid form data. Please check your inputs.');
      return;
    }

    // Handle registration (you may want to send the data to a server)
    console.log('Registering:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Repeat Password:
        <input
          type="password"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default RegisterForm;
