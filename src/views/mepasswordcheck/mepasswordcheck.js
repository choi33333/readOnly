/* 사용자 정보 비밀번호 확인 페이지 js */
const btn = document.getElementById('btn');
const password = document.getElementById('password');

const loginController = document.getElementById('loginAlarm');

btn.addEventListener('click', async () => {
  const token = localStorage.getItem('Token');
  try {
    const data = {
      password: password.value,
    }
    const fetchResult = await fetchCustom('/api/v1/users/me/passcheck','POST',token,data);
    
    if(fetchResult.status == 201){
      window.localStorage.setItem('checkOk', 'ok');
      location.href = '/changeUserInformation'
    }else if(fetchResult.status === 401){
      loginController.innerHTML = '비밀번호가 틀렸습니다';
      loginController.className = 'alarmon';
    }
  } catch (error) {
    console.log('err: ', error);
  }
})
