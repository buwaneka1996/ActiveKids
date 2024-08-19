// Header.js
import React, { useEffect, useRef } from 'react';
import '../../styles/header.css';
import logo from '../../assets/img/Logo-2.png';
import { registerHandle } from '../UI/authUtils';

const nav__links = [
  { path: '#home', display: 'Home' },
  { path: '#exercises', display: 'Exercises' },
  { path: '#bmi', display: 'BMI' },
  { path: '#contact', display: 'Contact Us' },
];

const Header = ({ loggedIn, onLogout, user }) => {
  const headerRef = useRef(null);

  const headerFunc = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky__header');
    } else {
      headerRef.current.classList.remove('sticky__header');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', headerFunc);
    return () => window.removeEventListener('scroll', headerFunc);
  }, []);

  return (
    <header className='header' ref={headerRef}>
      <div className='container'>
        <div className='nav__wrapper'>
          <div className='logo'>
            <div className='logo__img'>
              <img src={logo} alt='Logo' />
            </div>
            <h2>ActiveKids</h2>
          </div>

          {/* navigation menu */}
          <div className='navigation'>
            <ul className='menu'>
              {nav__links.map((item, index) => (
                <li className='nav__item' key={index}>
                  <a href={item.path}>{item.display}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className='nav__right'>
            {loggedIn ? (
              <div className="user-info">
              <span className="username">Welcome, </span><span className='useremail'>{user?.email} ! </span>
              <button className='logout__btn' onClick={onLogout}>
                Log Out
              </button>
              </div>
            ) : (
              <button className='register__btn' onClick={registerHandle}>
                Login
              </button>
            )}
            <span className='mobile__menu'>
              <i className='ri-menu-line'></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
