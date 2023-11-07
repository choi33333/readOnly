// 입력 필드와 표 본문에 대한 참조 가져오기
const orderNumberInput = document.getElementById('orderNumber');
const orderResultsTableBody = document.getElementById('orderResults');

// 검색 버튼 이벤트
document.getElementById('searchButton').addEventListener('click', function (event) {
    event.preventDefault();

    // 사용자가 입력한 주문 번호 가져오기
    const orderNumber = orderNumberInput.value;

    // 주문 번호를 기반으로 주문 정보를 검색하기 위한 API 요청
    // 예시 데이터
    const sampleOrderData = [
        { date: '2023-11-07', orderNumber: '12345', productName: '도서 1', amount: '0', quantity: 2, status: '처리 중', trackingLink: 'http://nplus.doortodoor.co.kr/web/detail.jsp?slipno=', cancel: '아니오' },
        { date: '2023-11-08', orderNumber: '67890', productName: '도서 2', amount: '0', quantity: 1, status: '배송됨', trackingLink: 'http://nplus.doortodoor.co.kr/web/detail.jsp?slipno=', cancel: '예' },
    ];

    // 표의 이전 결과 삭제
    orderResultsTableBody.innerHTML = '';

    // API에서 검색한 데이터를 반복하고 표 채우기
    for (const order of sampleOrderData) {
        if (order.orderNumber === orderNumber) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.date} [${order.orderNumber}]</td>
                <td>${order.productName}</td>
                <td>${order.amount}</td>
                <td>${order.quantity}</td>
                <td>${order.status}</td>
                <td><a href="${order.trackingLink}" target="_blank">조회하기</a></td>
                <td><button class="cancel-button" data-order-number="${order.orderNumber}">주문 취소하기</button></td>
            `;
            orderResultsTableBody.appendChild(row);

            // 주문 취소 버튼에 이벤트 리스너 추가
            const cancelButton = row.querySelector('.cancel-button');
            cancelButton.addEventListener('click', function () {
                const orderNumberToCancel = this.getAttribute('data-order-number');
                // 여기에 주문 취소 로직 추가
                // 주문 취소 함수 호출하거나 취소 API 호출하도록 수정
            });

            return; // 주문을 찾은 후 루프 종료
        }
    }
    
    // 주문을 찾지 못한 경우 메시지를 표시
    const noOrderRow = document.createElement('tr');
    noOrderRow.innerHTML = '<td colspan="7">주문을 찾을 수 없습니다.</td>';
    orderResultsTableBody.appendChild(noOrderRow);
});

// 주문 취소 함수 예시
function cancelOrder(orderNumber) {
    // 주문 취소 로직을 이곳에 추가
    // 주문 취소 API 호출 수행
    alert(`주문 ${orderNumber}가 취소되었습니다.`);
}
