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
          <p>${product.color}</p>
          <p>${product.price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : ${product.quantite} </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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
  totalPrice(tableau);
}

function totalPrice(tableauLocaStorage) {
  let prixTotal = 0;
  let quantiteTotal = 0;
  tableauLocaStorage.forEach((element) => {});
}

// recuperer les elements par id et mettre à jour le textContent
function textContent(element) {
  let textContent = "";
  document.getElementById(element).innerHTML = htmlValue;
}

// Les afficher dans le HTML
