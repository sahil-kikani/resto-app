/* eslint-disable no-unused-vars */
import { GET_CATEGORY, GET_PRODUCT, ADD_TO_CART } from './Action_type'

const tempdata = []

export const getCategory = (category) => {
  return {
    type: GET_CATEGORY,
    payload: category
  }
}

export const getproduct = (product) => {
  return {
    type: GET_PRODUCT,
    payload: product
  }
}

export const AddToCart = (data, cartitem) => {
  if (cartitem) {
    const value = cartitem.findIndex((item) => item.id === data.id)
    if (value !== -1) {
      for (let order = 0; order < cartitem[value].basketitem.length; order++) {
        if (JSON.stringify(cartitem[value].basketitem[order].name) === JSON.stringify(data.basketitem[0].name) &&
        JSON.stringify(cartitem[value].basketitem[order].variants) === JSON.stringify(data.basketitem[0].variants) &&
         cartitem[value].basketitem[order].extras.join() === data.basketitem[0].extras.join()) {
          cartitem[value].basketitem[order].count += data.basketitem[0].count
          cartitem[value].basketitem[order].individualSum += data.basketitem[0].individualSum
          cartitem[value].totalCount += data.basketitem[0].count
          cartitem[value].totalSum += data.basketitem[0].individualSum
          return {
            type: ADD_TO_CART,
            payload: cartitem
          }
        }
      }

      const count = cartitem[value].basketitem.map(element => element.count)
      cartitem[value].totalCount = count.reduce((a, b) => a + b, 0)

      const prize = cartitem[value].basketitem.map(element => element.individualSum)
      cartitem[value].totalSum = prize.reduce((a, b) => a + b, 0)

      cartitem[value].basketitem.push(data.basketitem[0])
      return {
        type: ADD_TO_CART,
        payload: cartitem
      }
    } else {
      tempdata.push(data)
      return {
        type: ADD_TO_CART,
        payload: tempdata
      }
    }
  } else {
    tempdata.push(data)
    return {
      type: ADD_TO_CART,
      payload: tempdata
    }
  }
}

let tempBill = 0
export const Billcount = (data) => {
  tempBill += data
  return {
    type: 'TOTAL_BILL',
    payload: tempBill
  }
}
