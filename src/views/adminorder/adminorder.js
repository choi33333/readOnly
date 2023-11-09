const userContainer = document.getElementById('userContainer');

window.addEventListener('load', async () => { 
  const token = localStorage.getItem('Token');
  if(!isAdmin(token)){
    location.href = '/notAdmin';
  }else{
    try {
      const fetchResult = await fetchCustom('/api/v1/admin/orders','GET',token);
      const fetchData = await fetchResult.json();

      if(fetchResult.status === 200){
        console.log('주문 조회 성공');
        console.log(fetchData.data);
        orderList(fetchData.data);
      }else if(fetchResult.status === 403){
        console.log('권한이 없습니다');
      }
    } catch (error) {
      console.log('err: ', error);
    }
  }
})

const orderList = (data) => {
    userContainer.innerHTML = "";
    userContainer.innerHTML += `
      <tr class="userTableHeader">
        <th class='index'>Index</th>
        <th class='orderNumber'>주문번호</th>
        <th class='products'>상품명</th>
        <th class='quantity'>수량</th>
        <th class='price'>합계</th>
        <th class='phoneNumber'>전화번호</th>
        <th class='orderStatus'>주문처리상태</th>
      </tr>
    `
    for(let i = 0; i < data.length; i++) {
      userContainer.innerHTML += `
        <tr id='${i}' class='userTableBody'> 
          <td class='indexValue'>${i+1}</td>
          <td class='orderNumberValue'>${data[i].orderNumber}</td>
          <td class='productsValue'>${data[i].products}</td>
          <td class='quantityValue'>${data[i].quantity}</td>
          <td class='priceValue'>${data[i].price}</td>
          <td class='phoneNumberValue'>${data[i].phoneNumber}</td>
          <td class='orderStatusValue'>${data[i].orderStatus}</td>
        </tr>
      `
    }
  }