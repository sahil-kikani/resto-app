/* eslint-disable react/prop-types */
import React from 'react'
import './style.css'
import img from '../../assets/img/thumbs_up.png'

function Finalpopup ({ flag }) {
  const reload = () => {
    window.location.reload()
    flag()
  }
  return (
        <>
        <div className='final-page-overlay'>
          <div className="final-popup">
            <div className="final-popup-title">Confirm Order</div>
            <img className='img'src={img} alt="" />
            <div className="final-popup-description">
                By placing this order you agree that you are present in Kings Arms and over 18 years old.
            </div>
            <div className="btns">
                <button className="cancel-btn" onClick={flag}>cancel</button>
                <button className="order-btn" onClick={reload}>place order</button>
            </div>
          </div>
          </div>
        </>
  )
}

export default Finalpopup
