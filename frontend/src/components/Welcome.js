import React from 'react'
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';





function Welcome() {
  return (
    <div className="welcome" style={{
      backgroundSize: 'cover',
      backgroundImage: 'url("images/airplane.png")',
      height: "100vh",
      backdropFilter: "blur"
    }}>  
      <Header name =" AWFD">
        <h3>(Airways Fast Delivery)</h3>
      </Header>
      <Navigation/>
      <div className='welcome-message'>
       <h1>Fast and reliable movers</h1>
       <h2>Get your stuff moved in no time</h2>
       <p>Choosing our flight shipping service means you can enjoy unparalleled speed and reliability for all your moving needs. 
        Our dedicated team ensures that your belongings are transported safely and efficiently, minimizing downtime and maximizing convenience. 
        With real-time tracking and exceptional customer service, you can trust us to handle your move with care and precision. 
        Experience stress-free relocation with the industry's leading flight shipping experts. Your satisfaction is our top priority.</p>
        <Footer/>
      </div>
      
      
      
    </div>
  )
}

export default Welcome