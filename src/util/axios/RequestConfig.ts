import type InterceptorHooks from '@/util/axios/Request';
import type { AxiosRequestConfig } from 'axios';

// 自定义的请求配置接口
export default interface RequestConfig extends AxiosRequestConfig {
  // 自定义的拦截器，可选
  interceptorHooks?: InterceptorHooks
  // 展示loading效果
  showLoading?: boolean
}
