import { createThingsApp, unifiedUse } from '@/hooks/global-app'
import type { App } from 'vue'
import { initRouter } from '@/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import BlocksNext, { Icon } from 'blocks-next'
import ElementPlus from 'element-plus'
import DeleteDialog from '@/components/delete-dialog/delete-dialog.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import 'element-plus/dist/index.css'
import {
  // 依赖收集
  webComponentDependent,
  // 微服务挂载
  webComponentMount,
  // 微服务挂载事件
  webComponentMountEvent,
  // 微服务卸载事件
  webComponentUnMountEvent
} from '@/inhub'

export function initMount() {
  try {
    let app: App

    // 统一挂载，微服务/单独应用
    webComponentMountEvent(() => {
      app = createThingsApp()

      const router = initRouter()
      const pinia = createPinia().use(piniaPluginPersistedState)

      unifiedUse(app, [router, pinia, Icon, BlocksNext])

      app.use(ElementPlus, { locale: zhCn, size: 'large' })
      // 依赖收集
      webComponentDependent({ router })
      app.component('DeleteDialog', DeleteDialog)
      app.mount('#app')

      // Vue3 报错监听
      app.config.errorHandler = (err, instance, info) =>
        console.log('=====Vue3统一ErrorHandler处理=====', err, instance, info)
    })

    // 无界生命周期 UnMount
    webComponentUnMountEvent(() => {
      app.unmount()
    })

    // vite module脚本异步加载，应用主动调用生命周期
    webComponentMount()
  } catch (e) {
    console.warn('=====Vue3项目初始化失败=====', e)
  }
}
