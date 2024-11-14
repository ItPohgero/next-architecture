import { ENV } from "@/configs/environment";
import axios from "axios";

const baseURL = ENV.URI.BASE_URL;
const isServer = typeof window === "undefined";

const api = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});
api.interceptors.request.use(async (config) => {
	if (isServer) {
		const { cookies } = await import("next/headers");
		const token = (await cookies()).get(ENV.TOKEN_KEY)?.value;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	} else {
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
			"$1",
		);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}

	return config;
});

export default api;
