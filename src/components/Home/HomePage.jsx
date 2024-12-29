import React from 'react'
import './HomePage.css'
import Navbar from '../../UniversalComponents/Navbar/Navbar'
import HeroSection from './HeroSection';
import AboutUs from './AboutUs';
import HomeServicesBanner from './HomeServicesBanner';
import Testimonial from './Testimonial';
import Footer from '../../UniversalComponents/Footer/Footer';

function HomePage() {
  return (
    <>
       <div>
       <Navbar/>
        </div> 
        <HeroSection/>
        <AboutUs/>
        <HomeServicesBanner/>
        <Testimonial/>
        <Footer/>
    </>
  )
}

export default HomePage;