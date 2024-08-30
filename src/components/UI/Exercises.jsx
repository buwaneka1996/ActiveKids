import React from 'react'
import '../../styles/exercises.css';
//import pushup from '../../assets/img/psp.jpeg';
import squat from '../../assets/img/sqt.jpeg';


const Exercises = () => {
    return <section>
        <div className="container exercise__container">
            <div className="exercise__top">
                <h2 className="section__title">Benefits of
                    <span className="highlights"> Exercise</span>

                </h2>
                <p>Exercise gives you a wide range of healthy benefits and reduce upcoming health issues.</p>
            </div>

            <div className="exercise__wrapper">
                
                <div className="exercises__item" 
                data-aos='zoom-in'
                    data-duration='1500'>
                    <span className="exercise__icon">
                        <img src={squat} alt='' />
                    </span>
                    <div className="exercise__content">
                        <h4>Healthy Life</h4>
                        <p>for a better future</p>
                    </div>
                </div>

                <div className="exercises__item"
                data-aos='zoom-in'
                data-duration='1500'>
                    <span className="exercise__icon">
                        <img src={squat} alt='' />
                    </span>

                    <div className="exercise__content">
                        <h4>Strong Body</h4>
                        <p>for a day to day work</p>
                    </div>
                </div>

                <div className="exercises__item"
                data-aos='zoom-in'
                data-duration='1500'>
                    <span className="exercise__icon">
                        <img src={squat} alt='' />
                    </span>
                    <div className="exercise__content">
                        <h4>Clear mindset</h4>
                        <p>for a better desicions</p>
                    </div>
                </div>

                

            </div>
        </div>
    </section>
}

export default Exercises