import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.contenu}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}