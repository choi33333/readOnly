const orderNumberInput = document.getElementById('orderNumber');
const orderResultsTableBody = document.getElementById('orderResults');

// 페이지 로드 시 초기화 함수 실행
window.addEventListener('load', async function () {
    try {
        // api 요청 보내기
        const response = await fetch('/api/v1/orders/', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('Token'),
            }
        });

        if (response.status === 200) {
            const orderData = await response.json();

            // orderlist
            const orderlist = document.getElementById('orderResults');
            orderlist.innerHTML = '';

            // API에서 가져온 데이터 루프
            for (const order of orderData) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.orderNumber}</td>
                    <td>${order.productId}</td>
                    <td>${order.price}</td>
                    <td>${order.quantity}</td>
                    <td>${order.orderStatus}</td>
                    <td>${order.process}</td>
                    <td><button class="cancel-button" data-order-number="${order.orderNumber}">주문 취소</button></td>
                `;
                orderlist.appendChild(row);

                // 주문 취소 버튼에 이벤트 추가
                const cancelButton = row.querySelector('.cancel-button');
                cancelButton.addEventListener('click', function () {
                    const orderNumberToCancel = this.getAttribute('data-order-number');
                    cancelOrder(orderNumberToCancel); // cancelOrder 함수 호출
                });
            }
        } else {
            console.error('API 요청 실패: ' + response.status);
        }
    } catch (error) {
        console.error('주문 데이터 가져오기 오류: ', error);
    }
});

// 검색 버튼 이벤트 함수 (주문 번호로 검색할 때 사용)
document.getElementById('searchButton').addEventListener('click', async function (event) {
    event.preventDefault();

    // 사용자가 입력한 주문 번호 가져오기
    const orderNumber = orderNumberInput.value;

    // 주문 번호가 비어 있는 경우 요청을 보내지 않음
    if (!orderNumber) {
        alert('주문 번호를 입력하세요.');
        return;
    }

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
            const orderData = await response.json();

            // orderlist 만들기
            const orderlist = document.getElementById('orderResults');
            orderlist.innerHTML = ''; // 기존 내용을 비우기

            // API에서 가져온 데이터 루프
            for (const order of orderData) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.orderNumber}</td>
                    <td>${order.productId}</td>
                    <td>${order.price}</td>
                    <td>${order.quantity}</td>
                    <td>${order.orderStatus}</td>
                    <td>${order.process}</td>
                    <td><button class="cancel-button" data-order-number="${order.orderNumber}">주문 취소</button></td>
                `;
                orderlist.appendChild(row);

                // 주문 취소 버튼에 이벤트 추가
                const cancelButton = row.querySelector('.cancel-button');
                cancelButton.addEventListener('click', function () {
                    const orderNumberToCancel = this.getAttribute('data-order-number');
                    cancelOrder(orderNumberToCancel); // cancelOrder 함수 호출
                });
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
        const response = await fetch('/api/v1/orders/me', {
            method: 'DELETE'
        });

        if (response.status === 204) {
            // 주문 성공
            alert('주문이 성공적으로 취소되었습니다.');
        } else {
            // 주문 취소 실패 또는 다른 응답 코드
            const data = await response.json();
            if (data && data.message) {
                alert(data.message);
            } else {
                alert('주문 취소에 실패했습니다.');
            }
        }
    } catch (error) {
        console.error('주문 취소 오류: ', error);
        alert('주문 취소에 오류가 발생했습니다.');
    }
}