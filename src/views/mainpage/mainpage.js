window.addEventListener("load", async () => {
    const categories = await fetch("/api/categories") 
                            .then(result => result.json())
                            .catch(err => null);
    
    if (categories !== null) {
        const categoryWrapperElem = document.getElementById("category-wrapper");
        categoryWrapperElem.innerHTML = '';

        for (let i=0; i<categories.length; i++){
            const categoryElem = document.createElement("a");

            categoryElem.innerHTML = categories[i].name;
            categoryElem.setAttribute("href", "../category/index.html?category"+categories[i]._id);   // 다른파일에서 불러오는법
            categoryWrapperElem.append(categoryElem);
        }
    } 
})