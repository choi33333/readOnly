window.addEventListener("load", async () => {
    // 카테고리 데이터 불러오기
    const categories = await fetch("/api/v1/categories") 
                            .then(result => result.json())
                            .catch(err => null);
    
    if (categories !== null) {
        // console.log(categories);

        // 카테고리 sidebar
        const categoryWrapperElem = document.getElementById("category-wrapper");
        categoryWrapperElem.innerHTML = '';


        for (let i=0; i<categories.data.length; i++){
            const categoryElem = document.createElement("a");
            categoryElem.innerHTML = categories.data[i].name;
            categoryElem.setAttribute("href", "?category="+categories.data[i]._id);   
            categoryWrapperElem.append(categoryElem);
        }

        // 카테고리 body
        const bestsellerTextElem = document.getElementById("bestseller-header");
        bestsellerTextElem.innerHTML = "";

        const newbookTextElem = document.getElementById("newbook-header");
        newbookTextElem.innerHTML = "";

        const viewallTextElem = document.getElementById("view-all");
        viewallTextElem.innerHTML = "";

        const bestsellerElem = document.createElement("h2");
        const newbookElem = document.createElement("h2");
        const viewallElem = document.createElement("h2");

        // localhost:3000/category/index.html?category=6548d90cf5bf2ae69dafd923
        const categorize = location.href.split("category=")[1];
       
        if (categorize === "6548d90cf5bf2ae69dafd923"){
            bestsellerElem.innerHTML = categories.data[0].name + " 베스트셀러";
            bestsellerTextElem.append(bestsellerElem);

            newbookElem.innerHTML = categories.data[0].name + " 신간";
            newbookTextElem.append(newbookElem);

            viewallElem.innerHTML = categories.data[0].name + " 전체보기";
            viewallTextElem.append(viewallElem);
            
        }

        if (categorize === "6548db0af4083cc0993650a3"){
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
                            .then(result => result.json())
                            .catch(err => null);

    console.log(products.data);

    // if (products.error || !Array.isArray(products.data.category)) {
    //     return;
    // }

    const categorize = location.href.split("category=")[1]; 
    console.log(categorize); //현재 주소의 카테고리 값

    const filteredProducts = products.data.filter(product => product.category === categorize);
    console.log(filteredProducts); //현재 주소의 카테고리와 같은 카테고리의 상품 필터
    console.log(filteredProducts[0].author);
    
    const bestsellerWrapperElem = document.getElementById("bestseller-wrapper");
    // bestsellerWrapperElem.innerHTML = "";
                            
    if (filteredProducts !== null) {
        for (let i=0; i<filteredProducts.length; i++){

            const title = filteredProducts[i].name;
            const author = filteredProducts[i].author;
            const price = filteredProducts[i].price;
            const productInfo = filteredProducts[i].productInfo;

            const template = `
            <div id="bestseller">
                <a href="../select-item/index.html">
                    <div class="bestseller-info">
                        <img src="../img/bestseller-novel1.jpeg">
                        <h5>${title}</h5>
                        <h6>${author}</h6>
                        <h6>${price}</h6>
                        <p>${productInfo}</p>
                    </div>
                </a>
            </div>
            `;
            bestsellerWrapperElem.innerHTML += template;
        }

        

    }
})



