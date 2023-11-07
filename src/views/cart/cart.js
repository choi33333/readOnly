//임시 데이터
let bookdata = [
	{ count: 1, id: "6549140ad11299b256f2d87d" },
	{ count: 1, id: "65491352d11299b256f2d87a" },
];
let cartArr = JSON.parse(localStorage.getItem("bookdata"));
let renderData = JSON.parse(localStorage.getItem("cartdata"));
let sumPrice = 0;
window.addEventListener("load", async () => {
	let bookAdd = [];
	cartArr = JSON.parse(localStorage.getItem("bookdata"));
	await cartArr.forEach((data) => {
		const book = fetch(URL_PATH.BACK_URL + `/api/products/${data.id}`)
			.then((response) => response.json())
			.then((set) => {
				bookAdd.push(set.data[0]);
				localStorage.setItem("cartdata", JSON.stringify(bookAdd));
			})
			.catch((err) => null);
	});
});
const getCartItemTemplate = (data, index) => {
	return `<div id=${index} class="cart_card">
    <div class="card_imgDiv">
        <img class='card_img' src=./thisweekbestseller1.jpeg>
    </div>
    <div class="card_namePrice">
        <div class="bookname">${data.name}</div>
        <div class="bookprice">${data.price}원</div>
    </div>
    <div class="card_cntPrice">
        <div id='sum${index}' class="book_totalPrice">${
		data.price * data.soldAmount
	}원</div>
        <div class="book_cntbtn">
            <a class="minusbtn ${index}">-</a>
            <div id=count${index} class="countvalue">${data.soldAmount}  </div>
            <a class="plusbtn ${index}">+</a>
        </div>
    </div>
    <div class="card_del">
        <a class='carddelete ${index}'>X</a>
    </div>
    </div>`;
};
// 만약 localStorage에서 받아온 값이 있으면 장바구니 표출, 아닐경우 카트가 비었다고 표시하기 위한 소스
if (renderData?.length > 0) {
	renderData.forEach((data, index) => {
		document.querySelector(".cart_product").innerHTML += getCartItemTemplate(
			data,
			index
		);
		sumPrice += data.price * data.soldAmount;
	});
	document.querySelector(".totalprice").innerHTML = `${sumPrice}원`;
	sumPrice = 0;
} else {
	document.querySelector(".cart_product").innerHTML = `<div class='emptyCart'>
    <div class=emptySVG>
        <h1>!</h1>
    </div>
    <h3>장바구니가 비었습니다!</h3>
    </div>`;
}

const bookcard = document.querySelector(".cart_card");
//querySelector로 선택
const plusbtn = document.querySelectorAll(".plusbtn");
const minusbtn = document.querySelectorAll(".minusbtn");
const deletebtn = document.querySelectorAll(".carddelete");
const localbtn = document.querySelector(".setlocal");
const removebtn = document.querySelector(".remove");
//카운트 증가 소스
plusbtn.forEach((plusbtn) =>
	plusbtn.addEventListener("click", function () {
		const id = plusbtn.classList[1];
		renderData[id].soldAmount += 1;
		document.getElementById(
			`count${id}`
		).innerHTML = `${renderData[id].soldAmount}`;
		localStorage.setItem("cartdata", JSON.stringify(renderData));
		document.getElementById(`sum${id}`).innerHTML = `${
			renderData[id].soldAmount * renderData[id].price
		}원`;
		totalsum();
		totalPrice = 0;
	})
);
//카운트 감소 소스
minusbtn.forEach((minusbtn) =>
	minusbtn.addEventListener("click", function () {
		const id = minusbtn.classList[1];
		console.log(id);
		renderData[id].soldAmount -= 1;
		if (renderData[id].soldAmount < 1) {
			renderData[id].soldAmount = 1;
			alert("수량은 1보다 적을수 없습니다.");
		}
		// console.log(cartArr[id].count);
		document.getElementById(
			`count${id}`
		).innerHTML = `${renderData[id].soldAmount}`;
		localStorage.setItem("cartdata", JSON.stringify(renderData));
		document.getElementById(`sum${id}`).innerHTML = `${
			renderData[id].soldAmount * renderData[id].price
		}원`;
		totalsum();
		totalPrice = 0;
	})
);
//card 삭제 소스
deletebtn.forEach((deletebtn) =>
	deletebtn.addEventListener("click", function () {
		const id = deletebtn.classList[1];
		renderData.splice(id, 1);
		localStorage.setItem("cartdata", JSON.stringify(renderData));
		totalsum();
		location.reload();
		totalPrice = 0;
		alert("삭제되었습니다.");
	})
);
//일단 임시 localStorage 사용을 위한 함수
const setLocal = () => {
	localStorage.setItem("bookdata", JSON.stringify(bookdata));
	console.log("성공");
	location.reload();
};
//localStorage 내부 청소 소스
const remove = () => {
	localStorage.clear();
};
//총 결제 예정금액
const totalsum = () => {
	renderData.forEach((data) => {
		sumPrice += data.price * data.soldAmount;
	});
	// console.log(sumPrice);
	const totalPrice = sumPrice;
	sumPrice = 0;
	document.querySelector(".totalprice").innerHTML = `${totalPrice}원`;
};
//
localbtn.addEventListener("click", setLocal);
//장바구니 담기 소스
document.querySelector(".addbook").addEventListener("click", function () {
	// renderData.push({
	// 	name: "책이름1",
	// 	author: "도라에몽",
	// 	price: 3000,
	// 	soldAmount: 1,
	// 	id: 2,
	// });
	localStorage.setItem("bookdata", JSON.stringify(bookdata));
	totalsum();
	location.reload();
});
//전체삭제 구현 소스
document.querySelector(".removeall").addEventListener("click", function () {
	renderData = [];
	cartArr = [];
	localStorage.setItem("cartdata", JSON.stringify(renderData));
	localStorage.setItem("bookdata", JSON.stringify(cartArr));
	location.reload();
});
//localstoregy 지우기 위한 용도
// removebtn.addEventListener('click', remove);

//비교하기! 백에서 장바구니 담기를 누르면 그 정보값을 백에서 받아온다.
//그리고 로컬에 값을 넣는다.
//그리고 리프레쉬시 백에서 정보를 받아와서 객체 안에 값을 수정..
// const changeprice = () => {
// 	for (let i = 0; i < cartArr.length; i++) {
// 		const book1 = cartArr[i];
// 		const book2 = bookdata2.find((b) => b.id === book1.id); // id를 기준으로 bookdata2에서 해당 책을 찾음

// 		if (book2 && book1.price !== book2.price) {
// 			// book2가 존재하고 가격이 다를 경우 최신화
// 			cartArr[i] = { ...book1, price: book2.price };
// 		}
// 	}
// 	localStorage.setItem("bookdata", JSON.stringify(cartArr));
// 	console.log(cartArr);
// 	location.reload();
// };

// const carttest = async () => {
// 	let bookAdd = [];
// 	await cartArr.forEach((data) => {
// 		const book = fetch(URL_PATH.BACK_URL + `/api/products/${data.id}`)
// 			.then((response) => response.json())
// 			.then((set) => {
// 				bookAdd.push(set.data[0]);
// 				localStorage.setItem("cartdata", JSON.stringify(bookAdd));
// 				cartArr = JSON.parse(localStorage.getItem("cartdata"));
// 			})
// 			.catch((err) => null);
// 		// console.log(bookAdd);
// 	});
// 	console.log(bookAdd);
// };
// document.querySelector(".test").addEventListener("click", carttest);
