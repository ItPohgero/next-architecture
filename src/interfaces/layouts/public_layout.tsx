import React, { type FC, Fragment, type PropsWithChildren } from "react";

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Fragment>
			<main className="min-h-screen w-full bg-white">{children}</main>
		</Fragment>
	);
};

export default PublicLayout;
