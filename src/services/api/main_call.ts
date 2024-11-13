"use server";

import { ENV } from "@/configs/environment";
import { removeCookies } from "@/modules/cookies";
import type { AxiosError, AxiosResponse } from "axios";
import api from "./main_interceptor";

interface Status {
	Code: number;
	Message: string;
}

interface ApiResponse<T> {
	Results: T;
	Status: Status;
}

interface ErrorResponse {
	Message: string;
}

interface Res<T> {
	OK: boolean;
	Kind: T | ApiResponse<T> | ErrorResponse;
	StatusCode: number;
}

export async function get<T>(
	url: string,
	params?: Record<string, unknown>,
): Promise<Res<T>> {
	try {
		const response: AxiosResponse<T> = await api.get(url, { params });
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: unknown) {
		return handleAxiosError(error);
	}
}

export async function post<T>(
	url: string,
	data: Record<string, unknown>,
): Promise<Res<T>> {
	try {
		const response: AxiosResponse<T> = await api.post(url, data);
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: unknown) {
		return handleAxiosError(error);
	}
}

export async function put<T>(
	url: string,
	data: Record<string, unknown>,
): Promise<Res<T>> {
	try {
		const response: AxiosResponse<T> = await api.put(url, data);
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: unknown) {
		return handleAxiosError(error);
	}
}

export async function patch<T>(
	url: string,
	data: Record<string, unknown>,
): Promise<Res<T>> {
	try {
		const response: AxiosResponse<T> = await api.patch(url, data);
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: unknown) {
		return handleAxiosError(error);
	}
}

export async function del<T>(url: string): Promise<Res<T>> {
	try {
		const response: AxiosResponse<T> = await api.delete(url);
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: unknown) {
		return handleAxiosError(error);
	}
}

export async function upload<T>(
	url: string,
	formData: FormData,
): Promise<Res<T>> {
	try {
		const response: AxiosResponse<T> = await api.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return {
			OK: true,
			StatusCode: response.status,
			Kind: response.data,
		};
	} catch (error: unknown) {
		return handleAxiosError(error);
	}
}

function handleAxiosError<T>(error: unknown): Res<T> {
	if (error && typeof error === "object" && "isAxiosError" in error) {
		const axiosError = error as AxiosError;
		const StatusCode = axiosError.response?.status || 500;

		if (axiosError.response) {
			if (StatusCode === 401) {
				removeCookies(ENV.TOKEN_KEY);
			}
			return {
				OK: false,
				StatusCode,
				Kind: (axiosError.response.data as ErrorResponse) || {
					Message: "Unknown error",
				},
			};
		}
	}

	return {
		OK: false,
		StatusCode: 500,
		Kind: { Message: error instanceof Error ? error.message : "Unknown error" },
	};
}
