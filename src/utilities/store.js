import { createStore, combineReducers} from 'redux';
import {ReducerCart} from '../Checkout/Cart/ReducerCart';
 
const rootReducer = combineReducers({
  cart: ReducerCart,
});
 
export const store = createStore(rootReducer);