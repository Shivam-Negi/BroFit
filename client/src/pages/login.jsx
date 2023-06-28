import React, { useState } from 'react';

export default function Login() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  return (
    <div className='hbody'>
      <h2>Brofit+ Welcomes You All</h2>
      <div className={`main-container ${isSignUpActive ? 'right-panel-active' : ''}`} id="main-container">
        <div className={`form-main-container ${isSignUpActive ? 'sign-up-main-container' : 'sign-in-main-container'}`}>
          <form>
            <h1>{isSignUpActive ? 'Create Account' : 'Sign in'}</h1>
            <div className="public-main-container">
              <a href="#" className="public"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="public"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="public"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>{isSignUpActive ? 'or use your own email' : 'or use your own credentials'}</span>
            {isSignUpActive && <input type="text" name="name" placeholder="Name" />}
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            {isSignUpActive ? (
              <button type="submit">Sign Up</button>
            ) : (
              <>
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
              </>
            )}
          </form>
        </div>
        <div className="layerup-main-container">
          <div className="layerup">
            <div className="layerup-panel layerup-left">
              <h1>Welcome Back!</h1>
              <p>To stay tuned towards fitness please enter your credentials</p>
              <button className="ghost" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="layerup-panel layerup-right">
              <h1>Hello, User</h1>
              <p>Start your fitness Journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
