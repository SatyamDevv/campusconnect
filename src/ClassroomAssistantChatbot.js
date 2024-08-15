import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Footer from './components/Footer'; 
import Header from './components/Header'; 
import QuickAccess from './components/QuickAccess';
import { generateResponse } from './services/geminiApi';

export default function ClassroomAssistantChatbot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showQuickAccess, setShowQuickAccess] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      
      const botResponse = await generateResponse(inputMessage);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }
  };

  const handleQuickAccess = async (item) => {
    const userMessage = `Tell me about ${item}`;
    setMessages([...messages, { text: userMessage, sender: 'user' }]);
    
    const botResponse = await generateResponse(userMessage);
    setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
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
              <h2 className="h4">Welcome to Campus Connect</h2>
              <p>How can I help you today?</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <QuickAccess 
          onItemClick={handleQuickAccess}
          showQuickAccess={showQuickAccess}
          setShowQuickAccess={setShowQuickAccess}
        />

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