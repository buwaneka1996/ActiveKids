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

                <h2><span className='highlights'>Guidelines</span> <br />to use the Exercises</h2>

                <div className='guidelines'>
                    <div data-aos='fade-up'><ul>
                        <li><span><i class="ri-focus-fill"></i></span>Make sure you are ready and stretched your body.</li>
                        <li><span><i class="ri-focus-fill"></i></span>Click "Try Pushup" or "Try Squats" for your exercise selection.</li>
                        <li><span><i class="ri-focus-fill"></i></span>Make sure you have a enough space to do exercises and move 2-3 meters away from the camera to see your full body.</li>
                        <li><span><i class="ri-focus-fill"></i></span>The camera will open and detect your body position and body joint angles.</li>
                        <li><span><i class="ri-focus-fill"></i></span>The progress bar will work according to your exercise progress.</li>
                        <li><span><i class="ri-focus-fill"></i></span>Check the green color progress bar to identify your exercise progress and try to follow the complete progress bar</li>
                        <li><span><i class="ri-focus-fill"></i></span>You can do as many as you want, and get an achievement badge by inserting your pushup count (10, 15, 20, 25, 30).</li>
                        <li><span><i class="ri-focus-fill"></i></span>If you have any inquiry, use the contact box and send any issue or message to Active Kids.</li>

                    </ul></div>
                </div>

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

                            <button className='Ebutton' onClick={handleSquatClick} >Try Squats</button>
                        </div>
                    </div>



                </div>
                {showPushup && <PushupExercise onClose={handlePushupClose} />}
                {showSquat && <SquatExercise onClose={handleSquatClose} />}

            </div>
        </section>
    );
};

export default ExercisesItems;