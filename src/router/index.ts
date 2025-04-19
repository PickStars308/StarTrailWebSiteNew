import {createRouter, createMemoryHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
    },
    {
        path: '/Download',
        name: 'Download',
        component: () => import('@/views/Download.vue'),
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;