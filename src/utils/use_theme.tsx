"use client";
import { Icon } from "@iconify/react";
import { useTheme as THEME} from "next-themes";
import { Case, Switch } from "react-if";

const UseTheme = () => {
	const { theme = "light", setTheme } = THEME();
	return (
		<div className="mx-1">
			<Switch>
				<Case condition={theme === "system"}>
					<button
						type="button"
						onClick={() => setTheme(theme === "light" ? "dark" : "light")}
					>
						<div className="flex justify-center items-center hover:bg-[#21A71A] dark:hover:bg-neutral-700/50 aspect-square w-full p-2 rounded-lg">
							<Icon
								className="w-6 h-6"
								icon="solar:laptop-minimalistic-broken"
							/>
						</div>
					</button>
				</Case>
				<Case condition={theme === "light"}>
					<button
						type="button"
						onClick={() => setTheme(theme === "light" ? "dark" : "light")}
					>
						<div className="flex justify-center items-center hover:bg-[#21A71A] dark:hover:bg-neutral-700/50 aspect-square w-12 p-2 rounded-lg">
							<Icon className="w-6 h-6" icon="solar:sun-2-bold" />
						</div>
					</button>
				</Case>
				<Case condition={theme === "dark"}>
					<button
						type="button"
						onClick={() => setTheme(theme === "light" ? "dark" : "light")}
					>
						<div className="flex justify-center items-center hover:bg-[#21A71A] dark:hover:bg-neutral-700/50 aspect-square w-12 p-2 rounded-lg">
							<Icon className="w-6 h-6" icon="solar:moon-bold-duotone" />
						</div>
					</button>
				</Case>
			</Switch>
		</div>
	);
};

export default UseTheme;