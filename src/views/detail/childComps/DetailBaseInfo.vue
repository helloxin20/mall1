<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span v-for="index in (goods.services.length-1)" :key="index" class="info-service-item">
        <img :src="goods.services[index - 1].icon" alt="">
        <span>{{goods.services[index - 1].name}}</span>
      </span>
    </div>

  </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
        props:{
            goods:{
                type:Object,
                default(){
                    return {}
                }
            }
        }
    }
</script>

<style scoped>
  .base-info{
    margin-top: 15px;
    padding: 0 8px;
    border-bottom: 5px solid #f2f5f8;
    color:#999999;
  }
  .info-title{
    color: #222222;
  }
  .info-price{
    margin-top: 10px;
  }
  .newPrice{
    font-size: 24px;
    color: var(--color-high-text);
  }
  .oldPrice{
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
    }
  .discount{
    font-size: 12px;
    background-color: var(--color-high-text);
    border-radius: 8px;
    color: #ffffff;
    position: relative;
    top:-8px;
    margin-left:5px;
    padding: 2px 5px;
  }
  .info-other{
    margin-top: 15px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,0.1);
    justify-content: space-between;
    line-height: 30px;
  }
  .info-service{
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }

  .info-service-item img{
    width: 13px;
    height: 13px;
    position: relative;
    top:2px
  }
  .info-service-item span{
    font-size: 13px;
    color: #333333;
  }
</style>
