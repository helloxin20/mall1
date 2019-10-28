<template>
  <div>
    <div id="shop-item">
      <div class="item-selector">
        <CheckButton :isChecked = "product.checked" @click.native="checkClick"></CheckButton>
      </div>
      <div class="item-img">
        <img :src="product.imge" alt="商品图片">
      </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述{{product.desc}}</div>
      <div class="item-bottom">
        <div class="item-price left">￥{{product.realPrice}}</div>
        <div class="item-count right">X{{product.count}}</div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
    export default {
        name: "CartListItem",
        components:{
            CheckButton
        },
        props:{
            product:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            checkClick(){
                this.product.checked = !this.product.checked;//对象模型中修改选中状态
            }
        }
    }
</script>

<style scoped>
#shop-item{
  width:100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #cccccc;
}
  .item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img{
    padding: 5px;
  }
  .item-img img{
    width:80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info{
    font-size: 17px;
    color: #333333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-title,.item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /*height: 5px;*/
  }
.item-info .item-desc{
  font-size: 14px;
  color: #666600;
  margin-top: 15px;
}
  .item-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left:10px;
    right: 10px;
  }
  .item-price{
    color: orangered;
  }
</style>
