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

	console.log(cartProducts);
	console.log(userData[0].data);
});
