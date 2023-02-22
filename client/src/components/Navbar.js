import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <ul>
            <Link to='/register'><li>Register</li></Link>
            <Link to='/'><li>Login</li></Link>
        </ul>
    </div>
  )
}

export default Navbar