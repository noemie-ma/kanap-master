let products;

// API REQUEST
const fetchProducts = async() => {
    products = await fetch(
        'http://127.0.0.1:3000/api/products').then(res => res.json());

        console.log(products);
};

fetchProducts();

//Showing elements on page and make a link between the element of index.html and product.html
