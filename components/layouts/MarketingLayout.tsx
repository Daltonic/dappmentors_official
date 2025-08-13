"use client";
import { usePathname } from "next/navigation";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const hiddenRoutes = ["/login", "/register", "/not-found"];

  const shouldHideHeader = hiddenRoutes.includes(pathname ?? "");
  const shouldHideFooter = hiddenRoutes.includes(pathname ?? "");

  return (
    <div className="relative min-h-screen text-black dark:text-white transition-all duration-300">
      {!shouldHideHeader && <Header />}
      {children}
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default MarketingLayout;
