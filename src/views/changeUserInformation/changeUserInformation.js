const nameValue = document.getElementById('nameValue');
const emailValue = document.getElementById('emailValue');
const phoneValue = document.getElementById('phoneValue');
const addressValue = document.getElementById('addressValue');
const addressDetailValue = document.getElementById('addressDetailValue');
const postalCode = document.getElementById('postalCode');
const passwordValue = document.getElementById('passwordValue');
const repasswordValue = document.getElementById('repasswordValue');
const phoneNumber = document.getElementById('phoneValue');

const passwordController = document.getElementById('passwordAlarm');
const repasswordController = document.getElementById('repasswordAlarm');
const phoneNumberController = document.getElementById('phoneNumberAlarm');

const cancelBtn = document.getElementById('cancelBtn');
const completBtn = document.getElementById('completBtn');


//페이지 로딩되었을 때 회원정보 보이도록
window.onload = () => {
  const checkOk = localStorage.getItem('checkOk');
  if(checkOk){
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
          console.log('불러오기 성공');
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
  } else {
    location.href = '/mepasswordcheck'
  }
}


//취소버튼 클릭했을 때
cancelBtn.addEventListener('click', () => {
  location.href = '/userInformation';
})


//완료버튼 클릭했을 때
completBtn.addEventListener('click', () => {
  const checkValue = passwordinputCheck();
  if(checkValue === 0){
    try {
      const data = {
        password: passwordValue.value,
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
          if(!data.password){
            location.href = '/userInformation'
          }else{
            localStorage.removeItem('Token');
            location.href = '/'
          }

        }else if(response.status === 401){
          console.log('로그인 필요');
        }
      })
    } catch (error) {
      console.log('err: ', error);
    }
  }
})

const passwordinputCheck = () => {
  passwordController.className='alarmoff';
  repasswordController.className='alarmoff';

  let toggle = 0;

  if(!passwordCheck(passwordValue.value)){
    passwordController.innerHTML = '비밀번호 형식이 올바르지 않습니다';
    passwordController.className = 'alarmon';
    toggle = 1;
  }

  if(repasswordValue.value == ''){
    repasswordController.innerHTML = '비밀번호 확인을 해주세요';
    repasswordController.className = 'alarmon';
    toggle = 1;
  }else if(passwordValue.value !== repasswordValue.value) {
    repasswordController.innerHTML = '비밀번호가 일치하지 않습니다';
    repasswordController.className = 'alarmon';
    toggle = 1;
  }

  if(passwordValue.value == ''){
    toggle = 0;
  }
  if(passwordValue.value == '' && repasswordValue.value == ''){
    toggle = 0;
  }

  if(toggle === 1) { return 1; }
  else return 0;
}

//비밀번호 형식이 올바르지 않을 때
passwordValue.oninput = () => {
  passwordController.className='alarmoff';

  if(passwordValue.value == '' && repasswordValue.value == ''){
    repasswordController.className = 'alarmoff';
  }else if(passwordValue.value == ''){
    passwordController.className = 'alarmoff';
  }else if(!passwordCheck(passwordValue.value)){
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
repasswordValue.oninput = () => {
  repasswordController.className='alarmoff';

  if(passwordValue.value !== '' && repasswordValue.value == ''){
    repasswordController.innerHTML = '비밀번호 확인을 해주세요';
    repasswordController.className = 'alarmon';
  }else if(passwordValue.value == '' && repasswordValue.value == ''){
    repasswordController.className = 'alarmoff';
  }else if(passwordValue.value !== repasswordValue.value) {
    repasswordController.innerHTML = '비밀번호가 일치하지 않습니다';
    repasswordController.className = 'alarmon';
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