document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable');
    const calculateStockButton = document.getElementById('calculateStockButton');
    const totalStockElement = document.getElementById('totalStock');
    let products = [];

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('productId').value.trim();
        const name = document.getElementById('productName').value.trim();
        const price = parseFloat(document.getElementById('productPrice').value);
        const category = document.getElementById('productCategory').value.trim();
        const stock = parseInt(document.getElementById('productStock').value);

        if (id && name && !isNaN(price) && price > 0 && category && !isNaN(stock) && stock >= 0) {
            const product = { id, name, price, category, stock };
            products.push(product);
            addProductToTable(product);
            productForm.reset();
        } else {
            alert('Por favor, complete todos los campos con valores válidos.');
        }
    });

    calculateStockButton.addEventListener('click', () => {
        const totalStock = products.reduce((total, product) => total + product.stock, 0);
        totalStockElement.textContent = totalStock;
    });

    function addProductToTable(product) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
        `;
        productTable.appendChild(row);
    }
});
