<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table class="info-size" v-for="(item,index) in paramInfo.size" :key="index">
      <tr v-for="item1 in item">
        <td v-for="item2 in item1">{{item2}}</td>
      </tr>
    </table>

    <table class="info-param" >
      <tr v-for="(item,index) in paramInfo.info " :key="index">
        <td class="param-key">{{item.key}}</td>
        <td class="param-value">{{item.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
    export default {
        name: "DetailParamInfo",
        props:{
            paramInfo:{
                type:Object,
                default(){
                    return {}
                }
            }
        }
    }
</script>

<style scoped>
.param-info{
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
  .info-size{
    width: 100%;
    border-collapse: collapse;
  }
  table tr{
    height: 42px;

  }
  table tr td{
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
 .info-param{
   border-top: 1px solid rgba(0,0,0,.1);
 }
  .param-key{
    width: 95px;
  }
  .param-value{
    color: #eb4868;
  }
</style>
