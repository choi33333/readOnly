let cartArr = JSON.parse(localStorage.getItem("bookdata"));
let sumPrice = 0;
let deliveryPrice = 0;
let renderData = [];
let userData = [];

// 장바구니 데이터 불러오기
const setCartItem = async () => {
  for (const data of cartArr) {
    try {
      let response = await fetch(`/api/v1/products/${data._id}`);
      let set = await response.json();
      set.data.amount = data.amount;
      renderData.push(set.data);
    } catch (err) {
      console.log("파일을 불러오지 못했어요.");
    }
  }
};

// 페이지 로드
window.addEventListener("load", async () => {
  const Token = localStorage.getItem("Token");
  if (!Token) {
    alert("로그인이 필요합니다!");
    window.location.href = "/login";
  }
  await setCartItem(); // setCartItem를 비동기 함수로 호출
  if (renderData?.length > 0) {
    renderData.forEach((data, index) => {
      document.querySelector(".products_list").innerHTML += getCartItemTemplate(
        data,
        index
      );
      sumPrice += data.price * data.amount + deliveryPrice;
    });
    document.querySelector(".subtotal_price").innerHTML = `${sumPrice.toLocaleString()}원`;
    document.querySelector(".total_price").innerHTML = `${sumPrice.toLocaleString()}원`;
    sumPrice = 0;
  } else {
    document.querySelector(".products_list").innerHTML = 
    `<div class='cart_empty'>
	    <div class=cart_empty_svg>
		    <p>!</p>
	    </div>
	    <p>장바구니가 비었습니다!</p>
	</div>`;
  }

  //querySelector로 선택
  const plusbtn = document.querySelectorAll(".plus_btn");
  const minusbtn = document.querySelectorAll(".minus_btn");
  const deletebtn = document.querySelectorAll(".delete_product");

  //카운트 증가 소스
  plusbtn.forEach((plusbtn) =>
    plusbtn.addEventListener("click", function () {
      const id = plusbtn.classList[1];
      renderData[id].amount += 1;
      document.getElementById(`count${id}`).innerHTML = `${renderData[id].amount}`;
      localStorage.setItem("bookdata", JSON.stringify(renderData));
      document.getElementById(`sum${id}`).innerHTML = `${(renderData[id].amount * renderData[id].price).toLocaleString()}원`;
      totalsum();
      totalPrice = 0;
    })
  );

  //카운트 감소 소스
  minusbtn.forEach((minusbtn) =>
    minusbtn.addEventListener("click", function () {
      const id = minusbtn.classList[1];
      renderData[id].amount -= 1;
      if (renderData[id].amount < 1) {
        renderData[id].amount = 1;
        alert("수량은 1보다 적을수 없습니다.");
      }
      document.getElementById(`count${id}`).innerHTML = `${renderData[id].amount}`;
      localStorage.setItem("bookdata", JSON.stringify(renderData));
      document.getElementById(`sum${id}`).innerHTML = `${(renderData[id].amount * renderData[id].price).toLocaleString()}원`;
      totalsum();
      totalPrice = 0;
    })
  );

  //product 삭제 소스
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
    renderData.forEach((data) => {sumPrice += data.price * data.amount;});
    let totalPrice = sumPrice + deliveryPrice;
    sumPrice = 0;
    document.querySelector(".subtotal_price").innerHTML = `${totalPrice.toLocaleString()}원`;
    document.querySelector(".total_price").innerHTML = `${totalPrice.toLocaleString()}원`;
  };

  deliveryDate();
});


// 배송예정날짜
function deliveryDate(){
    var date = new Date();
    var estimatedDate = `배송예정일 : ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+4}`
    document.querySelector(".deliverydate_label").innerHTML = estimatedDate;
}

// 배송방법 변경
const deliveryBtn = document.querySelector(".deliveryfee_btn");
deliveryBtn.addEventListener("click", function () {
    if( deliveryBtn.innerHTML === '무료배송'){
        deliveryBtn.innerHTML = '당일배송';
        deliveryPrice = 5000;
    }else{
        deliveryBtn.innerHTML = '무료배송';
        deliveryPrice = 0;
    }
});

// 장바구니 비우기 버튼
document.querySelector(".clear_btn").addEventListener("click", function () {
  let reset = [];
  localStorage.setItem("bookdata", JSON.stringify(reset));
  location.reload();
});

// 장바구니 제품 템플릿 
const getCartItemTemplate = (data, index) => {
  return `<div id=${index} class="product_container">
                <div class="img_container">
                    <img src=${data.imageUrl}>
                </div>
                <div class="info_container">
		            <p class="category_label">카테고리 > ${data.categoryName}</p>
                    
                    <div class="title_container">
                        <p class="book_title">${data.name}
                        <p id='sum${index}' class="book_sum">${(data.price * data.amount).toLocaleString()}원</p>
                    </div>

		            <div class="detail_container">
                        <p class="book_price"> ${data.price.toLocaleString()}원</p>
		            </div>

                    <div class="action_container"> 
                        <div class="book_cntbtn">
                            <button class="minus_btn ${index}">
                                <img src="./img/minus_btn.svg">
                            </button>
                            <p id=count${index} class="countvalue">${data.amount}</p>
                            <button class="plus_btn ${index}">
                                <img src="./img/plus_btn.svg">
                            </button>
                        </div>
                        <div class="book_delbtn">
                            <button class="delete_product ${index}">
                                <div class="delsvg_wrap">
                                    <img src="./img/delete_btn.svg">
                                </div>
                                <p>Delete</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
};

// 유저 검사
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
