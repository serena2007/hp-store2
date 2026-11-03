import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CarteProduit from "../components/catalogue/CarteProduit.jsx";
import FiltresCatalogue from "../components/catalogue/FiltresCatalogue.jsx";
import useProduits from "../hooks/useProduits.js";
import usePanier from "../hooks/usePanier.js";
import { filtrerEtTrier } from "../utils/catalogue.js";
import styles from "./Catalogue.module.css";

const FILTRES_PAR_DEFAUT = { q: "", categorie: "", usage: "", min: "", max: "", dispo: "", tri: "pertinence" };

export default function Catalogue() {
  const [params, setParams] = useSearchParams();
  const { produits, chargement, erreur } = useProduits();
  const { ajouter, quantiteDansPanier } = usePanier();
  const [message, setMessage] = useState("");

  // Les filtres viennent de l'URL
  const filtres = {};
  for (const cle of Object.keys(FILTRES_PAR_DEFAUT)) {
    filtres[cle] = params.get(cle) ?? FILTRES_PAR_DEFAUT[cle];
  }

  function changerFiltre(nom, valeur) {
    const suivants = new URLSearchParams(params);
    if (valeur === "" || valeur === FILTRES_PAR_DEFAUT[nom]) suivants.delete(nom);
    else suivants.set(nom, valeur);
    setParams(suivants, { replace: true });
  }

  function reinitialiser() {
    setParams({}, { replace: true });
  }

  function gererAjout(produit) {
    if (quantiteDansPanier(produit.id) >= produit.stock) {
      setMessage(`Stock maximum atteint pour ${produit.nom}.`);
      return;
    }
    ajouter(produit.id, 1, produit.stock);
    setMessage(`${produit.nom} a été ajouté au panier.`);
  }

  // Le message disparaît tout seul
  useEffect(() => {
    if (!message) return undefined;
    const minuteur = setTimeout(() => setMessage(""), 3500);
    return () => clearTimeout(minuteur);
  }, [message]);

  const resultats = filtrerEtTrier(produits, filtres);

  return (
    <>
      <h1>Tous nos produits</h1>

      <div className={styles.mise}>
        <FiltresCatalogue filtres={filtres} onChange={changerFiltre} onReinitialiser={reinitialiser} />

        <section aria-label="Résultats">
          <div className={styles.barre}>
            <p className={styles.compteur} aria-live="polite">
              {!chargement && !erreur && `${resultats.length} produit${resultats.length > 1 ? "s" : ""}`}
            </p>
            <div className={styles.tri}>
              <label htmlFor="tri">Trier par</label>
              <select id="tri" value={filtres.tri} onChange={(e) => changerFiltre("tri", e.target.value)}>
                <option value="pertinence">Sélection</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
                <option value="nom">Nom (A-Z)</option>
              </select>
            </div>
          </div>

          {chargement && <p>Chargement des produits…</p>}

          {erreur && (
            <p className={styles.erreur} role="alert">
              Impossible de charger les produits. Rechargez la page ou réessayez plus tard.
            </p>
          )}

          {!chargement && !erreur && resultats.length === 0 && (
            <div className={styles.vide}>
              <p className={styles.videTitre}>Aucun produit ne correspond à votre recherche.</p>
              <p>Modifiez vos critères ou réinitialisez les filtres.</p>
              <button type="button" className="bouton" onClick={reinitialiser}>
                Réinitialiser les filtres
              </button>
            </div>
          )}

          <div className={styles.grille}>
            {resultats.map((produit) => (
              <CarteProduit key={produit.id} produit={produit} onAjouter={gererAjout} />
            ))}
          </div>
        </section>
      </div>

      {/* La région live est toujours présente pour que le message soit annoncé */}
      <div className={styles.notification} role="status" aria-live="polite">
        {message && (
          <p>
            {message} <Link to="/panier">Voir le panier</Link>
          </p>
        )}
      </div>
    </>
  );
}