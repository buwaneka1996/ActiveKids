import React, { useEffect} from 'react';
import '../../styles/login.css';
import { registerHandle } from './authUtils';

const AuthWrapper = () => {
  useEffect(() => {
    const loginWrapper = document.querySelector('.login__wrapper');
    const loginLink = document.querySelector('.login__link a');
    const registerLink = document.querySelector('.register__link a');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon__close');
  
  
    const loginHandle = () => {
      if (loginWrapper) {
        loginWrapper.classList.remove('active');
      }
    };

    const handlePopupClose = () => {
      if (loginWrapper) {
        loginWrapper.classList.remove('active-popup');
      }
    };

    if (registerLink) {
      registerLink.addEventListener('click', registerHandle);
    }

    if (loginLink) {
      loginLink.addEventListener('click',loginHandle);
    }

    if (btnPopup) {
      btnPopup.addEventListener('click', registerHandle);
    }

    if (iconClose) {
      iconClose.addEventListener('click', handlePopupClose);
    }

    return () => {
      if (registerLink) {
        registerLink.removeEventListener('click', registerHandle);
      }
      if (loginLink) {
        loginLink.removeEventListener('click', loginHandle);
      }
      if (btnPopup) {
        btnPopup.removeEventListener('click', registerHandle);
      }
      if (iconClose) {
        iconClose.removeEventListener('click', handlePopupClose);
      }
    };
  }, []);



return null;
};

export default AuthWrapper;
