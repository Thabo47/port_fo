import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch(activeSection) {
      case 'home':
        return <Home />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navbar setActiveSection={setActiveSection} activeSection={activeSection} />
      <main className="main-content">
        {renderSection()}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Student Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;