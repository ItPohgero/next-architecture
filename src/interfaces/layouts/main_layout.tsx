"use client";
import React, { type FC, Fragment, type PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Fragment>
			<main>{children}</main>
		</Fragment>
	);
};

export default MainLayout;
