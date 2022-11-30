import { GET_CATEGORY } from '../Action/Action_type'

const intialState = {
  category: []
}

export default function categoryReducer (state = intialState, { type, payload }) {
  switch (type) {
    case GET_CATEGORY:
      return { ...state, category: payload }
    default:
      return state
  }
}
