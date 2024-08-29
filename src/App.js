import React, { useState, useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';

import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/UI/Hero";
import Exercises from "./components/UI/Exercises";
import Start from "./components/UI/Start";
import BMI from "./components/UI/BMI";
import ExercisesItems from "./components/UI/ExercisesItems";
import Footer from "./components/UI/Footer";
import Contact from "./components/UI/Contact";
import Login from "./components/UI/Login";
import Quiz from "./components/UI/Quiz";
import Profile from "./components/UI/Profile";
import AuthWrapper from "./components/UI/AuthWrapper";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Aos.init();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <>    
      <Header loggedIn={isLoggedIn} onLogin={() => { }} onLogout={handleLogout} user={user}/>
      <Login onLogin={handleLogin} />
      <AuthWrapper />
      <Hero />
      <Exercises />
      <Start />
      <BMI userHeight={user?.height} userWeight={user?.weight}/>
      <ExercisesItems />
      <Quiz />
      {isLoggedIn && <Profile user={user} />}
      <Contact />
      <Footer />
    </>
  );
}

export default App;
