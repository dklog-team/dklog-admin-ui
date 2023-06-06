import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routes";
import {createPinia} from "pinia";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const pinia = createPinia()

createApp(App).use(router).use(pinia).component("infinite-loading", InfiniteLoading).mount('#app')
