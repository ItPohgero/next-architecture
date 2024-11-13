"use server";

import { ENV } from "@/configs/environment";
import { cookies } from "next/headers";

type NameCookies = typeof ENV.TOKEN_KEY | "g_token" | "bg" | "text" | "style";
interface CookiesProps {
	name: NameCookies;
	data: string;
}

export async function createCookies(props: CookiesProps) {
	(await cookies()).set(props?.name, props?.data, { secure: true });
}

export async function getCookies(name: CookiesProps["name"]) {
	return (await cookies()).get(name);
}

export async function removeCookies(name: CookiesProps["name"]) {
	(await cookies()).delete(name);
}
