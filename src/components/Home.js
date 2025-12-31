import React, { useState, useEffect, useRef } from 'react';
import { FaCode, FaPalette, FaRocket, FaGraduationCap, FaLaptopCode, FaPaintBrush, FaDatabase, FaCloud, FaReact, FaPython, FaJs, FaJava, FaFigma, FaBlender, FaVideo, FaGamepad } from 'react-icons/fa';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counters, setCounters] = useState({ projects: 0, skills: 0, experience: 0 });
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  // Mouse follower effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const targetValues = { projects: 50, skills: 20, experience: 3 };
    const duration = 2000;
    const steps = 60;
    const increment = targetValues.projects / steps;
    
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= targetValues.projects) {
        setCounters(targetValues);
        clearInterval(interval);
      } else {
        setCounters({
          projects: Math.floor(current),
          skills: Math.floor((targetValues.skills / targetValues.projects) * current),
          experience: Math.floor((targetValues.experience / targetValues.projects) * current)
        });
      }
    }, duration / steps);
  };

  // Particle system
  const ParticleBackground = () => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`
          }}
        />
      );
    }
    return <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    }}>{particles}</div>;
  };

  const timelineData = [
    {
      year: "2022",
      title: "Started Software Engineering",
      description: "Began Bachelor's in Software Engineering with Multimedia focus"
    },
    {
      year: "2023",
      title: "First Major Project",
      description: "Developed full-stack e-commerce platform with React & Django"
    },
    {
      year: "2024",
      title: "Multimedia Specialization",
      description: "Advanced courses in 3D modeling, animation, and UI/UX design"
    },
    {
      year: "Present",
      title: "Building Portfolio",
      description: "Creating innovative projects combining both disciplines"
    }
  ];

  const techStack = [
    { icon: <FaReact />, name: "React" },
    { icon: <FaPython />, name: "Python" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <FaJava />, name: "Java" },
    { icon: <FaDatabase />, name: "SQL" },
    { icon: <FaCloud />, name: "Cloud" },
    { icon: <FaFigma />, name: "Figma" },
    { icon: <FaBlender />, name: "Blender" },
    { icon: <FaVideo />, name: "Premiere" },
    { icon: <FaGamepad />, name: "Unity" }
  ];

  const expertiseCards = [
    {
      icon: <FaLaptopCode />,
      title: "Full-Stack Development",
      description: "Building scalable web applications with modern frameworks",
      color: "#6C63FF"
    },
    {
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user interfaces",
      color: "#FF6584"
    },
    {
      icon: <FaPalette />,
      title: "Digital Art & Animation",
      description: "Producing captivating visual content and motion graphics",
      color: "#4A44C6"
    },
    {
      icon: <FaCode />,
      title: "Problem Solving",
      description: "Algorithmic thinking and efficient solution design",
      color: "#36D1DC"
    }
  ];

  return (
    <>
      {/* Mouse Follower */}
      <div 
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'rgba(108, 99, 255, 0.3)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease',
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`
        }}
      />

      <section id="home" style={{
        padding: '3rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Hero Section with Animation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '4rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '3.5rem',
              marginBottom: '1rem',
              background: 'linear-gradient(45deg, #6C63FF, #FF6584)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '800',
              lineHeight: '1.2'
            }}>
              Creative Developer &<br />
              Digital Artist
            </h1>
            <p style={{
              fontSize: '1.5rem',
              color: '#8C8CA1',
              marginBottom: '1.5rem'
            }}>
              Where Code Meets Creativity
            </p>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2rem',
              color: '#8C8CA1',
              lineHeight: '1.6'
            }}>
              I specialize in blending <strong>Software Engineering</strong> with <strong>Multimedia Design</strong> 
              to create immersive digital experiences. Currently advancing my expertise in both fields 
              through academic projects and real-world applications.
            </p>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'flex-start',
              margin: '2rem 0'
            }}>
              {techStack.slice(0, 6).map((tech, index) => (
                <div key={index} title={tech.name} style={{
                  fontSize: '2rem',
                  color: '#2A2D43',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#6C63FF';
                  e.currentTarget.style.transform = 'scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#2A2D43';
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                  {tech.icon}
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => window.location.href = '#contact'}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#6C63FF',
                  color: 'white',
                  padding: '0.8rem 2rem',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginRight: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4A44C6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6C63FF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FaRocket style={{ marginRight: '0.5rem' }} />
                Start Project
              </button>
              <button 
                style={{ 
                  background: 'transparent', 
                  border: '2px solid #6C63FF', 
                  color: '#6C63FF',
                  padding: '0.8rem 2rem',
                  borderRadius: '30px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => window.location.href = '#skills'}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Explore Skills
              </button>
            </div>
          </div>
          
          <div style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }} ref={heroRef}>
            <ParticleBackground />
            <div style={{
              position: 'absolute',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              animation: 'float 6s ease-in-out infinite',
              width: '80px',
              height: '80px',
              top: '20%',
              left: '20%',
              animationDelay: '0s'
            }}></div>
            <div style={{
              position: 'absolute',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              animation: 'float 6s ease-in-out infinite',
              width: '60px',
              height: '60px',
              top: '60%',
              right: '20%',
              animationDelay: '2s'
            }}></div>
            <div style={{
              position: 'absolute',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              animation: 'float 6s ease-in-out infinite',
              width: '40px',
              height: '40px',
              bottom: '30%',
              left: '40%',
              animationDelay: '4s'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '1.5rem',
              borderRadius: '10px',
              fontFamily: "'Courier New', monospace",
              color: '#00ff88',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              borderRight: '2px solid #00ff88',
              animation: 'typewriter 4s steps(40) 1s infinite alternate, blink-caret 0.75s step-end infinite'
            }}>
              <span style={{ color: '#ff79c6' }}>const</span>{' '}
              <span style={{ color: '#8be9fd' }}>developer</span>{' '}
              <span style={{ color: '#ffb86c' }}>=</span>{' '}
              <span style={{ color: '#f1fa8c' }}>&#123;</span><br/>
              &nbsp;&nbsp;<span style={{ color: '#50fa7b' }}>code:</span>{' '}
              <span style={{ color: '#bd93f9' }}>"JavaScript"</span>,<br/>
              &nbsp;&nbsp;<span style={{ color: '#50fa7b' }}>design:</span>{' '}
              <span style={{ color: '#bd93f9' }}>"Creative"</span>,<br/>
              &nbsp;&nbsp;<span style={{ color: '#50fa7b' }}>passion:</span>{' '}
              <span style={{ color: '#bd93f9' }}>"∞"</span><br/>
              <span style={{ color: '#f1fa8c' }}>&#125;</span>;
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          padding: '3rem',
          borderRadius: '20px',
          margin: '4rem 0'
        }} ref={statsRef}>
          <div style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#2A2D43',
            fontWeight: '700'
          }}>
            By The Numbers
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#6C63FF',
                marginBottom: '0.5rem'
              }}>
                {counters.projects}+
              </div>
              <p style={{ marginBottom: '1rem' }}>Projects Completed</p>
              <div style={{
                background: '#e0e0e0',
                borderRadius: '10px',
                overflow: 'hidden',
                margin: '1rem 0',
                height: '10px'
              }}>
                <div style={{
                  height: '100%',
                  width: '100%',
                  background: 'linear-gradient(90deg, #6C63FF, #FF6584)',
                  borderRadius: '10px',
                  transition: 'width 1s ease-in-out'
                }}></div>
              </div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#6C63FF',
                marginBottom: '0.5rem'
              }}>
                {counters.skills}+
              </div>
              <p style={{ marginBottom: '1rem' }}>Skills Mastered</p>
              <div style={{
                background: '#e0e0e0',
                borderRadius: '10px',
                overflow: 'hidden',
                margin: '1rem 0',
                height: '10px'
              }}>
                <div style={{
                  height: '100%',
                  width: '85%',
                  background: 'linear-gradient(90deg, #6C63FF, #FF6584)',
                  borderRadius: '10px',
                  transition: 'width 1s ease-in-out'
                }}></div>
              </div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#6C63FF',
                marginBottom: '0.5rem'
              }}>
                {counters.experience}+
              </div>
              <p style={{ marginBottom: '1rem' }}>Years Experience</p>
              <div style={{
                background: '#e0e0e0',
                borderRadius: '10px',
                overflow: 'hidden',
                margin: '1rem 0',
                height: '10px'
              }}>
                <div style={{
                  height: '100%',
                  width: '75%',
                  background: 'linear-gradient(90deg, #6C63FF, #FF6584)',
                  borderRadius: '10px',
                  transition: 'width 1s ease-in-out'
                }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Cards */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#2A2D43',
            fontWeight: '700'
          }}>
            Dual Expertise
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {expertiseCards.map((card, index) => (
              <div 
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '2rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  borderTop: `5px solid ${card.color}`,
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) rotateY(10deg) rotateX(5deg)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  color: card.color,
                  marginBottom: '1rem'
                }}>
                  {card.icon}
                </div>
                <h3 style={{ color: card.color, marginBottom: '1rem', fontSize: '1.4rem' }}>{card.title}</h3>
                <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>{card.description}</p>
                <div style={{
                  background: '#e0e0e0',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginTop: '1rem',
                  height: '8px'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${85 + index * 5}%`,
                    background: `linear-gradient(90deg, ${card.color}, ${card.color}bb)`,
                    borderRadius: '10px',
                    transition: 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parallax Section */}
        <div style={{
          position: 'relative',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: 'white',
          textAlign: 'center',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          borderRadius: '20px',
          margin: '4rem 0',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)'
          }}></div>
          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '800px',
            padding: '2rem'
          }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>Innovation Through Integration</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              The future belongs to those who can bridge the gap between technical precision 
              and creative expression. I'm building that bridge, one project at a time.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div style={{
          padding: '4rem 0',
          background: '#f8f9fa',
          borderRadius: '20px',
          margin: '4rem 0'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#2A2D43',
            fontWeight: '700'
          }}>
            My Journey
          </h2>
          <div style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '3rem auto'
          }}>
            <div style={{
              content: '',
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: '#6C63FF',
              transform: 'translateX(-50%)'
            }}></div>
            
            {timelineData.map((item, index) => (
              <div key={index} style={{
                margin: '2rem 0',
                position: 'relative',
                width: '50%',
                padding: '1.5rem',
                left: index % 2 === 0 ? '0' : '50%'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: '#6C63FF',
                  borderRadius: '50%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  right: index % 2 === 0 ? '-10px' : 'auto',
                  left: index % 2 === 1 ? '-10px' : 'auto'
                }}></div>
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '10px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <FaGraduationCap style={{ color: '#6C63FF' }} />
                    <span style={{ fontWeight: 'bold', color: '#6C63FF' }}>{item.year}</span>
                  </div>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>{item.title}</h3>
                  <p style={{ color: '#8C8CA1', lineHeight: '1.6' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#2A2D43',
            fontWeight: '700'
          }}>
            Current Focus
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ color: '#6C63FF', marginBottom: '1.5rem', fontSize: '1.4rem' }}>🎯 Active Learning</h3>
              <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                  <strong>Advanced React Patterns</strong>
                  <div style={{
                    background: '#e0e0e0',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    margin: '0.5rem 0',
                    height: '8px'
                  }}>
                    <div style={{
                      height: '100%',
                      width: '70%',
                      background: 'linear-gradient(90deg, #6C63FF, #FF6584)',
                      borderRadius: '10px',
                      transition: 'width 1s ease-in-out'
                    }}></div>
                  </div>
                </li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                  <strong>3D Animation with Three.js</strong>
                  <div style={{
                    background: '#e0e0e0',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    margin: '0.5rem 0',
                    height: '8px'
                  }}>
                    <div style={{
                      height: '100%',
                      width: '50%',
                      background: 'linear-gradient(90deg, #6C63FF, #FF6584)',
                      borderRadius: '10px',
                      transition: 'width 1s ease-in-out'
                    }}></div>
                  </div>
                </li>
                <li style={{ padding: '0.5rem 0' }}>
                  <strong>Cloud Architecture</strong>
                  <div style={{
                    background: '#e0e0e0',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    margin: '0.5rem 0',
                    height: '8px'
                  }}>
                    <div style={{
                      height: '100%',
                      width: '40%',
                      background: 'linear-gradient(90deg, #6C63FF, #FF6584)',
                      borderRadius: '10px',
                      transition: 'width 1s ease-in-out'
                    }}></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}>
              <h3 style={{ color: '#FF6584', marginBottom: '1.5rem', fontSize: '1.4rem' }}>🚀 Upcoming Projects</h3>
              <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', background: '#00ff88', borderRadius: '50%' }}></div>
                  <span>Interactive 3D Portfolio</span>
                </li>
                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', background: '#ff6584', borderRadius: '50%' }}></div>
                  <span>AI-Powered Design Tool</span>
                </li>
                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', background: '#6C63FF', borderRadius: '50%' }}></div>
                  <span>Educational Game Platform</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: '3rem',
          background: 'linear-gradient(135deg, #6C63FF, #4A44C6)',
          borderRadius: '20px',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>Ready to Create Something Amazing?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Let's combine technical excellence with creative vision to build something extraordinary.
          </p>
          <button 
            style={{
              background: 'white',
              color: '#6C63FF',
              fontSize: '1.1rem',
              padding: '1rem 2.5rem',
              border: 'none',
              borderRadius: '50px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}
            onClick={() => window.location.href = '#contact'}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaRocket style={{ marginRight: '0.5rem' }} />
            Let's Collaborate
          </button>
        </div>
      </section>

      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 340px; }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #00ff88; }
        }
        
        @media (max-width: 992px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          section#home {
            padding: 1rem;
          }
          
          .hero {
            grid-template-columns: 1fr;
          }
          
          h1 {
            font-size: 2rem !important;
          }
          
          .parallax-section {
            background-attachment: scroll !important;
          }
          
          .timeline::before {
            left: 30px !important;
          }
          
          .timeline-item {
            width: 100% !important;
            left: 0 !important;
            padding-left: 60px !important;
          }
          
          .timeline-dot {
            left: 20px !important;
            right: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default Home;