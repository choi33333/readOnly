document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const orderNumberInput = document.getElementById("orderNumber");
    const orderResults = document.getElementById("orderResults");

    searchButton.addEventListener("click", async function() { 
        const searchTerm = orderNumberInput.value.trim();
        if (searchTerm === "") {
            return;
        }

        try {
            // API 요청을 보내서 주문 정보를 가져오기
            const response = await fetch('/api/v1/admin/orders'+ orderNumber, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('주문 목록이 없습니다. ${response.status}');
            }

            const orders = await response.json();
            const filteredOrders = orders.filter(order => order.orderNumber === searchTerm);
            displayOrders(filteredOrders);
        } catch (error) {
            console.error("Error fetching data: " + error);
        }
    });

    function displayOrders(orders) {
        const tableBody = orderResults;
        tableBody.innerHTML = ""; // 이전 결과 삭제
        // 주문을 찾지 못한 경우 메시지를 표시
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
    async function deleteOrder(orderNumber) {
        try {
            // 서버에 주문 삭제 요청
            const response = await fetch('/api/v1/admin/orders/'+ orderNumber, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error('주문 삭제 중 오류 발생 (${response.status})');
            }
    
            // 성공적으로 주문을 삭제한 경우 해당 주문을 제거
            const orderRow = document.querySelector(`tr[data-order-number="${orderNumber}"]`);
            if (orderRow) {
                orderRow.remove();
            }
        } catch (error) {
            console.error("주문 삭제 오류: " + error);
        }
    }
    
});