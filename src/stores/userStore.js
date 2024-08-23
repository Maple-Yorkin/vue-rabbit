// 管理用户数据相关
import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 定义管理用户数据的state
  const userInfo = ref({})
  // 定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    //登陆后合并购物车
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }
  //退出操作清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 退出时清除购物车
    cartStore.clearCart()
  }
  // 以对象格式return出去state和action
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }

}, {
  persist: true
})