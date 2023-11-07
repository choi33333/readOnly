//임시 데이터
let bookdata = [
	{ soldAmount: 5, _id: "6549140ad11299b256f2d87d" },
	{ soldAmount: 3, _id: "65491352d11299b256f2d87a" },
];
let renderData = JSON.parse(localStorage.getItem("cartdata"));
let cartArr = JSON.parse(localStorage.getItem("bookdata"));
let bookAdd = JSON.parse(localStorage.getItem("cartdata"));

let sumPrice = 0;

const setCartItem = async () => {
	for (const data of cartArr) {
		try {
			const response = await fetch(`/api/v1/products/${data._id}`);
			const set = await response.json();
			console.log(set);
			set.data[0].soldAmount = data.soldAmount;
			bookAdd.push(set.data[0]);
			console.log(bookAdd);
		} catch (err) {
			console.log("파일을 불러오지 못했어요.");
		}
	}
	localStorage.setItem("cartdata", JSON.stringify(bookAdd)); // 모든 fetch가 완료된 후에 로컬 스토리지에 저장
};

window.addEventListener("load", async () => {
	console.log("load", bookAdd, cartArr);
	await setCartItem(); // setCartItem를 비동기 함수로 호출
	cartArr = [];
	console.log(bookAdd, cartArr);
	localStorage.setItem("bookdata", JSON.stringify(cartArr));
	if (bookAdd?.length > 0) {
		bookAdd.forEach((data, index) => {
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
			console.log("click", renderData);
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
		// cartArr.push({ _id: "65491352d11299b256f2d87a", soldAmount: 1 });
		localStorage.setItem("bookdata", JSON.stringify(bookdata));
		// totalsum();
		// location.reload();
	});
	//전체삭제 구현 소스
	document.querySelector(".removeall").addEventListener("click", function () {
		cartArr = [];
		renderData = [];
		localStorage.setItem("cartdata", JSON.stringify(renderData));
		localStorage.setItem("bookdata", JSON.stringify(cartArr));
		location.reload();
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

//상품목록에서 누른 localdata합치기
// const sumLocalData = () => {
// 	let groupedBookdata = {};
// 	cartArr.forEach((item) => {
// 		console.log(item);
// 		const itemId = item._id;
// 		if (groupedBookdata[itemId]) {
// 			groupedBookdata[itemId].soldAmount += item.soldAmount;
// 		} else {
// 			groupedBookdata[itemId] = { _id: itemId, soldAmount: item.soldAmount };
// 		}
// 	});
// 	cartArr = Object.values(groupedBookdata);
// 	console.log(cartArr);
// 	localStorage.setItem("bookdata", JSON.stringify(cartArr));
// 	// location.reload();
// };
//localstoregy 지우기 위한 용도
// removebtn.addEventListener('click', remove);

// document.querySelector(".test").addEventListener("click", sumLocalData);
