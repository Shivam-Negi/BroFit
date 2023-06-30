import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../css/CapsuleButton.css';

export default function Login() {
  // Animation and page switch Logic
  const navigate = useNavigate();

  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  // SignIn logic
  const [data, setData] = useState({ email: '', password: '' });

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:7000/api/v1/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const responseData = await response.json();
      console.log(responseData);
      const token = responseData.data;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  // SignUp Logic
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    GymId: '',
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const resSignup = await fetch(
        'http://localhost:7000/api/v1/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            gymId: formData.gymId,
          }),
        }
      );
      if (!resSignup.ok) {
        throw new Error('Failed to login');
      }
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="hbody">
        <h2>Brofit+ Welcomes You All</h2>
        <div
          className={`main-container ${
            isSignUpActive ? 'right-panel-active' : ''
          }`}
          id="main-container">
          <div
            className={`form-main-container ${
              isSignUpActive
                ? 'sign-up-main-container'
                : 'sign-in-main-container'
            }`}>
            <form onSubmit={isSignUpActive ? handleSignup : loginUser}>
              <h1>{isSignUpActive ? 'Create Account' : 'Sign in'}</h1>
              <div className="public-main-container">
                <a href="#" className="public">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="public">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="public">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>
                {isSignUpActive
                  ? 'or use your own email'
                  : 'or use your own credentials'}
              </span>
              {isSignUpActive && (
                <>
                  <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    name="gymId"
                    placeholder="GymID"
                    value={formData.gymId}
                    onChange={(e) =>
                      setFormData({ ...formData, gymId: e.target.value })
                    }
                  />
                </>
              )}
              <input
                type="email"
                name="email"
                value={isSignUpActive ? formData.email : data.email}
                placeholder="Email"
                onChange={(e) =>
                  isSignUpActive
                    ? setFormData({ ...formData, email: e.target.value })
                    : setData({ ...data, email: e.target.value })
                }
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={isSignUpActive ? formData.password : data.password}
                onChange={(e) =>
                  isSignUpActive
                    ? setFormData({ ...formData, password: e.target.value })
                    : setData({ ...data, password: e.target.value })
                }
              />
              {isSignUpActive ? (
                <button type="submit">Sign Up</button>
              ) : (
                <>
                  <a href="#">Forgot your password?</a>
                  <button type="submit">Sign In</button>
                </>
              )}
            </form>
          </div>
          <div className="layerup-main-container">
            <div className="layerup">
              <div className="layerup-panel layerup-left">
                <h1>Welcome Back!</h1>
                <p>
                  To stay tuned towards fitness please enter your credentials
                </p>
                <button className="ghost" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <div className="layerup-panel layerup-right">
                <h1>Hello, User</h1>
                <p>Start your fitness Journey with us</p>
                <button className="ghost" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
