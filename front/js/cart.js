getPanier();

function getPanier() {
  //Récupérer le contenu du localStorage et le parcourir pour afficher les articles
  let tableau = getLocalStorage();
  let htmlValue = "";
  tableau.forEach((product) => {
    htmlValue =
      htmlValue +
      `
        <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}" />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>Couleur : ${product.color}</p>
          <p>Prix : ${product.price} € </p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
        `;
  });
  document.getElementById("cart__items").innerHTML = htmlValue;

  document.querySelectorAll(".itemQuantity").forEach((element) => {
    element.addEventListener("change", function (event) {
      event.stopPropagation();
      event.preventDefault();
      // Interception de l'évènement de modification de la quantité totale
      //1/ Controle de la quantité : est bonne si elle est entre 0 et 100
      let valid = controleQuantite(parseInt(this.value));
      //2/ Met à jour l'element dans le local storage
      if (valid) {
        updateElementLocalStorage(
          tableau,
          this.closest(".cart__item").dataset.id,
          this.closest(".cart__item").dataset.color,
          this.value
        );
      }
      //3/ Met à jour les totaux
      totalPrice();
    });
  });
  totalPrice();
}

/*document.querySelectorAll(".itemQuantity").forEach((element) => {
  element.addEventListener("change", function (event) {
    event.stopPropagation();
    event.preventDefault();
    // on a intercepter l'evenement de modification de la quantiteTotal
    //1/ Controler la quantité est bonne : entre 0 et 100
    let valid = controleQuantite(parseInt(this.value));
    //2/ mettre à jour  Modifier l'element dans le local storage
    if (valid) {
      updateElementLocalStorage(
        tableau,
        this.closest(".cart__item").dataset.id,
        this.closest(".cart__item").dataset.color,
        this.value
      );
    }
    //3/ mettre à jour les  totaux
    totalPrice();
  });
});
totalPrice();
} */

//------ Fonction qui recalcule le total des quantité et du prix
function totalPrice() {
  let cart = getLocalStorage();
  let quantiteTotal = 0;
  let totalPrix = 0;
  cart.forEach((article) => {
    quantiteTotal += parseInt(article.quantite);
    totalPrix += parseFloat(article.price) * parseInt(article.quantite);
  });

  document.getElementById("totalQuantity").innerHTML = quantiteTotal;
  document.getElementById("totalPrice").innerHTML =
    totalPrix; /*Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(totalPrix);*/
}

function updateElementLocalStorage(tableau, id, color, quantite) {
  tableau.forEach((element) => {
    if (element.id == id && element.color == color) {
      element.quantite = parseInt(quantite);
    }
  });

  setLocalStorage(tableau);
}
