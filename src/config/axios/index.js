import axios from "axios"

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_REST_API,
})

instance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		if (typeof window !== "undefined") {
			if (error.response.status === 401 && window.location.pathname != "/sign-in" && window.location.pathname != "/email-verification") {
				localStorage.removeItem("cerebro.token")
				window.location.replace(`${window.location.origin}/sign-in`)
			}
			if (error.response.status === 500) {
				localStorage.removeItem("cerebro.token")
				window.location.replace(`${window.location.origin}/sign-in`)
			}
		}
		return Promise.reject(error)
	}
)
export { default as setAuthorizationHeader } from "./setAuthHeader"
export default instance
