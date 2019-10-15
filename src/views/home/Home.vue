<template>
  <div id="home">
  <nav-bar class="home-nav">
   <div slot="center">购物街</div>
  </nav-bar>
    <tab-control class="tab-control1"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"
    >
    </tab-control>
    <scroll class="wrapper"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"

            :pull-up-load="true"

    >
   <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
    <recommend-view :recommends="recommends"/>
    <feature-view></feature-view>
    <tab-control
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl2"

    >
    </tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top  @click.native="backtopClick" v-show="isShowBackTop"></back-top>
    <!--<back-top  @backtopClick="backtopClick" v-show="isShowBackTop" >

    </back-top>-->
  </div>
</template>
<script>
  //公共组件
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import Scroll from "../../components/common/scroll/Scroll";

  //方法
  import {getHomeMultidata, getHomeGoods} from 'network/home';
  //子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from './childComps/RecommendView'
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from "../../components/content/goods/GoodsList";
 /* import BackTop from "../../components/content/backTop/BackTop";*/

  import {itemLinstenerMixin} from "../../common/mixins";
  import {backTopLinstenerMixin} from "../../common/mixins";

  export default {
        name: "Home",
        components: {
            Scroll,
            GoodsList,
            TabControl,
            FeatureView,
            RecommendView,
            HomeSwiper,
            NavBar,

        },
        mixins:[itemLinstenerMixin,backTopLinstenerMixin],
        data(){
            return {
              banners:[],
                recommends:[],
                goods:{
                  'pop':{page:0,list:[]},
                    'new':{page:0,list:[]},
                    'sell':{page:0,list:[]}
                },
                currentType: 'pop',
                taboffsetTop:0,
                isTabFixed:false,
                saveY:0,

            }
        },
        computed:{
          showGoods(){
              return  this.goods[this.currentType].list
          }
        },
        created() {
            //1.请求多个数据
           this.getHomeMultidata()
                //2.请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')


        },
        mounted(){


        },
        methods:{
            /**
             * 事件监听相关方法
             */
            tabClick(index){
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break;
                    case 1:
                        this.currentType = 'new'
                        break;
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index
            },
            /*backtopClick(){
                this.$refs.scroll.scrollTo(0,0,300)
            },*/
            contentScroll(position){
                //1.判断backtop是否显示
                this.isShowBackTop = -position.y >1000
                //2.决定tabcontrol是否吸顶
                this.isTabFixed = (-position.y) > this.taboffsetTop
            },

            /*loadMore(){
                console.log('上拉加载更多')
                this.getHomeGoods(this.currentType)
                this.$refs.scroll.scroll.refresh()
            },*/
            swiperImageLoad(){
               this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
            },
            /**
             * 网络请求相关方法
             */
            getHomeMultidata(){
                getHomeMultidata().then(res =>{
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods(type){
                const page = this.goods[type].page + 1
                getHomeGoods(type,page).then(res =>{

                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                    /*this.$refs.scroll.finishPullUp();*/

                })
            },

        },
        activated() {
            //回到原来位置
            this.$refs.scroll.scrollTo(0,this.saveY,0)
            this.$refs.scroll.refresh()

        },
        deactivated() {
            //保留位置
            this.saveY = this.$refs.scroll.getScrollY()
            //取消全局事件的监听
            this.$bus.$off('itemImageLoad',this.itemImageListener)

        }

    }
</script>

<style scoped>
  #home{

   /* padding-top: 44px;*/
   /* position: relative;*/
/*height: 100vh;*/
  }
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
  /*position: fixed;
  left:0;
  right: 0;
  top:0;
  z-index: 9;*/
}
  .tab-control{
position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
  .wrapper{

    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
 /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/

</style>
