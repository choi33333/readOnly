window.addEventListener("load", async () => {
    const categories = await fetch("/api/v1/categories") 
                            .then(result => result.json())
                            .catch(err => null);
    
    if (categories !== null) {

        const categoryWrapperElem = document.getElementById("category-wrapper");
        categoryWrapperElem.innerHTML = '';

        for (let i=0; i<categories.data.length; i++){
            const categoryElem = document.createElement("a");
            categoryElem.innerHTML = categories.data[i].name;
            categoryElem.setAttribute("href", "../category/index.html?category="+categories.data[i]._id);   
            categoryWrapperElem.append(categoryElem);
        }
    } 

    const products = await fetch("/api/v1/products")
		.then((result) => result.json())
		.catch((err) => null);

    
    const weekBestsellerInfoElem = document.getElementById("weekbestseller-info");

    const copyAllProducts = [...products.data];

	copyAllProducts.sort((a, b) => b.soldAmount - a.soldAmount);

    if (copyAllProducts !== null) {
		for (let i = 0; i < 5; i++) {
			const title = copyAllProducts[i].name;
			const author = copyAllProducts[i].author;
			const price = copyAllProducts[i].price;

			const template = `
                    <a href=../select-item/?id=${copyAllProducts[i]._id}>
                    <img src="../img/bestseller-novel1.jpeg">
                    <h4>${title}</h4>
                    <h5>${author}</h5>
                    <h5>${price}</h5>
                </a>
            `;
			weekBestsellerInfoElem.innerHTML += template;
		}
	}
})

