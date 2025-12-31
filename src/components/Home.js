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
          className="particle"
          style={{
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
    return <div className="particle-bg">{particles}</div>;
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
        className="mouse-follower"
        style={{
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`
        }}
      />

      <section className="home-container" id="home">
        {/* Hero Section with Animation */}
        <div className="hero">
          <div className="hero-content">
            <h1>
              <span className="gradient-text">Creative Developer</span> &<br />
              <span className="gradient-text">Digital Artist</span>
            </h1>
            <p className="subtitle">Where Code Meets Creativity</p>
            <p className="description">
              I specialize in blending <strong>Software Engineering</strong> with <strong>Multimedia Design</strong> 
              to create immersive digital experiences. Currently advancing my expertise in both fields 
              through academic projects and real-world applications.
            </p>
            
            <div className="tech-stack">
              {techStack.slice(0, 6).map((tech, index) => (
                <div key={index} className="tech-icon" title={tech.name}>
                  {tech.icon}
                </div>
              ))}
            </div>

            <div className="hero-buttons">
              <button 
                className="cta-button"
                onClick={() => window.location.href = '#contact'}
                style={{ marginRight: '1rem' }}
              >
                <FaRocket style={{ marginRight: '0.5rem' }} />
                Start Project
              </button>
              <button 
                className="cta-button"
                style={{ background: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}
                onClick={() => window.location.href = '#skills'}
              >
                Explore Skills
              </button>
            </div>
          </div>
          
          <div className="hero-animation" ref={heroRef}>
            <ParticleBackground />
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="code-display">
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
        <div className="stats-section" ref={statsRef}>
          <div className="section-title">By The Numbers</div>
          <div className="stats">
            <div className="stat-item">
              <div className="counter">{counters.projects}+</div>
              <p>Projects Completed</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="stat-item">
              <div className="counter">{counters.skills}+</div>
              <p>Skills Mastered</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="stat-item">
              <div className="counter">{counters.experience}+</div>
              <p>Years Experience</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Cards */}
        <div className="expertise-section">
          <h2 className="section-title">Dual Expertise</h2>
          <div className="expertise-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {expertiseCards.map((card, index) => (
              <div 
                key={index} 
                className="interactive-card card-3d"
                style={{ borderTop: `5px solid ${card.color}` }}
              >
                <div className="card-icon" style={{ color: card.color }}>
                  {card.icon}
                </div>
                <h3 style={{ color: card.color }}>{card.title}</h3>
                <p>{card.description}</p>
                <div className="progress-container" style={{ marginTop: '1rem' }}>
                  <div className="progress-bar" style={{ width: `${85 + index * 5}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parallax Section */}
        <div className="parallax-section" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}>
          <div className="parallax-overlay"></div>
          <div className="parallax-content">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Innovation Through Integration</h2>
            <p style={{ fontSize: '1.2rem' }}>
              The future belongs to those who can bridge the gap between technical precision 
              and creative expression. I'm building that bridge, one project at a time.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-section">
          <h2 className="section-title">My Journey</h2>
          <div className="timeline">
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <FaGraduationCap style={{ color: 'var(--primary-color)' }} />
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{item.year}</span>
                  </div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--gray-color)' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <div className="focus-section" style={{ marginTop: '4rem' }}>
          <h2 className="section-title">Current Focus</h2>
          <div className="focus-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="interactive-card">
              <h3 style={{ color: 'var(--primary-color)' }}>🎯 Active Learning</h3>
              <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                  <strong>Advanced React Patterns</strong>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: '70%' }}></div>
                  </div>
                </li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                  <strong>3D Animation with Three.js</strong>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: '50%' }}></div>
                  </div>
                </li>
                <li style={{ padding: '0.5rem 0' }}>
                  <strong>Cloud Architecture</strong>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: '40%' }}></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="interactive-card">
              <h3 style={{ color: 'var(--accent-color)' }}>🚀 Upcoming Projects</h3>
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
        <div className="cta-section" style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', borderRadius: '20px', color: 'white' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Create Something Amazing?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Let's combine technical excellence with creative vision to build something extraordinary.
          </p>
          <button 
            className="cta-button"
            style={{ background: 'white', color: 'var(--primary-color)', fontSize: '1.1rem', padding: '1rem 2.5rem' }}
            onClick={() => window.location.href = '#contact'}
          >
            <FaRocket style={{ marginRight: '0.5rem' }} />
            Let's Collaborate
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;