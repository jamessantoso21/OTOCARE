import React from 'react'
import Navbar from '../../UniversalComponents/Navbar/Navbar'
import Footer from '../../UniversalComponents/Footer/Footer.jsx'
import './Services.css'
import ServicesHero from './ServicesHero.jsx'
import OilBanner from './OilBanner.jsx'
import WheelBanner from './WheelBanner.jsx'
import ElectricalBanner from './ElectricalBanner.jsx'
import BannerHalf from './bannerHalf.jsx'
import { Button } from "../../UniversalComponents/Button/Button";


function Services() {
  return (
    <div>
      <Navbar/>
      <ServicesHero/>
      <OilBanner/> 
      <WheelBanner/>
      <ElectricalBanner/>
      <div className='appoint-btns'>
              <Button
                linkTo="/RepairShops"
                className="btns"
                buttonStyle="btn--primary"
                buttonSize="btn--large"
              >
                MAKE APPOINTMENT
              </Button>
            </div>
      <Footer/>
    </div>
  )
}

export default Services
