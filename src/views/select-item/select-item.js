//URL내부 현재 주소로 바꾸면 됌.
const url = new URL(
	"http://localhost:3000/select-item/index.html?id=6549140ad11299b256f2d87d"
);
const urlParams = url.searchParams;
const id = urlParams.get("id");
let bookDetail = [];
let bookDetailData = [{}];
let addCart = JSON.parse(localStorage.getItem("bookdata"));
const setCartItem = async () => {
	try {
		const response = await fetch(`/api/v1/products/${id}`);
		const set = await response.json();
		bookDetail.push(set.data[0]);
	} catch (err) {
		console.log("파일을 불러오지 못했어요.");
	}
};
const addClick = () => {
	bookDetailData[0].id = bookDetail[0]._id;
	bookDetailData[0].amount = 1;
	if (addCart?.length > 0) {
		const addBookDetail = addCart.concat(bookDetailData);
		localStorage.setItem("bookdata", JSON.stringify(addBookDetail));
	} else {
		localStorage.setItem("bookdata", JSON.stringify(bookDetailData));
	}
};
const buyClick = () => {
	const reset = [];
	localStorage.setItem("bookdata", JSON.stringify(reset));
};
document.querySelector(".addBtn").addEventListener("click", addClick);
document.querySelector(".buyBtn").addEventListener("click", buyClick);
window.addEventListener("load", async () => {
	await setCartItem();

	// document.querySelector('.imgInsert').setAttribute('src',bookdata[0].)
	// document.querySelector('.categoryInsert').innerHTML=`${}`
	document.querySelector(".booknameInsert").innerHTML = `${bookDetail[0].name}`;
	document.querySelector(".bookAuthor").innerHTML = `${bookDetail[0].author}`;
	document.querySelector(".bookPrice").innerHTML = `${bookDetail[0].price}원`;
	document.querySelector(
		".productInfo"
	).innerHTML = `${bookDetail[0].productInfo}`;
});
// const cartBtn = document.getElementById("add-cart");

// cartBtn.addEventListener("click", function () {
// 	alert("장바구니에 추가되었습니다.");
// });
