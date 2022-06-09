import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css';
import router from './router'
import store from './store';
import 'styles/split-pane.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'splitpanes/dist/splitpanes.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { Splitpanes, Pane } from 'splitpanes'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App).use(router).use(store).use(ElementPlus).component('Splitpanes', Splitpanes).component('Pane', Pane)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')