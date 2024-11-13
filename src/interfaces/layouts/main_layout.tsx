"use client";
import React, { type FC, Fragment, type PropsWithChildren } from "react";
import { ProviderReduxToolkit } from "../providers/redux_provider";
import PublicLayout from "./public_layout";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Fragment>
			<ProviderReduxToolkit>
				<div className="bg-white">
					<PublicLayout>
						<main>{children}</main>
					</PublicLayout>
				</div>
			</ProviderReduxToolkit>
		</Fragment>
	);
};

export default MainLayout;
