import React, { useState } from 'react'
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: ''});
  const [isFormSubmitted, setIsFromSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (event) => {
    const { name, value} = event.target;

    setFormData({ ...formData, [name]: value});
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFromSubmitted(true);
      })
  }

  return (
    <>
      <h2 className='head-text'>Let's grab a coffee!</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:rama1kawerma@gmail.com" className='p-text'>rama1kawerma@gmail.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="https://www.linkedin.com/in/rama-kaorma/" className='p-text' target='_blank'>LinkedIn Messages</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.location} alt="location" />
          <a className='p-text'>Melbourne, Australia</a>
        </div>
      </div>

      {!isFormSubmitted ? 
        <div className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input className='p-text' type="text" placeholder='Your Name' name='name' value={name} onChange={handleChangeInput} />
          </div>
          <div className='app__flex'>
            <input className='p-text' type="text" placeholder='Your Email' name='email' value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea 
              className='p-text'
              placeholder='Your Message'
              value={message}
              name='message'
              onChange={handleChangeInput}
            />
          </div>

          <button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'SENDING' : 'Send Message'}</button>
        </div>
      : <div>
          <h3 className='head-text'>Thank you for getting in touch!</h3>
      </div>
      }
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
);