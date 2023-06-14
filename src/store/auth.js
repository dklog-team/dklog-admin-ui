import {defineStore} from "pinia";
import {signIn} from "../api/auth.js";
import {useCookies} from "vue3-cookies";
import {ref} from "vue";
import {getUsername} from "../api/admin.js";

export const authStore = defineStore('auth', () => {
    const adminId = ref()
    const username = ref('')

    const login = async (requestData) => {
        const cookies = useCookies().cookies
        const response = await signIn(requestData);
        const token = response.headers.get('authorization')
        cookies.set('token', token)
        cookies.set('adminId', response.data)
        adminId.value = response.data
        username.value = (await getUsername(adminId.value)).data
        cookies.set('username', username.value)
    }

    const logout = () => {
        const cookies = useCookies().cookies
        cookies.remove('token')
        cookies.remove('adminId')
        cookies.remove('username')
        location.reload()
    }

    return {adminId, login, logout}
})