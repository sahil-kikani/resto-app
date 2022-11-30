import React from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Navbar () {
  const naviagte = useNavigate()
  return (
    <>
    <div className="checkout-inner-content">
    <span className="checkout-back-btn" onClick={() => naviagte('/')}>
      <FiChevronLeft />
    </span>
    <span className="heading">
      Checkout
    </span>
    <span className="menu">
      <HiOutlineDotsHorizontal />
    </span>
  </div>
  <div className="title">
    Kempston Hammers Sports & Social Club
  </div>
  <div className="address">
    134 High Street, Kempston, Bedford, <br />Bedfordshire, MK42 7BN
  </div>
</>

  )
}

export default Navbar
