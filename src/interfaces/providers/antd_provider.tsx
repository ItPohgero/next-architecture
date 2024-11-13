"use client";
import { Color } from "@/styles/color";
import { ConfigProvider, theme as antdTheme } from "antd";
import type React from "react";
import { Fragment, type PropsWithChildren } from "react";

const { defaultAlgorithm } = antdTheme;
const ProviderAntd: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Fragment>
            <ConfigProvider
                theme={{
                    algorithm: defaultAlgorithm,
                    token: {
                        colorPrimary: Color.Main.Base,
                    },
                    components: {
                        Tree: {
                            colorBgContainer: "transparent",
                            borderRadius: 0,
                            controlItemBgActive: "transparent",
                        },
                        Pagination: {
                            borderRadius: 8,
                        },
                        Input: {
                            fontSize: 14,
                            borderRadius: 30,
                            controlHeight: 40,
                            hoverBorderColor: Color.Border[40],
                            activeShadow: "none",
                            activeBorderColor: Color.Border[50],
                            activeBg: "transparent",
                            colorBgContainer: "transparent",
                        },
                        InputNumber: {
                            fontSize: 14,
                            borderRadius: 30,
                            controlHeight: 40,
                            hoverBorderColor: Color.Border[40],
                            activeShadow: "none",
                            activeBorderColor: Color.Main[50],
                            activeBg: "transparent",
                            colorBgContainer: "transparent",
                        },
                        Select: {
                            fontSize: 14,
                            borderRadius: 30,
                            controlHeight: 40,
                            hoverBorderColor: Color.Border[40],
                            activeBorderColor: Color.Border[50],
                            colorBgContainer: "transparent",
                        },
                        Button: {
                            fontSize: 14,
                            controlHeight: 40,
                            defaultHoverBg:Color.Main.Base,
                            defaultHoverColor: Color.Main[10],
                            borderRadius: 30,
                        },
                        DatePicker: {
                            fontSize: 14,
                            borderRadius: 30,
                            controlHeight: 40,
                            hoverBorderColor: Color.Border[40],
                            activeShadow: "none",
                            activeBorderColor: Color.Border[50],
                            activeBg: "transparent",
                            colorBgContainer: "transparent",
                        },
                    },
                }}
            >
                <main>{children}</main>
            </ConfigProvider>
        </Fragment>
    );
};

export default ProviderAntd;