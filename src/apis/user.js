// 封装用户相关接口函数
import request from '@/utils/http'

export const loginAPI = ({ account, password }) => {
  return request({
    url: '/login',
    method: 'POST',
    //接口参数，接口文档
    data: {
      account,
      password
    }
  })
}