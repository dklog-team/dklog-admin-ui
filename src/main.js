import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routes";
import {createPinia} from "pinia";
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/androidstudio.css'

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(VueHighlightJS).mount('#app')
