import axios from 'axios'
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 从pinia获取token，并按照后端的要求拼接token数据
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {

  //接口统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  const userStore = useUserStore()
  //拦截401token失效错误
  //清除本地用户数据并跳转到登录界面
  if (e.response.status === 401) {
    userStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})

export default httpInstance