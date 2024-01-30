
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';  
import './register.css'

function Form() {
  const navigate = useNavigate();  
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const [isFormEdited, setIsFormEdited] = useState(false);

  const onSubmit = (result) => {
    console.log(result)

    setRegisterSuccessful(true);



    setTimeout(() => {
      navigate("/?registration=success");
      sessionStorage.setItem("registrationSuccess", "true");  
    }, 2000);
  };

  const handleFormChange = () => {
    setIsFormEdited(true);
  };

  return (
    <div className='main-cointainer-register'>

      {registerSuccessful && (
        <div className='done-title'>
          <p>Registration Successful</p>
        </div>
      )}
      <h1>Create Account</h1>

      <form className='Form' onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>

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

        <label>Email :</label>
        <input type="email" name='email' {...register("email", { required: "Email is required!", pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" } })} />
        {errors.email && <p className='error'>{errors.email.message}</p>}

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

        <button className='submit' type="submit" disabled={!isFormEdited}>Sign Up</button>
      </form>
    </div>
  );
}

export default Form;