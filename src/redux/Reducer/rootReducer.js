import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer'
import productReducer from './productReducer'
import cart from './addtocartReducer'
import Billcount from './total-bill'

export default combineReducers({ categoryReducer, productReducer, cart, Billcount })
