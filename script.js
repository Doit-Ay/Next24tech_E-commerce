document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCountElement.innerText = cart.length;
    }

    function addToCart(event) {
        const productElement = event.target.closest('.product');
        const productName = productElement.querySelector('h2').innerText;
        const productPrice = productElement.querySelector('p').innerText;
        const productImage = productElement.querySelector('img').src;

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    updateCartCount();
});



document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productName = productElement.querySelector('h3').innerText;
            const productPrice = productElement.querySelector('p').innerText;
            const productImage = productElement.querySelector('img').src;

            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            const existingProduct = cart.find(item => item.name === product.name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification(`${productName} added to cart!`);
        });
    });

    function updateCartCount() {
        const cartCount = cart.length;
        document.querySelector('nav ul li:last-child a').innerText = `Cart (${cartCount})`;
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerText = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    updateCartCount();
});
