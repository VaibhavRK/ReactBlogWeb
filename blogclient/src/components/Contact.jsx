import React from 'react';
import '../styles/Contact.css';
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';

function Contact() {
  return (
    <div className='ContactApp'>
      <div className="contact-data">
        <h3>Follow Me on</h3>
        <div>
          <a href="https://www.instagram.com/vaibhav_2521/" target='__blank'><BsInstagram size={40} color='rgb(240, 46, 182)'  className='social-icon' /></a>
          <a href="https://www.facebook.com/profile.php?id=100065791463692" target='__blank'><BsFacebook size={40} color='rgb(9, 2, 105)'  className='social-icon' /></a>
          <a href="https://twitter.com/Vaibhav21154044" target='__blank'><BsTwitter size={40} color='rgb(0, 102, 255)' className='social-icon' /></a>
        </div>
        <br />
        <h3>&</h3>
        <br />
        <h4>Email Me at</h4>
        <h6>vaibhavgarg541@gmail.com</h6>
      </div>
    </div>
  )
}

export default Contact;