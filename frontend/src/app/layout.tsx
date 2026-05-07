import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "蒋栋 (Jiang Dong) | 资深AI技术专家 & 金融科技领军者",
  description: "蒋栋个人简历网站 — 15年IT背景，深耕大模型(LLM)与计算机视觉(CV)，致力于AI技术创新与金融科技转型。",
  keywords: ["蒋栋", "Jiang Dong", "AI专家", "大模型", "LLM", "计算机视觉", "CV", "金融科技", "个人简历"],
  authors: [{ name: "蒋栋" }],
  openGraph: {
    title: "蒋栋 (Jiang Dong) | 资深AI技术专家",
    description: "蒋栋个人简历网站 — 资深AI技术专家与金融科技领军者，深耕大模型与计算机视觉双赛道。",
    url: "https://your-domain.com", // User should update this
    siteName: "蒋栋个人简历",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "蒋栋 (Jiang Dong) | 资深AI技术专家",
    description: "蒋栋个人简历网站 — 资深AI技术专家与金融科技领军者。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
