import React from 'react'
import "../Confirmation/ConfirmationDetails.css";
import "../Payment/PaymentDetails.css";
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

function ConfirmationDetails() {
  return (
    <div className='ConfirmationDetails-container'>
        <div className='ConfirmationDetails-wrapper'>
            <div className='ConfirmationDetails-margin'>
                <div className='ConfirmationDetails-wrapper-top'>
                    <img src="Confirmed.png" />
                    <h1>PAYMENT CONFIRMED</h1>
                </div>
                <ColoredLine color="black"/>
                <div className='ConfirmationDetails-wrapper-middle'>
                    <h1>THANK YOU FOR USING OUR SERVICE PLEASE CONTACT OUR MECHANICS FOR MORE INFORMATION ABOUT YOUR ORDER</h1>
                </div>
                <div className='ConfirmationDetails-wrapper-bottom'>
                    <div className='Contact-btns'>
                        <Button
                        target="_blank"
                            linkTo="https://wa.me/6282168682109?text=Hi%20I'd%20like%20help%20about%20OTOCARE"
                            className="btns"
                            buttonStyle="btn--primary"
                            buttonSize="btn--large"
                        >
                        CONTACT OUR MERCHANT
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationDetails
