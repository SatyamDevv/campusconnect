import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/LoginPage.css'; // We'll create this file for styles

const courses = ['BCA'];
const sections = ['A', 'B', 'C', 'D'];

function LoginPage() {
  const [name, setName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [course, setCourse] = useState('');
  const [section, setSection] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, regNumber, course, section, password, isSignUp });
    navigate('/chat');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="regNumber">Registration Number</label>
            <input
              id="regNumber"
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="course">Course</label>
            <select id="course" value={course} onChange={(e) => setCourse(e.target.value)} required>
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="section">Section</label>
            <select id="section" value={section} onChange={(e) => setSection(e.target.value)} required>
              <option value="">Select Section</option>
              {sections.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <button className="toggle-btn" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;