"use client";
import { usePathname } from "next/navigation";
import { useRouter as Router } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

export const useRouter = () => {
	const router = Router();
	const pathname = usePathname();
	const [currentPath, setCurrentPath] = useState<string>(pathname);

	useEffect(() => {
		const playSound = () => {
			const audio = new Audio("/shutter-click.wav");
			audio.play();
		};
		if (currentPath !== pathname) {
			playSound();
			setCurrentPath(pathname);
		}
	}, [pathname, currentPath]);
	return router;
};