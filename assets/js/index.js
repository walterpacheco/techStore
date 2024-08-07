document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");
    const productTable = document.getElementById("productTable");
    const calculateStockButton = document.getElementById("calculateStockButton");
    const totalStockElement = document.getElementById("totalStock");
    const totalPriceElement = document.getElementById("totalPrice");
    const productCategorySelect = document.getElementById('productCategory');
    const filterCategorySelect = document.getElementById('categoryFilter');
    let products = [];

    productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("productId").value.trim();
        const name = document.getElementById("productName").value.trim();
        const price = parseFloat(document.getElementById("productPrice").value);
        const category = productCategorySelect.value.trim();
        const stock = parseInt(document.getElementById("productStock").value);

        if (
            id &&
            name &&
            !isNaN(price) &&
            price > 0 &&
            category &&
            !isNaN(stock) &&
            stock >= 0
        ) {
            const product = { id, name, price, category, stock };
            products.push(product);
            addProductToTable(product);
            productForm.reset();
        } else {
            alert("Por favor, complete todos los campos con valores válidos.");
        }
    });

    calculateStockButton.addEventListener("click", () => {
        const totalStock = products.reduce(
            (total, product) => total + product.stock,
            0
        );
        totalStockElement.textContent = totalStock;
    });
    calculateTotalPriceButton.addEventListener("click", () => {
        const totalPrice = products
            .reduce((total, product) => total + product.price * product.stock, 0)
            .toFixed(0);
        totalPriceElement.textContent = totalPrice;
    });

    filterCategorySelect.addEventListener('change', filterProducts);

    function addProductToTable(product) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.stock}</td>
        <td><button class="btn btn-danger btn-sm delete-btn">Eliminar</button></td>
        `;
        productTable.appendChild(row);

        row.querySelector(".delete-btn").addEventListener("click", () => {
            products = products.filter((p) => p.id !== product.id);
            row.remove();
        });
    }

    function filterProducts() {
        const category = filterCategorySelect.value;
        const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

        productTable.innerHTML = '';

        filteredProducts.forEach(product => addProductToTable(product));
    }
});
