"use client";
import FormInput from "@/interfaces/components/form-input";
import { post } from "@/services/api/main_call";
import { MAIN_ENDPOINT } from "@/services/api/main_endpoint";
import type { Inputs } from "@/types/screen_public.types";
import { Button } from "antd";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

const ScreenPublic = () => {
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
            if(!OK) {
                throw new Error();
            }
            console.log({ Kind });
        } catch (error) {

        }
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
