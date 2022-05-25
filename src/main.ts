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
createApp(App).use(router).use(store).use(ElementPlus).component('Splitpanes', Splitpanes).component('Pane', Pane).mount('#app')
