<template>
    <div class="bottom-bar">
      <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isSelectAll"
                    @click.native = "checkClick"
      ></check-button>
        <span>全选</span>
      </div>
      <div class="total-price">合计：{{totalPrice}}</div>
      <div class="calculate" @click = "calcClick">去计算({{checkLength}})</div>

    </div>
</template>

<script>
    import CheckButton from "../../../components/content/checkButton/CheckButton";
    import {mapGetters} from 'vuex'
    export default {
        name: "CartBottomBar",
        components: {CheckButton},
        computed:{
            ...mapGetters(['cartList']),

            totalPrice(){
              return '￥'+this.cartList.filter(product=>{
                  return product.checked;
              }).reduce((preValue,product)=>{
                  return preValue + product.realPrice * product.count;
              },0).toFixed(2);
            },
            checkLength(){
                return this.cartList.filter(product=> product.checked).length;
            },
            isSelectAll(){
                //当购物车商品全部选中，全选按钮也选中。反之，全选按钮不选
                //找到一个未选中的就返回false
                //若全选，未选中的length为0 ！0:true，选中全选按钮
                //修改模型对象中的
                //传到子组件CheckButton中，动态绑定class修改样式
                //return !this.cartList.filter(product=> !product.checked).length;

                if( this.cartList.length===0){
                    return false;

                }else {
                    return !this.cartList.find(item => !item.checked);
                }
            }
        },
        methods:{
            checkClick(){
                if(this.isSelectAll){//全部选中
                    this.cartList.forEach(item =>item.checked = false);
                }else{
                   // if(this.cartLength()===0)

                    this.cartList.forEach(item =>item.checked = true);
                }
            },
            calcClick(){
                //没选商品就计算提示信息
                if(this.checkLength ===0){
                    this.$toast.show('请选择商品',2000);
                }
            }
        }
    }
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eeeeee;
  position: relative;
  line-height: 40px;
  display: flex;
}
.check-content{
display: flex;
  align-items: center;
  margin-left: 10px;
  width: 100px;
}
.check-button{
width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}
  .total-price{
    margin-left: 20px;
    flex:1;
  }
  .calculate{
    width:90px;
    background-color:#ff5777;
    text-align: center;
    color:white;
  }

</style>
