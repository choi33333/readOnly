const url = new URL(window.location.href);
const urlParams = url.searchParams;
const orderNumber = urlParams.get("orderNumber");

window.addEventListener("load", async () => {
	const response = await fetch(`/api/v1/orders/me/${orderNumber}`);
	const orderData = await response.json();
	console.log(orderData);
});
