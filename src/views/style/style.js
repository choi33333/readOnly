window.addEventListener("load", async () => {
  // 카테고리 드로워
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
  categoryDrawer();
});

//카테고리 드로워 애니메이션
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
