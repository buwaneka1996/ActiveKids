import React from 'react'
import '../../styles/footer.css'
import logo from '../../assets/img/Logo-2.png'

const Footer = () => {
    return <footer className="footer" data-aos='zoom-in'
    data-duration='1500'>
        <div className="container">
            <div className="footer__wrapper">
                <div className="footer__box">
                    <div className='logo'>
                        <div className="logo__img">
                            <img src={logo} alt="" /></div>
                        <h2>ActiveKids</h2>
                    </div>
                    <p>This website is trying to improve childrens <br/> health  and lifestyle with the use of current technologycal world.</p>
                </div>

                <div className="footer__box">
                    <h4 className="footer__title">For Kids</h4>
                    <ul className="footer__links">
                        <li><a href="#">About Us</a></li>
                
                    </ul>
                </div>

                <div className="footer__box">
                    <h4 className="footer__title">Quick Links</h4>
                    <ul className="footer__links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#exercises">Exercises</a></li>
                        <li><a href="#bmi">Check BMI</a></li>
                        <li><a href='#quiz'>Quiz</a></li>
                    </ul>
                </div>



            </div>
            <p className='fbottom'>ActiveKids by 2337316</p>
        </div>
    </footer>
}

export default Footer