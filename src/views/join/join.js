const email = document.getElementById('email');
const password = document.getElementById('password');
const username = document.getElementById('username');
const phoneNumber = document.getElementById('phoneNumber');
const address = document.getElementById('address');
const addressDetail = document.getElementById('addressDetail');
const postalCode = document.getElementById('postalCode');
const joinBtn = document.getElementById('joinBtn');


window.addEventListener('load', tokenCheckfunc);


joinBtn.addEventListener('click', async () => {
  const checkValue = inputCheck();
  if(checkValue === 0){

    const data = {
      email: email.value,
      password: password.value,
      username: username.value,
      phoneNumber: phoneNumber.value,
      postCode: postalCode.value,
      address: address.value,
      addressDetail: addressDetail.value,
    }

    try {
      const fetchResult = await fetchCustom('/api/v1/auth/sign-up','POST', '', data);
      
      if(fetchResult.status == 201){
        location.href = '/joinSuccess';
      }else if(fetchResult.status === 409){
        location.href = '/joinOverlap';
      }
    } catch (error) {
      console.log('err: ', error);
    }
  }
});

//모든 값이 올바르게 입력되었는지 확인하는 함수
const inputCheck = () => {
  emailController.className='alarmoff';
  passwordController.className='alarmoff';
  usernameController.className='alarmoff';
  phoneNumberController.className='alarmoff';
  addressController.className='alarmoff';
  repasswordController.className='alarmoff';

  let toggle = 0;

  if(!email.value) {
    emailController.innerHTML = '이메일을 입력해주세요';
    emailController.className = 'alarmon';
    toggle = 1;
  }else if(!emailCheck(email.value)){
    emailController.innerHTML = '이메일 형식이 올바르지 않습니다';
    emailController.className = 'alarmon';
    toggle = 1;
  }
  if(!password.value) {
    passwordController.innerHTML = '비밀번호를 입력해주세요';
    passwordController.className = 'alarmon';
    toggle = 1;
  }else if(!passwordCheck(password.value)){
    passwordController.innerHTML = '비밀번호 형식이 올바르지 않습니다';
    passwordController.className = 'alarmon';
    toggle = 1;
  }
  if(!username.value) {
    usernameController.innerHTML = '이름을 입력해주세요';
    usernameController.className = 'alarmon';
    toggle = 1;
  }
  if(!phoneNumber.value) {
    phoneNumberController.innerHTML = '전화번호를 입력해주세요';
    phoneNumberController.className = 'alarmon';
    toggle = 1;
  }else if (!phoneNumberCheck(phoneNumber.value)){
    phoneNumberController.innerHTML = '전화번호 형식이 올바르지 않습니다';
    phoneNumberController.className = 'alarmon';
    toggle = 1;
  }
  if(!address.value) {
    addressController.innerHTML = '주소를 입력해주세요';
    addressController.className = 'alarmon';
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

  if(toggle === 1) { return 1; }
  else return 0;
}
