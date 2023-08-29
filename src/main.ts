import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/less/global.less'

import Qcinfoui from '../packages'
// import Qcinfoui from '../dist/qcinfo-ui.js'
// import '../dist/style.css'

// import Qcinfoui from 'qcinfo-ui'
// import 'qcinfo-ui/css'

const app = createApp(App)
// window.rafTimeout = rafTimeout // 挂载到window上，全局可用，无需引入

app.use(router).use(Qcinfoui).mount('#app')
