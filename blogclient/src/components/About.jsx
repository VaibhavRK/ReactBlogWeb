import React from 'react';
import '../styles/About.css';

function About() {

  return (
    <div className='AboutApp'>
        <div className="about-data">
          This is a Blog Web Application which is made up of React Js + Node Js + Express Js + MongoDB <br />
          or <br />
          It is a Full Stack <span style={{color:'black',display:'inline-block'}}>MERN</span> Project
          <img src={require('../images/mern.jpg')} alt="" style={{borderRadius:20,marginTop:10}} />
        </div>
    </div>
  )
}

export default About;