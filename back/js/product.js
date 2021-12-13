var searchUrl = new URLSearchParams(window.location.search);
var getId = searchUrl.get("id");
console.log(getId);
const urlProduct = "http://127.0.0.1:3000/api/products/" + getId;
loadProduct();
function loadProduct() {
  console.log(urlProduct);
  fetch(urlProduct)
    .then((response) => {
      console.log(response);
      if (response.ok) return response.json();
    })
    .then((product) => {
      displayProduct(product);
    })
    .catch((error) => {
      console.log(error);
      alert("Veuillez contacter l'admin");
    });
}

function displayProduct(product) {
  console.log(product);
  document.querySelector(
    ".item__img"
  ).innerHTML = ` <img src="${product.imageUrl}" alt="${product.altTxt}"> `;

  document.getElementById("title").textContent = `${product.name}`;
  document.getElementById("price").textContent = `${product.price}`;
  document.getElementById("description").textContent = `${product.description}`;

  for (let color of product.colors) {
    let option = document.createElement("option");
    option.value = color;
    option.innerText = color;
    document.getElementById("colors").appendChild(option);
  }
  document
    .getElementById("colors")
    .addEventListener("change", function (event) {
      event.stopPropagation();
      event.preventDefault();
      controleColor(this.value);
    });

  document
    .getElementById("quantity")
    .addEventListener("change", function (event) {
      event.stopPropagation();
      event.preventDefault();
      controleQuantite(this.value);
    });

  document
    .getElementById("addToCart")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      let validQuantite = controleQuantite(
        document.getElementById("quantity").value
      );
      let validColor = controleColor(document.getElementById("colors").value);
      if (validQuantite && validColor) {
        AjouterProduitAuPanier();
      }
    });
}

// controler la quantité
function controleQuantite(quantite) {
  let valid = true;
  if (quantite < 1 || quantite > 100) {
    valid = false;
    alert("Veuillez choisir une quantite entre 1 et 100! ");
  }
  return valid;
}

function controleColor(color) {
  let valid = true;
  if (color == "") {
    valid = false;
    alert("Veuillez choisir une couleur !");
  }
  return valid;
}

function AjouterProduitAuPanier() {
  console.log("je suis la ");
}
// Potit bout de local storage : pour ajouter un produit dans le locaStorage
/* function addProductLocalStorage(productCart, productCartStorage) {
	// ajout dans le tableau de l'objet avec la couleur choisie
	productCartStorage.push(productCart);

	// transforme le fichier en json et envoie la clé du produit dans le localstorage
	localStorage.setItem('products', JSON.stringify(productCartStorage));
} */
