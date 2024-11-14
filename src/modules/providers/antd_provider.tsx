"use client";
import { Color } from "@/styles/color";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";
import type React from "react";
import { Fragment, type PropsWithChildren, useEffect, useState } from "react";

const { defaultAlgorithm, darkAlgorithm } = antdTheme;

const ProviderAntd: React.FC<PropsWithChildren> = ({ children }) => {
	const { theme, systemTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState<string | undefined>(
		undefined,
	);
	useEffect(() => {
		if (theme === "system") {
			setCurrentTheme(systemTheme);
		} else {
			setCurrentTheme(theme);
		}
	}, [theme, systemTheme]);

	const border = currentTheme === "dark" ? Color.Dark[60] : Color.Border[40];
	const borderActive =
		currentTheme === "dark" ? Color.Dark[60] : Color.Main[50];
	return (
		<Fragment>
			<ConfigProvider
				theme={{
					algorithm: currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
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
							hoverBorderColor: border,
							activeShadow: "none",
							activeBorderColor: borderActive,
							activeBg: "transparent",
							colorBgContainer: "transparent",
						},
						InputNumber: {
							fontSize: 14,
							borderRadius: 30,
							controlHeight: 40,
							hoverBorderColor: border,
							activeShadow: "none",
							activeBorderColor: borderActive,
							activeBg: "transparent",
							colorBgContainer: "transparent",
						},
						Select: {
							fontSize: 14,
							borderRadius: 30,
							controlHeight: 40,
							hoverBorderColor: border,
							activeBorderColor: borderActive,
							colorBgContainer: "transparent",
						},
						Button: {
							fontSize: 14,
							controlHeight: 40,
							defaultHoverBg:
								currentTheme === "dark" ? Color.Dark[80] : Color.Main.Base,
							defaultHoverColor:
								currentTheme === "dark" ? Color.Dark[20] : Color.Main[10],
							borderRadius: 30,
						},
						DatePicker: {
							fontSize: 14,
							borderRadius: 30,
							controlHeight: 40,
							hoverBorderColor: border,
							activeShadow: "none",
							activeBorderColor: borderActive,
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
