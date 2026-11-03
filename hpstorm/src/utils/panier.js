export const SEUIL_LIVRAISON_GRATUITE = 30; // € : livraison gratuite dès ce montant
export const FRAIS_LIVRAISON = 5; // € sinon

// Codes promo : pourcentage de remise et montant minimum du panier
export const CODES_PROMO = {
  AUTOMNE20: { pourcentage: 20, minimum: 500 },
};

const arrondir = (montant) => Math.round(montant * 100) / 100;

// produits = contenu de produits.json ; lignes = [{ id, quantite }] venant de usePanier()
export function calculerTotaux(produits, lignes, codePromo = "") {
  const detail = lignes
    .map((l) => {
      const produit = produits.find((p) => p.id === l.id);
      return produit
        ? { produit, quantite: l.quantite, total: arrondir(produit.prix * l.quantite) }
        : null;
    })
    .filter(Boolean); // ignore les produits qui n'existent plus dans le JSON

  const sousTotal = arrondir(detail.reduce((somme, l) => somme + l.total, 0));

  let remise = 0;
  let messagePromo = "";
  const code = codePromo.trim().toUpperCase();
  if (code) {
    const promo = CODES_PROMO[code];
    if (!promo) {
      messagePromo = "Code promo invalide.";
    } else if (sousTotal < promo.minimum) {
      messagePromo = `Ce code est valable dès ${promo.minimum} € d'achats.`;
    } else {
      remise = arrondir((sousTotal * promo.pourcentage) / 100);
      messagePromo = `Code ${code} appliqué : -${promo.pourcentage} %.`;
    }
  }

  const apresRemise = sousTotal - remise;
  const livraison = sousTotal === 0 || apresRemise >= SEUIL_LIVRAISON_GRATUITE ? 0 : FRAIS_LIVRAISON;

  return {
    lignes: detail,
    sousTotal,
    remise,
    livraison,
    total: arrondir(apresRemise + livraison),
    messagePromo,
    promoAppliquee: remise > 0,
  };
}