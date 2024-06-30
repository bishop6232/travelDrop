import React from 'react'

function Header(props) {
  return (
    <div className='header-css'>
        <h1>Welcome to{props.name} </h1>
            {props.children}

    </div>
  )
}

export default Header