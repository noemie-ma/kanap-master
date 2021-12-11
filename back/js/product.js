var searchUrl = new URLSearchParams(window.location.search);
var getId = searchUrl.get("id");
console.log(getId);

(async function () {
  const response = await fetch("http://127.0.0.1:3000/api/products/${getId}");
  const product = await response.json();

  document.getElementsByTagName("img")[0].src = product.imageUrl;
  let test1 = document.querySelector(".item_img img");
  test1 = product;
  document.getElementsByTagName("img")[0].alt = product.altTxt;
  document.getElementById("title").textContent = product.name;
  document.getElementById("price").textContent = product.price;
  document.getElementById("description").textContent = product.description;
  document.getElementById("colors").textContent = product.colors;

  let colors = product.colors;
  for (let color of colors) {
    let option = document.createElement("option");
    option.value = color;
    option.innerText = color;
    document.getElementById("colors").appendChild(option);
  }
})();
