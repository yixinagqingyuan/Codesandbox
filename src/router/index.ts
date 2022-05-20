import { createRouter, createWebHashHistory } from 'vue-router'
import test1 from 'components/test1.vue'
import test from 'components/test.vue'
const routes = [
    { path: '/', component: test1 },
    { path: '/about', component: test },
]
export default createRouter({
    history: createWebHashHistory(),
    routes, 
})