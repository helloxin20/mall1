<template>
  <div class="tab-bar-item" @click="pathClick" >
    <div v-if="!isActive"><slot name="item-img" ></slot></div>
    <div v-else><slot name="item-img_active" ></slot></div>
    <div :style="activeStyle"><slot name="item-text" ></slot></div>
  </div>
</template>

<script>
    export default {
        name: "TabBatItem",

        computed:{
            isActive(){
                return this.$route.path.indexOf(this.path) !==-1  //true
            },
            activeStyle(){
                return this.isActive ? {color:this.activeColor}:{}
            }
        },
        props:{
          path:String,
            activeColor:{
              type:String,
                default:'red',

            }
        },
        methods:{
            pathClick(){
              this.$router.replace(this.path)

            }
        }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
    box-shadow: 0 -1px 1px rgba(100,100,100,.1);
    font-size: 14px;
  }
  .tab-bar-item img{
    margin-top: 3px;
    vertical-align: middle;
  }
</style>
