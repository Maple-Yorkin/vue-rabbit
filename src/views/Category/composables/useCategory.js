import { getCategoryAPI } from '@/apis/category';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';






//封装分类数据线业务

export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  //如果不传参数，给的就是默认的route.params.id；如果传参数，给的就是新的id
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => getCategory())

  //路由参数变化的时候，重新发送分类数据接口
  //to是目标路由对象
  onBeforeRouteUpdate((to) => {
    //重新发送的是getCategory，使用的是最新的路由参数

    getCategory(to.params.id)
  })

  return { categoryData }
}