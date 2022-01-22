function confirmation() {
  // Eventlistener qui fonctionne seulement si tout les champs sont correctement rempli
  order.addEventListener("click", (event) => {
    event.preventDefault();
    // Fonction fetch qui envoie à l'API un objet contenant l'objet 'contact' et le tableau 'products'
    async function sendData() {
      await fetch("http://127.0.0.1:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
      })
        // Ensuite on stock la réponse de l'api (orderId)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          orderId = data.orderId;
        });
      // SI on a bien obtenu un orderId en réponse on redirige notre utilisateur
      (() => {
        const orderId =
          new URL(location.href).searchParams.get("orderId") || "ERREUR";
        document.getElementById("commandId").textContent = orderId;
      })();
    }
    // Fontion qui envoie les id de tout les produits dans le tableau product
    function collectDatas() {
      for (let product of panier) {
        products.push(product.id);
      }
    }
    // SI tout les champs sont valides (validForm = true) on continue l'execution du code
    if (validForm) {
      if (panier) {
        new Swal({
          title: "Commande en cours...",
          icon: "question",
          iconColor: "yellow",
          confirmButtonColor: "#2c3e50",
          showConfirmButton: false,
        });
        collectDatas();
        sendData();
      } else {
        new Swal({
          title: "Votre panier est vide !",
          icon: "error",
          iconColor: "red",
          confirmButtonColor: "#2c3e50",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    }
    // SINON on reverifie les champs
    else {
      validFirstName(inputFirstName.value);
      validLastName(inputLastName.value);
      validAddress(inputAddress.value);
      validCity(inputCity.value);
      validEmail(inputEmail.value);
    }
  });
}
