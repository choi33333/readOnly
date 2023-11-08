document.addEventListener("DOMContentLoaded", function () {
    const orderNumberInput = document.getElementById("orderNumber");
    const searchButton = document.getElementById("searchButton");
    const orderResults = document.getElementById("orderResults");

    // 검색 버튼 클릭 이벤트 핸들러
    searchButton.addEventListener("click", async function () {
        // 입력된 주문번호 가져오기
        const orderNumber = orderNumberInput.value;

        try {
            // API 호출 및 응답 데이터 가져오기
            const response = await fetch('/api/v1/admin/orders/' + orderNumber, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem('Token'),
                }
            });

            // HTTP 상태 코드가 200 OK인 경우
            if (response.ok) {
                const orderData = await response.json(); // JSON 응답 데이터 파싱

                // 주문 데이터 화면에 표시
                displayOrderData(orderData);
            } else {
                console.error("Error fetching order data:", response.status);
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    });

    // 주문 데이터를 화면에 표시하는 함수
    function displayOrderData(orderData) {
        // 화면을 초기화
        orderResults.innerHTML = "";

        // 주문 데이터가 있는 경우 테이블에 추가
        if (orderData) {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${orderData.orderNumber}</td>
                <td>${orderData.productName}</td>
                <td>${orderData.productPrice}</td>
                <td>${orderData.quantity}</td>
                <td>${orderData.orderStatus}</td>
                <td><button onclick="deleteOrder(${orderData.orderNumber})">삭제</button></td>
            `;
            orderResults.appendChild(tableRow);
        } else {
            // 주문 데이터가 없는 경우 메시지 표시
            orderResults.innerHTML = "주문 데이터를 찾을 수 없습니다.";
        }
    }

    // 주문 삭제
    async function deleteOrder(orderNumber) {
        try {
            // 삭제 후 화면에서 해당 주문 데이터 제거

            const deleteResponse = await fetch('/api/v1/admin/orders/' + orderNumber, {
                method: "DELETE",
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem('Token'),
                }
            });

            if (deleteResponse.ok) {
                // 주문 삭제 성공했을 때 해당 주문 데이터를 화면에서 제거
                const tableRowToRemove = document.querySelector(
                    `#orderResults tr td:first-child:contains("${orderNumber}")`
                );
                if (tableRowToRemove) {
                    tableRowToRemove.parentNode.removeChild(tableRowToRemove);
                }
            } else {
                console.error("Error deleting order:", deleteResponse.status);
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    }
});