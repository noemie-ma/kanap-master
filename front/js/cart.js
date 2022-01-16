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

  document.getElementById("deleteItem").innerHTML = htmlValue;

  document.querySelectorAll(".deleteItem").forEach((element) => {
    element.addEventListener("delete", function (event) {
      event.stopPropagation();
      event.preventDefault();
      // Interception de l'évènement de modification de la quantité totale
      //1/ Controle de la quantité : est bonne si elle est entre 0 et 100
      let valid = supprimerQuantite(parseInt(this.value));
      //2/ Met à jour l'element dans le local storage
      if (valid) {
        updateElementLocalStorage(
          tableau,
          this.closest("deleteItem").dataset.id,
          this.closest("deleteItem").dataset.color,
          this.value
        );
      }
      //3/ Met à jour les totaux
      totalPrice();
    });
  });
  totalPrice();

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
}

// FORMULAIRE DE RENSEIGNEMENTS

// Vérifie la validité du format de l'email
function validateEmail(email) {
  let re =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

function Verification() {
  // Récupérer la valeur des champs
  let Prenom = document.getElementById("firstName").value;
  let Nom = document.getElementById("lastName").value;
  let Adresse = document.getElementById("address").value;
  let Ville = document.getElementById("city").value;
  let Email = document.getElementById("email").value;

  // Contrôle sur le prénom
  if (Prenom == "") {
    alert("Vous devez compléter cet élément (ex : votre prénom)");
    document.getElementById("firstName").style.backgroundColor = "red";
    document.getElementById("firstName").style.color = "#FFF";
    // Permet de bloquer l'envoi du formulaire
    return false;
  } else {
    document.getElementById("firstName").style.backgroundColor = "#9C6";
  }

  // Contrôle sur le nom
  if (Nom == "") {
    alert("Vous devez compléter cet élément (ex  : Dupont)");
    document.getElementById("lastName").style.backgroundColor = "red";
    document.getElementById("lastName").style.color = "#FFF";
    return false;
  } else {
    document.getElementById("lastName").style.backgroundColor = "#9C6";
  }

  // Contrôle sur l'adresse
  if (Adresse == "") {
    alert("Vous devez compléter cet élément (ex : 3 Rue des Sages)");
    document.getElementById("address").style.backgroundColor = "red";
    document.getElementById("address").style.color = "#FFF";
    return false;
  } else {
    document.getElementById("address").style.backgroundColor = "#9C6";
  }

  // Contrôle sur la ville
  if (Ville == "") {
    alert("Vous devez compléter cet élément (ex : Amiens)");
    document.getElementById("city").style.backgroundColor = "red";
    document.getElementById("city").style.color = "#FFF";
    return false;
  } else {
    document.getElementById("city").style.backgroundColor = "#9C6";
  }

  // Contrôle sur l'adresse postale
  if (Email == "") {
    alert(
      "Vous devez compléter votre adresse email (ex : blabla@gneugneugneu.com)"
    );
    document.getElementById("email").style.backgroundColor = "red";
    document.getElementById("email").style.color = "#FFF";
    return false;
  } else {
    document.getElementById("email").style.backgroundColor = "#9C6";
  }
}
