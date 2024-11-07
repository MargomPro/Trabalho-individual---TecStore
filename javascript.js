const navbar = document.querySelector(".navbar");
const menuButton = document.querySelector(".menu-button");

menuButton.addEventListener("click", () => {
  navbar.classList.toggle("show-menu");
});

(function carregar() {
  let listProductHTML = document.querySelector(".listProduct");
  let listCartHTML = document.querySelector(".listCart");
  let cartIcon = document.querySelector(".carrinho-icone");
  let iconCartElement = document.querySelector(".icon-cart");
  let body = document.querySelector("body");
  let closeCart = document.querySelector(".close");
  let checkOutButton = document.querySelector(".checkOut");

  let produtos = [];
  let cart = [];

  cartIcon.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });

  closeCart.addEventListener("click", () => {
    body.classList.remove("showCart");
  });

  const addDataToHTML = () => {
    if (produtos.length > 0) {
      produtos.forEach((product) => {
        let newProduct = document.createElement("div");
        newProduct.dataset.id = product.id;
        newProduct.classList.add("item");
        newProduct.innerHTML = `
          <img src="${product.imagem}">
          <h2>${product.name}</h2>
          <div class="price">${product.price} €</div>
          <button class="addCart">Adicionar ao carrinho</button>`;
        listProductHTML?.appendChild(newProduct);
      });
    }
  };

  listProductHTML?.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("addCart")) {
      let id_product = positionClick.parentElement.dataset.id;
      addToCart(id_product);
      updateCartQuantity();
    }
  });

  const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex(
      (value) => value.product_id == product_id
    );
    if (cart.length <= 0) {
      cart = [{ product_id: product_id, quantity: 1 }];
    } else if (positionThisProductInCart < 0) {
      cart.push({ product_id: product_id, quantity: 1 });
    } else {
      cart[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
  };

  const addCartToMemory = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addCartToHTML = () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    if (cart.length > 0) {
      cart.forEach((item) => {
        totalQuantity += item.quantity;
        let newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.dataset.id = item.product_id;

        let positionProduct = produtos.findIndex(
          (value) => value.id == item.product_id
        );
        let info = produtos[positionProduct];
        listCartHTML.appendChild(newItem);
        newItem.innerHTML = `
          <div class="imagem">
            <img src="${info.imagem}">
          </div>
          <div class="name">${info.name}</div>
          <div class="totalPrice">${info.price * item.quantity}€</div>
          <div class="quantity">
            <span class="minus">-</span>
            <span>${item.quantity}</span>
            <span class="plus">+</span>
          </div>`;
      });
    }

    let cartQuantity = document.querySelector(".cart-quantity");
    cartQuantity.innerText = totalQuantity;
  };

  const updateCartQuantity = () => {
    let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    let cartQuantity = document.querySelector(".cart-quantity");
    cartQuantity.innerText = totalQuantity;
  };

  listCartHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (
      positionClick.classList.contains("minus") ||
      positionClick.classList.contains("plus")
    ) {
      let product_id = positionClick.parentElement.parentElement.dataset.id;
      let type = positionClick.classList.contains("plus") ? "plus" : "minus";
      changeQuantityCart(product_id, type);
    }
  });

  const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex(
      (value) => value.product_id == product_id
    );
    if (positionItemInCart >= 0) {
      let info = cart[positionItemInCart];
      switch (type) {
        case "plus":
          cart[positionItemInCart].quantity += 1;
          break;
        case "minus":
          let changeQuantity = cart[positionItemInCart].quantity - 1;
          if (changeQuantity > 0) {
            cart[positionItemInCart].quantity = changeQuantity;
          } else {
            cart.splice(positionItemInCart, 1);
          }
          break;
      }
    }
    addCartToHTML();
    addCartToMemory();
  };

  checkOutButton.addEventListener("click", () => {
    if (cart.length > 0) {
      cart.forEach((item) => {
        const productLink = getProductLink(item.product_id);
        for (let i = 0; i < item.quantity; i++) {
          window.open(productLink, "_blank");
        }
      });

      cart = [];
      addCartToHTML();
      addCartToMemory();
    } else {
      alert("O carrinho está vazio. Adicione produtos antes de comprar.");
    }
  });

  const getProductLink = (productId) => {
    const product = produtos.find((item) => item.id == productId);
    return product ? product.link : "#";
  };

  const inicializar = () => {
    fetch("produtos.json")
      .then((response) => response.json())
      .then((data) => {
        produtos = data;
        addDataToHTML();

        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
          addCartToHTML();
        }
      });
  };

  inicializar();
})();
