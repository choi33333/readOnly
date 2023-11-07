window.addEventListener("load", async () => {
    const categories = await fetch("/api/v1/categories") 
                            .then(result => result.json())
                            .catch(err => null);
    
    if (categories !== null) {
        // console.log(categories);

        const categoryWrapperElem = document.getElementById("category-wrapper");
        categoryWrapperElem.innerHTML = '';

        for (let i=0; i<categories.data.length; i++){
            const categoryElem = document.createElement("a");
            categoryElem.innerHTML = categories.data[i].name;
            categoryElem.setAttribute("href", "../category/index.html?category="+categories.data[i]._id);   
            categoryWrapperElem.append(categoryElem);
        }
    } 
})