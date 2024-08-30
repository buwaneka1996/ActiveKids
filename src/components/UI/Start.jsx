import React from 'react'
import '../../styles/start.css'
import teamImg from '../../assets/img/team.jpeg'

const Start = () => {
  return <section>
    <div className="container">
        <div className="start__wrapper">
            <div className="start__img">
                <img src={teamImg} alt="" data-aos='fade-left'
                    data-duration='3500'/>
            </div>

            <div className="start__content" data-aos='fade-right'
                    data-duration='1500'>
                <h2 className="section__title">
                    Ready to change your <br/>
                    <span className="highlights">life-style?</span> 
                </h2>
                <p>Let's do the exercises for a better future and to be fit from the young age.</p>

                
            </div>
        </div>
    </div>
  </section>
}

export default Start
