import React, { useContext, useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";

function LoginPage() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore to get the role
      const userDocRef = doc(db, "Users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Check user role and redirect based on role
        if (userData.Role === "Workshop") {
          navigate("/workshopHome");
        } else {
          navigate("/");  // Default navigation for other roles (e.g., Customer)
        }
      } else {
        console.error("No user document found in Firestore for UID:", user.uid);
      }

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: user });

    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="container">
      <div className="background"></div>
      <div className="background-image"></div>
      <div className="login-wrapper">
        <div className="login-wrapper-left">
          <div className="left-side">
            <h1>Ola!</h1>
            <p>Since its inception in 2022, OTOCARE has consistently engaged with over 100,000 audiences annually, providing exceptional services that have amounted to an impressive 15,000 completions.</p>
          </div>
        </div>
        <div className="login-wrapper-right">
          <div className="right-side">
            <div className="login-box">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  onChange={e => setEmail(e.target.value)}  
                />
                <label htmlFor="pswd">Password</label>
                <input 
                  type="password" 
                  id="pswd" 
                  name="pswd" 
                  onChange={e => setPassword(e.target.value)} 
                />
                <button type='submit'>Login</button>
              </form>
              <div className="registerhere">
                Don't have an account? 
                <Link to="/register" className="register-link"> Register</Link>
              </div>
              {error && <span>Wrong email or password!</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
