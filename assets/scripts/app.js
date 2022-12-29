class Product {
  constructor(title, url, price, descr) {
    this.title = title;
    this.imageUrl = url;
    this.price = price;
    this.description = descr;
  }
}

class ProductList {
  products = [
    new Product(
      "Class of the Elite",
      "https://c4.wallpaperflare.com/wallpaper/847/293/159/anime-classroom-of-the-elite-kei-karuizawa-kiyotaka-ayanok%C5%8Dji-wallpaper-preview.jpg",
      19.99,
      "Lorem ipsum dolor"
    ),
    new Product(
      "Full metal alchemist",
      "https://static.catapult.co/cdn-cgi/image/width=1170,height=658,dpr=2,fit=cover,format=auto/production/stories/30190/cover_photos/original/fullmetal_site_1622753380_1637683000.jpg",
      39.99,
      "Lorem ipsum"
    ),
  ];

  render() {
    const productsList = document.createElement("ul");
    productsList.className = "product-list";
    this.products.forEach((p) => {
      const productItem = new ProductListItem(p).render();
      productsList.append(productItem);
    });

    return productsList;
  }
}

class ProductListItem {
  constructor(product) {
    this.product = JSON.parse(JSON.stringify(product));
  }

  _addButtonHandler() {
    const q = new ShoppingCart();
    q.addProductToCart(this.product);
  }

  render() {
    const productItem = document.createElement("li");
    productItem.className = "product-item";
    productItem.innerHTML = `
			<div>
				<img src="${this.product.imageUrl}" alt="${this.product.title}" />
				<div class="product-item__content">
					<h2>${this.product.title}</h2>
					<h3>$${this.product.price}</h3>
					<p>${this.product.description}</p>
					<button>Add to Cart</button>
				</div>
			</div>`;
    const addBtn = productItem.querySelector("button");
    addBtn.addEventListener("click", this._addButtonHandler.bind(this));

    return productItem;
  }
}

class ShoppingCart {
  items = [];
  totalValue = 0;

  addProductToCart(item) {
    this.items.push(item);
    this.render();
  }

  render() {
    const shoppingCartSection = document.createElement("section");
    shoppingCartSection.className = "cart";
    shoppingCartSection.innerHTML = `
			<h2>Total $${this.totalValue}</h2>
			<button>Order Now!</button>
		`;

    return shoppingCartSection;
  }
}

class Shop {
  render() {
    const app = document.querySelector("#app");

    const productList = new ProductList().render();
    const shoppingCart = new ShoppingCart().render();

    app.append(shoppingCart);
    app.append(productList);
  }
}

const shop = new Shop();
shop.render();
