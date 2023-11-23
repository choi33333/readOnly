const emailController = document.getElementById('emailAlarm');
const passwordController = document.getElementById('passwordAlarm');
const repasswordController = document.getElementById('repasswordAlarm');
const usernameController = document.getElementById('usernameAlarm');
const phoneNumberController = document.getElementById('phoneNumberAlarm');
const addressController = document.getElementById('addressAlarm');


//이메일 입력을 안했거나 형식이 올바르지 않을 때
email.oninput = (e) => {
  emailController.className='alarmoff';
  
  if(!email.value) {
    emailController.innerHTML = '이메일을 입력해주세요';
    emailController.className = 'alarmon';
  }else if(!emailCheck(email.value)){
    emailController.innerHTML = '이메일 형식이 올바르지 않습니다';
    emailController.className = 'alarmon';
  }
}
//이메일 형식 확인
const emailCheck = (email) => {
  emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  
  return emailRegex.test(email);
}


//비밀번호 입력을 안했거나 형식이 올바르지 않을 때
password.oninput = () => {
  passwordController.className='alarmoff';

  if(!password.value) {
    passwordController.innerHTML = '비밀번호를 입력해주세요';
    passwordController.className = 'alarmon';
  }else if(!passwordCheck(password.value)){
    passwordController.innerHTML = '비밀번호 형식이 올바르지 않습니다';
    passwordController.className = 'alarmon';
  }
}
//비밀번호 형식 확인
const passwordCheck = (password) => {
  passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
  
  return passwordRegex.test(password);
}


//비밀번호 확인 입력을 안했거나 형식이 올바르지 않을 때
repassword.oninput = () => {
  repasswordController.className='alarmoff';

  if(password.value && !repassword.value){
    repasswordController.innerHTML = '비밀번호 확인을 해주세요';
    repasswordController.className = 'alarmon';
  }else if(!password.value && !repassword.value){
    repasswordController.className = 'alarmoff';
  }else if(password.value !== repassword.value) {
    repasswordController.innerHTML = '비밀번호가 일치하지 않습니다';
    repasswordController.className = 'alarmon';
  }
}


//이름 입력을 안했을 때
username.oninput = () => {
  usernameController.className='alarmoff';

  if(!username.value) {
    usernameController.innerHTML = '이름을 입력해주세요';
    usernameController.className = 'alarmon';
  }
}


//전화번호 입력을 안했거나 형식이 올바르지 않을 때
phoneNumber.oninput = (e) => {
  oninputPhone(e.target);

  phoneNumberController.className='alarmoff';

  if(!phoneNumber.value) {
    phoneNumberController.innerHTML = '전화번호를 입력해주세요';
    phoneNumberController.className = 'alarmon';
  }else if (!phoneNumberCheck(phoneNumber.value)){
    phoneNumberController.innerHTML = '전화번호 형식이 올바르지 않습니다';
    phoneNumberController.className = 'alarmon';
  }
}
//전화번호 입력 제한
const oninputPhone = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}
//전화번호 형식 확인
const phoneNumberCheck = (phoneNumber) => {
  phoneNumberRegex = /^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$/;
  
  return phoneNumberRegex.test(phoneNumber);
}
