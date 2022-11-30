/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react'
import '../../Pages/maincontent/style.css'
import { AddToCart, Billcount } from '../../redux/Action/Action'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'

function PopUp ({ flag, data, Parentname }) {
  const { name, variants, extras } = data
  const [count, setCount] = useState(1)

  const [selectdata, setSelectdata] = useState([])
  const [printData, setPrintData] = useState({})
  const [defaultsize, setDefaultsize] = useState('half pint')
  const [orderdata, setOrderData] = useState({})

  const cartData = useSelector(state => state.cart.data)

  const dispatch = useDispatch()

  function hendelchange (e) {
    const { name, checked } = e.target
    const items = selectdata.find(item => item.name === name);
    (!items)
      ? setExtras(name, checked)
      : updateExtras(name, checked)
  }

  const setExtras = (name) => {
    const extraObj = data.extras.find(subItem => subItem.name === name)
    setSelectdata(current => [...current, extraObj])
  }
  const updateExtras = (name) => {
    setSelectdata(current => current.filter(obj => {
      return obj.name !== name
    }))
  }

  useEffect(() => {
    if (data?.variants) {
      setPrintData(data.variants[0])
    }
  }, [])

  useEffect(() => {
    const findparentid = Parentname.filter((element) => element.id === data.parentId)
    const mainparent = Parentname.find((element) => element.id === findparentid[0].parent)
    const perantName = { id: mainparent.id, name: mainparent.name }

    let itemsum = 0;
    (printData?.price)
      ? itemsum += printData?.price
      : itemsum += data.price;

    (selectdata?.map((element) => element.price)).forEach(element => { itemsum += element })
    itemsum *= count

    const basketitem = []
    basketitem.push({ ...data, extras: [...selectdata], variants: printData, count, itemsum })

    setOrderData({ ...perantName, totalCount: count, totalSum: itemsum, basketitem })
  }, [selectdata, count, printData])

  const addToOrder = () => {
    dispatch(AddToCart(orderdata, cartData))
    dispatch(Billcount(orderdata.totalSum))
    flag()
  }
  function setData (element, name) {
    setPrintData(element)
    setDefaultsize(name)
  }

  return (

        <div className='popup_back'>
            <div className="pop-up">
                <div className="close-pop-up" onClick={flag}>

                </div>
                <div className="pop-up-container">

                    <div className="pop-up-title">
                        {name}
                    </div>
                    <div className="division"></div>
                    <>
                        {
                            (variants) && (<>
                                <div className="pop-up-item-size">
                                    <div className="pop-up-item-size-title">
                                        Size
                                    </div>
                                    {variants.map((data, index) => {
                                      return (
                                            <div className={defaultsize === data.name ? 'popupactivebtn' : 'pop-up-item-size-value'}
                                            key={index} onClick={() => setData(data, data.name)}>
                                                <div className="pop-up-item-size-name">{data.name}</div>
                                                <div className="pop-up-item-size-prize">£ {data.price}</div>
                                            </div>
                                      )
                                    })}
                                </div>
                                <div className="division"></div>
                            </>
                            )
                        }
                    </>
                    <>
                        {
                            (extras) && (<>
                                <div className="pop-up-option">
                                    <div className="pop-up-option-title">
                                        Select Options
                                    </div>
                                    {
                                        extras.map((data, index) => {
                                          const { name, price } = data
                                          return (
                                                <div className="option" key={index}>
                                                    <div className='option-content'>
                                                    <label htmlFor={name} className='option-content-name' >{name} </label>
                                                    <span className='option-content-name' >(+£ {price})</span>
                                                    </div>
                                                    <input type="checkbox" name={name} value={name} id={name} onChange={(e) => hendelchange(e)}/>
                                                </div>
                                          )
                                        })
                                    }
                                </div>
                                <div className="division"></div>
                            </>)
                        }
                    </>

                    <div className="counter">
                        <button className="counts" onClick={() => { (count > 1) && setCount(count - 1) }}>-</button>
                        <div className="counter-value">{count}</div>
                        <button className="counts" onClick={() => setCount(count + 1)}>+</button>
                    </div>
                    <div className="cart">
                        <button className="add-to-cart" onClick={addToOrder} >ADD TO ORDER</button>
                    </div>

                </div>

            </div>
        </div>
  )
}
export default PopUp
