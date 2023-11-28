window.addEventListener("load", async () => {
  const categories = await fetch("/api/v1/categories")
    .then((result) => result.json())
    .catch((err) => null);

  if (categories !== null) {
    const categoryWrapperElem = document.querySelector(".category_list");

    for (let i = 0; i < categories.data.length; i++) {
      const categoryDrawerList = `<div>
        <a href=../category/index.html?category=${categories.data[i]._id}>
          ${categories.data[i].name}
        </a>
      <div>`;
      categoryWrapperElem.innerHTML += categoryDrawerList;
    }
  }

  const products = await fetch("/api/v1/products")
    .then((result) => result.json())
    .catch((err) => null);

  const weekBestsellerInfoElem = document.getElementById("weekbestseller-info");

  const copyAllProducts = [...products.data];

  copyAllProducts.sort((a, b) => b.soldAmount - a.soldAmount);

  if (copyAllProducts !== null) {
    for (let i = 0; i < 6; i++) {
      const image = copyAllProducts[i].imageUrl;
      const title = copyAllProducts[i].name;
      const author = copyAllProducts[i].author;

      const template = `
                <div class="select_container">
                    <a href=../select-item/?id=${copyAllProducts[i]._id}>
                        <img src=${image}>
                        <h3>${title}</h3>
                        <h5>${author}</h5>
                    </a>
                <div>
            `;
      weekBestsellerInfoElem.innerHTML += template;
    }
  }
  categoryDrawer();
});

function categoryDrawer() {
  const categoryBtn = document.querySelector(".category_btn");
  const categoryDrawer = document.querySelector(".category_drawer");
  categoryDrawer.style.visibility = "hidden";

  categoryBtn.addEventListener("click", () => {
    if (categoryDrawer.style.visibility == "hidden") {
      categoryDrawer.style.visibility = "visible";
      categoryDrawer.style.opacity = 1;
    } else {
      categoryDrawer.style.visibility = "hidden";
      categoryDrawer.style.opacity = 0;
    }
  });
}
