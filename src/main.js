import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routes";
import {createPinia} from "pinia";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/androidstudio.css'

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(VueHighlightJS).component("infinite-loading", InfiniteLoading).mount('#app')
