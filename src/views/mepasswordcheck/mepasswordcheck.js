/* 사용자 정보 비밀번호 확인 페이지 js */

const btn = document.getElementById('btn');
const password = document.getElementById('password');

const loginController = document.getElementById('loginAlarm');

btn.addEventListener('click', () => {
  try {
    const data = {
      password: password.value,
    }

    fetch('/api/v1/users/me/passcheck', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json", //(post,put,delete)항상 필수적으로 추가해야함!!
        "authorization": 'Bearer ' + localStorage.getItem('Token'),
      },
      body: JSON.stringify(data),
    })
    .then(async (response) => {
      const res = await response.json();
      //console.log('response: ', res);
      if(response.status === 200){
        window.localStorage.setItem('checkOk', 'ok');
        location.href = '/changeUserInformation'
      }else if(response.status === 401){
        loginController.innerHTML = '비밀번호가 틀렸습니다';
        loginController.className = 'alarmon';
      }
    })
  } catch (error) {
    console.log('err: ', error);
  }
})