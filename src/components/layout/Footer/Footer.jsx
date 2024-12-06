import React from 'react';
import './footer.css'
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {GrMail} from "react-icons/gr";
import {SiLeetcode} from "react-icons/si"

const Footer = () => {
  return (
    <footer>
      <h4>Developed by Aryan Thakur</h4>
      <h4>Copyright &copy; 2024 AT</h4>
      <div className='footerLinks'>
        <a href="https://github.com/Aryan-Kumar-Thakur" target='_blank'><FaGithub/></a>
        <a href="https://www.linkedin.com/in/aryan-kumar-thakur/" target='_blank'><FaLinkedin/></a>
        <a href='mailTo:thakuraryan@gmail.com' target='_blank'><GrMail/></a>
        <a href="https://leetcode.com/rk9315185727/" target="_blank"><SiLeetcode/></a>
      </div>
    </footer>
  )
}

export default Footer