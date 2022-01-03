var searchUrl = new URLSearchParams(window.location.search);
var getId = searchUrl.get("id");

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
  const selectedProduct = {
    id: product._id,
    imageUrl: product.imageUrl,
    name: product.name,
    price: product.price,
    description: product.description,
    altTxt: product.altTxt,
    quantite: 0,
    color: "",
  };
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
      let valid = controleColor(this.value);
      if (valid) selectedProduct.color = this.value;
    });

  document
    .getElementById("quantity")
    .addEventListener("change", function (event) {
      event.stopPropagation();
      event.preventDefault();
      let valid = controleQuantite(this.value);
      if (valid) selectedProduct.quantite = parseInt(this.value);
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
        let tableauLocalStorage = getLocalStorage();
        AjouterProduitAuPanier(selectedProduct, tableauLocalStorage);
        setLocalStorage(tableauLocalStorage);
      }
    });
}

function AjouterProduitAuPanier(productCart, productCartStorage) {
  let existe = false;
  // ajout dans le tableau de l'objet avec la couleur choisie et l'article
  productCartStorage.forEach((element) => {
    if (element.id == productCart.id && element.color == productCart.color) {
      let valid = controleQuantite(element.quantite + productCart.quantite);
      if (valid) element.quantite += productCart.quantite;
      else {
        alert(
          "Il y a deja une quatité dans le panier de:" +
            element.quantite +
            " et vous venez d'ajouter:" +
            productCart.quantite
        );
      }
      existe = true;
    }
  });

  if (!existe) productCartStorage.push(productCart);
}
