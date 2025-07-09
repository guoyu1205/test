
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createPersistedState}  from 'pinia-persistedstate-plugin'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import App from './App.vue'


// 导入视频播放组件
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'



// 视频播放组件

const app = createApp(App)
app.use(VueVideoPlayer)
const pinia = createPinia()
const persist = createPersistedState()
pinia.use(persist)

app.use(pinia)
app.use(router)

app.use(ElementPlus)
app.mount('#app')
