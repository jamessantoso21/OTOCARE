import React from 'react'
import './ProfilePage.css';

import Navbar from '../../UniversalComponents/Navbar/Navbar'
import Footer from '../../UniversalComponents/Footer/Footer';
import { Link } from 'react-router-dom';

function Profile() {
  // const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false)
  
  const userData = {
    username: "Fredi Jacob",
    name: "Fredi Nigelle Yakobson Simangunsong ",
    email: "Freditampanssz@gmail.com",
    phoneNumber: "0845369784521",
    address: "Jl. Teluk Betung no 28, Blok CC 1",
    province: "Jambi",
  }

  return (
    <>
      <Navbar />
      {/* <ProfileTag/> */}
      <div className="profiletag-container">
        <div className="profiletag-wrapper">
          {/* <Link to='/' className = 'back' onClick={closeMobileMenu}> */}
          {/* <img src="/arrow.png" alt="arrow" /> */}
          {/* </Link> */}
          <div className="profiletag">
            <h1>PROFILE</h1>
          </div>
        </div>
      </div>

      {/* <ProfilePic/> */}
      <div className="profilepic-container">
        <div className="profilepic-wrapper">
          <div className="profilepic-top">
            <img src="profilepic.jpg" alt="profilepic" />
          </div>
          <div className="profilepic-bot">
            <h2>
              {userData.username}
            </h2>
            <h3>
              {userData.email}
            </h3>
            <h3>
              {userData.phoneNumber}
            </h3>
          </div>
        </div>
      </div>

      <div className="UserProfile-container">
        <div className="UserProfile-wrapper">
          <h2>User Profile</h2>
          <div className="user-info">
            <label>Username</label>
            <div className="info-box">{userData.username}</div>
          </div>
          <div className="user-info">
            <label>Name</label>
            <div className="info-box">{userData.name}</div>
          </div>
          <div className="user-info">
            <label>Email</label>
            <div className="info-box">{userData.email}</div>
          </div>
          <div className="user-info">
            <label>Phone Number</label>
            <div className="info-box">{userData.phoneNumber}</div>
          </div>
          <div className="user-info">
            <label>Address</label>
            <div className="info-box">{userData.address}</div>
          </div>
          <div className="user-info">
            <label>Province</label>
            <div className="info-box">{userData.province}</div>
          </div>
          
          <div className="button-container">
            <button>
              Edit Profile
            </button>
            <Link to='/login' className='changeaccount' onClick={closeMobileMenu}>
              Change Account
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Profile
