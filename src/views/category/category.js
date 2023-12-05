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

		const filteredCategory = categories.data.filter(
			(category) => category._id === categorize
		);

		console.log(filteredCategory);
		console.log(filteredCategory[0].name);

		for (let i=0;i<categories.data.length; i++){
			bestsellerElem.innerHTML = filteredCategory[0].name + " 베스트셀러";
			bestsellerTextElem.append(bestsellerElem);

			newbookElem.innerHTML = filteredCategory[0].name + " 신간";
			newbookTextElem.append(newbookElem);

			viewallElem.innerHTML = filteredCategory[0].name + " 전체보기";
			viewallTextElem.append(viewallElem);
		}
	}

	// 도서 정보 불러오기
	const products = await fetch("/api/v1/products")
		.then((result) => result.json())
		.catch((err) => null);


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
		for (let i = 0; i < 5; i++) {
			const image = copyFilteredProducts1[i].imageUrl;
			const title = copyFilteredProducts1[i].name;
			const author = copyFilteredProducts1[i].author;
			const price = copyFilteredProducts1[i].price;

			const template = `
                    <a href=../select-item/?id=${copyFilteredProducts1[i]._id}>
					<div class="imgWrap">
						<img src=${image}>
					</div>
                    <p class="fw-bold">${title}</p>
                    <p>${author}</p>
                    <p>${price.toLocaleString()}원</p>
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
		for (let i = 0; i < 5; i++) {
			const image = copyFilteredProducts2[i].imageUrl;
			const title = copyFilteredProducts2[i].name;
			const author = copyFilteredProducts2[i].author;
			const price = copyFilteredProducts2[i].price;
			const template = `
                <a href=../select-item/?id=${copyFilteredProducts2[i]._id}>
					<div class="imgWrap">
						<img src=${image}>
					</div>
                    <p class="fw-bold">${title}</p>
                    <p>${author}</p>
                    <p>${price.toLocaleString()}원</p>
                </a>
            `;
			newbookInfoElem.innerHTML += template;
		}
	}

	//전체도서 정보 불러오기
	const viewAllInfoElem = document.getElementById("view-all-info");

	if (filteredProducts !== null) {
		for (let i = 0; i < filteredProducts.length; i++) {
			const image = filteredProducts[i].imageUrl;
			const title = filteredProducts[i].name;
			const author = filteredProducts[i].author;
			const price = filteredProducts[i].price;

			const template = `
                    <a href=../select-item/?id=${filteredProducts[i]._id}>
                    <div class="imgWrap">
						<img src=${image}>
					</div>
                    <p class="fw-bold">${title}</p>
                    <p>${author}</p>
                    <p>${price.toLocaleString()}원</p>
                </a>
            `;
            viewAllInfoElem.innerHTML += template;
        }
    }

})



