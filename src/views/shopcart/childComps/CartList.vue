<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList"
                        :key="index"
                        :product="item"></cart-list-item>
      </scroll>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
    export default {
        name: "CartList",
        components: {CartListItem, Scroll},
        computed:{
            ...mapGetters(['cartList'])
        },
        activated() {
            this.$refs.scroll.refresh();//添加商品后购物车列表高度重新计算，activated一进入页面就重新计算高度
        }
    }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }

.content{
  height: 100%;
  overflow: hidden;
}
</style>
