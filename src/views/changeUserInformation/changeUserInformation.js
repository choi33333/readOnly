const nameValue = document.getElementById('nameValue');
const emailValue = document.getElementById('emailValue');
const phoneValue = document.getElementById('phoneValue');
const addressValue = document.getElementById('addressValue');
const addressDetailValue = document.getElementById('addressDetailValue');
const postalCode = document.getElementById('postalCode');

const cancelBtn = document.getElementById('cancelBtn');
const completBtn = document.getElementById('completBtn');


//페이지 로딩되었을 때 회원정보 보이도록
window.onload = () => {
  try {
    fetch('/api/v1/users/me',{
      method: 'GET',
      headers:{
        "authorization": 'Bearer ' + localStorage.getItem('Token'),
      },
    })
    .then(async (response) => {
      const res = await response.json();
      console.log('response: ', res);
      if(response.status === 200){
        console.log('성공');
        nameValue.value = res.data.username;
        emailValue.value = res.data.email;
        phoneValue.value = res.data.phoneNumber;
        postalCode.value = res.data.postCode;
        addressValue.value = res.data.address;
        addressDetailValue.value = res.data.addressDetail;
      }else if(response.status === 401){
        console.log('로그인 필요');
      }
    })
  } catch (error) {
    console.log('err: ', error);
  }
}


//취소버튼 클릭했을 때
cancelBtn.addEventListener('click', () => {
  location.href = '/userInformation';
})


//완료버튼 클릭했을 때
completBtn.addEventListener('click', () => {
  try {

    const data = {
      // password: password.value,
      phoneNumber: phoneValue.value,
      postCode: postalCode.value,
      address: addressValue.value,
      addressDetail: addressDetailValue.value,
    }

    fetch('/api/v1/users/me', {
      method: 'PUT',
      headers:{
        "Content-Type": "application/json", //(post,put,delete)항상 필수적으로 추가해야함!!
        "authorization": 'Bearer ' + localStorage.getItem('Token'),
      },
      body: JSON.stringify(data),
    })
    .then(async (response) => {
      const res = await response.json();
      console.log('response: ', res);
      //백엔드에서 status 붙이지 않으면 default값으로 status 200 옴(ok)
      if(response.status === 200){
        console.log('성공');
        location.href = '/userInformation'
      }else if(response.status === 401){
        console.log('로그인 필요');
      }
    })
  } catch (error) {
    console.log('err: ', error);
  }
})


//카카오 API를 활용하여 주소창 띄우기
addressValue.addEventListener('click', (e) => {
  e.preventDefault();
  addressDetailValue.focus();
  new daum.Postcode({
    oncomplete: function(data) {
      let addr = '';
      if(data.userSelectedType === 'R'){
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
  
      postalCode.value = data.zonecode;
      address.value = addr;
    }
  }).open();
})
postalCode.addEventListener('click', (e) => {
  e.preventDefault();
  addressDetailValue.focus();
  new daum.Postcode({
    oncomplete: function(data) {
      let addr = '';
      if(data.userSelectedType === 'R'){
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
  
      postalCode.value = data.zonecode;
      address.value = addr;
    }
  }).open();
})
addressBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addressDetailValue.focus();
  new daum.Postcode({
    oncomplete: function(data) {
      let addr = '';
      if(data.userSelectedType === 'R'){
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
  
      postalCode.value = data.zonecode;
      address.value = addr;
    }
  }).open();
})