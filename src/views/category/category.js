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
        const bestsellerTextElem = document.getElementById("bestseller-title");
        bestsellerTextElem.innerHTML = "";

        const newbookTextElem = document.getElementById("newbook-title");
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
    
    if (products !== null) {
        console.log(products);

        const nameElem = document.getElementById("name");
        nameElem.innerHTML = "";

        const bestsellerNameElem = document.createElement("h5");
        bestsellerNameElem.innerHTML = 
        bestsellerNameElem.append()

    }
})



