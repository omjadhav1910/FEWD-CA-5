// Importing necessary dependencies from React and external libraries
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';  
import './register.css';

// React functional component for user registration form
function Form() {
  // Hooks for navigation, form handling, and state management
  const navigate = useNavigate();  
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const [isFormEdited, setIsFormEdited] = useState(false);

  // Function to handle form submission
  const onSubmit = (result) => {
    console.log(result);

    // Set registration success flag to trigger success message
    setRegisterSuccessful(true);

    // Navigate to home page after a brief delay, and store registration success in session storage
    setTimeout(() => {
      navigate("/?registration=success");
      sessionStorage.setItem("registrationSuccess", "true");  
    }, 2000);
  };

  // Function to handle form changes and set the form edited flag
  const handleFormChange = () => {
    setIsFormEdited(true);
  };

  // Rendering the component structure
  return (
    <div className='main-cointainer-register'>

      {/* Displaying success message if registration is successful */}
      {registerSuccessful && (
        <div className='done-title'>
          <p>Registration Successful</p>
        </div>
      )}

      {/* Form title */}
      <h1>Create Account</h1>

      {/* User registration form */}
      <form className='Form' onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>

        {/* Name input with validation */}
        <label>Your Name:</label>
        <input className='input-text' type="text" name='fullname' {...register("fullname", {
          required: "Your Name is required!",
          minLength: {
            value: 3,
            message: "Your Name must be more than 3 characters"
          },
          maxLength: {
            value: 30,
            message: "Your Name cannot be more than 30 characters"
          }
        })} />
        {errors.fullname && <p className='error'>{errors.fullname.message}</p>}

        {/* Email input with validation */}
        <label>Email :</label>
        <input type="email" name='email' {...register("email", { required: "Email is required!", pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" } })} />
        {errors.email && <p className='error'>{errors.email.message}</p>}

        {/* Password input with validation */}
        <label>Password :</label>
        <input type="password" name='password' {...register("password", {
          required: "Password is required",
          pattern: {
            value: /^(?=.*[!@#$%^&])\S+$/,
            message: "Password must contain at least one special character"
          },
          minLength: {
            value: 10,
            message: "Password cannot be less than 10 characters"
          }
        })} />
        {errors.password && (<p className='error'>{errors.password.message}</p>)}

        {/* Confirm Password input with validation */}
        <label>Confirm Password :</label>
        <input
          type="password"
          name="confirmPassword"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

        {/* Submit button with conditional disabling based on form edits */}
        <button className='submit' type="submit" disabled={!isFormEdited}>Sign Up</button>
      </form>
    </div>
  );
}

// Exporting the Form component as the default export
export default Form;
