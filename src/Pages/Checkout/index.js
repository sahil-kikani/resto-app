/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import Tabel from '../../Component/tabel'
import Navbar from '../../Component/navbar'

function Checkout () {
  const cart = useSelector(state => state.cart.data)
  console.log('cart', cart)

  return (
    <>
      <div className='checkout_container'>
        <div className="checkout-page">
          <Navbar/>

          <div className="cart-products">
            {(cart)
              ? (cart?.map((data, index) => {
                  return (
                  <div key={index}>
                    <div className="product-title" key={index}>
                      {cart[index].name}
                      ({cart[index].totalCount})
                    </div>
                    {
                      cart[index].basketitem?.map((data, index) => {
                        const temp = data.extras.map((e) => e.name)

                        return (
                          <div className="order-data" key={index}>
                            <div className=".order-values">
                              <span className="order-name">{data.count} x {data.name}</span>
                              {(data.variants || temp) ? <div className='order-var '>{data.variants.name} {temp.toString()}</div> : <span className='noData'></span>}
                            </div>
                            <div className="order-price">£{data.itemsum.toFixed(2)}</div>
                          </div>
                        )
                      }
                      )
                    }
                  </div>
                  )
                }
                ))
              : (<div>
                  <h3 >Your Cart is Empty</h3>
              </div>)
            }

          </div>

          <div className="division"></div>
          <Tabel/>

             </div>

      </div>
    </>
  )
}
export default Checkout
