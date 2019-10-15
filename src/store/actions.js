import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-type";
export default {
  addCart(context,payload){
  let oldProduct = null;
  for(let item of context.state.cartList){
    if(item.iid === payload.iid){//若添加商品的iid和已经在购物车的iid相等
      oldProduct = item;
    }
  }
  if(oldProduct){
    //oldProduct.count +=1;
    context.commit(ADD_COUNTER,oldProduct)
  }else{
    payload.count = 1
    //.state.cartList.push(payload)
    context.commit(ADD_TO_CART,payload)
  }
}
}
