import React, { useState, useEffect } from 'react';
import { 
  FaCode, FaPalette, FaDatabase, FaVideo, FaGamepad, FaMobile, 
  FaPython, FaJava, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, 
  FaGitAlt, FaDocker, FaAws, FaFigma, FaUnity, FaCloud,
  FaChartLine, FaShieldAlt, FaRobot, FaVrCardboard, FaCodeBranch
} from 'react-icons/fa';
import { SiBlender, SiAdobecreativecloud, SiUnrealengine, SiAdobephotoshop, SiAdobeillustrator } from 'react-icons/si';

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [skillLevels, setSkillLevels] = useState({});
  const [isComparing, setIsComparing] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const softwareSkills = [
    { 
      id: 1, 
      name: 'React.js', 
      level: 90, 
      category: 'frontend',
      icon: <FaReact />,
      description: 'Building modern, responsive web applications with hooks and context API',
      projects: 15,
      color: '#61DAFB'
    },
    { 
      id: 2, 
      name: 'Python/Django', 
      level: 85, 
      category: 'backend',
      icon: <FaPython />,
      description: 'Backend development, data analysis, and machine learning',
      projects: 12,
      color: '#3776AB'
    },
    { 
      id: 3, 
      name: 'Java/Spring', 
      level: 80, 
      category: 'backend',
      icon: <FaJava />,
      description: 'Enterprise applications and Android development',
      projects: 8,
      color: '#007396'
    },
    { 
      id: 4, 
      name: 'Node.js', 
      level: 75, 
      category: 'backend',
      icon: <FaNodeJs />,
      description: 'Server-side JavaScript and REST API development',
      projects: 10,
      color: '#339933'
    },
    { 
      id: 5, 
      name: 'Database Design', 
      level: 88, 
      category: 'database',
      icon: <FaDatabase />,
      description: 'SQL, MongoDB, and database optimization',
      projects: 20,
      color: '#00618A'
    },
    { 
      id: 6, 
      name: 'DevOps', 
      level: 70, 
      category: 'infrastructure',
      icon: <FaDocker />,
      description: 'Docker, CI/CD, and cloud deployment',
      projects: 6,
      color: '#2496ED'
    },
    { 
      id: 7, 
      name: 'Cloud Services', 
      level: 75, 
      category: 'infrastructure',
      icon: <FaAws />,
      description: 'AWS, Azure, and cloud architecture',
      projects: 8,
      color: '#FF9900'
    },
    { 
      id: 8, 
      name: 'Git & Agile', 
      level: 95, 
      category: 'tools',
      icon: <FaGitAlt />,
      description: 'Version control and agile methodologies',
      projects: 30,
      color: '#F05032'
    }
  ];

  const multimediaSkills = [
    { 
      id: 9, 
      name: 'UI/UX Design', 
      level: 88, 
      category: 'design',
      icon: <FaFigma />,
      description: 'User interface design and prototyping',
      projects: 18,
      color: '#F24E1E'
    },
    { 
      id: 10, 
      name: 'Adobe Creative Suite', 
      level: 85, 
      category: 'design',
      icon: <SiAdobecreativecloud />,
      description: 'Photoshop, Illustrator, After Effects',
      projects: 25,
      color: '#FF0000'
    },
    { 
      id: 11, 
      name: '3D Modeling', 
      level: 75, 
      category: '3d',
      icon: <SiBlender />,
      description: 'Blender for 3D assets and animations',
      projects: 10,
      color: '#F5792A'
    },
    { 
      id: 12, 
      name: 'Video Production', 
      level: 80, 
      category: 'video',
      icon: <FaVideo />,
      description: 'Editing, color grading, and motion graphics',
      projects: 15,
      color: '#FFA500'
    },
    { 
      id: 13, 
      name: 'Game Development', 
      level: 70, 
      category: 'gaming',
      icon: <FaGamepad />,
      description: 'Unity game development and design',
      projects: 8,
      color: '#000000'
    },
    { 
      id: 14, 
      name: 'Mobile Design', 
      level: 82, 
      category: 'design',
      icon: <FaMobile />,
      description: 'iOS and Android app interfaces',
      projects: 12,
      color: '#34B7F1'
    },
    { 
      id: 15, 
      name: 'VR/AR Development', 
      level: 65, 
      category: 'emerging',
      icon: <FaVrCardboard />,
      description: 'Virtual and augmented reality experiences',
      projects: 4,
      color: '#8A2BE2'
    },
    { 
      id: 16, 
      name: 'Motion Graphics', 
      level: 78, 
      category: 'animation',
      icon: <SiAdobephotoshop />,
      description: 'Animated graphics and visual effects',
      projects: 11,
      color: '#DA1F26'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Skills', icon: '📊', count: softwareSkills.length + multimediaSkills.length },
    { id: 'frontend', name: 'Frontend', icon: '💻', count: softwareSkills.filter(s => s.category === 'frontend').length },
    { id: 'backend', name: 'Backend', icon: '⚙️', count: softwareSkills.filter(s => s.category === 'backend').length },
    { id: 'design', name: 'Design', icon: '🎨', count: multimediaSkills.filter(s => s.category === 'design').length },
    { id: '3d', name: '3D & Animation', icon: '🎬', count: multimediaSkills.filter(s => s.category === '3d' || s.category === 'animation').length },
    { id: 'emerging', name: 'Emerging Tech', icon: '🚀', count: multimediaSkills.filter(s => s.category === 'emerging').length + softwareSkills.filter(s => s.category === 'infrastructure').length }
  ];

  useEffect(() => {
    // Initialize skill levels with animation
    const allSkills = [...softwareSkills, ...multimediaSkills];
    const initialLevels = {};
    allSkills.forEach(skill => {
      initialLevels[skill.id] = 0;
    });
    setSkillLevels(initialLevels);

    // Animate skill levels
    setTimeout(() => {
      const animatedLevels = {};
      allSkills.forEach(skill => {
        animatedLevels[skill.id] = skill.level;
      });
      setSkillLevels(animatedLevels);
    }, 500);
  }, []);

  const toggleSkillForCompare = (skillId) => {
    if (selectedForCompare.includes(skillId)) {
      setSelectedForCompare(selectedForCompare.filter(id => id !== skillId));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, skillId]);
      }
    }
  };

  const getFilteredSkills = () => {
    let skills = [...softwareSkills, ...multimediaSkills];
    
    if (activeFilter !== 'all') {
      if (['frontend', 'backend', 'database', 'infrastructure', 'tools'].includes(activeFilter)) {
        skills = softwareSkills.filter(skill => skill.category === activeFilter);
      } else {
        skills = multimediaSkills.filter(skill => skill.category === activeFilter);
      }
    }
    
    if (searchTerm) {
      skills = skills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return skills;
  };

  const filteredSkills = getFilteredSkills();
  const selectedSkills = [...softwareSkills, ...multimediaSkills].filter(skill => 
    selectedForCompare.includes(skill.id)
  );

  return (
    <section 
      className="skills-container" 
      id="skills"
      style={{
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '25px',
        padding: '3rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          position: 'relative'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            fontWeight: '800'
          }}>
            Technical Arsenal
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Explore my dual expertise in software engineering and multimedia design. 
            Each skill is backed by real project experience and continuous learning.
          </p>

          {/* Search and Filter Controls */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
              <input
                type="text"
                placeholder="🔍 Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  border: '2px solid #667eea',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#667eea'
              }}>
                🔍
              </div>
            </div>

            <button
              onClick={() => setIsComparing(!isComparing)}
              style={{
                padding: '1rem 2rem',
                background: isComparing ? '#764ba2' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isComparing ? 'Exit Compare Mode' : 'Compare Skills'}
              <FaChartLine />
            </button>
          </div>

          {/* Category Filters */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                style={{
                  padding: '0.8rem 1.5rem',
                  background: activeFilter === category.id ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'white',
                  color: activeFilter === category.id ? 'white' : '#667eea',
                  border: `2px solid ${activeFilter === category.id ? 'transparent' : '#667eea'}`,
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeFilter === category.id ? '0 5px 15px rgba(102, 126, 234, 0.3)' : 'none'
                }}
              >
                <span>{category.icon}</span>
                {category.name}
                <span style={{
                  background: activeFilter === category.id ? 'rgba(255,255,255,0.2)' : 'rgba(102, 126, 234, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  marginLeft: '0.5rem'
                }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison View */}
        {isComparing && selectedSkills.length > 0 && (
          <div style={{
            marginBottom: '3rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            borderRadius: '20px',
            border: '2px dashed #667eea'
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '1.5rem', textAlign: 'center' }}>
              📊 Skill Comparison ({selectedSkills.length}/3 selected)
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {selectedSkills.map(skill => (
                <div key={skill.id} style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  position: 'relative'
                }}>
                  <button
                    onClick={() => toggleSkillForCompare(skill.id)}
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      background: '#ff4757',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}
                  >
                    ×
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      fontSize: '2rem',
                      color: skill.color,
                      background: `${skill.color}20`,
                      padding: '0.5rem',
                      borderRadius: '10px'
                    }}>
                      {skill.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#333' }}>{skill.name}</h4>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>{skill.category}</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', color: '#666' }}>Proficiency</span>
                      <span style={{ fontWeight: '600', color: skill.color }}>{skillLevels[skill.id]}%</span>
                    </div>
                    <div style={{
                      height: '10px',
                      background: '#e0e0e0',
                      borderRadius: '5px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${skillLevels[skill.id]}%`,
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                        borderRadius: '5px',
                        transition: 'width 1s ease-in-out'
                      }}></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    {skill.description}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: '#888'
                  }}>
                    <span>Projects: {skill.projects}</span>
                    <span>Level: {skill.level >= 80 ? 'Advanced' : skill.level >= 60 ? 'Intermediate' : 'Beginner'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {filteredSkills.map(skill => (
            <div 
              key={skill.id}
              onClick={() => isComparing && toggleSkillForCompare(skill.id)}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                cursor: isComparing ? 'pointer' : 'default',
                border: selectedForCompare.includes(skill.id) ? '3px solid #667eea' : '2px solid transparent',
                transform: selectedForCompare.includes(skill.id) ? 'translateY(-5px)' : 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isComparing) {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isComparing) {
                  e.currentTarget.style.transform = selectedForCompare.includes(skill.id) 
                    ? 'translateY(-5px)' 
                    : 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                }
              }}
            >
              {/* Selection Indicator */}
              {isComparing && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '24px',
                  height: '24px',
                  border: `2px solid ${selectedForCompare.includes(skill.id) ? '#667eea' : '#ddd'}`,
                  borderRadius: '50%',
                  background: selectedForCompare.includes(skill.id) ? '#667eea' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.8rem'
                }}>
                  {selectedForCompare.includes(skill.id) ? '✓' : '+'}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{
                  fontSize: '2.5rem',
                  color: skill.color,
                  background: `${skill.color}15`,
                  padding: '1rem',
                  borderRadius: '15px',
                  minWidth: '70px',
                  textAlign: 'center'
                }}>
                  {skill.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    margin: 0, 
                    color: '#333',
                    fontSize: '1.4rem',
                    fontWeight: '700'
                  }}>
                    {skill.name}
                  </h3>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.3rem 1rem',
                    background: skill.id <= 8 ? 'rgba(102, 126, 234, 0.1)' : 'rgba(118, 75, 162, 0.1)',
                    color: skill.id <= 8 ? '#667eea' : '#764ba2',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    marginTop: '0.5rem'
                  }}>
                    {skill.id <= 8 ? 'Software Engineering' : 'Multimedia'}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: '600' }}>PROFICIENCY</span>
                  <span style={{ 
                    fontWeight: '700', 
                    color: skill.color,
                    fontSize: '1.1rem'
                  }}>
                    {skillLevels[skill.id]}%
                  </span>
                </div>
                <div style={{
                  height: '12px',
                  background: 'linear-gradient(90deg, #f0f0f0, #e0e0e0)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${skillLevels[skill.id]}%`,
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}bb)`,
                    borderRadius: '6px',
                    transition: 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      animation: 'shimmer 2s infinite'
                    }}></div>
                  </div>
                </div>
              </div>

              <p style={{
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                {skill.description}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1.5rem',
                borderTop: '1px solid #f0f0f0'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    background: skill.color,
                    borderRadius: '50%'
                  }}></div>
                  <span style={{ fontSize: '0.9rem', color: '#888' }}>
                    {skill.projects} projects
                  </span>
                </div>
                <div style={{
                  padding: '0.5rem 1rem',
                  background: `${skill.color}15`,
                  color: skill.color,
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {skill.level >= 80 ? '🔥 Advanced' : skill.level >= 60 ? '⚡ Intermediate' : '🌱 Learning'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Distribution Chart */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '20px',
          padding: '2.5rem',
          color: 'white',
          marginBottom: '3rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            📈 Skill Distribution
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {categories.slice(1).map(category => {
              const categorySkills = [...softwareSkills, ...multimediaSkills]
                .filter(skill => skill.category === category.id);
              const avgLevel = categorySkills.length > 0 
                ? Math.round(categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length)
                : 0;
              
              return (
                <div key={category.id} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                    opacity: 0.9
                  }}>
                    {category.icon}
                  </div>
                  <h4 style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>{category.name}</h4>
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    margin: '0.5rem 0'
                  }}>
                    {avgLevel}%
                  </div>
                  <div style={{
                    height: '6px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '3px',
                    margin: '0 auto',
                    width: '80%',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${avgLevel}%`,
                      background: 'white',
                      borderRadius: '3px'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: '20px',
          border: '2px solid rgba(102, 126, 234, 0.3)'
        }}>
          <h3 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1.8rem' }}>
            Ready to Leverage These Skills?
          </h3>
          <p style={{ color: '#666', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            I'm always excited to apply these skills to real-world projects. 
            Whether you need a web application, multimedia content, or a combination of both, let's collaborate!
          </p>
          <button
            onClick={() => window.location.href = '#contact'}
            style={{
              padding: '1rem 3rem',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
            }}
          >
            Start a Project Together →
          </button>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Skills;