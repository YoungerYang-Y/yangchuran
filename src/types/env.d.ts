// 定义 .vue文件 的类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const vueComponent: DefineComponent<unknown, unknown, unknown>
  export default vueComponent
}
