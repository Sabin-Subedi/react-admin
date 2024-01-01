import { AuthProvider } from "react-admin";
import { BaseResponse } from "../interface/baseResponse";
import { myAxios } from "../lib/axios";



interface LoginResponse {
    expires_in: number;
    access_token: string;
}

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const { data } = await myAxios<BaseResponse<LoginResponse>>({
            url: 'auth/login',
            method: 'POST',
            data: { username: username, password }
        })
        localStorage.setItem('token', JSON.stringify(data.data?.access_token))
        myAxios.defaults.headers.common['Authorization'] = `Bearer ${data?.data?.access_token}`
        return { data }
    },
    checkAuth: () => {
        const token = localStorage.getItem('token')
        if (!token) return Promise.reject()
        return myAxios.get('users/me')
    },
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token')
            return Promise.reject()
        }
        return Promise.resolve()
    },
    getPermissions: () => Promise.resolve(),
    logout: () => {
        localStorage.removeItem('token')
        return Promise.resolve()
    },
}