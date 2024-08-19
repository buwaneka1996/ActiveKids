import React from 'react'
import heroImg from '../../assets/img/childimg1.png'
import '../../styles/hero.css'

const Hero = () => {
    return <section id='home'>
        <div className="container">
            <div className="hero__wrapper">

                <div className="hero__content">
                    <h2 className='section__title' 
                    data-aos='fade-up'
                    data-duration='1500'
                    >
                        Exercise is the key for a
                        <span className="highlights"> Healthy</span> Lifestyle</h2>
                    <p data-aos='fade-up'
                    data-aos-delay='100'
                    data-duration='1800'
                    >
                    This website is an exercise website platform for youngesters. <br/> 
                    Do exercises with live real-time feedback.<br/>
                    Exercise gives you strength, good blood circulation, long life and many more.
                    </p>

                    <div className="hero__btns" data-aos='fade-up'
                    data-aos-delay='200'
                    data-duration='2000'>
                        
                    </div>
                </div>

                <div className="hero__img">
                    <div className="hero__img-wrapper">
                        <div className="box-01">
                            <div className="box-02">
                                <div className="box-03">
                                    <div className="box__img">
                                        <img src={heroImg} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    </section>
}
export default Hero