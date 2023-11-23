const username = document.getElementById('username');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const address = document.getElementById('address');
const addressDetail = document.getElementById('addressDetail');
const postalCode = document.getElementById('postalCode');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');

const cancelBtn = document.getElementById('cancelBtn');
const completBtn = document.getElementById('completBtn');


//페이지 로딩되었을 때 회원정보 보이도록
window.addEventListener('load', async () => {
  const token = localStorage.getItem('Token');
  const checkOk = localStorage.getItem('checkOk');
  if(token){
    if(checkOk){
      try {
        const fetchResult = await fetchCustom('/api/v1/users/me','GET', token);
        const fetchData = await fetchResult.json();
        
        if(fetchResult.status == 200){
          username.value = fetchData.data.username;
          email.value = fetchData.data.email;
          phoneNumber.value = fetchData.data.phoneNumber;
          postalCode.value = fetchData.data.postCode;
          address.value = fetchData.data.address;
          addressDetail.value = fetchData.data.addressDetail;
        }else if(fetchResult.status === 401){
          location.href = '/login';
        }
      } catch (error) {
        console.log('err: ', error);
      }
    }else {
      location.href = '/mepasswordcheck'
    }
  }else {
    location.href = '/login';
  }
})

//취소버튼 클릭했을 때
cancelBtn.addEventListener('click', () => {
  location.href = '/userInformation';
})

//완료버튼 클릭했을 때
completBtn.addEventListener('click', async () => {
  const token = localStorage.getItem('Token');
  const checkValue = passwordinputCheck();
  if(checkValue === 0){
    try {
      const data = {
        password: password.value,
        phoneNumber: phoneNumber.value,
        postCode: postalCode.value,
        address: address.value,
        addressDetail: addressDetail.value,
      }
  
      const fetchResult = await fetchCustom('/api/v1/users/me','PUT', token, data);
      if(fetchResult.status == 201){
        if(!data.password){
            location.href = '/userInformation'
          }else{
            alert('비밀번호가 변경되었습니다. 다시 로그인해주세요');
            localStorage.removeItem('Token');
            localStorage.removeItem('checkOk');
            location.href = '/mainpage'
          }
      }else if(fetchResult.status === 401){
        alert('동일한 비밀번호입니다.')
      }
    } catch (error) {
      console.log('err: ', error);
    }
  }
})

const passwordinputCheck = () => {
  passwordController.className='alarmoff';
  repasswordController.className='alarmoff';

  let toggle = 0;

  if(!passwordCheck(password.value)){
    passwordController.innerHTML = '비밀번호 형식이 올바르지 않습니다';
    passwordController.className = 'alarmon';
    toggle = 1;
  }

  if(!repassword.value){
    repasswordController.innerHTML = '비밀번호 확인을 해주세요';
    repasswordController.className = 'alarmon';
    toggle = 1;
  }else if(password.value !== repassword.value) {
    repasswordController.innerHTML = '비밀번호가 일치하지 않습니다';
    repasswordController.className = 'alarmon';
    toggle = 1;
  }

  if(!password.value && !repassword.value){
    toggle = 0;
  }

  if(toggle === 1) { return 1; }
  else return 0;
}