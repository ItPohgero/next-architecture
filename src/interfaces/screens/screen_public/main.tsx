"use client";
import { ENV } from "@/configs/environment";
import FormInput from "@/interfaces/components/form-input";
import { createCookies } from "@/modules/cookies";
import { post } from "@/services/api/main_call";
import { MAIN_ENDPOINT } from "@/services/api/main_endpoint";
import { PATH } from "@/shared/path";
import type { Inputs } from "@/types/screen_public.types";
import AppIcon from "@/utils/use_icon";
import UseTheme from "@/utils/use_theme";
import { Button, Card } from "antd";
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
    const [loading, setLoading] = React.useState<boolean>(false);
    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true);
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
        } catch (error) { }
    });
    return (
        <Fragment>
            <div className="h-screen flex justify-center items-center">
                <Card>
                    <form onSubmit={onSubmit}>
                        <div className="text-center mb-4">env : {ENV.MODE}</div>
                        <div className="flex justify-center">
                            <UseTheme/>
                        </div>
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
                        <div className="h-4" />
                        <Button disabled={loading} icon={loading && <AppIcon size="small" icon="loading"/>} variant="outlined" htmlType="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </Card>
            </div>
        </Fragment>
    );
};

export default ScreenPublic;
