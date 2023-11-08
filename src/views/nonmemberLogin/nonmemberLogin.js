//비회원 주문조회 페이지 js
const loginBtn = document.getElementById('loginBtn');
const orderNumber = document.getElementById('orderNumber');
const phoneNumber = document.getElementById('phoneNumber');

const orderNumberController = document.getElementById('orderNumberAlarm');
const phoneNumberController = document.getElementById('phoneNumberAlarm');

const loginController = document.getElementById('loginAlarm');

//페이지 로딩 되었을 때 토큰 검사
window.addEventListener('load', tokenCheckfunc);

//로그인 버튼을 눌렀을 때 백엔드로 입력값 보내기
loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const checkValue = logininputCheck();
  if(checkValue === 0){
    const data = {
      orderNumber: orderNumber.value,
      phoneNumber: phoneNumber.value,
    }

    try {
      const fetchResult = await fetchCustom('/api/v1/orders/search','POST','',data);
      const fetchData = await fetchResult.json();
      
      if(fetchResult.status == 200){
        console.log('성공', fetchData);
        location.href = '/'; //비회원 주문조회 기능구현되면 경로 바꾸기
      }else if(fetchResult.status === 401){
        loginController.innerHTML = '주문번호나 전화번호가 틀렸습니다';
        loginController.className = 'alarmon';
      }
    } catch (error) {
      console.log('error: ', error);
    }
    
  }
});

const logininputCheck = () => {
  orderNumberController.className='alarmoff';
  phoneNumberController.className='alarmoff';

  let toggle = 0;

  if(orderNumber.value == '') {
    orderNumberController.innerHTML = '주문번호를 입력해주세요';
    orderNumberController.className = 'alarmon';
    toggle = 1;
  }
  if(phoneNumber.value == '') {
    phoneNumberController.innerHTML = '전화번호를 입력해주세요';
    phoneNumberController.className = 'alarmon';
    toggle = 1;
  }

  if(toggle === 1) { return 1; }
  else return 0;
}

//주문번호
orderNumber.oninput = (e) => {
  orderNumberController.className='alarmoff';
  
  if(orderNumber.value == '') {
    orderNumberController.innerHTML = '주문번호를 입력해주세요';
    orderNumberController.className = 'alarmon';
  }
}

//주문 전화번호
phoneNumber.oninput = () => {
  phoneNumberController.className='alarmoff';

  if(phoneNumber.value == '') {
    phoneNumberController.innerHTML = '전화번호를 입력해주세요';
    phoneNumberController.className = 'alarmon';
  }
}