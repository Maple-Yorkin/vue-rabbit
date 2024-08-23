import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  //定义state
  const cartList = ref([])
  // 定义action
  //获取最新购物车列表函数
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }
  //添加购物车
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      // 已登录
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count += goods.count
      } else {
        // 没有添加过
        cartList.value.push(goods)
      }
    }
    // 已添加购物车

  }
  //删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId])
      updateNewList()
    } else {
      // 找到要删除的下标值，用splice
      //或者用数组过滤filter
      const index = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(index, 1)
    }

  }
  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }
  // 单选功能
  const singleClickCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  //全选功能
  const allCheck = (selected) => {
    //遍历每一项的selected都设置为全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }

  //计算购物车
  const allCount = computed(() => cartList.value.reduce((prev, current) => { return prev + current.count }, 0))
  const allPrice = computed(() => cartList.value.reduce((prev, current) => { return prev + current.count * current.price }, 0))
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((prev, current) => prev + current.count, 0))
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((prev, current) => prev + current.count * current.price, 0))
  const isAllSelected = computed(() => cartList.value.every((item) => item.selected))
  return {
    cartList,
    addCart,
    delCart,
    clearCart,
    isAllSelected,
    allCount,
    allPrice,
    selectedCount,
    selectedPrice,
    allCheck,
    singleClickCheck,
    updateNewList
  }

})