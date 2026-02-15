import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import ChatBot from './components/ChatBot'; // import your chatbot

function App() {
  return (
    <Router>
      {/* Navbar with glassmorphism theme - wrapped in site-container for consistent width */}
      <div className="site-container">
        <Navbar title="ChatBot" aboutText="About Us" />
      </div>

      {/* Consistent site container for all content */}
      <div className="site-container my-3">
        <Routes>
          <Route path="/" element={<ChatBot />} />   {/* Home route shows chatbot */}
          <Route path="/about" element={<About />} /> {/* About route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
