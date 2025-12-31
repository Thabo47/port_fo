import React, { useState } from 'react';

const Navbar = ({ setActiveSection, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    // Scroll to top when changing sections
    window.scrollTo(0, 0);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
          StudentPortfolio
        </div>
        
        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <div 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
              style={{ cursor: 'pointer' }}
            >
              Home
            </div>
          </li>
          <li>
            <div 
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => handleNavClick('skills')}
              style={{ cursor: 'pointer' }}
            >
              Skills
            </div>
          </li>
          <li>
            <div 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
              style={{ cursor: 'pointer' }}
            >
              Contact
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;