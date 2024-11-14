"use client";
import React, { type FC, Fragment, type PropsWithChildren } from "react";

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Fragment>
			<div className="min-h-screen w-full">{children}</div>
		</Fragment>
	);
};

export default PublicLayout;
