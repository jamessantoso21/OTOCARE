import React from 'react'
import "../workshop-confirmation/workshop-confirmation.css";
import "../Payment/PaymentDetails.css";
import Navbar from '../../UniversalComponents/Navbar/Navbar';
import Footer from '../../UniversalComponents/Footer/Footer';
import { Button } from '../../UniversalComponents/Button/Button';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 10,
            width: '100%'
        }}
    />
  );

function workshopConfirmation() {
  return (
    <>
    
    <Navbar/>
    <div className='workshopConfirmation-container'>
        <div className='workshopConfirmation-wrapper'>
            <div className='workshopConfirmation-margin'>
                <div className='workshopConfirmation-wrapper-top'>
                    <img src="Confirmed.png" />
                    <h1>ORDER CREATED</h1>
                </div>
                <ColoredLine color="black"/>
                <div className='workshopConfirmation-wrapper-middle'>
                    <h1>PLEASE CONTACT THE CUSTOMER FOR MORE INFORMATION </h1>
                </div>
                <div className='workshopConfirmation-wrapper-bottom'>
                    <div className='Contact-btns'>
                        <Button
                        target="_blank"
                            linkTo="https://wa.me/6281296334623?text=Halo%20saya%20dari%20OTOCARE%2e%20Apa%20yang%20bisa%20saya%20bantu%3f"
                            className="btns"
                            buttonStyle="btn--primary"
                            buttonSize="btn--large"
                        >
                        CONTACT THE CUSTOMER
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default workshopConfirmation
