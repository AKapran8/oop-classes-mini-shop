class Product {
  title;
  imageUrl;
  price;
  description;
  constructor(title, url, price, descr) {
    this.title = title;
    this.imageUrl = url;
    this.price = price;
    this.description = descr;
  }
}

const productsList = {
  products: [
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
  ],

  renderUI() {
    const app = document.querySelector("#app");

    const list = document.createElement("ul");
    list.className = "product-list";
    this.products.forEach((el) => {
      const li = document.createElement("li");
      li.className = "product-item";
      li.innerHTML = `
				<div>
 			  	<img src="${el.imageUrl}" alt="${el.title}" />
    			<div class="product-item__content">
						<h2>${el.title}</h2>
						<h3>\$${el.price}</h3>
						<p>${el.description}</p>
						<button>Add to Card</button>
					</div>
				</div>`;
      list.append(li);
    });

    app.append(list);
  },
};

productsList.renderUI();
