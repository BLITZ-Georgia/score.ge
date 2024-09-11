import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProviderHelper } from "@/components/helper/queryClient";
import { ReduxToolkitProvider } from "@/components/helper/reduxProvider";
import { ThemeProvider } from "@/components/store/ThemeContext";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "score.ge",
  description: "Scores for different sports",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <html lang="en">
      <script async src="//counter.top.ge/counter.js"></script>
      <GoogleTagManager gtmId="G-PPSM2KJ8JY" />
      <GoogleAnalytics gaId="G-PPSM2KJ8JY" />
      <ThemeProvider>
        <body className={inter.className}>
          <ReduxToolkitProvider>
            <QueryClientProviderHelper>{children} </QueryClientProviderHelper>
          </ReduxToolkitProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
