const url = new URL(window.location.href);
const urlParams = url.searchParams;
const orderNumber = urlParams.get("orderNumber");
let cartProducts = [];
let userData = [];

window.addEventListener("load", async () => {
	const response = await fetch(`/api/v1/orders/me/${orderNumber}`);
	const orderData = await response.json();
	userData.push(orderData);
	const productList = orderData.data.products;

	await Promise.all(
		productList.map(async (item) => {
			const response = await fetch(`/api/v1/products/${item.productId}`);
			const productsData = await response.json();
			productsData.data.amount = item.quantity;
			cartProducts.push(productsData.data);
		})
	);
	cartProducts.forEach((data, index) => {
		document.querySelector(".cartInfo_products").innerHTML += `
		<div class="productCard">
			<div class="imgName">
				<div class="productImg">
					<img
						src="../cart/thisweekbestseller1.jpeg"
						class="cartImg" />
				</div>
				<div class="productName">${data.name}</div>
			</div>
			<div class="productPrice">${data.price}원</div>
			<div class="productAmount">${data.amount}</div>
			<div class="productTotalPrice">${data.price * data.amount}원</div>
		</div>
		`;
	});
	document.querySelector(
		".orderData_number"
	).innerHTML = `주문번호:  ${userData[0].data.orderNumber}`;
	document.querySelector(
		".orderData_namePhone"
	).innerHTML = `주문자/연락처:  ${userData[0].data.orderedBy}/${userData[0].data.phoneNumber}`;
	document.querySelector(".orderData_sumPrice").innerHTML = `총 결제금액  `;
	document.querySelector(
		".userData_name"
	).innerHTML = `수취인:  ${userData[0].data.orderedBy}`;
	document.querySelector(
		".userData_phone"
	).innerHTML = `연락처:  ${userData[0].data.phoneNumber}`;
	document.querySelector(
		".userData_address"
	).innerHTML = `배송지주소:  ${userData[0].data.address}`;
	// document.querySelector('.orderData_number').innerHTML=`주문자정보  ${userData[0].data.orderNumber}`
	console.log(cartProducts);
	console.log(userData[0].data);
});
