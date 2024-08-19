import React from 'react'
import '../../styles/contact.css'

const Contact = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "0d1d4ac1-e8a9-424d-96de-099d2a6075ec");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Email Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return <section id='contact'>

    <div className="container__2">

      <div className="section__top">
        <h2 className="section__title">Get in
          <span className="highlights"> Touch </span> with us</h2>
      </div>

      <div className='contact' data-aos='fade-up'>
        <div className="contact__top">

          <h3 className='section__msg'>Send us a message.</h3>

          <ul className='section__details'>
            <li><i class="ri-mail-fill"></i>buwaneka96@gmail.com</li>
            <li><i class="ri-whatsapp-line"></i>+94 77 260 13 16</li>
          </ul>

        </div>

        <div className="contact__top">
          <form onSubmit={onSubmit}>
            <label>Your name </label>
            <input type="text" name='name' placeholder='Enter your name' required />

            <label>Phone Number</label>
            <input type="tel" name='phone' placeholder='Enter your mobile number' required />

            <label>Write your message here</label>
            <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>

            <button className='message-btn'>Submit now</button>
          </form>

          <span>{result}</span>
        </div>
      </div>
    </div>
  </section>
}

export default Contact