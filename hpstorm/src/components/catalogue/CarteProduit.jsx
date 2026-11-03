import { Link } from "react-router-dom";
import BadgeStock from "./BadgeStock.jsx";
import { formatPrix, urlImage } from "../../utils/format.js";
import styles from "./CarteProduit.module.css";

export default function CarteProduit({ produit, onAjouter }) {
  const enStock = produit.stock > 0;
  const caracteristiques = Object.values(produit.caracteristiques || {}).slice(0, 3);

  return (
    <article className={`${styles.carte} ${enStock ? "" : styles.rupture}`}>
      <img
        className={styles.image}
        src={urlImage(produit.image)}
        alt={produit.nom}
        width="400"
        height="300"
        loading="lazy"
      />
      <div className={styles.corps}>
        <BadgeStock stock={produit.stock} />
        <h2 className={styles.nom}>
          <Link to={`/produit/${produit.id}`}>{produit.nom}</Link>
        </h2>
        <ul className={styles.caracteristiques}>
          {caracteristiques.map((valeur) => (
            <li key={valeur}>{valeur}</li>
          ))}
        </ul>
        <p className={styles.prixBloc}>
          <span className={styles.prix}>{formatPrix(produit.prix)}</span>{" "}
          <span className={styles.tva}>TVA incluse</span>
        </p>
        <div className={styles.actions}>
          <Link to={`/produit/${produit.id}`} className="bouton bouton-secondaire">
            Voir produit
          </Link>
          <button type="button" className="bouton" disabled={!enStock} onClick={() => onAjouter(produit)}>
            {enStock ? "Ajouter au panier" : "Indisponible"}
          </button>
        </div>
      </div>
    </article>
  );
}