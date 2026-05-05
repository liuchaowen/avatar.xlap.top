import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AI头像生成器 - 创意联动图",
    description: "输入一句话创意，生成微信朋友圈背景图和联动头像",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}