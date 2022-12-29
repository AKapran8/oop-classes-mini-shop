class Product {
  constructor(title, url, descr, price) {
    this.title = title || "";
    this.imageUrl = url || "";
    this.price = price || 0;
    this.description = descr || "";
    this.id = Math.random();
  }
}

class Component {
  constructor(parentSelector) {
    this.hook = parentSelector;
  }

  renderRootElement(tag, cssClasses) {
    const rootElem = document.createElement(tag);
    rootElem.className = cssClasses ? cssClasses : "";

    document.querySelector(`${this.hook}`).append(rootElem);

    return rootElem;
  }
}

class ProductList extends Component {
  products = [
    new Product(
      "Classroom of the Elite",
      "https://c4.wallpaperflare.com/wallpaper/847/293/159/anime-classroom-of-the-elite-kei-karuizawa-kiyotaka-ayanok%C5%8Dji-wallpaper-preview.jpg",
      "Lorem ipsum dolor",
      19.99
    ),
    new Product(
      "Full metal alchemist",
      "https://static.catapult.co/cdn-cgi/image/width=1170,height=658,dpr=2,fit=cover,format=auto/production/stories/30190/cover_photos/original/fullmetal_site_1622753380_1637683000.jpg",
      "Lorem ipsum"
    ),
  ];

  constructor(hook) {
    super(hook);
    this.render();
  }

  render() {
    this.renderRootElement("ul", "product-list");
    if (this.products && this.products.length > 0) {
      this.products.forEach((product) => {
        new ProductListItem(product, ".product-list");
      });
    }
  }
}

class ProductListItem extends Component {
  constructor(product, hook) {
    super(hook);
    this.product = product ? JSON.parse(JSON.stringify(product)) : {};
    this.render();
  }

  _addButtonHandler() {
    App.addProductToCart(this.product);
  }

  render() {
    const productItem = this.renderRootElement("li", "product-item");
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
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(items) {
    this.items = [...items];

    this.totalOutput.innerHTML = `<h2>Total $${this.totalPrice}</h2>`;
  }

  get totalPrice() {
    let sum = 0;

    if (this.items && this.items.length > 0) {
      sum = this.items.reduce((prev, cur) => (prev += cur.price || 0), 0);
    }

    return +sum.toFixed(2);
  }

  constructor(hook) {
    super(hook);
  }

  addProductToCart(item) {
    const updatedItems = [...this.items];
    const isNewItem = this.items.findIndex((el) => el.id === item.id);
    if (isNewItem === -1) updatedItems.push(item);
    this.cartItems = [...updatedItems];
  }

  render() {
    const shoppingCartSection = this.renderRootElement("section", "cart");
    shoppingCartSection.innerHTML = `
			<h2>Total $${this.totalPrice}</h2>
			<button>Order Now!</button>
		`;

    this.totalOutput = shoppingCartSection.querySelector("h2");
  }
}

class Shop {
  static cart;

  constructor(hook) {
    this.hook = hook;
    this.render();
  }

  render() {
    this.cart = new ShoppingCart(this.hook);
    new ProductList(this.hook);
  }
}

class App {
  static cart;

  static init() {
    this.cart = new Shop("#app").cart;
  }

  static addProductToCart(product) {
    this.cart.addProductToCart(product);
  }
}

App.init();
