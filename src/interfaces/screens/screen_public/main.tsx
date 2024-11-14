"use client";
import { ENV } from "@/configs/environment";
import FormInput from "@/interfaces/components/form-input";
import { createCookies } from "@/modules/cookies";
import { post } from "@/services/api/main_call";
import { MAIN_ENDPOINT } from "@/services/api/main_endpoint";
import { PATH } from "@/shared/path";
import type { Inputs } from "@/types/screen_public.types";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

const ScreenPublic = () => {
    const router = useRouter();
    const {
        control,
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
        try {
            const { Kind, OK, StatusCode } = await post(MAIN_ENDPOINT.Auth.Login, data);
            console.log({ OK, StatusCode });
            if (!OK) {
                throw new Error();
            }
            const resp = Kind as { accessToken: string };
            await createCookies({
                name: ENV.TOKEN_KEY,
                data: resp.accessToken,
            });
            router.push(PATH.PRIVATE);
        } catch (error) {}
    });
    return (
        <Fragment>
            <div className="h-screen flex justify-center items-center">
                <form onSubmit={onSubmit}>
                    <div>{ENV.MODE}</div>
                    <FormInput
                        label="Username"
                        control={control}
                        name="username"
                        type="text"
                        errors={errors}
                        rules={{ required: true }}
                    />
                    <FormInput
                        label="Password"
                        control={control}
                        name="password"
                        type="password"
                        errors={errors}
                        rules={{ required: true }}
                    />
                    <div className="h-2" />
                    <button
                        className="bg-slate-800 py-2 px-4 rounded-xl minw-full"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

export default ScreenPublic;
