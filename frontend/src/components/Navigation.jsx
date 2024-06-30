import  React from 'react'
import { Link } from 'react-router-dom';
function Navigation() {
  return (
        <nav id='nav'>

          <button className='navtext-button'><li><Link to = '/OfferList' className='link'>Search for Offers</Link></li></button>
          <button className='navtext-button'><li><Link to = '/CreateOffer' className='link'>Create Offer</Link></li></button>
        </nav>
  )
}

export default Navigation;
