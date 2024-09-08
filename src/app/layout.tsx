import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Advertisement from "@/components/advertisement/Advertisement";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import { QueryClientProviderHelper } from "@/components/helper/queryClient";
import { ReduxToolkitProvider } from "@/components/helper/reduxProvider";
import MainNav from "@/components/header/navigation/Navigation";
import Predictions from "@/components/predictions/Predictions";
import { ThemeProvider } from "@/components/store/ThemeContext";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Score.ge",
  description: "Scores for different sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script async src="//counter.top.ge/counter.js"></script>
      <GoogleTagManager gtmId="G-PPSM2KJ8JY" />
      <GoogleAnalytics gaId="G-PPSM2KJ8JY" />
      <ThemeProvider>
        <body className={inter.className}>
          <ReduxToolkitProvider>
            <QueryClientProviderHelper>
              <header>
                <Advertisement />
                <Header />
                <div className="desktopNo mobailMainNavigation">
                  <MainNav />
                </div>
                <div className="desktopNo">
                  <Predictions />
                </div>
                <Navigation />
              </header>
              {children}
            </QueryClientProviderHelper>
          </ReduxToolkitProvider>
          <footer className="w-full  mt-5">
            <Footer>
              <div>
                <div id="top-ge-counter-container" data-site-id="117564"></div>
              </div>
            </Footer>
          </footer>
        </body>
      </ThemeProvider>
    </html>
  );
}
