// 封装倒计时逻辑函数
import { computed, onUnmounted, ref } from "vue"
import { dayjs } from "element-plus"

export const useCountDown = () => {
  let timer = null
  // 响应式数据
  const time = ref(0)
  // 格式化时间为--分--秒
  // 时间随着time变，所以可以用computed
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 开启倒计时的函数
  const start = (currentTime) => {
    // 开启倒计时
    // 除了每隔一秒-1，还要把传下来的currentTime交给time
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}