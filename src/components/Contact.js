import React, { useState, useEffect, useRef } from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaInstagram,
  FaPaperPlane, FaCheckCircle, FaTimesCircle, FaUser, FaComment,
  FaCalendarAlt, FaClock, FaGlobe, FaDownload, FaFileAlt, FaVideo,
  FaRobot, FaCalendarCheck, FaShareAlt, FaCopy, FaWhatsapp,
  FaTelegram, FaDiscord, FaYoutube
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'general',
    budget: '1000-5000',
    timeline: '1-3 months'
  });

  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState('form');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isMeetingScheduled, setIsMeetingScheduled] = useState(false);

  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const projectTypes = [
    { value: 'general', label: 'General Inquiry', icon: '💬', color: '#6C63FF' },
    { value: 'web', label: 'Web Development', icon: '🌐', color: '#4A44C6' },
    { value: 'mobile', label: 'Mobile App', icon: '📱', color: '#FF6584' },
    { value: 'design', label: 'UI/UX Design', icon: '🎨', color: '#36D1DC' },
    { value: 'multimedia', label: 'Multimedia Project', icon: '🎬', color: '#764ba2' },
    { value: 'collaboration', label: 'Collaboration', icon: '🤝', color: '#00ff88' }
  ];

  const budgets = [
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000+', label: '$10,000+' }
  ];

  const timelines = [
    { value: '1-4 weeks', label: '1-4 Weeks' },
    { value: '1-3 months', label: '1-3 Months' },
    { value: '3-6 months', label: '3-6 Months' },
    { value: '6+ months', label: '6+ Months' }
  ];

  const availability = [
    { day: 'Monday', time: '9:00 AM - 6:00 PM', status: 'Available', slots: 4 },
    { day: 'Tuesday', time: '9:00 AM - 6:00 PM', status: 'Available', slots: 3 },
    { day: 'Wednesday', time: '9:00 AM - 6:00 PM', status: 'Available', slots: 2 },
    { day: 'Thursday', time: '9:00 AM - 6:00 PM', status: 'Limited', slots: 1 },
    { day: 'Friday', time: '9:00 AM - 4:00 PM', status: 'Limited', slots: 1 },
    { day: 'Saturday', time: '10:00 AM - 2:00 PM', status: 'Limited', slots: 0 },
    { day: 'Sunday', time: 'Not Available', status: 'Unavailable', slots: 0 }
  ];

  // Social media links with more platforms
  const socialLinks = [
    { icon: <FaLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com', color: '#0077B5' },
    { icon: <FaGithub />, name: 'GitHub', url: 'https://github.com', color: '#333' },
    { icon: <FaInstagram />, name: 'Instagram', url: 'https://instagram.com', color: '#E4405F' },
    { icon: <FaWhatsapp />, name: 'WhatsApp', url: 'https://wa.me/15551234567', color: '#25D366' },
    { icon: <FaTelegram />, name: 'Telegram', url: 'https://t.me/username', color: '#0088cc' },
    { icon: <FaDiscord />, name: 'Discord', url: 'https://discord.gg/invite', color: '#7289DA' },
    { icon: <FaYoutube />, name: 'YouTube', url: 'https://youtube.com', color: '#FF0000' }
  ];

  // Chatbot responses
  const chatResponses = [
    "Hi! I'm your virtual assistant. How can I help you today?",
    "I can help you schedule a meeting, answer questions about services, or connect you directly.",
    "Would you like to schedule a consultation call?",
    "I see you're interested in web development. I can provide more information about that!",
    "You can upload project files directly in the contact form.",
    "The average response time is under 24 hours.",
    "Check out my portfolio projects for examples of my work!"
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    // Initialize chatbot
    setTimeout(() => {
      setChatMessages([
        { text: chatResponses[0], from: 'bot' },
        { text: "Welcome to the contact page! I'm here to help you get in touch.", from: 'bot' }
      ]);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Generate shareable link
    setShareLink(`${window.location.origin}/contact?ref=${Date.now()}`);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      file.size <= 5 * 1024 * 1024 && // 5MB limit
      ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'text/plain'].includes(file.type)
    );
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    // Simulate API call with more realistic feedback
    setTimeout(async () => {
      try {
        // Create form data with files
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });
        uploadedFiles.forEach(file => {
          formDataToSend.append('files', file);
        });

        // In real app: await fetch('/api/contact', { method: 'POST', body: formDataToSend })
        
        setFormStatus({ 
          type: 'success', 
          message: `Message sent successfully! You'll receive a confirmation email within minutes. I'll respond within 24 hours.`
        });
        
        // Send confirmation to chatbot
        setChatMessages(prev => [...prev, 
          { text: `Great! I've received your ${formData.projectType} inquiry. I'll review it shortly.`, from: 'bot' }
        ]);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          projectType: 'general',
          budget: '1000-5000',
          timeline: '1-3 months'
        });
        setUploadedFiles([]);
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
    }, 2000);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { text: chatInput, from: 'user' }]);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const randomResponse = chatResponses[Math.floor(Math.random() * chatResponses.length)];
      setChatMessages(prev => [...prev, { text: randomResponse, from: 'bot' }]);
    }, 1000);
    
    setChatInput('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scheduleMeeting = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
    
    setIsMeetingScheduled(true);
    setChatMessages(prev => [...prev, 
      { text: `Meeting scheduled for ${selectedDate} at ${selectedTime}. A calendar invite has been sent to your email.`, from: 'bot' }
    ]);
  };

  const downloadResume = () => {
    // Enhanced resume with more details
    const resumeContent = `
      ===========================================
      SOFTWARE ENGINEERING & MULTIMEDIA STUDENT
      ===========================================
      
      CONTACT INFORMATION:
      Email: student@portfolio.com
      Phone: +1 (555) 123-4567
      Portfolio: portfolio-student.com
      GitHub: github.com/student
      LinkedIn: linkedin.com/in/student
      
      EDUCATION:
      Bachelor of Science in Software Engineering with Multimedia
      Specialization in Full-Stack Development & UI/UX Design
      Expected Graduation: 2025
      GPA: 3.8/4.0
      
      TECHNICAL SKILLS:
      Frontend: React, TypeScript, Next.js, HTML5, CSS3, SASS
      Backend: Node.js, Python (Django/Flask), Java (Spring Boot)
      Database: MongoDB, PostgreSQL, MySQL, Firebase
      Multimedia: Adobe Creative Suite, Blender, Figma, Unity
      DevOps: Docker, AWS, Git, CI/CD, Linux
      
      PROJECT EXPERIENCE:
      1. E-commerce Platform (Full-Stack)
         - Built with React & Django
         - Integrated payment processing
         - Reduced load time by 40%
      
      2. Interactive 3D Portfolio
         - Three.js & React Three Fiber
         - Custom shaders and animations
         - 95% performance score on Lighthouse
      
      3. Educational Game Development
         - Unity with C#
         - Designed game mechanics and UI
         - 10,000+ downloads on app stores
      
      INTERNSHIPS:
      Software Development Intern @ TechCorp (Summer 2023)
      UI/UX Design Intern @ CreativeStudio (Spring 2023)
      
      CERTIFICATIONS:
      AWS Certified Developer - Associate
      Google UX Design Professional Certificate
      Meta React Developer Professional Certificate
      
      AWARDS & HONORS:
      Dean's List (2022, 2023)
      Hackathon 1st Place - "Innovation Challenge 2023"
      Best Multimedia Project - University Expo 2024
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Student_Portfolio_Resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    alert('✅ Resume downloaded! Check your downloads folder.');
  };

  // Quick contact templates
  const quickTemplates = [
    { 
      title: "Web Development Inquiry", 
      subject: "Web Development Project Inquiry",
      message: "Hi, I'm interested in developing a website for my business. I need a responsive design with backend functionality. Can you provide more information about your web development services and pricing?"
    },
    { 
      title: "UI/UX Design Consultation", 
      subject: "UI/UX Design Project",
      message: "Hello, I have an app idea that needs UI/UX design. I'm looking for someone to create wireframes, prototypes, and final designs. What's your process for design projects?"
    },
    { 
      title: "Collaboration Opportunity", 
      subject: "Project Collaboration Proposal",
      message: "I saw your portfolio and I'm impressed with your multimedia work. I'm working on a project that could benefit from your skills. Would you be interested in collaborating?"
    },
    { 
      title: "Internship Inquiry", 
      subject: "Internship Opportunity",
      message: "I'm currently a student looking for internship opportunities. Your portfolio shows exactly the kind of work I'm interested in. Are you currently accepting interns or know of any opportunities?"
    }
  ];

  // Generate time slots for scheduling
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute of ['00', '30']) {
      if (hour === 17 && minute === '30') break;
      const time = `${hour}:${minute}`;
      timeSlots.push(time);
    }
  }

  return (
    <>
      {/* Floating Action Buttons */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        zIndex: 1000
      }}>
        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6C63FF, #4A44C6)',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 5px 20px rgba(108, 99, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaRobot />
        </button>

        {/* Quick Contact Button */}
        <button
          onClick={() => setActiveTab('direct')}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6584, #ff4757)',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 5px 20px rgba(255, 101, 132, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaWhatsapp />
        </button>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div style={{
          position: 'fixed',
          bottom: '8rem',
          right: '2rem',
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'linear-gradient(135deg, #6C63FF, #4A44C6)',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaRobot />
              <h3 style={{ margin: 0, fontSize: '1rem' }}>Virtual Assistant</h3>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
            >
              ×
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.from === 'user' ? '#6C63FF' : '#f0f0f0',
                  color: msg.from === 'user' ? 'white' : '#333',
                  padding: '0.8rem 1rem',
                  borderRadius: msg.from === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                  maxWidth: '80%',
                  wordWrap: 'break-word'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
              style={{
                flex: 1,
                padding: '0.8rem',
                border: '1px solid #ddd',
                borderRadius: '25px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleChatSend}
              style={{
                background: '#6C63FF',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      {/* Main Contact Container */}
      <section 
        id="contact"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          padding: '3rem 2rem',
          position: 'relative'
        }}
      >
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                background: `rgba(108, 99, 255, ${Math.random() * 0.1 + 0.05})`,
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(40px)',
                animation: `float ${Math.random() * 20 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Header Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            position: 'relative'
          }}>
            <h1 style={{
              fontSize: '3.5rem',
              background: 'linear-gradient(45deg, #6C63FF, #FF6584)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
              fontWeight: '800'
            }}>
              Get In Touch
            </h1>
            <p style={{
              fontSize: '1.3rem',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Let's create something amazing together! Choose your preferred way to connect.
            </p>

            {/* Contact Method Tabs */}
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
                  background: activeTab === 'form' ? 'linear-gradient(135deg, #6C63FF, #4A44C6)' : 'white',
                  color: activeTab === 'form' ? 'white' : '#6C63FF',
                  border: `2px solid ${activeTab === 'form' ? 'transparent' : '#6C63FF'}`,
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: activeTab === 'form' ? '0 5px 15px rgba(108, 99, 255, 0.3)' : 'none'
                }}
              >
                <FaPaperPlane />
                Send Message
              </button>
              <button
                onClick={() => setActiveTab('direct')}
                style={{
                  padding: '1rem 2rem',
                  background: activeTab === 'direct' ? 'linear-gradient(135deg, #6C63FF, #4A44C6)' : 'white',
                  color: activeTab === 'direct' ? 'white' : '#6C63FF',
                  border: `2px solid ${activeTab === 'direct' ? 'transparent' : '#6C63FF'}`,
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: activeTab === 'direct' ? '0 5px 15px rgba(108, 99, 255, 0.3)' : 'none'
                }}
              >
                <FaEnvelope />
                Direct Contact
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                style={{
                  padding: '1rem 2rem',
                  background: activeTab === 'schedule' ? 'linear-gradient(135deg, #6C63FF, #4A44C6)' : 'white',
                  color: activeTab === 'schedule' ? 'white' : '#6C63FF',
                  border: `2px solid ${activeTab === 'schedule' ? 'transparent' : '#6C63FF'}`,
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: activeTab === 'schedule' ? '0 5px 15px rgba(108, 99, 255, 0.3)' : 'none'
                }}
              >
                <FaCalendarCheck />
                Schedule Meeting
              </button>
              <button
                onClick={() => setActiveTab('share')}
                style={{
                  padding: '1rem 2rem',
                  background: activeTab === 'share' ? 'linear-gradient(135deg, #6C63FF, #4A44C6)' : 'white',
                  color: activeTab === 'share' ? 'white' : '#6C63FF',
                  border: `2px solid ${activeTab === 'share' ? 'transparent' : '#6C63FF'}`,
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: activeTab === 'share' ? '0 5px 15px rgba(108, 99, 255, 0.3)' : 'none'
                }}
              >
                <FaShareAlt />
                Share Contact
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '3rem',
            background: 'white',
            borderRadius: '25px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Left Panel - Contact Info & Features */}
            <div style={{
              padding: '3rem',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              borderRight: '1px solid #eee'
            }}>
              {/* Current Time & Status */}
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
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <FaClock style={{ color: '#6C63FF', fontSize: '1.5rem' }} />
                    <div>
                      <h3 style={{ margin: 0, color: '#333' }}>Current Time</h3>
                      <p style={{ margin: '0.5rem 0 0', color: '#666' }}>
                        {currentTime.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true 
                        })}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    padding: '0.3rem 0.8rem',
                    background: '#d4edda',
                    color: '#155724',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    Online Now
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
                  Timezone: GMT+5:30 (IST) • Response Time: Under 24 hours
                </div>
              </div>

              {/* Contact Quick Actions */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#6C63FF', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                  ⚡ Quick Actions
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <button
                    onClick={downloadResume}
                    style={{
                      padding: '1rem',
                      background: 'white',
                      border: '2px solid #6C63FF',
                      borderRadius: '10px',
                      color: '#6C63FF',
                      cursor: 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#6C63FF';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#6C63FF';
                    }}
                  >
                    <FaDownload />
                    Resume
                  </button>
                  <button
                    onClick={() => window.open('https://calendly.com/yourusername', '_blank')}
                    style={{
                      padding: '1rem',
                      background: 'white',
                      border: '2px solid #FF6584',
                      borderRadius: '10px',
                      color: '#FF6584',
                      cursor: 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#FF6584';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#FF6584';
                    }}
                  >
                    <FaVideo />
                    Video Call
                  </button>
                </div>
              </div>

              {/* Quick Templates */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#6C63FF', marginBottom: '1rem', fontSize: '1.3rem' }}>
                  📝 Quick Templates
                </h3>
                <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  Click to pre-fill the form:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {quickTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveTab('form');
                        setFormData(prev => ({
                          ...prev,
                          subject: template.subject,
                          message: template.message
                        }));
                      }}
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
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(108, 99, 255, 0.1), rgba(118, 75, 162, 0.1))';
                        e.currentTarget.style.borderColor = '#6C63FF';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderColor = '#e0e0e0';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <strong>{template.title}</strong>
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Calendar */}
              <div>
                <h3 style={{ color: '#6C63FF', marginBottom: '1rem', fontSize: '1.3rem' }}>
                  📅 This Week's Availability
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
                        <div style={{ fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>{slot.day}</div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{slot.time}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          padding: '0.2rem 0.6rem',
                          background: slot.status === 'Available' ? '#d4edda' : 
                                     slot.status === 'Limited' ? '#fff3cd' : '#f8d7da',
                          color: slot.status === 'Available' ? '#155724' : 
                                 slot.status === 'Limited' ? '#856404' : '#721c24',
                          borderRadius: '20px',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}>
                          {slot.status}
                        </div>
                        {slot.slots > 0 && (
                          <span style={{ fontSize: '0.8rem', color: '#6C63FF' }}>
                            {slot.slots} slots
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Active Tab Content */}
            <div style={{ padding: '3rem' }}>
              {/* Contact Form Tab */}
              {activeTab === 'form' && (
                <div>
                  <h2 style={{
                    color: '#333',
                    marginBottom: '2rem',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <FaPaperPlane style={{ color: '#6C63FF' }} />
                    Project Inquiry Form
                  </h2>

                  {/* Project Type Selection */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: '#6C63FF', marginBottom: '1rem', fontSize: '1.1rem' }}>
                      What type of project are you interested in?
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      {projectTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, projectType: type.value }))}
                          style={{
                            padding: '1.2rem 1rem',
                            background: formData.projectType === type.value 
                              ? type.color 
                              : '#f8f9fa',
                            border: `2px solid ${formData.projectType === type.value ? type.color : '#e0e0e0'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            color: formData.projectType === type.value ? 'white' : '#666',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <div style={{ fontSize: '1.8rem' }}>
                            {type.icon}
                          </div>
                          <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '600'
                      }}>
                        Estimated Budget
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.9rem 1.2rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'white'
                        }}
                      >
                        {budgets.map(budget => (
                          <option key={budget.value} value={budget.value}>{budget.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '600'
                      }}>
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.9rem 1.2rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'white'
                        }}
                      >
                        {timelines.map(timeline => (
                          <option key={timeline.value} value={timeline.value}>{timeline.label}</option>
                        ))}
                      </select>
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
                          onFocus={(e) => e.target.style.borderColor = '#6C63FF'}
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
                          onFocus={(e) => e.target.style.borderColor = '#6C63FF'}
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
                        onFocus={(e) => e.target.style.borderColor = '#6C63FF'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                      />
                    </div>

                    {/* File Upload */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <FaFileAlt /> Project Files (Optional)
                      </label>
                      <div style={{
                        border: '2px dashed #e0e0e0',
                        borderRadius: '10px',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        marginBottom: '1rem'
                      }}
                      onClick={() => fileInputRef.current.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = '#6C63FF';
                        e.currentTarget.style.background = 'rgba(108, 99, 255, 0.05)';
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                        e.currentTarget.style.background = 'transparent';
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleFileUpload({ target: { files: e.dataTransfer.files } });
                        e.currentTarget.style.borderColor = '#e0e0e0';
                        e.currentTarget.style.background = 'transparent';
                      }}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          style={{ display: 'none' }}
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                        />
                        <FaFileAlt style={{ fontSize: '2rem', color: '#6C63FF', marginBottom: '1rem' }} />
                        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                          Drag & drop files here or click to browse
                        </p>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>
                          Supports images, PDFs, and documents (max 5MB each)
                        </p>
                      </div>

                      {/* Uploaded Files */}
                      {uploadedFiles.length > 0 && (
                        <div style={{ marginTop: '1rem' }}>
                          <h4 style={{ color: '#666', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            Uploaded Files ({uploadedFiles.length})
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {uploadedFiles.map((file, index) => (
                              <div key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.8rem',
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                fontSize: '0.9rem'
                              }}>
                                <span style={{ color: '#666' }}>
                                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ff4757',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
                          <FaComment /> Project Details
                        </label>
                        <span style={{
                          fontSize: '0.9rem',
                          color: charCount > 1000 ? '#ff4757' : '#666'
                        }}>
                          {charCount}/1000 characters
                        </span>
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Describe your project in detail: goals, requirements, target audience, and any specific features needed..."
                        rows="6"
                        maxLength="1000"
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
                        onFocus={(e) => e.currentTarget.style.borderColor = '#6C63FF'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
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
                            : 'linear-gradient(135deg, #6C63FF, #4A44C6)',
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
                          boxShadow: '0 10px 20px rgba(108, 99, 255, 0.3)'
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
                            Send Inquiry
                            <FaPaperPlane />
                          </>
                        )}
                      </button>

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                          type="button"
                          onClick={downloadResume}
                          style={{
                            padding: '0.8rem 1.5rem',
                            background: 'white',
                            color: '#6C63FF',
                            border: '2px solid #6C63FF',
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
                          Resume
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('schedule')}
                          style={{
                            padding: '0.8rem 1.5rem',
                            background: '#FF6584',
                            color: 'white',
                            border: 'none',
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
                          <FaCalendarCheck />
                          Schedule Call
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Direct Contact Tab */}
              {activeTab === 'direct' && (
                <div>
                  <h2 style={{
                    color: '#333',
                    marginBottom: '2rem',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <FaEnvelope style={{ color: '#6C63FF' }} />
                    Direct Contact Options
                  </h2>

                  {/* Contact Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #6C63FF, #4A44C6)',
                      color: 'white',
                      padding: '2rem',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => window.location.href = 'mailto:student@portfolio.com'}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <FaEnvelope style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
                      <h3 style={{ marginBottom: '0.5rem' }}>Email</h3>
                      <p style={{ opacity: 0.9 }}>student@portfolio.com</p>
                      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '1rem' }}>
                        Click to compose email
                      </p>
                    </div>

                    <div style={{
                      background: 'linear-gradient(135deg, #FF6584, #ff4757)',
                      color: 'white',
                      padding: '2rem',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => window.location.href = 'tel:+15551234567'}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <FaPhone style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
                      <h3 style={{ marginBottom: '0.5rem' }}>Phone</h3>
                      <p style={{ opacity: 0.9 }}>+1 (555) 123-4567</p>
                      <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '1rem' }}>
                        Click to call directly
                      </p>
                    </div>
                  </div>

                  {/* Social Media Grid */}
                  <div>
                    <h3 style={{ color: '#6C63FF', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                      Connect on Social Media
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                      gap: '1rem'
                    }}>
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            aspectRatio: '1',
                            background: social.color,
                            borderRadius: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.8rem',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = `0 10px 20px ${social.color}80`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {social.icon}
                          <span style={{ fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.9 }}>
                            {social.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Schedule Meeting Tab */}
              {activeTab === 'schedule' && (
                <div>
                  <h2 style={{
                    color: '#333',
                    marginBottom: '2rem',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <FaCalendarCheck style={{ color: '#6C63FF' }} />
                    Schedule a Meeting
                  </h2>

                  {isMeetingScheduled ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '3rem',
                      background: 'linear-gradient(135deg, #d4edda, #c3e6cb)',
                      borderRadius: '20px',
                      color: '#155724'
                    }}>
                      <FaCheckCircle style={{ fontSize: '4rem', marginBottom: '1rem' }} />
                      <h3 style={{ marginBottom: '1rem' }}>Meeting Scheduled Successfully!</h3>
                      <p style={{ marginBottom: '2rem' }}>
                        Your meeting has been scheduled for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
                        A calendar invite has been sent to your email.
                      </p>
                      <button
                        onClick={() => {
                          setIsMeetingScheduled(false);
                          setSelectedDate('');
                          setSelectedTime('');
                        }}
                        style={{
                          padding: '1rem 2rem',
                          background: '#155724',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Schedule Another Meeting
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '2rem',
                        marginBottom: '2rem'
                      }}>
                        <div>
                          <h3 style={{ color: '#6C63FF', marginBottom: '1rem', fontSize: '1.1rem' }}>
                            Select Date
                          </h3>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            style={{
                              width: '100%',
                              padding: '1rem',
                              border: '2px solid #e0e0e0',
                              borderRadius: '10px',
                              fontSize: '1rem',
                              outline: 'none'
                            }}
                          />
                        </div>
                        <div>
                          <h3 style={{ color: '#6C63FF', marginBottom: '1rem', fontSize: '1.1rem' }}>
                            Select Time (GMT+5:30)
                          </h3>
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '1rem',
                              border: '2px solid #e0e0e0',
                              borderRadius: '10px',
                              fontSize: '1rem',
                              outline: 'none',
                              background: 'white'
                            }}
                          >
                            <option value="">Select a time</option>
                            {timeSlots.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div style={{
                        background: '#f8f9fa',
                        padding: '1.5rem',
                        borderRadius: '15px',
                        marginBottom: '2rem'
                      }}>
                        <h4 style={{ color: '#666', marginBottom: '1rem' }}>Meeting Details:</h4>
                        <ul style={{ color: '#666', paddingLeft: '1.5rem' }}>
                          <li>30-minute consultation call</li>
                          <li>Video conference via Google Meet</li>
                          <li>Screen sharing enabled</li>
                          <li>Recording available upon request</li>
                        </ul>
                      </div>

                      <button
                        onClick={scheduleMeeting}
                        disabled={!selectedDate || !selectedTime}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: !selectedDate || !selectedTime ? '#ccc' : 'linear-gradient(135deg, #6C63FF, #4A44C6)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          cursor: !selectedDate || !selectedTime ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {!selectedDate || !selectedTime ? 'Select Date & Time' : 'Schedule Meeting'}
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Share Contact Tab */}
              {activeTab === 'share' && (
                <div>
                  <h2 style={{
                    color: '#333',
                    marginBottom: '2rem',
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <FaShareAlt style={{ color: '#6C63FF' }} />
                    Share Contact Info
                  </h2>

                  <div style={{
                    background: 'linear-gradient(135deg, #6C63FF, #4A44C6)',
                    color: 'white',
                    padding: '2rem',
                    borderRadius: '15px',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{ marginBottom: '1rem' }}>Shareable Link</h3>
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.1)',
                        padding: '1rem',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {shareLink}
                      </div>
                      <button
                        onClick={() => copyToClipboard(shareLink)}
                        style={{
                          padding: '1rem',
                          background: 'white',
                          color: '#6C63FF',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontWeight: '600'
                        }}
                      >
                        <FaCopy />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      Share this link to direct people to your contact page.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ color: '#6C63FF', marginBottom: '1rem', fontSize: '1.3rem' }}>
                      QR Code
                    </h3>
                    <div style={{
                      background: 'white',
                      padding: '2rem',
                      borderRadius: '15px',
                      textAlign: 'center',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                    }}>
                      {/* In a real app, generate QR code using a library */}
                      <div style={{
                        width: '200px',
                        height: '200px',
                        background: 'linear-gradient(45deg, #6C63FF, #FF6584)',
                        margin: '0 auto 1rem',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.2rem'
                      }}>
                        QR Code
                      </div>
                      <p style={{ color: '#666' }}>
                        Scan to save contact information
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginTop: '3rem',
            padding: '2rem',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#6C63FF',
                marginBottom: '0.5rem'
              }}>
                {"<24"}
              </div>
              <p style={{ color: '#666' }}>Hour Response Time</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#FF6584',
                marginBottom: '0.5rem'
              }}>
                100%
              </div>
              <p style={{ color: '#666' }}>Project Success Rate</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#36D1DC',
                marginBottom: '0.5rem'
              }}>
                50+
              </div>
              <p style={{ color: '#666' }}>Happy Clients</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#764ba2',
                marginBottom: '0.5rem'
              }}>
                5★
              </div>
              <p style={{ color: '#666' }}>Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
        }
        
        @media (max-width: 768px) {
          .contact-container {
            padding: 1rem !important;
          }
          
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          
          .floating-buttons {
            right: 1rem !important;
            bottom: 1rem !important;
          }
          
          .chat-window {
            width: 90% !important;
            right: 5% !important;
          }
        }
      `}</style>
    </>
  );
};

export default Contact;