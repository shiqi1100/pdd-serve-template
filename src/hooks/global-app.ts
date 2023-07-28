import AppComp from '@/App.vue'
import { createApp } from 'vue'
import type { Plugin, App } from 'vue'

const createThingsApp = () => createApp(AppComp)

const unifiedUse = (app: App, plugins: Plugin[]) => {
  for (const p of plugins) {
    app.use(p)
  }
}

export { createThingsApp, unifiedUse }
