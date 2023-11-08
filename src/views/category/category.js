window.addEventListener("load", async () => {
	// 카테고리 데이터 불러오기
	const categories = await fetch("/api/v1/categories")
		.then((result) => result.json())
		.catch((err) => null);

	if (categories !== null) {
		// console.log(categories);

		// 카테고리 sidebar
		const categoryWrapperElem = document.getElementById("category-wrapper");
		categoryWrapperElem.innerHTML = "";

		for (let i = 0; i < categories.data.length; i++) {
			const categoryElem = document.createElement("a");
			categoryElem.innerHTML = categories.data[i].name;
			categoryElem.setAttribute("href", "?category=" + categories.data[i]._id);
			categoryWrapperElem.append(categoryElem);
		}

		// 카테고리 body
		const bestsellerTextElem = document.getElementById("bestseller-header");
		bestsellerTextElem.innerHTML = "";

		const newbookTextElem = document.getElementById("newbook-header");
		newbookTextElem.innerHTML = "";

		const viewallTextElem = document.getElementById("view-all-header");
		viewallTextElem.innerHTML = "";

		const bestsellerElem = document.createElement("h2");
		const newbookElem = document.createElement("h2");
		const viewallElem = document.createElement("h2");

		// localhost:3000/category/index.html?category=6548d90cf5bf2ae69dafd923
		const categorize = location.href.split("category=")[1];

		if (categorize === "6548d90cf5bf2ae69dafd923") {
			bestsellerElem.innerHTML = categories.data[0].name + " 베스트셀러";
			bestsellerTextElem.append(bestsellerElem);

			newbookElem.innerHTML = categories.data[0].name + " 신간";
			newbookTextElem.append(newbookElem);

			viewallElem.innerHTML = categories.data[0].name + " 전체보기";
			viewallTextElem.append(viewallElem);
		}

		if (categorize === "6548db0af4083cc0993650a3") {
			bestsellerElem.innerHTML = categories.data[1].name + " 베스트셀러";
			bestsellerTextElem.append(bestsellerElem);

			newbookElem.innerHTML = categories.data[1].name + " 신간";
			newbookTextElem.append(newbookElem);

			viewallElem.innerHTML = categories.data[1].name + " 전체보기";
			viewallTextElem.append(viewallElem);
		}
	}

	// 도서 정보 불러오기
	const products = await fetch("/api/v1/products")
		.then((result) => result.json())
		.catch((err) => null);

	console.log(products.data);

	// if (products.error || !Array.isArray(products.data.category)) {
	//     return;
	// }

	const categorize = location.href.split("category=")[1];
	//현재 주소의 카테고리 값

	const filteredProducts = products.data.filter(
		(product) => product.category === categorize
	);
	//현재 주소의 카테고리와 같은 카테고리의 상품 필터

	//베스트셀러 정보 불러오기
	const bestsellerInfoElem = document.getElementById("bestseller-info");

	const copyFilteredProducts1 = [...filteredProducts];

	copyFilteredProducts1.sort((a, b) => b.soldAmount - a.soldAmount);

	if (copyFilteredProducts1 !== null) {
		for (let i = 0; i < 2; i++) {
			const title = copyFilteredProducts1[i].name;
			const author = copyFilteredProducts1[i].author;
			const price = copyFilteredProducts1[i].price;
			const productInfo = copyFilteredProducts1[i].productInfo;

			const template = `
                    <a href=../select-item/?id=${copyFilteredProducts1[i]._id}>
                    <img src="../img/bestseller-novel1.jpeg">
                    <h5>${title}</h5>
                    <h6>${author}</h6>
                    <h6>${price}</h6>
                    <p>${productInfo}</p>
                </a>
            `;
			bestsellerInfoElem.innerHTML += template;
		}
	}

	//신간 정보 불러오기
	const newbookInfoElem = document.getElementById("newbook-info");

	const copyFilteredProducts2 = [...filteredProducts];
	console.log(copyFilteredProducts2);
	copyFilteredProducts2.sort((a, b) => b.releasedDate - a.releasedDate);

	if (copyFilteredProducts2 !== null) {
		for (let i = 0; i < copyFilteredProducts2.length; i++) {
			const title = copyFilteredProducts2[i].name;
			const author = copyFilteredProducts2[i].author;
			const price = copyFilteredProducts2[i].price;
			const productInfo = copyFilteredProducts2[i].productInfo;
			const template = `
                <a href=../select-item/?id=${copyFilteredProducts2[i]._id}>
                    <img src="../img/bestseller-novel1.jpeg">
                    <h5>${title}</h5>
                    <h6>${author}</h6>
                    <h6>${price}</h6>
                    <p>${productInfo}</p>
                </a>
            `;
			newbookInfoElem.innerHTML += template;
		}
	}

	//전체도서 정보 불러오기
	const viewAllInfoElem = document.getElementById("view-all-info");

	if (filteredProducts !== null) {
		for (let i = 0; i < filteredProducts.length; i++) {
			const title = filteredProducts[i].name;
			const author = filteredProducts[i].author;
			const price = filteredProducts[i].price;
			const productInfo = filteredProducts[i].productInfo;

			const template = `
                    <a href=../select-item/?id=${filteredProducts[i]._id}>
                    <img src="../img/bestseller-novel1.jpeg">
                    <h5>${title}</h5>
                    <h6>${author}</h6>
                    <h6>${price}</h6>
                    <p>${productInfo}</p>
                </a>
            `;
			viewAllInfoElem.innerHTML += template;
		}
	}
});
