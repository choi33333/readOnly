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
        //console.log('주문 조회 성공');
        //console.log(fetchData.data);
        orderList(fetchData.data); // 주문 목록을 화면에 표시하는 함수 호출
      } else if (fetchResult.status === 403) {
        //console.log('권한이 없습니다.');
      }
    } catch (error) {
      console.log('err: ', error); // 예외처리 
    }
  }
});

// 주문 목록을 화면에 표시하는 함수
const orderList = async (data) => {
    orderContainer.innerHTML = ""; // 주문 목록을 초기화
    
    // 테이블 헤더 추가
    orderContainer.innerHTML += `
    <tr class="orderTableHeader">
      <th class='index'>Index</th>
      <th class='id'>ID</th>
      <th class='orderNumber'>주문번호</th>
      <th class='products'>상품명</th>
      <th class='orderedBy'>주문자</th>
      <th class='orderedEmail'>주문자 이메일</th>
      <th class='phoneNumber'>전화번호</th>
      <th class='orderStatus'>주문처리상태</th>
      <th class='delete'>삭제</th>
    </tr>
  `;
    try {
      // 주문 목록 api 호출 
      const fetchResult = await fetch('/api/v1/products', {
        method: 'GET',
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('Token'),
        },
      });
      const fetchData = await fetchResult.json();
      let index = 0; 
      // 요청이 성공하면 주문 목록을 출력
      if (fetchResult.status === 200) {
        //console.log('54645646성공');
        //console.log(data);
      } else if (fetchResult.status === 403) {
        //console.log('권한이 없습니다.');
      }
      //console.log("datadatadatadata",data)
      //console.log("FETCHdata", fetchData.data);
      for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].products.length; j++) {
          const productList = data[i].products[j].productId;
          const finded = fetchData.data.find((element) => element._id === productList);
          data[i].products[j].dataInfo = finded;
          index ++;
          printOrder(data[i], index, j);
        }
      }
      //console.log("asdasd",data);

    } catch (error) {
      console.log('err: ', error);  
    }
    
  }

const printOrder = (data, index, productsIdx) => {

  // 주문 정보를 테이블에 행으로 추가
  // <option value='shipping' ${order.orderStatus === 'shipping' ? 'selected' : ''}>배송중</option> 배송중 참일때 'selected' 문자열을 반환
  //console.log("printData", data, "index: ", productsIdx);
  orderContainer.innerHTML += `
    <tr class='orderTableBody'>
      <td class='indexValue'>${index}</td>
      <td class='idValue'>${data._id}</td>
      <td class='orderNumberValue'>${data.orderNumber}</td>
      <td class='productsValue'>${data.products[productsIdx].dataInfo !==undefined ? data.products[productsIdx].dataInfo.name : "상품을 찾을 수 없습니다."}</td>
      <td class='orderedByValue'>${data.orderedBy}</td>
      <td class='orderedEmailValue'>${data.orderedEmail}</td>
      <td class='phoneNumberValue'>${data.phoneNumber}</td>
      <td class='orderStatusValue'>
        <select onchange='OrderStatus("${data._id}", this.value)'>
          <option value='${data.orderStatus}'} >${data.orderStatus}</option>
          <option value='결제 완료'>결제 완료</option>
          <option value='배송 준비중'>배송 준비중</option>
          <option value='배송중'>배송중</option>
          <option value='배송 완료'>배송 완료</option>
          <option value='취소'>취소</option>
          <option value='취소 대기'>취소 대기</option>
        </select>
      </td>
      <td class='deleteButton'><button onclick='deleteOrder("${data._id}")'>삭제</button></td>
    </tr>
  `; 
}


// 주문 상태 변경하는 함수
const OrderStatus = async (orderId, newStatus) => {
  console.log(orderId, newStatus);
    try {
      // 서버에 주문 상태 변경 요청
      console.log("요청"+orderId)
      const response = await fetch(`/api/v1/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('Token'),
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({orderStatus: newStatus}), // 새 주문 상태를 서버에 전송
      });
  
      if (response.ok) {
        const res = await response.json();
        alert('주문 상태가 변경되었습니다.'); // 성공
        // console.log('response2: ', res);
        location.replace(location.href);
      } else {
        alert('주문 상태 변경이 실패하였습니다.'); // 실패
      }
    } catch (error) {
      console.error('주문 상태 업데이트 중 오류 발생: ', error); //예외처리
      alert('주문 상태 업데이트 중 오류가 발생했습니다.'); // 에러
    }
  }
  
// 주문 삭제 함수
const deleteOrder = (orderId) => {
    //console.log(orderId);
    try {
      const confirmflag = confirm('정말 삭제하시겠습니까?');
      if(confirmflag){
        fetch('/api/v1/admin/orders/' + orderId,{
          method: 'DELETE',
          headers:{
            "Content-Type": "application/json",
            "authorization": 'Bearer ' + localStorage.getItem('Token'),
          },
        })
        .then(async (response) => {
          // const res = await response.json();
          //console.log('response2: ', res);
          if(response.status === 204){
            //console.log('삭제성공');
            location.replace(location.href);
          }
        })
      }else{
        //console.log("취소");
      }
    } catch (error) {
      console.log('err2: ', error);
    }
  }