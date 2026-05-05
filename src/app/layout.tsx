import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AI头像生成器 - 创意微信头像+朋友圈背景图",
    description: "输入一句话创意，生成微信朋友圈背景图和联动头像",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('theme');
                                    if (theme) {
                                        document.documentElement.setAttribute('data-theme', theme);
                                    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                                        document.documentElement.setAttribute('data-theme', 'dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}