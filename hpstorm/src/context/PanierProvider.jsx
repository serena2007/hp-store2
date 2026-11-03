import { useEffect, useMemo, useState } from "react";
import PanierContext from "./PanierContext.js";

const CLE_PANIER = "hp-store-panier";
const CLE_PROMO = "hp-store-promo";

function lire(cle, valeurParDefaut) {
  try {
    const brut = localStorage.getItem(cle);
    return brut === null ? valeurParDefaut : JSON.parse(brut);
  } catch {
    return valeurParDefaut;
  }
}

function ecrire(cle, valeur) {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur));
  } catch (erreur) {
    console.error("Impossible de sauvegarder dans le navigateur :", erreur);
  }
}

// Le panier ne stocke que { id, quantite } : les prix sont relus depuis produits.json
export default function PanierProvider({ children }) {
  const [lignes, setLignes] = useState(() => {
    const stocke = lire(CLE_PANIER, []);
    return Array.isArray(stocke) ? stocke : [];
  });
  const [codePromo, setCodePromo] = useState(() => {
    const stocke = lire(CLE_PROMO, "");
    return typeof stocke === "string" ? stocke : "";
  });

  useEffect(() => {
    ecrire(CLE_PANIER, lignes);
  }, [lignes]);

  useEffect(() => {
    ecrire(CLE_PROMO, codePromo);
  }, [codePromo]);

  // stockMax est facultatif : la quantité ne dépasse jamais le stock s'il est fourni
  function ajouter(id, quantite = 1, stockMax = Infinity) {
    setLignes((precedentes) => {
      const existante = precedentes.find((l) => l.id === id);
      const nouvelle = Math.min((existante ? existante.quantite : 0) + quantite, stockMax);
      if (nouvelle <= 0) return precedentes;
      if (existante) {
        return precedentes.map((l) => (l.id === id ? { ...l, quantite: nouvelle } : l));
      }
      return [...precedentes, { id, quantite: nouvelle }];
    });
  }

  function supprimer(id) {
    setLignes((precedentes) => precedentes.filter((l) => l.id !== id));
  }

  // Une quantité <= 0 supprime la ligne
  function modifierQuantite(id, quantite, stockMax = Infinity) {
    if (quantite <= 0) {
      supprimer(id);
      return;
    }
    setLignes((precedentes) =>
      precedentes.map((l) => (l.id === id ? { ...l, quantite: Math.min(quantite, stockMax) } : l))
    );
  }

  function vider() {
    setLignes([]);
    setCodePromo("");
  }

  function quantiteDansPanier(id) {
    const ligne = lignes.find((l) => l.id === id);
    return ligne ? ligne.quantite : 0;
  }

  const nombreArticles = useMemo(
    () => lignes.reduce((somme, l) => somme + l.quantite, 0),
    [lignes]
  );

  const valeur = {
    lignes,
    nombreArticles,
    codePromo,
    setCodePromo,
    ajouter,
    modifierQuantite,
    supprimer,
    vider,
    quantiteDansPanier,
  };

  return <PanierContext.Provider value={valeur}>{children}</PanierContext.Provider>;
}