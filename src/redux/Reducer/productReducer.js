import { GET_PRODUCT } from '../Action/Action_type'

const intialState = {
  product: []
}

export default function productReducer (state = intialState, { type, payload }) {
  switch (type) {
    case GET_PRODUCT:
      return { ...state, product: payload }
    default:
      return state
  }
}
