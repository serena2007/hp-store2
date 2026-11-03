import { SEUIL_STOCK_FAIBLE } from "../../utils/catalogue.js";
import styles from "./BadgeStock.module.css";

export default function BadgeStock({ stock }) {
  if (stock <= 0) return <span className={`${styles.badge} ${styles.rupture}`}>Rupture de stock</span>;
  if (stock <= SEUIL_STOCK_FAIBLE) {
    return <span className={`${styles.badge} ${styles.faible}`}>Plus que {stock} en stock</span>;
  }
  return <span className={`${styles.badge} ${styles.enStock}`}>En stock</span>;
}