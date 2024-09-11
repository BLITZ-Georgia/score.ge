import type { Metadata } from "next";
import Header from "@/components/header/Header";
import Advertisement from "@/components/advertisement/Advertisement";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import MainNav from "@/components/header/navigation/Navigation";
import Predictions from "@/components/predictions/Predictions";

export const metadata: Metadata = {
  title: "score.ge - contact ",
  description: "score.ge contact page",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <>
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
      <footer className="w-full  mt-5">
        <Footer>
          <div>
            <div id="top-ge-counter-container" data-site-id="117564"></div>
          </div>
        </Footer>
      </footer>
    </>
  );
}
