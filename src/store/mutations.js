import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types';

const mutations = {
  [ADD_COUNTER](context, payload){
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}

export default mutations
