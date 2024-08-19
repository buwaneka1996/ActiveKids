import React, { useState } from 'react'
import '../../styles/exercisesItems.css'
import PushupExercise from './PushupExercise';
import SquatExercise from './SquatExercise';

const ExercisesItems = () => {
    const [showPushup, setShowPushup] = useState(false);
    const [showSquat, setShowSquat] = useState(false);

    const handlePushupClick = () => {
        setShowPushup(true);
    }

    const handlePushupClose = () => {
        setShowPushup(false);
    }

    const handleSquatClick = () => {
        setShowSquat(true);
    }

    const handleSquatClose = () => {
        setShowSquat(false);
    }

  return (
  <section id='exercises'>
    <div className="container">
        
        <div className="exitems__top">
            <h2 className="section__title">Free 
            <span className="highlights"> Exercises </span> For you</h2>
            <p>Choose the exercise you want.</p>
        </div>

        <div className="exitems__wrapper">
            <div className="exitems__item" data-aos='fade-up'
                    data-duration='1500'>
                <div className="exitems__card-top">
                    <h2 section='section__title'>PUSH-UP</h2>
                    
                </div>

                <div className="values">
                    <ul>
                        <li><span><i class="ri-shield-check-fill"></i></span>Powerful Arms</li>
                        <li><span><i class="ri-shield-check-fill"></i></span>Big Chest</li>
                        <li><span><i class="ri-shield-check-fill"></i></span>Fit Body</li>
                    </ul>

                    <button className='Ebutton' onClick={handlePushupClick}>Try Push-Up</button>
                </div>
            </div>


            <div className="exitems__item exitems__02" data-aos='fade-up'
                    data-duration='2000'>
                <div className="exitems__card-top">
                    <h2 section='section__title'>SQUATS</h2>
                    
                </div>

                <div className="values">
                    <ul>
                        <li><span><i class="ri-shield-check-fill"></i></span>Strong Legs</li>
                        <li><span><i class="ri-shield-check-fill"></i></span>Strong lower body</li>
                        <li><span><i class="ri-shield-check-fill"></i></span>Strong glutes</li>
                    </ul>

                    <button className='Ebutton'onClick={handleSquatClick} >Try Squats</button>
                </div>
            </div>


           
        </div>
        {showPushup && <PushupExercise onClose={handlePushupClose}/>}
        {showSquat && <SquatExercise onClose={handleSquatClose}/>}
        
    </div>
  </section>
  );
};

export default ExercisesItems;