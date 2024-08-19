import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../../styles/login.css';
import AuthWrapper from './AuthWrapper';

export const Login = ({ onLogin, onClose }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);



  const loginHandle = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/login', { email, password });
      alert('Logged in successfully.');
      console.log(response.data);
      onLogin({ username: response.data.username, email }); // Inform the parent component
      onClose(); // Close the login form
      setLoggedIn(true);
    } catch (error) {
      alert('Login failed: ' + error.response.data);
    }
  };

  const registerHandle = async (username, age, weight, email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/register', { username, age, weight, email, password });
      alert('Registered Successfully.');
      console.log(response.data);
      onClose(); // Close the registration form
    } catch (error) {
      alert("Registration failed: " + error.response.data);
    }
  };

  const handleRegisterLinkClick = () => {
    setShowRegisterForm(true); // Display register form
  };

  const handleLoginLinkClick = () => {
    setShowRegisterForm(false); // Display login form
  };
  const handleLogout = () => {
    setLoggedIn(false); // Set loggedIn state to false to display login form
  };

  return (
    <div className='login__wrapper'>
      <AuthWrapper />
      <span className='icon__close' onClick={onClose}><i className="ri-close-fill"></i></span>

      <div className='form-container'>
      {loggedIn ? (
          // If logged in, show personalized welcome message
          <div className='logged-in-box'>
            <h2>Welcome, {name}!</h2>
            {<button onClick={handleLogout} className='btn'>Logout</button>}
          </div>
        ) : (

        !showRegisterForm ? (
          <div className={`form-box login ${showRegisterForm ? 'active' : ''}`}>
            <h2>Login</h2>

            <form onSubmit={(e) => {
              e.preventDefault();
              loginHandle(usernameRef.current.value, passwordRef.current.value);
            }}>

              <div className="input__box">
                <span className="icon"><i className="ri-mail-fill"></i>
                  <input type="email" required ref={usernameRef} />
                  <label>Email</label>
                </span>
              </div>

              <div className="input__box">
                <span className="icon"><i className="ri-lock-fill"></i>
                  <input type="password" required ref={passwordRef} />
                  <label>Password</label>
                </span>
              </div>

              <div className="remember__forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot Password</a>
              </div>

              <button type='submit' className='btn'>Login</button>

              <div className="register__link">
                <p>Don't have an account?<a href="#" className='register__link' onClick={handleRegisterLinkClick}>Register</a></p>
              </div>

            </form>
          </div>
        ) : (
          <div className={`form-box register ${showRegisterForm ? 'active' : ''}`}>
            <h2>Register</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              registerHandle(name, age, weight, email, password);
            }}>

              <div className="input__box">
                <span className="icon"><i className="ri-user-fill"></i>
                  <input type="text" required onChange={(e) => setName(e.target.value)} />
                  <label>Username</label>
                </span>
              </div>

              <div className="input__box">
                <span className="icon"><i className="ri-calendar-fill"></i>
                  <input type="text" required onChange={(e) => setAge(e.target.value)} />
                  <label>Age</label>
                </span>
              </div>

              <div className="input__box">
                <span className="icon"><i className="ri-user-heart-fill"></i>
                  <input type="text" required onChange={(e) => setWeight(e.target.value)} />
                  <label>Weight</label>
                </span>
              </div>

              <div className="input__box">
                <span className="icon"><i className="ri-mail-fill"></i>
                  <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                  <label>Email</label>
                </span>
              </div>

              <div className="input__box">
                <span className="icon"><i className="ri-lock-fill"></i>
                  <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                  <label>Password</label>
                </span>
              </div>

              <div className="remember__forgot">
                <label><input type="checkbox" required />I agree to the terms & conditions</label>
              </div>

              <button type='submit' className='btn'>Register</button>

              <div className="login__link">
                <p>Already have an account?<a href="#" className='login__link' onClick={handleLoginLinkClick}>Login</a></p>
              </div>

            </form>
          </div>
        )
        )}
      </div>
    </div>
  );
};

export default Login;
