/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import Message from 'vue-m-message'
import { useDebounceFn } from '@vueuse/core'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import useCache from '@/hooks/useCache.ts'
import { ResultCode } from './ResultCode.ts'

const { isLoading } = useNProgress()
const cache = useCache()
// const requestList = ref<any[]>([])
// const isRefreshToken = ref<boolean>(false)

function createHttp(baseUrl: string | null = null, config: AxiosRequestConfig = {}): AxiosInstance {
  const env = import.meta.env
  return axios.create({
    baseURL: baseUrl ?? (env.VITE_OPEN_PROXY === 'true' ? env.VITE_PROXY_PREFIX : env.VITE_APP_API_BASEURL),
    timeout: 15000 * 5,
    responseType: 'json',
    ...config,
  })
}

const http: AxiosInstance = createHttp()

http.interceptors.request.use(

  async (config) => {
    isLoading.value = true
    const userStore = useUserStore()
    /**
     * 全局拦截请求发送前提交的参数
     */
    if (userStore.isLogin && config.headers) {
      config.headers = Object.assign({
        'Authorization': `Bearer ${userStore.token}`,
        'Accept-Language': userStore.getLanguage(),
      }, config.headers)
    }

    await usePluginStore().callHooks('networkRequest', config)
    return config
  },
)

let isLogout = false

http.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    isLoading.value = false
    const userStore = useUserStore()
    await usePluginStore().callHooks('networkResponse', response)
    // const config = response.config

    // 处理自动刷新token Automatic-Renewal-Token
    if (response.headers['automatic-renewal-token']) {
      const refreshToken = response.headers['automatic-renewal-token']
      const expireAt = response.headers['Automatic-Renewal-Token-ExpireAt'] || 3600
      cache.set('token', refreshToken)
      cache.set('expire', useDayjs().unix() + expireAt, { exp: expireAt })
      userStore.token = refreshToken
    }

    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      // 处理 JSON 格式的错误响应
      if (response.data instanceof Blob && response.data.type === 'application/json') {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            const result = JSON.parse(reader.result as string)
            console.log('blob', result)
            if (result?.code !== ResultCode.SUCCESS) {
              Message.error(result.message || '下载失败', { zIndex: 9999 })
              reject(result)
            }
          }
          reader.readAsText(response.data)
        })
      }

      // 正常的文件下载响应
      const disposition = response.headers['content-disposition']
      let fileName = '未命名文件'
      if (disposition) {
        const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1].replace(/['"]/g, ''))
        }
      }
      console.log('fileName==', fileName)

      return Promise.resolve({
        data: response.data,
        fileName,
        headers: response.headers,
      })
    }
    // console.log('response', response)
    if (response?.data?.code === ResultCode.SUCCESS) {
      return Promise.resolve(response.data)
    }
    else {
      switch (response?.data?.code) {
        case ResultCode.DISABLED: {
          Message.error(response?.data?.message ?? '账号已被禁用', { zIndex: 9999 })
          await useUserStore().logout()
          break
        }
        default:
          Message.error(response?.data?.message ?? '服务器错误', { zIndex: 9999 })
          break
      }

      return Promise.reject(response.data ? response.data : null)
    }
  },
  async (error: any) => {
    isLoading.value = false
    const logout = async () => {
      if (isLogout === false) {
        isLogout = true
        setTimeout(() => isLogout = false, 5000)
        Message.error(error.response?.data?.message ?? '登录已过期', { zIndex: 9999 })
        await useUserStore().logout()
      }
    }

    if (error && (error?.status === 401 || error?.status === 402 || error?.status === 403)) {
      await logout()
      return Promise.reject(error)
    }

    const serverError = useDebounceFn(async () => {
      if (error && error.response && error.response.status === 500) {
        Message.error(error.response?.data?.message ?? '服务器错误', { zIndex: 9999 })
      }
    }, 3000, { maxWait: 5000 })
    await serverError()
    return Promise.reject(error)
  },
)

export default {
  http,
  createHttp,
}
