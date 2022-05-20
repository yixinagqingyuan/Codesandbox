import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css';
import router from './router'
import store from './store';
import './style/split-pane.css';
createApp(App).use(router).use(store).mount('#app')
