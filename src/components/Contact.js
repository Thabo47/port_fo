import React, { useState, useEffect, useRef } from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaInstagram,
  FaPaperPlane, FaCheckCircle, FaTimesCircle, FaUser, FaComment,
  FaCalendarAlt, FaClock, FaGlobe, FaDownload
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'general'
  });

  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState('form');
  const [currentTime, setCurrentTime] = useState(new Date());
  const formRef = useRef(null);

  const projectTypes = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'web', label: 'Web Development', icon: '🌐' },
    { value: 'mobile', label: 'Mobile App', icon: '📱' },
    { value: 'design', label: 'UI/UX Design', icon: '🎨' },
    { value: 'multimedia', label: 'Multimedia Project', icon: '🎬' },
    { value: 'collaboration', label: 'Collaboration', icon: '🤝' }
  ];

  const availability = [
    { day: 'Mon-Fri', time: '9:00 AM - 6:00 PM', status: 'Available' },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM', status: 'Limited' },
    { day: 'Sunday', time: 'Not Available', status: 'Unavailable' }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    // Simulate API call
    setTimeout(async () => {
      try {
        // In a real application, you would use EmailJS or a backend API here
        // For now, we'll simulate a successful submission
        console.log('Form submitted:', formData);
        
        setFormStatus({ 
          type: 'success', 
          message: 'Message sent successfully! I\'ll get back to you within 24 hours.' 
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          projectType: 'general'
        });
        setCharCount(0);
      } catch (error) {
        console.error('Error submitting form:', error);
        setFormStatus({ 
          type: 'error', 
          message: 'Failed to send message. Please try again or email me directly at student@portfolio.com.' 
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const downloadResume = () => {
    // Create a simple PDF download (in real app, link to actual resume)
    const resumeContent = `
      STUDENT PORTFOLIO - RESUME
      
      Software Engineering & Multimedia Student
      
      CONTACT:
      Email: student@portfolio.com
      Phone: +1 (555) 123-4567
      Location: University Campus
      
      SKILLS:
      - Frontend: React, JavaScript, HTML/CSS
      - Backend: Python, Node.js, Java
      - Design: UI/UX, Adobe Creative Suite
      - Multimedia: Video Editing, 3D Modeling
      
      EDUCATION:
      Bachelor's in Software Engineering with Multimedia
      
      PROJECTS:
      - Interactive Portfolio Website
      - E-commerce Platform
      - Educational Game Development
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_portfolio_resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    alert('Resume downloaded! Check your downloads folder.');
  };

  const socialLinks = [
    { icon: <FaLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com', color: '#0077B5' },
    { icon: <FaGithub />, name: 'GitHub', url: 'https://github.com', color: '#333' },
    { icon: <FaInstagram />, name: 'Instagram', url: 'https://instagram.com', color: '#E4405F' }
  ];

  const quickResponses = [
    "Interested in collaborating on a project",
    "Need a website developed",
    "Looking for UI/UX design services",
    "Want to discuss multimedia opportunities"
  ];

  return (
    <section 
      className="contact-container" 
      id="contact"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '3rem 2rem'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '25px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '3rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            opacity: 0.3,
            transform: 'rotate(45deg)'
          }}></div>
          
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '1rem',
            fontWeight: '800',
            position: 'relative'
          }}>
            Let's Connect & Create
          </h1>
          <p style={{
            fontSize: '1.3rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Have a project in mind? Let's turn your ideas into reality with the perfect blend of technology and creativity.
          </p>

          {/* Contact Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setActiveTab('form')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'form' ? 'white' : 'transparent',
                color: activeTab === 'form' ? '#667eea' : 'white',
                border: `2px solid ${activeTab === 'form' ? 'white' : 'rgba(255,255,255,0.3)'}`,
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaPaperPlane />
              Send Message
            </button>
            <button
              onClick={() => setActiveTab('direct')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'direct' ? 'white' : 'transparent',
                color: activeTab === 'direct' ? '#667eea' : 'white',
                border: `2px solid ${activeTab === 'direct' ? 'white' : 'rgba(255,255,255,0.3)'}`,
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaEnvelope />
              Direct Contact
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'schedule' ? 'white' : 'transparent',
                color: activeTab === 'schedule' ? '#667eea' : 'white',
                border: `2px solid ${activeTab === 'schedule' ? 'white' : 'rgba(255,255,255,0.3)'}`,
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaCalendarAlt />
              Schedule Call
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          minHeight: '600px'
        }}>
          {/* Left Panel - Contact Info */}
          <div style={{
            padding: '3rem',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRight: '1px solid #eee'
          }}>
            {/* Current Time */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '15px',
              marginBottom: '2rem',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <FaClock style={{ color: '#667eea', fontSize: '1.5rem' }} />
                <div>
                  <h3 style={{ margin: 0, color: '#333' }}>Current Time</h3>
                  <p style={{ margin: '0.5rem 0 0', color: '#666' }}>
                    {currentTime.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </p>
                </div>
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#888',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaGlobe />
                Timezone: GMT+5:30 (IST)
              </div>
            </div>

            {/* Contact Details */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#667eea', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                📍 Contact Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.2rem',
                  background: 'white',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => window.location.href = 'mailto:student@portfolio.com'}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.3rem', color: '#333' }}>Email</h4>
                    <p style={{ margin: 0, color: '#666' }}>student@portfolio.com</p>
                    <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: '#888' }}>
                      Response time: Within 24 hours
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.2rem',
                  background: 'white',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => window.location.href = 'tel:+15551234567'}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    <FaPhone />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.3rem', color: '#333' }}>Phone</h4>
                    <p style={{ margin: 0, color: '#666' }}>+1 (555) 123-4567</p>
                    <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: '#888' }}>
                      Available for calls during business hours
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.2rem',
                  background: 'white',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.3rem', color: '#333' }}>Location</h4>
                    <p style={{ margin: 0, color: '#666' }}>University Campus</p>
                    <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: '#888' }}>
                      Open to remote & on-site opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#667eea', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                🕐 Availability
              </h3>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
              }}>
                {availability.map((slot, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.8rem 0',
                    borderBottom: index < availability.length - 1 ? '1px solid #eee' : 'none'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#333' }}>{slot.day}</div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>{slot.time}</div>
                    </div>
                    <div style={{
                      padding: '0.3rem 0.8rem',
                      background: slot.status === 'Available' ? '#d4edda' : 
                                 slot.status === 'Limited' ? '#fff3cd' : '#f8d7da',
                      color: slot.status === 'Available' ? '#155724' : 
                             slot.status === 'Limited' ? '#856404' : '#721c24',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {slot.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Responses */}
            <div>
              <h3 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1.3rem' }}>
                ⚡ Quick Templates
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.95rem' }}>
                Click to use as a starting point:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      subject: response,
                      message: `Hi, I'm interested in discussing: ${response}. Looking forward to your response!`
                    }))}
                    style={{
                      padding: '0.8rem 1rem',
                      background: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '10px',
                      color: '#666',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#e0e0e0';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    "{response}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Form/Schedule */}
          <div style={{ padding: '3rem' }}>
            {activeTab === 'form' ? (
              <div>
                <h2 style={{
                  color: '#333',
                  marginBottom: '2rem',
                  fontSize: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <FaPaperPlane style={{ color: '#667eea' }} />
                  Send Your Message
                </h2>

                {/* Project Type Selection */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    Project Type
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    {projectTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, projectType: type.value }))}
                        style={{
                          padding: '1rem',
                          background: formData.projectType === type.value 
                            ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                            : '#f8f9fa',
                          border: `2px solid ${formData.projectType === type.value ? '#667eea' : '#e0e0e0'}`,
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          color: formData.projectType === type.value ? 'white' : '#666'
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                          {type.icon}
                        </div>
                        <div style={{ fontWeight: '600' }}>{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit}>
                  {/* Form Status */}
                  {formStatus.message && (
                    <div style={{
                      padding: '1rem',
                      background: formStatus.type === 'success' ? '#d4edda' : '#f8d7da',
                      border: `1px solid ${formStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                      borderRadius: '10px',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      color: formStatus.type === 'success' ? '#155724' : '#721c24'
                    }}>
                      {formStatus.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
                      {formStatus.message}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <FaUser /> Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        style={{
                          width: '100%',
                          padding: '0.9rem 1.2rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <FaEnvelope /> Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        style={{
                          width: '100%',
                          padding: '0.9rem 1.2rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: '#333',
                      fontWeight: '600'
                    }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this regarding?"
                      style={{
                        width: '100%',
                        padding: '0.9rem 1.2rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <label style={{
                        color: '#333',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <FaComment /> Message
                      </label>
                      <span style={{
                        fontSize: '0.9rem',
                        color: charCount > 500 ? '#ff4757' : '#666'
                      }}>
                        {charCount}/500 characters
                      </span>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe your project, timeline, budget, and any specific requirements..."
                      rows="6"
                      maxLength="500"
                      style={{
                        width: '100%',
                        padding: '1rem 1.2rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        resize: 'vertical',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #eee'
                  }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        padding: '1rem 3rem',
                        background: isSubmitting 
                          ? '#ccc' 
                          : 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            border: '3px solid white',
                            borderTopColor: 'transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }}></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FaPaperPlane />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={downloadResume}
                      style={{
                        padding: '0.8rem 1.5rem',
                        background: 'white',
                        color: '#667eea',
                        border: '2px solid #667eea',
                        borderRadius: '50px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <FaDownload />
                      Download Resume
                    </button>
                  </div>
                </form>
              </div>
            ) : activeTab === 'direct' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h2 style={{ color: '#333', marginBottom: '2rem', fontSize: '2rem' }}>
                  📞 Direct Contact Options
                </h2>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  borderRadius: '20px',
                  padding: '3rem',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ color: '#667eea', marginBottom: '1.5rem' }}>
                    Connect on Social Media
                  </h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginBottom: '2rem'
                  }}>
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '60px',
                          height: '60px',
                          background: social.color,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '1.5rem',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          boxShadow: `0 5px 15px ${social.color}40`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = `0 10px 25px ${social.color}60`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = `0 5px 15px ${social.color}40`;
                        }}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                  <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto' }}>
                    Follow for updates on my latest projects, coding tips, and design insights.
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h2 style={{ color: '#333', marginBottom: '1rem', fontSize: '2rem' }}>
                  📅 Schedule a Call
                </h2>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                  Book a time for a video call to discuss your project in detail.
                </p>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '20px',
                  padding: '3rem',
                  color: 'white'
                }}>
                  <h3 style={{ marginBottom: '1rem' }}>Coming Soon!</h3>
                  <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
                    The scheduling feature is currently under development. For now, please use the contact form or email directly.
                  </p>
                  <button
                    onClick={() => setActiveTab('form')}
                    style={{
                      padding: '1rem 2rem',
                      background: 'white',
                      color: '#667eea',
                      border: 'none',
                      borderRadius: '50px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Go to Contact Form
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: '#f8f9fa',
          padding: '2rem',
          textAlign: 'center',
          borderTop: '1px solid #eee'
        }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            ⚡ Average Response Time: <strong>Under 24 hours</strong>
          </p>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            I'm committed to responding to all inquiries promptly. Let's create something amazing together!
          </p>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;