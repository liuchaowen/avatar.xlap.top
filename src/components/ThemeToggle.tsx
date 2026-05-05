'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    // 避免服务端渲染不匹配
    if (!mounted) {
        return (
            <button className="btn-icon" aria-label="切换主题">
                <Sun className="h-5 w-5" />
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="btn-icon"
            aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
        >
            {theme === 'light' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}