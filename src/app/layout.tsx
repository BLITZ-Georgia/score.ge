import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProviderHelper } from "@/components/helper/queryClient";
import { ReduxToolkitProvider } from "@/components/helper/reduxProvider";
import { ThemeProvider } from "@/components/store/ThemeContext";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Footer } from "antd/es/layout/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "score.ge",
  description: "Scores for different sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>
          <ReduxToolkitProvider>
            <QueryClientProviderHelper>
              <GoogleTagManager gtmId="G-PPSM2KJ8JY" />
              <GoogleAnalytics gaId="G-PPSM2KJ8JY" />
              {children}
            </QueryClientProviderHelper>
          </ReduxToolkitProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
