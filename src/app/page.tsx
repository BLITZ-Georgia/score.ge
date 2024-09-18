import UserLists from "@/components/userLists/UserLists";
import AllMatchInfos from "@/components/allMatchInfoSection/AllMatchInfos";
import Predictions from "@/components/predictions/Predictions";
import Header from "@/components/header/Header";
import Advertisement from "@/components/advertisement/Advertisement";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import MainNav from "@/components/header/navigation/Navigation";

export default function Home() {
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
      <main className={`flex  py-4 pb-0 container gap-x-4 mobailmain`}>
        <div className="mobileNone">
          <UserLists />
        </div>
        <AllMatchInfos />
        <div className="mobileNone">
          <Predictions />
        </div>
      </main>
      <footer className="w-full  mt-5">
        <Footer>
          <div>
            <div id="top-ge-counter-container" data-site-id="117564"></div>
            <script async src="//counter.top.ge/counter.js"></script>
          </div>
        </Footer>
      </footer>
    </>
  );
}
