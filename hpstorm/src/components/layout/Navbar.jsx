import { Link, NavLink } from "react-router-dom";
import usePanier from "../../hooks/usePanier.js";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { nombreArticles } = usePanier();

  return (
    <header className={styles.navbar}>
      <nav className={styles.contenu} aria-label="Navigation principale">
        <Link to="/" className={styles.logo}>HP Store</Link>
        <NavLink to="/catalogue">Catalogue</NavLink>
        <Link to="/panier" className={styles.panier}>
          Panier <span className={styles.compteur}>{nombreArticles}</span>
        </Link>
      </nav>
    </header>
  );
}