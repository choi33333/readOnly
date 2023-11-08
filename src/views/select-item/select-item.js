//URL내부 현재 주소로 바꾸면 됌.
const url = new URL(
	"http://localhost:3000/select-item/index.html?id=6549140ad11299b256f2d87d"
);
const urlParams = url.searchParams;
const id = urlParams.get("id");
let bookDetail = [];
let bookDetailData = [{}];
let categoryName = "6548d90cf5bf2ae69dafd923";
const setCartItem = async () => {
	try {
		const response = await fetch(`/api/v1/products/${id}`);
		const set = await response.json();
		// console.log(set);
		bookDetail.push(set.data);
		// console.log(bookDetail);
	} catch (err) {
		console.log("파일을 불러오지 못했어요.");
	}
};
const callCategory = async (categoryName) => {
	let response = await fetch(`/api/v1/categories/${categoryName}`);
	let set = await response.json();
	console.log(set);
};
const addClick = () => {
	const addCart = JSON.parse(localStorage.getItem("bookdata"));
	bookDetailData[0]._id = bookDetail[0]._id;
	bookDetailData[0].amount = 1;
	if (addCart?.length > 0) {
		bookDetailData.push(addCart[0]);
		sumLocalData();
	} else {
		localStorage.setItem("bookdata", JSON.stringify(bookDetailData));
	}
	alert("장바구니에 들어갔습니다!");
};
const buyClick = () => {
	console.log(bookDetail);
	const reset = [];
	localStorage.setItem("bookdata", JSON.stringify(reset));
};
//상품목록에서 누른 localdata합치기
const sumLocalData = () => {
	let groupedBookdata = {};
	bookDetailData.forEach((item) => {
		console.log(item);
		const itemId = item._id;
		if (groupedBookdata[itemId]) {
			groupedBookdata[itemId].amount += item.amount;
		} else {
			groupedBookdata[itemId] = { _id: itemId, amount: item.amount };
		}
	});
	bookDetailData = Object.values(groupedBookdata);
	// console.log(cartArr);
	localStorage.setItem("bookdata", JSON.stringify(bookDetailData));
	// let resetArr = [];
	// localStorage.setItem("cartdata", JSON.stringify(resetArr));
	// location.reload();
};
document.querySelector(".addBtn").addEventListener("click", addClick);
document.querySelector(".buyBtn").addEventListener("click", callCategory);

window.addEventListener("load", async () => {
	await setCartItem();
	let response = await fetch(`/api/v1/categories/${bookDetail[0].category}`);
	let set = await response.json();
	document.querySelector(
		".categoryInsert"
	).innerHTML = `카테고리 > ${set.category.name}`;
	document.querySelector(".booknameInsert").innerHTML = `${bookDetail[0].name}`;
	document.querySelector(".bookAuthor").innerHTML = `${bookDetail[0].author}`;
	document.querySelector(".bookPrice").innerHTML = `${bookDetail[0].price}원`;
	document.querySelector(
		".productInfo"
	).innerHTML = `${bookDetail[0].productInfo}`;
});

// cartBtn.addEventListener("click", function () {
// 	alert("장바구니에 추가되었습니다.");
// });
