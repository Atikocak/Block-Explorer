import PropTypes from "prop-types";
import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="font-inter bg-[#070F2B] text-gray-100 flex flex-col h-screen w-screen overflow-hidden">
      <Header />
      <>{children}</>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
