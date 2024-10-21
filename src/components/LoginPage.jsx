import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import '../style/LoginPage.css';

const courses = ['BCA'];
const sections = ['A', 'B', 'C', 'D'];

function LoginPage() {
  const [name, setName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [course, setCourse] = useState('');
  const [section, setSection] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let userData;
      if (isSignUp) {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        userData = {
          name: name,
          email: email,
          regNumber: regNumber,
          course: course,
          section: section,
          uid: user.uid
        };

        // Store additional user info in Firestore
        try {
          await setDoc(doc(db, "students", user.uid), userData);
          console.log("Document written successfully");
        } catch (error) {
          console.error("Error writing document: ", error);
        }
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "students", user.uid));
        if (userDoc.exists()) {
          userData = userDoc.data();
        } else {
          userData = { email: user.email, uid: user.uid };
        }
      }
      navigate('/chat', { state: { userData } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
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
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
