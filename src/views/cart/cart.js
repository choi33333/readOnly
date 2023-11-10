let cartArr = JSON.parse(localStorage.getItem("bookdata"));
let sumPrice = 0;
let renderData = [];
let userData = [];
const setCartItem = async () => {
  // console.log(cartArr);
  for (const data of cartArr) {
    try {
      let response = await fetch(`/api/v1/products/${data._id}`);
      let set = await response.json();
      console.log(cartArr);
      set.data.amount = data.amount;
      renderData.push(set.data);
    } catch (err) {
      console.log("파일을 불러오지 못했어요.");
    }
  }
};
window.addEventListener("load", async () => {
  const Token = localStorage.getItem("Token");
  if (!Token) {
    alert("로그인이 필요합니다!");
    window.location.href = "/login";
  }
  await setCartItem(); // setCartItem를 비동기 함수로 호출
  if (renderData?.length > 0) {
    renderData.forEach((data, index) => {
      document.querySelector(".cart_product").innerHTML += getCartItemTemplate(
        data,
        index
      );
      sumPrice += data.price * data.amount;
    });
    document.querySelector(
      ".totalprice"
    ).innerHTML = `${sumPrice.toLocaleString()}원`;
	document.querySelector(
		".totalprice_all"
	  ).innerHTML = `${sumPrice.toLocaleString()}원`;
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

  //카운트 증가 소스
  plusbtn.forEach((plusbtn) =>
    plusbtn.addEventListener("click", function () {
      console.log("click", renderData);
      const id = plusbtn.classList[1];
      renderData[id].amount += 1;
      document.getElementById(
        `count${id}`
      ).innerHTML = `${renderData[id].amount}`;
      localStorage.setItem("bookdata", JSON.stringify(renderData));
      document.getElementById(`sum${id}`).innerHTML = `${(
        renderData[id].amount * renderData[id].price
      ).toLocaleString()}원`;
      totalsum();
      totalPrice = 0;
    })
  );
  //카운트 감소 소스
  minusbtn.forEach((minusbtn) =>
    minusbtn.addEventListener("click", function () {
      const id = minusbtn.classList[1];
      console.log(id);
      renderData[id].amount -= 1;
      if (renderData[id].amount < 1) {
        renderData[id].amount = 1;
        alert("수량은 1보다 적을수 없습니다.");
      }
      document.getElementById(
        `count${id}`
      ).innerHTML = `${renderData[id].amount}`;
      localStorage.setItem("bookdata", JSON.stringify(renderData));
      document.getElementById(`sum${id}`).innerHTML = `${(
        renderData[id].amount * renderData[id].price
      ).toLocaleString()}원`;
      totalsum();
      totalPrice = 0;
    })
  );
  //card 삭제 소스
  deletebtn.forEach((deletebtn) =>
    deletebtn.addEventListener("click", function () {
      const id = deletebtn.classList[1];
      renderData.splice(id, 1);
      localStorage.setItem("bookdata", JSON.stringify(renderData));
      totalsum();
      location.reload();
      totalPrice = 0;
      alert("삭제되었습니다.");
    })
  );
  //총 결제 예정금액
  const totalsum = () => {
    renderData.forEach((data) => {
      sumPrice += data.price * data.amount;
    });
    const totalPrice = sumPrice;
    sumPrice = 0;
    document.querySelector(
      ".totalprice"
    ).innerHTML = `${totalPrice.toLocaleString()}원`;
	document.querySelector(
		".totalprice_all"
	  ).innerHTML = `${sumPrice.toLocaleString()}원`;
  };

  //userInfo DP
  await fetchUser();
  document.querySelector(".user_email").value = `${userData[0].email}`;
  document.querySelector(".user_name").value = `${userData[0].username}`;
  document.querySelector(
    ".user_phoneNumber"
  ).value = `${userData[0].phoneNumber}`;
  document.querySelector(".user_postCode").value = `${userData[0].postCode}`;
  document.querySelector(".user_address").value = `${userData[0].address}`;
  document.querySelector(
    ".user_addressDetail"
  ).value = `${userData[0].addressDetail}`;
});
document.querySelector(".removeall").addEventListener("click", function () {
  let reset = [];
  localStorage.setItem("bookdata", JSON.stringify(reset));
  location.reload();
});
//주문하기 누를시 실행되는 코드
document
  .querySelector(".orderbtn")
  .addEventListener("click", async function () {
    alert("주문이 완료되었습니다.");
    const productData = JSON.parse(localStorage.getItem("bookdata"));
    const transformedArray = productData.map((item) => ({
      productId: item._id,
      quantity: item.amount,
    }));
    console.log(transformedArray);
    await fetchUser();
    const data = {
      orderedBy: userData[0].username,
      postCode: userData[0].postCode,
      address: userData[0].address,
      addressDetail: userData[0].addressDetail,
      phoneNumber: userData[0].phoneNumber,
      // products: [{ productId: "6549140ad11299b256f2d87d", quantity: 1 }],
      products: transformedArray,
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
      alert("로그인이 필요해요!");
    }
  });

const getCartItemTemplate = (data, index) => {
  return `<div id=${index} class="cart_card">
    <div class="card_imgDiv">
        <img class='card_img' src=${data.imageUrl}>
    </div>
    <div class="card_namePrice">
		<div class="book_category">카테고리 > ${data.categoryName}</div>
        <div class="bookname">${data.name}</div>
		<div class="book_info_container">
			<div class="bookauthor">${data.author} </div>
			<div class="divider">글 ㅣ</div>
			<div class="book_releasedDate">
				${data.releasedDate.slice(0, -20)}년
				${data.releasedDate.slice(5, -17)}월
				${data.releasedDate.slice(8, -14)}일
			</div>
		</div>
        <div class="bookprice">${data.price.toLocaleString()}원</div>
    </div>
	<div>
	</div>
	<div class="cardCountBox">
        <div class="book_cntbtn">
            <a class="minusbtn ${index}">-</a>
            <div id=count${index} class="countvalue">${data.amount}  </div>
            <a class="plusbtn ${index}">+</a>
        </div>
    </div>
    <div class="card_cntPrice">
        <div id='sum${index}' class="book_totalPrice">${(
    data.price * data.amount
  ).toLocaleString()}원</div>
    </div>
    <div class="card_del">
        <a class='carddelete ${index}'>삭제</a>
    </div>
    </div>`;
};
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
      console.log("로그인 필요");
    }
  });
};
