<template>
  <div id="detail">
    <detail-nav-bar class="detail-bar" @titleClick="titleClick" ref="nav">
  </detail-nav-bar>
    <scroll class="wrapper"
            ref="scroll"
            :probe-type="3"
            @scroll="itemScroll"
    >
    <detail-swiper :top-images="topImages">
    </detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommendInfo" ref="recommend"></goods-list>
    </scroll>
    <back-top  @click.native="backtopClick" v-show="isShowBackTop" class="back-top">
    </back-top>
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "../../network/detail";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "../../components/common/scroll/Scroll";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "../../components/content/goods/GoodsList";
    import {backTopLinstenerMixin, itemLinstenerMixin} from "../../common/mixins";
    import {debounce} from "../../common/utils";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import {mapActions} from 'vuex';
    export default {
        name: "Detail",
        components: {
            DetailBottomBar,
            GoodsList,
            DetailCommentInfo,
            DetailParamInfo,
            DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommendInfo:[],
                themeTopYs:[],
                getThemeTopYs:null,
                currentIndex:0
            }
        },
        mixins:[itemLinstenerMixin,backTopLinstenerMixin],
        created() {
            //保存id
           this.iid = this.$route.params.iid
            //根据id请求数据
            getDetail(this.iid).then(res => {
                //console.log(res);
                const data = res.result
                this.topImages = data.itemInfo.topImages
                //console.log(this.topImages);

                //获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

                //获取商家店铺信息
                this.shop = new Shop(data.shopInfo)
                //获取商品详情信息
                this.detailInfo = data.detailInfo
                //获取商品参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
                //获取评论信息
                if(data.rate.cRate !== 0 ) {
                    this.commentInfo = data.rate.list[0]
                }


            })
            //请求推荐数据
            getRecommend().then(res => {
                console.log(res);
                this.recommendInfo = res.data.list
            })
            this.getThemeTopYs = debounce(()=>{
                this.themeTopYs = []
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.param.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                this.themeTopYs.push(Number.MAX_VALUE)
                //console.log(this.themeTopYs)
            },100)

        },
        mounted(){

        },
        methods: {
            ...mapActions(['addCart']),
            imageLoad() {
                /*this.$refs.scroll.refresh()*/
                this.refresh();
                this.getThemeTopYs();

            },
            titleClick(index){
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index] ,200);
            },
            itemScroll(position){
                //console.log(position);
                const positionY = -position.y
                let length = this.themeTopYs.length
                for(let i=0;i<length-1;i++)
                {
                    if ((this.currentIndex !== i &&
                        (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))) {
                        this.currentIndex = i ;
                        //console.log(this.currentIndex)
                        this.$refs.nav.currentIndex = this.currentIndex

                    }
                }
               // 判断backtop是否显示
                this.isShowBackTop = -position.y >1000
            },
            addToCart(){
                //1.获取购物车展示的信息
              const product = {}
              product.iid = this.iid;
              product.realPrice = this.goods.realPrice;
              product.title = this.goods.title;
              product.imge = this.topImages[0];
              product.desc = this.goods.desc;
              //2.把商品添加到购物车 dispatch异步操作，向后台提交数据，添加购物车
              /*this.$store.dispatch('addCart',product).then(res=>{
                  console.log(res);
              })*///参数为对象
                //2.方法二添加购物车
                this.addCart(product).then(res=>{
                   console.log(this.$toast);
                    this.$toast.show(res,2000)
                });
                //3.添加到购物车成功
            }
        },
        destroyed() {
          this.$bus.$off('itemImageLoad',this.itemImageListener)
            console.log('detaile destoryed');
        }
    }
</script>

<style scoped>
  #detail{
    position: relative;
     z-index: 9;
     height: 100vh;
    background-color: #ffffff;
  }
  .detail-bar{
    position: relative;
    z-index: 10;
    background-color: #ffffff;
  }
  .wrapper{
    background-color: #ffffff;
    /*height: calc(100% - 44px);*/
    position: absolute;
    top:44px;
    left:0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
     }
  .back-top{
    z-index: 100;
  }
</style>
