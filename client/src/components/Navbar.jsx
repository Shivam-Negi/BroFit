import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
// import Cookies from 'js-cookie';

const Navbar = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if a token is present in local storage
    const storedToken = localStorage.getItem('token');
    // const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from local storage and state
    localStorage.removeItem('token');
    setToken(null);
  };

  let Links = [
    { name: 'Plans', link: '/plans' },
    { name: 'Attendace', link: '/attendance' },
    { name: 'Users', link: '/users' },
  ];

  return (
    <div className="shadow-md w-full  relative top-0 left-0">
      <div className="md:flex flex-row justify-center  bg-transparent py-4 md:px-10 px-7">
        <div className="container md:flex flex-row items-center ">
          <div className="basis-1/4 justify-start font-bold text-2xl cursor-pointer">
            <Link className="md:items-center" to={'/'}>
              Brofit+
            </Link>
          </div>

          <div className="basis-1/2 md:border-white md:border-2 rounded-full md:flex flex-row justify-center  ">
            <ul className=" social-media-list md:flex flex-row md:items-center">
              {Links.map((link) => (
                <li
                  className="md:mx-10 my-0.5 text-2xl transition-all  transform-gpu hover:px-1 rounded-lg  hover:bg-white hover:color-black hover:shadow-lg "
                  key={link.name}>
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="basis-1/4 ">
            <div className="md:flex flex-row justify-end md:ml-8 text-2xl ">
              <div className=" md:flex flex-row rounded-full md:text-black  md:bg-white md:items-center">
                <Avatar />
                {token ? (
                  <button className="md:mx-3" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link className="md:mx-3" to={'/login'}>
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
