// --------------------get localStorage
// recuperer un tableau de mon localstorage
function getLocalStorage() {
  // initialiser un tableau vide qui est mon resultat
  let productCartStorage = [];

  //  si j'ai un json de products dans le localstorage
  if (localStorage.getItem("products")) {
    // mettre à jour le tableau par les données stockées
    productCartStorage = JSON.parse(localStorage.getItem("products"));
  }
  // sinonje renvois un tableau vide: et c'est le cas initial

  // retourner le tableau tel qu'il est!!
  return productCartStorage;
}

function setLocalStorage(productCartStorage) {
  // transforme le fichier en json et envoie la clé du produit dans le localstorage
  localStorage.setItem("products", JSON.stringify(productCartStorage));
  alert("Panier mis à jour!!");
}
