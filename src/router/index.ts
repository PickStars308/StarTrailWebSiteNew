import {createMemoryHistory, createRouter} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/StarsAPI',
        name: 'StarsAPI',
        component: () => import('@/views/StarsAPI.vue'),
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