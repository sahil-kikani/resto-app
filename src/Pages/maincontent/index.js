import React, { useEffect, useState } from 'react'
import Header from '../../Component/Header'
import './style.css'
import PopUp from '../../Component/popup-box'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getCategory, getproduct } from '../../redux/Action/Action'

function Restoapp () {
  const naviagte = useNavigate()
  const dispatch = useDispatch()

  const [categories, SetCategories] = useState([])
  const [products, SetProducts] = useState([])
  const [defultitem, setdefultItem] = useState({})
  const [filterdata, setFilterdata] = useState([])
  const [filterprod, setFilterprod] = useState([])

  const [handelcate, setHandelcate] = useState(1)
  const [handelprod, setHandelprod] = useState(3)
  const [popupData, setPopupData] = useState({})
  const [popupmenu, setPopupmenu] = useState(false)

  const Billcount = useSelector(state => state.Billcount.data)

  const [totalcartitem, setTotalcartitem] = useState(0)
  const [totalbillamount, setTotalbillamount] = useState((Billcount) || 0)

  const cart = useSelector(state => state.cart.data)

  const Categories = async () => {
    const response = await axios
      .get('https://6364b00c8a3337d9a2fc18f2.mockapi.io/food')
      .catch((err) => {
        console.log('err', err)
      })
    SetCategories(response.data)
    dispatch(getCategory(response.data))
  }

  const Products = async () => {
    const response = await axios
      .get('https://6364b00c8a3337d9a2fc18f2.mockapi.io/product')
      .catch((err) => {
        console.log('err', err)
      })
    SetProducts(response.data)
    dispatch(getproduct(response.data))
  }

  useEffect(() => {
    Categories()
    Products()
  }, '')

  function handelitem (id) {
    setHandelcate(id)
    const filter = categories.filter((data) => data.parent === id)
    setFilterdata(filter)
    setdefultItem(filter[0])
  }
  function handelvalue (id) {
    setHandelprod(id)
    const filterproduct = products.filter((data) => data.parentId === id)
    setFilterprod(filterproduct)
  }
  useEffect(() => {
    handelitem(1)
    handelvalue(3)
  }, [categories, products])

  useEffect(() => {
    if (defultitem) {
      const ditem = defultitem.id
      handelvalue(ditem)
    }
  }, [filterdata])

  useEffect(() => {
    (cart)
      ? setTotalcartitem(cart.map((item) => item.totalCount).reduce((a, b) => a + b, 0))
      : setTotalcartitem(0);
    (Billcount)
      ? setTotalbillamount(Billcount)
      : setTotalbillamount(0)
  }, [Billcount])

  function popupdata (data) {
    setPopupData(data)
    setPopupmenu(!popupmenu)
  }
  return (

    <div className='resto-container'>
      <div className="resto-app">
        <Header/>
        <div className="resto-menu">

          {categories.map((data, index) => {
            return ((data.parent == null) &&
             <button key={index} onClick={() => handelitem(data.id)}
            className={handelcate === data.id ? 'resto-btn-ative' : 'resto-menu-btn-1'} >{data.name}</button>)
          })
        }
        </div>
        <div className="resto-category">
          {
            filterdata.map((data, index) => {
              return (<button key={index}
               onClick={() => handelvalue(data.id)}
               className={handelprod === data.id ? 'resto-btn-active-2' : 'resto-menu-btn-2'}>{data.name}</button>)
            })
          }
        </div>
        <div>{(filterprod.length !== 0)
          ? (filterprod.map((data, index) => {
              return (
                <div className="menu-items" key={index} onClick={() => popupdata(data)}>
                  <div className="menu-items-info">
                    <span className="menu-items-title">{data.name}</span>
                    <span className="menu-items-detail">{data.description}</span>
                  </div>
                  <div className="menu-item-prize">
                    <span className="item-prize">£ {data.price}</span>
                  </div>
                </div>
              )
            }))
          : (<p>No items</p>)
          }

        </div>

        <div className="order-item"
          onClick={() => { naviagte('/viewcart') }}>
        <label className="order-item-title">view basket</label>
          <div className="order-item-prize">
          £ {totalbillamount.toFixed(2)} / {totalcartitem} ITEM
          </div>
        </div>

        {(popupmenu) &&
        <PopUp flag={popupdata}
        data={popupData}
        Parentname={categories}/>}

      </div>
    </div>

  )
}
export default Restoapp
