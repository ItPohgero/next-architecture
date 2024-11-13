"use client";
import FormInput from "@/interfaces/components/form-input";
import { post } from "@/services/api/main_call";
import { MAIN_ENDPOINT } from "@/services/api/main_endpoint";
import api from "@/services/api/main_interceptor";
import type { Inputs } from "@/types/screen_public.types";
import { Button } from "antd";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

const ScreenPublic = () => {
	const {
		register,
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			expiresInMins: 100,
			username: "emilys",
			password: "emilyspass",
		},
	});
	const onSubmit = handleSubmit(async (data) => {
		const { Kind } = await post(MAIN_ENDPOINT.Auth.Login, data);
		console.log({ Kind });
	});
	return (
		<Fragment>
			<div className="h-screen flex justify-center items-center">
				<form onSubmit={onSubmit}>
					<FormInput
						label="Username"
						control={control}
						name="username"
						type="text"
					/>
					<FormInput
						label="Password"
						control={control}
						name="password"
						type="password"
					/>
					<div className="h-2" />
					<Button
						className="bg-slate-800 py-2 px-4 rounded-xl minw-full"
						htmlType="submit"
					>
						Submit
					</Button>
				</form>
			</div>
		</Fragment>
	);
};

export default ScreenPublic;
