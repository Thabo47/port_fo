import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="contact-container" id="contact">
      <h2 className="section-title">Get In Touch</h2>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div>
              <h3>Email</h3>
              <p>student@portfolio.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaPhone className="info-icon" />
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h3>Location</h3>
              <p>University Campus</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this regarding?"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
              />
            </div>
            
            <button type="submit" className="cta-button" style={{ width: '100%' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="social-links" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>Connect with me</h3>
        <div className="social-icons" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>
            <FaLinkedin />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>
            <FaGithub />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="availability" style={{ marginTop: '2rem', textAlign: 'center', padding: '1.5rem', background: 'rgba(108, 99, 255, 0.1)', borderRadius: '10px' }}>
        <h4>Student Availability</h4>
        <p>Currently available for internships, freelance projects, and collaborative opportunities in software development and multimedia design.</p>
      </div>
    </section>
  );
};

export default Contact;