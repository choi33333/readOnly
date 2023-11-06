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
            categoryElem.setAttribute("href", "?category="+categories[i]._id);   
            categoryWrapperElem.append(categoryElem);
        }
    } 
})