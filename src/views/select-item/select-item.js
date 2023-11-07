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
    }
});

const cartBtn = document.getElementById("add-cart");

cartBtn.addEventListener("click", function() {
    alert("장바구니에 추가되었습니다.");

})