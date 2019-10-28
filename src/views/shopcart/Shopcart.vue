<template>
    <div id="cart">
      <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
      <!--商品列表 -->
      <cart-list></cart-list>
      <!--底部汇总 -->
      <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import {mapGetters} from 'vuex';
    import CartList from "./childComps/CartList";
    import CartBottomBar from "./childComps/CartBottomBar";
    export default {
        name: "Shopcart",
        components: {CartBottomBar, CartList, NavBar},
        computed:{
            //两种语法
            ...mapGetters(['cartLength'])//getters里的转成计算属性
        }
    }
</script>

<style scoped>
  #cart{
    height: 100vh;

  }
.nav-bar{
  background-color: var(--color-tint);
  color: #ffffff;
  font-size: 20px;
  position: relative;
}
</style>
