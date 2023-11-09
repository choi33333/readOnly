const orderContainer = document.getElementById('orderContainer');

window.addEventListener('load', async () => {
  // 토큰을 가져와서 관리자인지 확인
  if (!isAdmin(localStorage.getItem('Token'))) {
    // 관리자가 아니면 'notAdmin' 페이지로
    location.href = '/notAdmin';
  } else {
    try {
      // 주문 목록 api 호출 
      const fetchResult = await fetch('/api/v1/admin/orders', {
        method: 'GET',
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('Token'),
        },
      });
      // 서버로부터 응답 데이터를 JSON 형태로 파싱
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
      console.log('err: ', error); // 예외처리 
    }
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
        <th class='quantity'>수량</th>
        <th class='price'>합계</th>
        <th class='phoneNumber'>전화번호</th>
        <th class='orderStatus'>주문처리상태</th>
        <th class='update'>상태 업데이트</th>
        <th class='delete'>삭제</th>
      </tr>
    `;
    // 주문 정보를 테이블에 행으로 추가
    data.forEach((order, index) => {
        orderContainer.innerHTML += `
        <tr id='order-${order.orderId}' class='orderTableBody'>
          <td class='indexValue'>${index + 1}</td>
          <td class='orderNumberValue'>${order.orderNumber}</td>
          <td class='productsValue'>${order.products}</td>
          <td class='quantityValue'>${order.quantity}</td>
          <td class='priceValue'>${order.price}</td>
          <td class='phoneNumberValue'>${order.phoneNumber}</td>
          <td class='orderStatusValue'>
            <select onchange='OrderStatus(${order.orderId}, this.value)'>
              <option value='pending' ${order.orderStatus === 'pending' ? 'selected' : ''}>배송중</option>
              <option value='completed' ${order.orderStatus === 'completed' ? 'selected' : ''}>결제완료</option>
              <option value='cancelled' ${order.orderStatus === 'cancelled' ? 'selected' : ''}>배송완료</option>
            </select>
          </td>
          <td class='deleteButton'><button onclick='deleteOrder(${order.orderId})'>삭제</button></td>
        </tr>
      `;
    });
  }
  
// 주문 상태 변경하는 함수
const OrderStatus = async (orderId, newStatus) => {
    try {
      // 서버에 주문 상태 변경 요청
      const response = await fetch('/api/v1/admin/orders/', + orderId, {
        method: 'PUT',
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('Token'),
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ orderStatus: newStatus }), // 새 주문 상태를 서버에 전송
      });
  
      if (response.status === 204) {
        alert('주문 상태가 변경되었습니다.'); // 성공
      } else {
        alert('주문 상태 변경이 실패하였습니다.'); // 실패
      }
    } catch (error) {
      console.error('주문 상태 업데이트 중 오류 발생: ', error); //예외처리
      alert('주문 상태 업데이트 중 오류가 발생했습니다.'); // 에러
    }
  }
  
// 주문 삭제 함수
const deleteOrder = async (orderId) => {
    if (!confirm('주문을 삭제하시겠습니까?')) return; // 사용자에게 확인을 요청
  
    try {
      // 서버에 주문 삭제 요청
      const response = await fetch('/api/v1/admin/orders/' + orderId, {
        method: 'DELETE',
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('Token'),
        },
      });
      
      if (response.status === 204) {
        alert('주문이 삭제되었습니다.'); // 성공
        document.getElementById(`order-${orderId}`).remove(); // 화면에서 해당 주문목록 삭제
      } else {
        alert('주문 삭제에 실패했습니다.'); // 실패
      }
    } catch (error) {
      console.error('주문 삭제 중 오류 발생: ', error); // 예외처리
      alert('주문 삭제 중 오류가 발생했습니다'); // 에러
    }
  }