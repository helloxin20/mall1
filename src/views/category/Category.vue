<template>

  <div class="wrapper">

  <ul class="content">
    <button class="btn">按钮</button>
  </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Category",
        data(){
          return {
              scroll:null,
          }
        },
        methods:{
          divClick(){
              console.log('sd');
          }
        },
        mounted() {
           let scroll = new BScroll(document.querySelector('.wrapper'),{
               probeType:3,
               pullUpLoad:true,

           })
            scroll.on('scroll',(position)=>{
                console.log(position);
            })
            document.querySelector('.btn').addEventListener('click',function () {
                console.log('---');
            })
            scroll.on('pullingUp',()=>{


                console.log('上拉加载更多');
                //发送网络请求，请求更多页的数据
                //等数据请求完成，并且将新的数据展示出来后
                setTimeout(()=>{
                    scroll.finishPullUp()
                },2000)
            })
        }
    }
</script>

<style scoped>
.wrapper{
  height: 150px;
  background-color: #42b983;

}

</style>
