import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const __DEV__ = document.domain === 'localhost'

function App() {
  const [name, setName] = useState('Sadiya')

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }

    const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
      t.json()
    )

    console.log(data)

    const options = {
      key: __DEV__ ? 'rzp_test_gzbyX1WXXjEHe4' : 'PRODUCTION_KEY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      "name": "DONATION",
      "description": "Donation increases the list of your good works",
      // "image": "Thank-you-for-your-donation.png",
      handler: function (response) {
        alert("PAYMENT SUCCESSFUL✅")
      },
      prefill: {
        name,
        email: 'sdfdsjfh2@ndsfdf.com',
        phone_number: '9899999999'
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src=""
          className="App-logo" />
        <p className="para">
          <h2><b>Welcome to the Donation Campaign of Sparks Foundation🎀</b></h2>
          <h3><i>Giving is not just about making a Donation.</i>
            <br></br><i>It is about making a difference.</i></h3>
        </p>
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="Button1">
            DONATE
          </div>
        </a>
      </header>
    </div>
  )
}

export default App





















