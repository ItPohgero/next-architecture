"use client";
import { store } from "@/shared/toolkit/store";
import { Provider } from "react-redux";

export function ProviderReduxToolkit({
    children,
}: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}