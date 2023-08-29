import type { App } from 'vue'
import Emenu from './Emenu.vue'

// 使用install方法，在app.use挂载
Emenu.install = (app: App): void => {
  app.component(Emenu.__name as string, Emenu)
}

export default Emenu
