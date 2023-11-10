const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const username = document.getElementById('username');
const phoneNumber = document.getElementById('phoneNumber');
const address = document.getElementById('address');
const addressDetail = document.getElementById('addressDetail');
const postalCode = document.getElementById('postalCode');
const addressBtn = document.getElementById('addressBtn');
const joinBtn = document.getElementById('joinBtn');

const emailController = document.getElementById('emailAlarm');
const passwordController = document.getElementById('passwordAlarm');
const usernameController = document.getElementById('usernameAlarm');
const phoneNumberController = document.getElementById('phoneNumberAlarm');
const addressController = document.getElementById('addressAlarm');
const repasswordController = document.getElementById('repasswordAlarm');

window.addEventListener('load', tokenCheckfunc);

//모든 값이 입력 되었을 때 백엔드로 입력값 보내기
joinBtn.addEventListener('click', () => {
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
      fetch('/api/v1/auth/sign-up',{
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then(async (response) => {
        //console.log('response: ', await response.json());
        if(response.status === 409){
          location.href = '/joinOverlap';
        }else if(response.status === 201){
          location.href = '/joinSuccess';
        }
      })
    } catch (error) {
      console.log('error: ', error);
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

  if(email.value == '') {
    emailController.innerHTML = '이메일을 입력해주세요';
    emailController.className = 'alarmon';
    toggle = 1;
  }else if(!emailCheck(email.value)){
    emailController.innerHTML = '이메일 형식이 올바르지 않습니다';
    emailController.className = 'alarmon';
    toggle = 1;
  }
  if(password.value == '') {
    passwordController.innerHTML = '비밀번호를 입력해주세요';
    passwordController.className = 'alarmon';
    toggle = 1;
  }else if(!passwordCheck(password.value)){
    passwordController.innerHTML = '비밀번호 형식이 올바르지 않습니다';
    passwordController.className = 'alarmon';
    toggle = 1;
  }
  if(username.value == '') {
    usernameController.innerHTML = '이름을 입력해주세요';
    usernameController.className = 'alarmon';
    toggle = 1;
  }
  if(phoneNumber.value == '') {
    phoneNumberController.innerHTML = '전화번호를 입력해주세요';
    phoneNumberController.className = 'alarmon';
    toggle = 1;
  }else if (!phoneNumberCheck(phoneNumber.value)){
    phoneNumberController.innerHTML = '전화번호 형식이 올바르지 않습니다';
    phoneNumberController.className = 'alarmon';
    toggle = 1;
  }
  if(address.value == '') {
    addressController.innerHTML = '주소를 입력해주세요';
    addressController.className = 'alarmon';
    toggle = 1;
  } 
  if(repassword.value == ''){
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


//이메일 입력을 안했거나 형식이 올바르지 않을 때
email.oninput = (e) => {
  emailController.className='alarmoff';
  
  if(email.value == '') {
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

  if(password.value == '') {
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

  if(repassword.value == ''){
    repasswordController.innerHTML = '비밀번호 확인을 해주세요';
    repasswordController.className = 'alarmon';
  }else if(password.value !== repassword.value) {
    repasswordController.innerHTML = '비밀번호가 일치하지 않습니다';
    repasswordController.className = 'alarmon';
  }
}


//이름 입력을 안했을 때
username.oninput = () => {
  usernameController.className='alarmoff';

  if(username.value == '') {
    usernameController.innerHTML = '이름을 입력해주세요';
    usernameController.className = 'alarmon';
  }
}


//전화번호 입력을 안했거나 형식이 올바르지 않을 때
phoneNumber.oninput = (e) => {
  oninputPhone(e.target);

  phoneNumberController.className='alarmoff';

  if(phoneNumber.value == '') {
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


//카카오 API를 활용하여 주소창 띄우기
address.addEventListener('click', (e) => {
  e.preventDefault();
  addressDetail.focus();
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
  addressDetail.focus();
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
  addressDetail.focus();
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
