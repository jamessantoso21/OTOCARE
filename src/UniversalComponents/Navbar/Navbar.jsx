import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';  // Import context
import { db } from '../../firebase'; // Import Firestore
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const { currentUser } = useContext(AuthContext);  // Get currentUser from AuthContext
  const [role, setRole] = useState(null);  // State to store role
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        try {
          // Fetch user document based on UID
          const userDocRef = doc(db, 'Users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.Role);  // Set the role based on Firestore data
          } else {
            console.error('No user document found for UID:', currentUser.uid);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    if (currentUser) {
      fetchUserRole();  // Fetch the role when currentUser changes
    }
  }, [currentUser]);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogoClick = () => {
    if (role === 'Workshop') {
      navigate('/workshopHome');
    } else if (role === 'Customer') {
      navigate('/');
    }
  };

  // Debugging the currentUser role
  console.log(currentUser);  // Verify currentUser object
  console.log(role);  // Check the role after fetching

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link  className="navbar-logo" onClick={handleLogoClick}>
            <img src="/logo.png" alt="Logo" width="15%" height="25%" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/* Check the role of the currentUser */}
            {role === 'Customer' ? (
              <>
                <li className="nav-item">
                  <Link to="/repairShops" className="nav-links" onClick={closeMobileMenu}>
                    Repair Shops
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders" className="nav-links" onClick={closeMobileMenu}>
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
                    Profile
                  </Link>
                </li>
              </>
            ) : role === 'Workshop' ? (
              <>
                <li className="nav-item">
                  <Link to="/workshopHome" className="nav-links" onClick={closeMobileMenu}>
                    Workshop Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
