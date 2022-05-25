import { createRouter, createWebHashHistory } from 'vue-router'
import Sandbox from 'views/Sandbox.vue'
import NotFound from 'packages/NotFound/index.vue'
const routes = [
    { path: '/', component: Sandbox, redirect: '/s' },
    { path: '/s', component: Sandbox, props: { showNewSandboxModal: true } },
    { path: '/s/:id', component: Sandbox },
    { path: "/:catchAll(.*)", component: NotFound },
]
export default createRouter({
    history: createWebHashHistory(),
    routes,
})