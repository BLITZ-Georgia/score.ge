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
            <Footer />
          </footer>
        </body>
      </ThemeProvider>
    </html>
  );
}
