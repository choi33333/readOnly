const orderNumberInput = document.getElementById('orderNumber');
const orderResultsTableBody = document.getElementById('orderResults');

// 검색 버튼 이벤트 함수
document.getElementById('searchButton').addEventListener('click', async function (event) {
    event.preventDefault();

    // 사용자가 입력한 주문 번호 가져오기
    const orderNumber = orderNumberInput.value;

    // API 및 토큰을 사용하여 주문 정보를 검색
    try {
        const response = await fetch('/api/v1/orders/me', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('Token'),
            }
        });

        if (response.status === 200) {
            // 데이터를 res.data를 통해 가져오기
            const res = await response.json(); // 실제 응답 데이터
            const orderData = res.data; // 데이터에 res.data를 사용

            // 이전 결과를 테이블에서 삭제
            orderResultsTableBody.innerHTML = '';

            // API에서 가져온 데이터 루프
            let orderFound = false;
            for (const order of orderData) {
                if (order.orderNumber === orderNumber) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order.orderNumber}</td>
                        <td>${order.products}</td>
                        <td>${order.price}</td>
                        <td>${order.quantity}</td>
                        <td>${order.orderStatus}</td>
                        <td><button class="cancel-button" data-order-number="${order.orderNumber}">주문 취소</button></td>
                    `;
                    orderResultsTableBody.appendChild(row);
                    orderFound = true;

                    // 주문 취소 버튼에 이벤트 추가
                    const cancelButton = row.querySelector('.cancel-button');
                    cancelButton.addEventListener('click', function () {
                        const orderNumberToCancel = this.getAttribute('data-order-number');
                        cancelOrder(orderNumberToCancel); // cancelOrder 함수 호출
                    });

                    break; // 주문을 찾은 후 종료
                }
            }

            // 주문을 찾지 못한 경우 메시지 표시
            if (!orderFound) {
                const noOrderRow = document.createElement('tr');
                noOrderRow.innerHTML = '<td colspan="6">주문을 찾을 수 없습니다.</td>';
                orderResultsTableBody.appendChild(noOrderRow);
            }
        } else {
            console.error('API 요청 실패: ' + response.status);
        }
    } catch (error) {
        console.error('주문 데이터 가져오기 오류: ', error);
    }
});

// 주문 취소 함수
async function cancelOrder(orderNumber) {
    try {
        const response = await fetch('/api/v1/orders/'+ orderNumber, {
            method: 'DELETE',
            //headers: {
                //"Authorization": 'Bearer ' + localStorage.getItem('Token'),
            //}
        });

        if (response.status === 204) {
            // 주문 취소 성공
            alert('주문이 성공적으로 취소되었습니다.');
            // 주문 결과를 새로고침하는 로직을 여기에 추가
        } else {
            // 주문 취소 실패 또는 다른 응답 코드
            const res = await response.json();
            const errorMessage = res.message || '주문 취소에 실패했습니다.';
            alert(errorMessage);
        }
    } catch (error) {
        console.error('주문 취소 오류: ', error);
        alert('주문 취소에 오류가 발생했습니다.');
    }
}