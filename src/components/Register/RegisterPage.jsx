import React, { useState } from 'react';
import './RegisterPage.css';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { collection, addDoc, doc ,setDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpswd, setPass] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (validateName(name) && validateEmail(email) && validatePassword(password)) {
      try {
        // Create user authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Create user document in Users collection with UserUID as the document ID
        const userData = {
          Role: "Customer",
          UserName: name,
          UserUID: user.uid, // Optional but can be stored redundantly for query convenience
        };
  
        await setDoc(doc(db, "Users", user.uid), userData);
  
        navigate("/login");
      } catch (error) {
        console.error("Error during registration: ", error);
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  const validateName = (name) => {
    if (name.length < 6) {
      alert("Name must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address ending with .com");
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="container">
        <div className="background"></div>
        <div className="background-image"></div>
        <div className="register-wrapper">
          <div className="register-wrapper-left">
            <div className="left-side">
              <h1>Ola!</h1>
              <p>Since its inception in 2022, OTOCARE has consistently engaged with over 100,000 audiences annually, providing exceptional services that have amounted to an impressive 15,000 completions.</p>
            </div>
          </div>

          <div className="register-wrapper-left">
            <div className="right-side">
              <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={handleRegister}> 
                  <label htmlFor='name'>Name</label>
                  <input 
                    type='name' 
                    id='name' 
                    name='name' 
                    placeholder="Input Name" 
                    onChange={e => setName(e.target.value)} 
                    autoComplete="given-name"
                  />
                  
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Input your email here" 
                    onChange={e => setEmail(e.target.value)} 
                    autoComplete="email"
                  />
                  
                  <label htmlFor="pswd">Password</label>
                  <input 
                    type="password" 
                    id="pswd" 
                    name="pswd" 
                    placeholder="********" 
                    onChange={e => setPassword(e.target.value)} 
                    autoComplete="new-password"
                  />
                  
                  <button type='submit'>Register</button>
                </form>

                <div className="loginhere">
                  Already have an account? 
                  <Link to="/login" className="login-link">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;