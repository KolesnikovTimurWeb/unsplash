import React from "react";
import Header from "./shared/Header";
import styles from "../src/styles/Layout.module.scss";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
