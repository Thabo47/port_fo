import React from 'react';
import { FaCode, FaPalette, FaDatabase, FaVideo, FaGamepad, FaMobile } from 'react-icons/fa';

const Skills = () => {
  const softwareSkills = [
    { name: 'JavaScript/React', level: 'Advanced' },
    { name: 'Python/Django', level: 'Intermediate' },
    { name: 'Java/Spring Boot', level: 'Intermediate' },
    { name: 'Database Design (SQL/NoSQL)', level: 'Advanced' },
    { name: 'RESTful APIs', level: 'Intermediate' },
    { name: 'Git & Version Control', level: 'Advanced' },
    { name: 'Agile/Scrum Methodologies', level: 'Intermediate' },
    { name: 'Data Structures & Algorithms', level: 'Intermediate' },
  ];

  const multimediaSkills = [
    { name: 'Adobe Creative Suite', level: 'Advanced' },
    { name: 'UI/UX Design (Figma)', level: 'Intermediate' },
    { name: '3D Modeling (Blender)', level: 'Beginner' },
    { name: 'Video Editing (Premiere Pro)', level: 'Intermediate' },
    { name: 'Motion Graphics (After Effects)', level: 'Intermediate' },
    { name: 'Digital Illustration', level: 'Advanced' },
    { name: 'Photography & Photo Editing', level: 'Intermediate' },
    { name: 'Audio Production', level: 'Beginner' },
  ];

  const integratedSkills = [
    { name: 'Web Development', icon: <FaCode /> },
    { name: 'Frontend Design', icon: <FaPalette /> },
    { name: 'Database Management', icon: <FaDatabase /> },
    { name: 'Video Production', icon: <FaVideo /> },
    { name: 'Game Development', icon: <FaGamepad /> },
    { name: 'Mobile App Design', icon: <FaMobile /> },
  ];

  return (
    <section className="skills-container" id="skills">
      <h2 className="section-title">My Skills</h2>
      
      <div className="skills-grid">
        <div className="skill-category">
          <h3 className="category-title">
            <FaCode /> Software Engineering
          </h3>
          <ul className="skills-list">
            {softwareSkills.map((skill, index) => (
              <li key={index} className="skill-item">
                <span className="skill-icon">▸</span>
                <div>
                  <strong>{skill.name}</strong>
                  <div className="skill-level">{skill.level}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="skill-category">
          <h3 className="category-title">
            <FaPalette /> Multimedia
          </h3>
          <ul className="skills-list">
            {multimediaSkills.map((skill, index) => (
              <li key={index} className="skill-item">
                <span className="skill-icon">▸</span>
                <div>
                  <strong>{skill.name}</strong>
                  <div className="skill-level">{skill.level}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="integrated-skills">
        <h3 className="section-title" style={{ fontSize: '2rem', marginTop: '3rem' }}>
          Integrated Expertise
        </h3>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--gray-color)' }}>
          Combining both disciplines for comprehensive solutions
        </p>
        
        <div className="skills-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {integratedSkills.map((skill, index) => (
            <div key={index} className="skill-item" style={{ flexDirection: 'column', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
                {skill.icon}
              </div>
              <strong>{skill.name}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="projects-preview">
        <h3 className="section-title" style={{ fontSize: '2rem', marginTop: '3rem' }}>
          Project Highlights
        </h3>
        <div className="projects-grid">
          <div className="project-card">
            <h4>Interactive Portfolio Website</h4>
            <p>React + Three.js + GSAP animation</p>
          </div>
          <div className="project-card">
            <h4>E-commerce Platform</h4>
            <p>Django + React + Custom UI Design</p>
          </div>
          <div className="project-card">
            <h4>Educational Game</h4>
            <p>Unity + C# + Original Artwork</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;