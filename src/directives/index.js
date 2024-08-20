
import { useIntersectionObserver } from '@vueuse/core'
//懒加载插件
export const lazyPlugin = {

  install(app) {


    //定义全局指令
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el:指令绑定的哪个元素 这里是img
        // binding常用binding.value 指的是指令等于号后面绑定的表达式的值 这里是url
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              //进入视窗
              el.src = binding.value
              stop()
            }
          }
        )
      }
    })
  }
}