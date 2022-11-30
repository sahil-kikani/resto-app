import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './style.css'
import Finalpopup from '../../Component/finalpopup'

function Tabel () {
  const Billcount = useSelector(state => state.Billcount.data)

  const [totalPrice, setTotalPrice] = useState((Billcount) || 0)
  const [totalItem, setTotalItem] = useState(0)

  const [orderpopup, setOrderpopup] = useState(false)

  function popupbtn () {
    setOrderpopup(!orderpopup)
  }

  const cart = useSelector(state => state.cart.data)

  useEffect(() => {
    (cart)
      ? setTotalItem(cart.map((item) => item.totalCount).reduce((a, b) => a + b, 0))
      : setTotalItem(0);
    (Billcount)
      ? setTotalPrice(Billcount)
      : setTotalPrice(0)
  }, [Billcount])
  return (
    <>
    <div className="notes">
    <div className="notes-title">
      Add notes:
    </div>
    <input className='note' type="textarea" name="text" />
  </div>

  <div className="division"></div>

  <div className="table">
    <div>
      <span className="Table_number_title">Table Number</span>
      <span className="table_number">16</span>
    </div>
  </div>

  <div className="Confirm_order" onClick={() => popupbtn()}>
    <div className="Confirm-order-title">confirm order</div>
    <span className="Confirm-order-prize">
      £ {totalPrice.toFixed(2)} /  {totalItem} ITEM
    </span>
    <div>
          {(orderpopup) &&
          <Finalpopup
          flag={popupbtn} />}
        </div>
  </div>
</>
  )
}

export default Tabel
