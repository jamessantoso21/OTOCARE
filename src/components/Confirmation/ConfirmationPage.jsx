import React from 'react'
import "../Confirmation/ConfirmationPage";
import Navbar from '../../UniversalComponents/Navbar/Navbar';
import Footer from '../../UniversalComponents/Footer/Footer';

import ConfirmationDetails from './ConfirmationDetails';

function ConfirmationPage() {
  return (
    <>
        <div>
        <Navbar/>
        </div>

        <ConfirmationDetails/>
        <Footer/>
    </>
  )
}

export default ConfirmationPage
