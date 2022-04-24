import React, { useState } from 'react'
import { authentication } from './firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

function App() {
  const countryCode = "+84"
  const [phoneNumber, setPhoneNumber] = useState(countryCode)
  const [OTP, setOTP] = useState('')
  const [expandForm, setExpandForm] = useState(false)

  authentication.languageCode = 'it'

  const generateRecaptch = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptch-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, authentication);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (phoneNumber.length >= 12) {
      setExpandForm(true)
      generateRecaptch()
      let appVerifier = window.recaptchaVerifier
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log(phoneNumber)
          console.log(confirmationResult)
          window.confirmationResult = confirmationResult;
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
          console.log(error);
        });
    }
  }

  const verifyOTP = (e) => {
    e.preventDefault();
    let otp = e.target.value;
    setOTP(otp);

    if (otp.length === 6) {
      console.log(otp)
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user)

      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
      });
    }
  }

  return (
    <div className="App">
      <from>
        <h1>Sign in with phone number</h1>
        <div>
          <label htmlFor="phoneNumberInput">Phone number</label>
          <input type="tel" value={phoneNumber} id="phoneNumberInput" onChange={e => setPhoneNumber(e.target.value)} />
          <div id="phoneNumberHelp">Please enter your phone number</div>
        </div>
        {
          expandForm === true ?
            <>
              <div>
                <label htmlFor="otpInput">OTP</label>
                <input type="number" id="otpInput" value={OTP} onChange={verifyOTP} />
                <div id="otpHelp">Please enter your OTP number</div>
                {/* <button >Submit OTP</button> */}
              </div>
            </>
            :
            null
        }
        {
          expandForm === false ?
            <button onClick={handleSubmit}>Request OTP</button>
            :
            null
        }
        <div id="recaptch-container"></div>
      </from>
    </div>
  );
}

export default App;
