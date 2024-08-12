import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes, FaBars } from 'react-icons/fa';
import Header from './components/Header'; // Import the new Header component
import Footer from './components/Footer'; // Import the Footer component
import 'bootstrap/dist/css/bootstrap.min.css';

const quickAccessItems = [
  "Class Timetable", "Teacher Information", "PG and Hostel Details", 
  "Clubs and Societies", "Food Options", "Laundry Services", 
  "Gym Details", "Academic Office", "New Student Checklist", 
  "Rules and Regulations", "Sports Facilities", "Bus Services", 
  "Faculty Locations"
];

export default function ClassroomAssistantChatbot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showQuickAccess, setShowQuickAccess] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I'm processing your request. How can I assist you further?", sender: 'bot' }]);
      }, 1000);
    }
  };

  const handleQuickAccess = (item) => {
    setMessages([...messages, { text: `Tell me about ${item}`, sender: 'user' }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: `Here's information about ${item}...`, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Header />

      <main className="flex-grow-1 d-flex flex-column p-3 overflow-hidden">
        <div className="flex-grow-1 mb-3 overflow-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-3 ${message.sender === 'user' ? 'text-end' : 'text-start'}`}>
              <div className={`d-inline-block p-2 rounded-pill ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark border'}`}>
                {message.text}
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center text-muted my-5">
              <h2 className="h4">Welcome to Campus Connet</h2>
              <p>How can I help you today?</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="h6 mb-0">Quick Access</h2>
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setShowQuickAccess(!showQuickAccess)}
            >
              {showQuickAccess ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          {showQuickAccess && (
            <div className="d-flex flex-wrap gap-2">
              {quickAccessItems.map((item, index) => (
                <button 
                  key={index} 
                  className="btn btn-outline-primary btn-sm rounded-pill" 
                  onClick={() => handleQuickAccess(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="d-flex">
          <input
            type="text"
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="form-control me-2 rounded-pill"
          />
          <button className="btn btn-primary rounded-circle" onClick={handleSendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}