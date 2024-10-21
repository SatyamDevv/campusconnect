import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer'; 
import Header from './components/Header'; 
import QuickAccess from './components/QuickAccess';
import { generateResponse, initializeGeminiWithUserData } from './services/geminiApi';

export default function ClassroomAssistantChatbot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showQuickAccess, setShowQuickAccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.userData) {
      setUserData(location.state.userData);
      initializeChat(location.state.userData);
    }
  }, [location]);

  const initializeChat = async (userData) => {
    try {
      await initializeGeminiWithUserData(userData);
      setIsInitialized(true);
    } catch (error) {
      console.error("Error initializing chat:", error);
      // Handle initialization error (e.g., show an error message to the user)
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() && isInitialized) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      setIsLoading(true);
      
      try {
        const botResponse = await generateResponse(inputMessage);
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      } catch (error) {
        console.error("Error generating response:", error);
        setMessages(prev => [...prev, { text: "I'm sorry, I encountered an error while processing your request. Please try again.", sender: 'bot' }]);
      }
      
      setIsLoading(false);
    }
  };

  const handleQuickAccess = async (item) => {
    if (isInitialized) {
      const userMessage = `Tell me about ${item}`;
      setMessages([...messages, { text: userMessage, sender: 'user' }]);
      setIsLoading(true);
      
      try {
        const botResponse = await generateResponse(userMessage);
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      } catch (error) {
        console.error("Error generating response:", error);
        setMessages(prev => [...prev, { text: "I'm sorry, I encountered an error while processing your request. Please try again.", sender: 'bot' }]);
      }
      
      setIsLoading(false);
    }
  };

  const formatMessage = (text) => {
    return (
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p className="mb-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="mb-2 pl-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="mb-2 pl-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          h1: ({ node, children, ...props }) => <h1 className="h5 mb-2" {...props}>{children}</h1>,
          h2: ({ node, children, ...props }) => <h2 className="h6 mb-2" {...props}>{children}</h2>,
          h3: ({ node, children, ...props }) => <h3 className="h6 mb-2" {...props}>{children}</h3>,
          code: ({ node, inline, children, ...props }) => 
            inline ? (
              <code className="bg-light px-1 rounded" {...props}>{children}</code>
            ) : (
              <pre className="bg-light p-2 rounded"><code {...props}>{children}</code></pre>
            ),
        }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Header userData={userData} />

      <main className="flex-grow-1 d-flex flex-column p-3 overflow-hidden">
        <div className="flex-grow-1 mb-3 overflow-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-3 ${message.sender === 'user' ? 'text-end' : 'text-start'}`}>
              <div className={`d-inline-block p-2 rounded ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark border'}`} style={{ maxWidth: '80%', overflowWrap: 'break-word' }}>
                {formatMessage(message.text)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-start mb-3">
              <div className="d-inline-block p-2 rounded bg-light text-dark border">
                <span className="loading-dots"><span>.</span><span>.</span><span>.</span></span>
              </div>
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-muted my-5">
              <h2 className="h4">Welcome to Campus Assist {location.state.userData.name} </h2>
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
          <button className="btn btn-primary rounded-circle" onClick={handleSendMessage} disabled={isLoading}>
            <FaPaperPlane />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}