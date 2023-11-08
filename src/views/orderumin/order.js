const url = new URL(window.location.href);
const urlParams = url.searchParams;
const orderNumber = urlParams.get("orderNumber");
let cartProducts = [];
let userData = [];
window.addEventListener("load", async () => {
	const response = await fetch(`/api/v1/orders/me/${orderNumber}`);
	const orderData = await response.json();
	// console.log(orderData);
	userData.push(orderData);
	// const productData = await fetch(``)
	console.log(orderData.data.products.concat(orderData.data.products));
	const productList = orderData.data.products.concat(orderData.data.products);

	productList.map(async (item) => {
		console.log(item);
		const response = await fetch(`/api/v1/products/${item.productId}`);
		const productsData = await response.json();
		productsData.data.amount = item.quantity;
		// console.log(productsData.data);
		cartProducts.push(productsData.data);
	});
	console.log(cartProducts);
	console.log(userData);
});
