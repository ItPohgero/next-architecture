"use client";
import { ThemeProvider } from "next-themes";
import React, { type FC, Fragment, type PropsWithChildren, useEffect, useState } from "react";

const ProviderTheme: FC<PropsWithChildren> = ({ children }) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return children;
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            {children}
        </ThemeProvider>
    );
};

export default ProviderTheme;
