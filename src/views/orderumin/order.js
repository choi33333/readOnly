const url = new URL(window.location.href);
const urlParams = url.searchParams;
const orderNumber = urlParams.get("orderNumber");
let cartProducts = [];
let userData = [];
let sumPrice = 0;
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
						src=${data.imageUrl}
						class="cartImg" />
				</div>
				<div class="product_container">
					<div class="productName">${data.name}</div>
					<div class="productAuthor">${data.author} 글 | ${data.releasedDate.slice(0, -20)}년 ${data.releasedDate.slice(5, -17)}월 ${data.releasedDate.slice(8, -14)}일</div>
					<div class="productPrice">${data.price.toLocaleString()}원</div>
			</div>
			</div>
			<div class="productAmount">${data.amount}</div>
			<div class="productTotalPrice">${(
				data.price * data.amount
			).toLocaleString()}원</div>
		</div>
		`;
		sumPrice += data.price * data.amount;
	});
	document.querySelector(
		".orderData_number"
	).innerHTML = `주문번호 :  ${userData[0].data.orderNumber}`;
	document.querySelector(
		".orderData_sumPrice"
	).innerHTML = `총 주문금액 :  ${sumPrice.toLocaleString()}원`;
	document.querySelector(
		".userData_name"
	).innerHTML = `${userData[0].data.orderedBy}`;
	document.querySelector(
		".userData_phone"
	).innerHTML = `${userData[0].data.phoneNumber}`;
	document.querySelector(
		".userData_address"
	).innerHTML = `${userData[0].data.address}`;
	document.querySelector(
		".userData_addressDetail"
	).innerHTML = `${userData[0].data.addressDetail}`;
	document.querySelector(
		".userData_postCode"
	).innerHTML = `(${userData[0].data.postCode})`;
	// document.querySelector('.orderData_number').innerHTML=`주문자정보  ${userData[0].data.orderNumber}`

	document.querySelector(
		".totalPrice_sumPrice"
	).innerHTML = `총 주문금액 :  ${sumPrice.toLocaleString()}원`;;

	console.log(cartProducts);
	console.log(userData[0].data);
});
