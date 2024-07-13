import PropTypes from "prop-types";
import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
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
