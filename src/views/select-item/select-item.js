//URL내부 현재 주소로 바꾸면 됌.
const url = new URL(window.location.href);
const urlParams = url.searchParams;
console.log(urlParams);
const id = urlParams.get("id");
let bookDetail = [];
let bookDetailData = [{}];
let userData = [];
const setCartItem = async () => {
	try {
		const response = await fetch(`/api/v1/products/${id}`);
		const set = await response.json();
		bookDetail.push(set.data);
		console.log(bookDetail);
	} catch (err) {
		console.log("파일을 불러오지 못했어요.");
	}
};
const addClick = async () => {
	const Token = localStorage.getItem("Token");
	if (!Token) {
		alert("로그인이 필요합니다!");
		window.location.href = "/login";
	} else {
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
		// alert("장바구니에 추가되었습니다.");
		if (!confirm("장바구니에 추가되었습니다. 쇼핑을 계속하시겠습니까?")) {
			window.location.href = "/cart";
		} else {
		}
	}
};
document.querySelector(".addBtn").addEventListener("click", addClick);
//바로구매코드!
document.querySelector(".buyBtn").addEventListener("click", async function () {
	const Token = localStorage.getItem("Token");
	if (!Token) {
		alert("로그인이 필요합니다!");
		window.location.href = "/login";
	} else {
		console.log(bookDetail[0]);
		const productArr = [{ productId: bookDetail[0]._id, quantity: 1 }];
		await fetchUser();
		const data = {
			orderedBy: userData[0].username,
			postCode: userData[0].postCode,
			address: userData[0].address,
			addressDetail: userData[0].addressDetail,
			phoneNumber: userData[0].phoneNumber,
			products: productArr,
		};
		const response = await fetch("/api/v1/orders/", {
			method: "POST",
			body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환
			headers: {
				"Content-Type": "application/json", // JSON 데이터 전송 헤더
				authorization: "Bearer " + localStorage.getItem("Token"),
			},
		});

		if (response.status === 200) {
			const result = await response.json(); // 결과를 기다리도록 수정
			console.log("성공:", result);
			console.log(result.data.orderNumber);
			const reset = [];
			localStorage.setItem("bookdata", JSON.stringify(reset));
			window.location.href = `/orderumin/?orderNumber=${result.data.orderNumber}`;
		} else {
			console.error("주문 실패:", response.status);
			// 에러 처리 코드 추가
			alert("실패.");
		}
	}
});
window.addEventListener("load", async () => {
	await setCartItem();
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
	document.querySelector(".imgInsert").src = bookDetail[0].imageUrl;
	document.querySelector(
		".categoryInsert"
	).innerHTML = `카테고리 > ${bookDetail[0].categoryName}`;
	document.querySelector(".booknameInsert").innerHTML = `책 제목 : ${bookDetail[0].name}`;
	document.querySelector(".bookAuthor").innerHTML = `저자 : ${bookDetail[0].author}`;
	document.querySelector(
		".bookPrice"
	).innerHTML = `가격 : ${bookDetail[0].price.toLocaleString()}원`;
	document.querySelector(
		".productInfo"
	).innerHTML = `${bookDetail[0].productInfo}`;
	document.querySelector(
		".releasedDate"
	).innerHTML = `발행일 : 
	${bookDetail[0].releasedDate.slice(0, -20)}년
	${bookDetail[0].releasedDate.slice(5, -17)}월
	${bookDetail[0].releasedDate.slice(8, -14)}일`;
});
const fetchUser = async () => {
	await fetch("/api/v1/users/me", {
		method: "GET",
		headers: {
			authorization: "Bearer " + localStorage.getItem("Token"),
		},
	}).then(async (response) => {
		const res = await response.json();
		console.log("response: ", res);
		if (response.status === 200) {
			console.log("성공");
			userData.push(res.data);
		} else {
			console.log("로그인이 필요");
		}
	});
};
