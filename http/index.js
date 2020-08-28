import Fly from '../lib/fly/wx'
const fly = new Fly()
fly.config.baseURL = 'http://music.lz7dev.top:9001'

// 响应拦截器
fly.interceptors.response.use((response) => {
    //只将请求结果的data字段返回
    return response.data
  }
)

module.exports = fly