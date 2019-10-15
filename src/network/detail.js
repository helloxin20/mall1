import {request} from "./request";

export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
export function getRecommend() {
  return request({
    url:'/recommend'
  })
}
export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc//具体信息描述
    this.newPrice = itemInfo.price//现价，是由范围的价格
    this.oldPrice = itemInfo.oldPrice//原价
    this.realPrice = itemInfo.lowNowPrice//真实价格
    this.discount = itemInfo.discountDesc//折扣方式描述
    this.columns = columns
    this.services = services


  }
}

export class Shop{
  constructor(ShopInfo){
    this.logo = ShopInfo.shopLogo;
    this.name = ShopInfo.name;
    this.sells = ShopInfo.cSells;
    this.goodsCount = ShopInfo.cGoods;
    this.score = ShopInfo.score;
    this.fans = ShopInfo.cFans;
  }
}

export class GoodsParam{
  constructor(info,rule) {
    this.info = info.set
    this.size = rule.tables

  }

}
