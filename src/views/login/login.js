//로그인 페이지 js

const loginBtn = document.getElementById('loginBtn');
const email = document.getElementById('email');
const password = document.getElementById('password');

const emailController = document.getElementById('emailAlarm');
const passwordController = document.getElementById('passwordAlarm');

const loginController = document.getElementById('loginAlarm');

window.addEventListener('load', tokenCheckfunc);

//로그인 버튼을 눌렀을 때 백엔드로 입력값 보내기
loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const checkValue = logininputCheck();
  if(checkValue === 0){
    const data = {
      email: email.value,
      password: password.value,
    }

    try {
      const fetchResult = await fetchCustom('/api/v1/auth/sign-in','POST','',data);
      const fetchData = await fetchResult.json();
      
      if(fetchResult.status == 201){
        //console.log('성공');
        window.localStorage.setItem('Token', fetchData.data);
        location.href = '/mainpage/';
      }else if(fetchResult.status === 400){
        loginController.innerHTML = '이메일이나 비밀번호가 틀렸습니다';
        loginController.className = 'alarmon';
      }
    } catch (error) {
      console.log('error: ', error);
    }
    
  }
});

const logininputCheck = () => {
  emailController.className='alarmoff';
  passwordController.className='alarmoff';

  let toggle = 0;

  if(email.value == '') {
    emailController.innerHTML = '이메일을 입력해주세요';
    emailController.className = 'alarmon';
    toggle = 1;
  }
  if(password.value == '') {
    passwordController.innerHTML = '비밀번호를 입력해주세요';
    passwordController.className = 'alarmon';
    toggle = 1;
  }

  if(toggle === 1) { return 1; }
  else return 0;
}


//이메일
email.oninput = (e) => {
  emailController.className='alarmoff';
  
  if(email.value == '') {
    emailController.innerHTML = '이메일을 입력해주세요';
    emailController.className = 'alarmon';
  }
}


//비밀번호
password.oninput = () => {
  passwordController.className='alarmoff';

  if(password.value == '') {
    passwordController.innerHTML = '비밀번호를 입력해주세요';
    passwordController.className = 'alarmon';
  }
}