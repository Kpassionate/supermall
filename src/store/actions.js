import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

const actions = {
  addCart(context, payload) {
    // 调用promise
    return new Promise((resolve, reject) => {
      // console.log(payload);
      // 1.查看是否添加过
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.+1或者新添加
      if (oldProduct) {
        // oldProduct.count += 1
        // console.log('老家伙');
        context.commit(ADD_COUNTER, oldProduct)
        resolve("当前商品数量加一")
      } else {
        payload.count = 1
        payload.checked = true
        // console.log('新玩意');
        context.commit(ADD_TO_CART, payload)
        resolve("添加了新商品")
      }
      // console.log(payload);
    })
  }
}

export default actions