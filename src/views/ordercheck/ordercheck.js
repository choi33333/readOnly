const orderContainer = document.getElementById('orderContainer');

window.addEventListener('load', async () => {
    try {
      // 주문 목록 api 호출 
      const fetchResult = await fetch('/api/v1/orders/me', {
        method: 'GET',
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('Token'),
        },
      });
      const fetchData = await fetchResult.json();
  
      // 요청이 성공하면 주문 목록을 출력
      if (fetchResult.status === 200) {
        console.log('주문 조회 성공');
        console.log(fetchData.data);
        orderList(fetchData.data); // 주문 목록을 화면에 표시하는 함수 호출
      } else if (fetchResult.status === 403) {
        console.log('권한이 없습니다.');
      }
    } catch (error) {
      console.log('err: ', error);  
    }
  });

// 주문 목록을 화면에 표시하는 함수
const orderList = (data) => {
    orderContainer.innerHTML = ""; // 주문 목록을 초기화
    // 테이블 헤더 추가
    orderContainer.innerHTML += `
      <tr class="orderTableHeader">
        <th class='index'>Index</th>
        <th class='orderNumber'>주문번호</th>
        <th class='products'>상품명</th>
        <th class='address'>주소</th>
        <th class='orderedEmail'>주문자 이메일</th>
        <th class='phoneNumber'>전화번호</th>
        <th class='orderStatus'>주문처리상태</th>
        <th class='delete'>주문취소</th>
      </tr>
    `;
    // 주문 정보를 테이블에 행으로 추가
    data.forEach((order, index) => {
        orderContainer.innerHTML += `
        <tr id='order-${order.orderId}' class='orderTableBody'>
          <td class='indexValue'>${index + 1}</td>
          <td class='orderNumberValue'>${order.orderNumber}</td>
          <td class='productsValue'>${order.products}</td>
          <td class='address'>${order.address}</td>
          <td class='orderedEmailValue'>${order.orderedEmail}</td>
          <td class='phoneNumberValue'>${order.phoneNumber}</td>
          <td class='orderStatusValue'>${order.orderStatus}</td>
          <td class='deleteButton'><button onclick='deleteOrder(${order._id})'>취소</button></td>
        </tr>
      `; 
    });
  }

  async function deleteOrder(orderId) {
    try {
      // API 경로 및 요청 옵션 설정
      const apiEndpoint = `/api/v1/orders/${orderId}`;
      const requestOptions = {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + localStorage.getItem('Token'),
        },
      };
  
      // API 요청 보내기
      const response = await fetch(apiEndpoint, requestOptions);
  
      // 응답 상태 코드 확인
      if (response.ok) {
        // 주문 취소 성공
        console.log('주문 취소 성공');
        
        // 해당 주문 행을 화면에서 삭제
        const orderRow = document.getElementById(`order-${orderId}`);
        if (orderRow) {
          orderRow.remove(); // 주문 행 삭제
        } else {
          console.error('해당 주문 행을 찾을 수 없음');
        }
      } else {
        console.error('주문 취소 실패');
      }
    } catch (error) {
      console.error('주문 취소 오류:', error);
    }
  }