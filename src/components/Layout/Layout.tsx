import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";

import container from "../../styles/container.module.css";
import styles from "./Layout.module.css";

export function Layout() {
  return (
    <div className={styles.app}>
      <ScrollToTop />
      <Navbar />
      <main className={`${container.container} ${styles.main}`}>
        <Outlet />
      </main>
    </div>
  );
}
