import { createRouter, createWebHistory } from 'vue-router';
import Character from './components/Character.vue'
import Index from './components/Index.vue'
import Episode from './components/Episode.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Index},
        { path: '/character/:id', name: 'character', component: Character },
        { path: '/episode/:id', name: 'episode', component: Episode },
    ]
})