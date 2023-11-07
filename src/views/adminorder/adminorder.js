document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const orderNumberInput = document.getElementById("orderNumber");
    const orderResults = document.getElementById("orderResults");

    searchButton.addEventListener("click", function() {
        const searchTerm = orderNumberInput.value.trim();
        if (searchTerm === "") {
            return;
        }

        // 주문 조회 기능 구현
        const orders = [
            { orderNumber: "001", productName: "상품 1", quantity: 3, amount: "$30.00", deliveryStatus: "배송전"},
            { orderNumber: "002", productName: "상품 2", quantity: 2, amount: "$20.00", deliveryStatus: "배송완료"},
            // 추가 주문 정보를 여기에 추가
        ];

        const filteredOrders = orders.filter(order => order.orderNumber === searchTerm);
        displayOrders(filteredOrders);
    });

    function displayOrders(orders) {
        const tableBody = orderResults;
        tableBody.innerHTML = ""; // 이전 결과 삭제

        if (orders.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='5'>주문을 찾을 수 없습니다.</td></tr>";
        } else {
            orders.forEach(order => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${order.orderNumber}</td>
                    <td>${order.productName}</td>
                    <td>${order.quantity}</td>
                    <td>${order.amount}</td>
                    <td>${order.deliveryStatus}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    }
});