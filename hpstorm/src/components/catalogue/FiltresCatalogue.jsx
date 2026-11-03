import { useState } from "react";
import { CATEGORIES, USAGES } from "../../utils/catalogue.js";
import styles from "./FiltresCatalogue.module.css";

export default function FiltresCatalogue({ filtres, onChange, onReinitialiser }) {
  const [ouvert, setOuvert] = useState(false);

  return (
    <aside aria-label="Filtres">
      <button
        type="button"
        className={`bouton bouton-secondaire ${styles.boutonFiltres}`}
        aria-expanded={ouvert}
        aria-controls="panneau-filtres"
        onClick={() => setOuvert(!ouvert)}
      >
        {ouvert ? "Masquer les filtres" : "Afficher les filtres"}
      </button>

      <form
        id="panneau-filtres"
        className={`${styles.panneau} ${ouvert ? styles.ouvert : ""}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={styles.champ}>
          <label htmlFor="filtre-recherche">Rechercher par nom</label>
          <input
            id="filtre-recherche"
            type="search"
            placeholder="Ex : OmniBook"
            value={filtres.q}
            onChange={(e) => onChange("q", e.target.value)}
          />
        </div>

        <div className={styles.champ}>
          <label htmlFor="filtre-categorie">Catégorie</label>
          <select
            id="filtre-categorie"
            value={filtres.categorie}
            onChange={(e) => onChange("categorie", e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {CATEGORIES.map((c) => (
              <option key={c.valeur} value={c.valeur}>{c.libelle}</option>
            ))}
          </select>
        </div>

        <div className={styles.champ}>
          <label htmlFor="filtre-usage">Usage</label>
          <select
            id="filtre-usage"
            value={filtres.usage}
            onChange={(e) => onChange("usage", e.target.value)}
          >
            <option value="">Tous les usages</option>
            {USAGES.map((u) => (
              <option key={u.valeur} value={u.valeur}>{u.libelle}</option>
            ))}
          </select>
        </div>

        <fieldset className={styles.prix}>
          <legend>Prix (€)</legend>
          <div className={styles.deuxColonnes}>
            <div>
              <label htmlFor="filtre-prix-min" className="visuellement-cache">Prix minimum</label>
              <input
                id="filtre-prix-min"
                type="number"
                min="0"
                step="1"
                placeholder="Min"
                value={filtres.min}
                onChange={(e) => onChange("min", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="filtre-prix-max" className="visuellement-cache">Prix maximum</label>
              <input
                id="filtre-prix-max"
                type="number"
                min="0"
                step="1"
                placeholder="Max"
                value={filtres.max}
                onChange={(e) => onChange("max", e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <div className={styles.case}>
          <input
            id="filtre-dispo"
            type="checkbox"
            checked={filtres.dispo === "1"}
            onChange={(e) => onChange("dispo", e.target.checked ? "1" : "")}
          />
          <label htmlFor="filtre-dispo">En stock uniquement</label>
        </div>

        <button type="button" className="bouton bouton-secondaire" onClick={onReinitialiser}>
          Réinitialiser les filtres
        </button>
      </form>
    </aside>
  );
}