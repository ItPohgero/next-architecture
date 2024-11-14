'use client';
import type React from 'react';
import { Icon } from '@iconify/react';
import { Color } from '@/styles/color';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type IconType = 'loading' | 'home' | 'settings';
type SizeType = 'small' | 'medium' | 'large';

interface AppIconProps {
    icon: IconType;
    size?: SizeType;
    color?: string;
    darkColor?: string;
}

const iconMapping: { [key in IconType]: string } = {
    loading: 'line-md:loading-twotone-loop',
    home: 'mdi:home',
    settings: 'mdi:cog',
};

const sizeMapping: { [key in SizeType]: string } = {
    small: '14px',
    medium: '24px',
    large: '32px',
};
const AppIcon: React.FC<AppIconProps> = ({
    icon,
    size = 'medium',
    color = Color.Main[70],
    darkColor = Color.Dark[40],
}) => {

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

    const iconSize = sizeMapping[size];
    const iconColor = currentTheme === "dark" ? darkColor : color;
    return (
        <Icon icon={iconMapping[icon]} width={iconSize} height={iconSize} color={iconColor} />
    );
};

export default AppIcon;
