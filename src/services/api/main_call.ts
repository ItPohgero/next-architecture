"use server";

import type { AxiosResponse } from "axios";
import { removeCookies } from "@/modules/cookies";
import { ENV } from "@/configs/environment";
import api from "./main_interceptor";

interface Status {
	Code: number;
	Message: string;
}

interface Res {
	OK: boolean;
	Kind: any | { Results: any; Status: Status };
	StatusCode: number;
}

export async function get(url: string, params?: any): Promise<Res> {
	try {
		const response: AxiosResponse = await api.get(url, { params });
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: any) {
		return handleAxiosError(error);
	}
}

export async function post(url: string, data: any): Promise<Res> {
	try {
		const response: AxiosResponse = await api.post(url, data);
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: any) {
		return handleAxiosError(error);
	}
}

export async function put(url: string, data: any): Promise<Res> {
	try {
		const response: AxiosResponse = await api.put(url, data);
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: any) {
		return handleAxiosError(error);
	}
}

export async function patch(url: string, data: any): Promise<Res> {
	try {
		const response: AxiosResponse = await api.patch(url, data);
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: any) {
		return handleAxiosError(error);
	}
}

export async function del(url: string): Promise<Res> {
	try {
		const response: AxiosResponse = await api.delete(url);
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: any) {
		return handleAxiosError(error);
	}
}

export async function upload(url: string, formData: FormData): Promise<Res> {
	try {
		const response: AxiosResponse = await api.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: any) {
		return handleAxiosError(error);
	}
}

function handleAxiosError(error: any): Res {
	const axiosError = error?.isAxiosError;
	const StatusCode = error?.response?.status || 500;

	if (axiosError && error?.response) {
		if (StatusCode === 401) {
			removeCookies(ENV.TOKEN_KEY);
		}
		return {
			OK: false,
			StatusCode,
			Kind: error.response.data || { Message: "Unknown error" },
		};
	}
	return {
		OK: false,
		StatusCode,
		Kind: { Message: error.message || "Unknown error" },
	};
}