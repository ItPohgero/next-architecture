'use client'
import FormInput from '@/interfaces/components/form-input';
import { post } from '@/services/api/main_call';
import { MAIN_ENDPOINT } from '@/services/api/main_endpoint';
import api from '@/services/api/main_interceptor';
import { Inputs } from '@/types/screen_public.types';
import React from 'react'
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
            username: 'emilys',
            password: 'emilyspass',
        },
    });
    const onSubmit = handleSubmit(async (data) => {
        const { Kind } = await post(MAIN_ENDPOINT.Auth.Login, data);
        console.log({ Kind });

    })
    return (
        <div>
            <form onSubmit={onSubmit}>
                <FormInput
                    control={control}
                    name='username'
                    type='text'
                />
                <FormInput
                    control={control}
                    name='password'
                    type='password'
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ScreenPublic
