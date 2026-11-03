import { useEffect, useState } from "react";

// Le JSON n'est téléchargé qu'une seule fois, même si plusieurs pages l'utilisent
let promesseEnCache = null;

function chargerProduits() {
  if (!promesseEnCache) {
    promesseEnCache = fetch(`${import.meta.env.BASE_URL}data/produits.json`)
      .then((reponse) => {
        if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`);
        return reponse.json();
      })
      .catch((erreur) => {
        promesseEnCache = null; // permet de réessayer
        throw erreur;
      });
  }
  return promesseEnCache;
}

export default function useProduits() {
  const [etat, setEtat] = useState({ produits: [], chargement: true, erreur: null });

  useEffect(() => {
    let actif = true;
    chargerProduits()
      .then((produits) => {
        if (actif) setEtat({ produits, chargement: false, erreur: null });
      })
      .catch((erreur) => {
        if (actif) setEtat({ produits: [], chargement: false, erreur: erreur.message });
      });
    return () => {
      actif = false;
    };
  }, []);

  return etat;
}