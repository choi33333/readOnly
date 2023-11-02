//로그인 페이지 js
const loginBtn = document.getElementById('loginBtn');
const email = document.getElementById('email');
const password = document.getElementById('password');


//로그인 버튼을 눌렀을 때 백엔드로 입력값 보내기(아직은 console만)
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
    console.log(
      `
      email: ${email.value}
      password: ${password.value}
      `
    )
});

