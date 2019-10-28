import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-type";
export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      let oldProduct = null;
      for(let item of context.state.cartList){
        if(item.iid === payload.iid){//若添加商品的iid和已经在购物车的iid相等
          oldProduct = item;
        }
      }
      if(oldProduct){
        //oldProduct.count +=1;
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量加1');
      }else{
        payload.count = 1
        //.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品');
      }
    })

}
}
