import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemLinstenerMixin = {
  data(){
    return {
      itemImageListener:null,
      refresh:null

    }
  },
  mounted(){
    //图片加载完成的事件监听
    this.refresh = debounce(this.$refs.scroll.refresh,100)
    //3.监听item中图片加载完成
    this.itemImageListener = ()=>{this.refresh()}
    this.$bus.$on('itemImageLoad',this.itemImageListener
      //为了重新计算滚动高度每加载一张更新一次高度
    )
    console.log('混入');
  }
}

export const backTopLinstenerMixin = {
  components: {
    BackTop
  },
 data(){
   return {
     isShowBackTop:false
   }
 },
  methods:{
    backtopClick(){
      this.$refs.scroll.scrollTo(0,0,300)
    }
  }
}
