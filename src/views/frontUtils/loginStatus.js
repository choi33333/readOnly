//로그인 여부에 따라 메인페이지 header변경

const pageRoute = document.getElementById('pageRoute');

window.addEventListener('load', () => {
  pageRouteList();
})

const pageRouteList = () => {
  const token = localStorage.getItem('Token');

  if(!token){
    console.log('로그아웃 상태');
    pageRoute.innerHTML = `
      <a href="/join" class="register">회원가입</a>
      <a href="/login" class="logIn">로그인</a>
      <a href="/cart" class="cart">장바구니</a>
      `
  }else{
    if(!isAdmin(token)){
      console.log('일반회원 로그인 상태');
      pageRoute.innerHTML = `
        <a href="/userInformation" class="mypage">마이페이지</a>
        <a href="/cart" class="cart">장바구니</a>
        <a href="/" id="logOut">로그아웃</a>
      `
    }else if(isAdmin(token)){
      console.log('관리자 로그인 상태');
      pageRoute.innerHTML = `
        <a href="/adminProduct" class="admin">관리자페이지</a>
        <a href="/userInformation" class="mypage">마이페이지</a>
        <a href="/cart" class="cart">장바구니</a>
        <a href="/" id="logOut">로그아웃</a>
      `
    }
    const logOut = document.getElementById('logOut');
    logOut.addEventListener('click', logOutStatus);
  }
}


//로그아웃 하는 함수
function logOutStatus() {
  localStorage.removeItem('Token');
  localStorage.removeItem('checkOk');
}