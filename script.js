// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
//     <select  id="category"></select>
//     <select  id="brand"></select>
//     <div class="images"></div>
    
//     <script src="script.js"></script>
// </body>
// </html>
// html icerisinde yazilmalidir 

const category = document.getElementById("category");
const brand = document.getElementById("brand");
const img = document.querySelector(".images")

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(function (data) {
        console.log(data);
        const categories = data.products.map(product => product.category);
        const uniqueCategories = [...new Set(categories)];

        category.innerHTML = uniqueCategories.reduce((html, cat) => {
            return html += `<option value="${cat}">${cat}</option>`;
        }, "");

        category.onclick = function () {
            const selectedCategory = this.value;
            const filteredBrands = data.products
                .filter(product => product.category === selectedCategory)
                .map(product => product.brand);

            brand.innerHTML = filteredBrands.reduce((html, brand) => {
                return html + `<option>${brand}</option>`;
            }, "");
        }
        brand.addEventListener("change", function () {
            const selectedBrand = this.value;
            const selectedCategory = category.value;

            const filteredProducts = data.products.filter(product => {
                return product.category === selectedCategory && product.brand === selectedBrand;
            });

         img.innerHTML =   filteredProducts.reduce((kod, item) =>  kod  +=  `<img src="${item.images[0]}"/>` , "");
        });
    });
