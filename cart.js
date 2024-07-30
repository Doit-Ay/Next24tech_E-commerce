document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-button');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty. <a href="index.html">Continue shopping</a>.</p>';
            cartTotalElement.innerText = '$0.00';
            cartCountElement.innerText = 0;
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.price} x <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input"></p>
                    <p>Subtotal: $${(item.price.replace('$', '') * item.quantity).toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
            total += parseFloat(item.price.replace('$', '')) * item.quantity;
        });

        cartTotalElement.innerText = `$${total.toFixed(2)}`;
        cartCountElement.innerText = cart.length;

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    function updateQuantity(event) {
        const index = event.target.getAttribute('data-index');
        const newQuantity = parseInt(event.target.value);
        if (newQuantity < 1) {
            removeItem({ target: event.target.closest('.remove-item') });
            return;
        }
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    function removeItem(event) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    checkoutButton.addEventListener('click', () => {
        alert('Checkout functionality not implemented yet.');
    });

    updateCart();
});
