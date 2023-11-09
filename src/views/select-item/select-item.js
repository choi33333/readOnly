//URL내부 현재 주소로 바꾸면 됌.
const url = new URL(window.location.href);
const urlParams = url.searchParams;
console.log(urlParams);
const id = urlParams.get("id");
let bookDetail = [];
let bookDetailData = [{}];
// let categoryName = "6548d90cf5bf2ae69dafd923";
const setCartItem = async () => {
	try {
		const response = await fetch(`/api/v1/products/${id}`);
		const set = await response.json();
		// console.log(set);
		bookDetail.push(set.data);
		console.log(bookDetail);
	} catch (err) {
		console.log("파일을 불러오지 못했어요.");
	}
};
// const callCategory = async () => {
// 	console.log(bookDetail[0]._id);
// 	let response = await fetch(`/api/v1/categories/${bookDetail[0]._id}`);
// 	let set = await response.json();
// 	console.log(set);
// };
const addClick = async () => {
	console.log(bookDetail[0]);
	const addCart = await JSON.parse(localStorage.getItem("bookdata"));
	bookDetail[0].amount = 1;
	console.log(bookDetail);
	await addCart.push(bookDetail[0]);
	console.log(addCart);
	localStorage.setItem("bookdata", JSON.stringify(addCart));
	const outputArray = [];

	await addCart.forEach((item) => {
		const existingItem = outputArray.find(
			(outputItem) => outputItem._id === item._id
		);
		if (existingItem) {
			existingItem.amount += item.amount;
		} else {
			outputArray.push({ ...item });
		}
	});
	console.log(outputArray);
	const simplifiedOutputArray = outputArray.map((item) => ({
		_id: item._id,
		amount: item.amount,
	}));
	localStorage.setItem("bookdata", JSON.stringify(simplifiedOutputArray));
	alert("장바구니에 추가되었습니다.");
};
//바로구매버튼
const buyClick = () => {
	const reset = [];
	localStorage.setItem("bookdata", JSON.stringify(reset));
};
document.querySelector(".addBtn").addEventListener("click", addClick);
// document.querySelector(".buyBtn").addEventListener("click", callCategory);

window.addEventListener("load", async () => {
	await setCartItem();
	// callCategory(bookDetail[0].category);
	// callCategory();
	const categories = await fetch("/api/v1/categories")
		.then((result) => result.json())
		.catch((err) => null);

	if (categories !== null) {
		const categoryWrapperElem = document.getElementById("category-wrapper");
		categoryWrapperElem.innerHTML = "";

		for (let i = 0; i < categories.data.length; i++) {
			const categoryElem = document.createElement("a");
			categoryElem.innerHTML = categories.data[i].name;
			categoryElem.setAttribute(
				"href",
				"../category/index.html?category=" + categories.data[i]._id
			);
			categoryWrapperElem.append(categoryElem);
		}
	}
	document.querySelector(
		".categoryInsert"
	).innerHTML = `카테고리 > ${bookDetail[0].categoryName}`;
	document.querySelector(".booknameInsert").innerHTML = `${bookDetail[0].name}`;
	document.querySelector(".bookAuthor").innerHTML = `${bookDetail[0].author}`;
	document.querySelector(".bookPrice").innerHTML = `${bookDetail[0].price}원`;
	document.querySelector(
		".productInfo"
	).innerHTML = `${bookDetail[0].productInfo}`;
});
