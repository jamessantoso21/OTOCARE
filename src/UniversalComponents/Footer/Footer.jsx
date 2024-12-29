import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <>
    <div className="footer-container">
      <div className="footer-wrapper">
      <div className="footer-left">
            <Link to="/" className="footer-logo">
            <img src="/logo-2.png" alt="Logo"/>
            </Link>  
            <h1>© Copyright 2023 OTOCARE- All rights reserved</h1>
        </div>
        <div className="footer-mid">
            <h1>OFFICE</h1>
            <p className='p1'>Jl. Kyai Maja No.1, RT.002/RW.001, Panunggangan, Kec. Pinang, Kota Tangerang, Banten 15143</p>
            <h2>EMAIL US</h2>
            <p className='p2'>otocare.support@gmail.com</p>
        </div>
        <div className="footer-right">
            <h1>FOLLOW US</h1>
            <div className="footer-logo-wrapper">
                <Link target={"_blank"} to="https://youtu.be/B352u-Fdaa8?si=-0Us-kEiNuob537S" className='X-img'>
                <img src='/X.png'/>
                </Link>
              <Link target={"_blank"} to="https://www.instagram.com/for_everyoung10/" className='IG-img'>
              <img src='/Instagram.png'/>
              </Link>
              <Link target={"_blank"} to=" https://wa.me/6282168682109?text=Hi%20I'd%20like%20help%20about%20OTOCARE" className='WA-img'>
              <img src='/Whatsapp.png'/>
              </Link>
            </div>
           
        </div>
      </div>
    </div>
    </>
  )
}

export default Footer