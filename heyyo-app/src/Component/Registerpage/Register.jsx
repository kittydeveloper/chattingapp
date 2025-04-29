import React from 'react'
import './Register.css';
import Button from "@mui/material/Button";

function Register() {
  return (
    <div className='Register_design'>
  <div className='Register_head'>
    <div className='register_card'>
    <div className='Register_title'>
        <p>Sign in</p>
    </div>
    <div className='Register_form'>
    <div className="form_group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="form_group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form_group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <div className="form_group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm your password" />
            </div>
          
    </div>
    <div className='Register_btn'>
      <Button variant="contained" className='Register_button'>
        Register
      </Button>
        </div>
    </div>

  </div>
  </div>
  )
}

export default Register