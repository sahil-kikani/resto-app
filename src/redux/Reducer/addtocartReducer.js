import { ADD_TO_CART } from '../Action/Action_type'

export default function cart (state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        data: action.payload
      }
    default:
      return state
  }
}
