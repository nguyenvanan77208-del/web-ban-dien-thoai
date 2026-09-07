let cart = [];

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    alert("Đã thêm " + name + " vào giỏ hàng!");
}

function updateCart() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").textContent = count;

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Giỏ hàng đang trống.</p>";
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-row">
                <div>
                    <strong>${item.name}</strong><br>
                    ${formatMoney(item.price)} × ${item.quantity}
                </div>
                <button class="remove" onclick="removeItem(${index})">Xóa</button>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cartTotal").textContent = formatMoney(total);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function openCart() {
    document.getElementById("cartModal").style.display = "block";
    updateCart();
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");
    cart = [];
    updateCart();
    closeCart();
}

function formatMoney(number) {
    return number.toLocaleString("vi-VN") + "đ";
}

function filterProducts(category, button) {
    const products = document.querySelectorAll(".product-card");

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

window.onclick = function(event) {
    const modal = document.getElementById("cartModal");

    if (event.target === modal) {
        closeCart();
    }
};
