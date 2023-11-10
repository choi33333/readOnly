const nameValue = document.getElementById('nameValue');
const emailValue = document.getElementById('emailValue');
const phoneValue = document.getElementById('phoneValue');
const addressValue = document.getElementById('addressValue');
const addressDetailValue = document.getElementById('addressDetailValue');
const postalCode = document.getElementById('postalCode');
const withdrawal = document.getElementById('withdrawal');

//페이지 로딩되었을 때 회원정보 보이도록
window.onload = () => {
  const token = localStorage.getItem('Token');
  if(token){
    try {
      fetch('/api/v1/users/me',{
        method: 'GET',
        headers:{
          "authorization": 'Bearer ' + localStorage.getItem('Token'),
        },
      })
      .then(async (response) => {
        const res = await response.json();
        //console.log('response: ', res);
        if(response.status === 200){
          //console.log('성공');
          nameValue.innerText = res.data.username;
          emailValue.innerHTML = res.data.email;
          phoneValue.innerHTML = res.data.phoneNumber;
          postalCode.innerHTML = res.data.postCode;
          addressValue.innerHTML = res.data.address;
          addressDetailValue.innerHTML = res.data.addressDetail;
        }else if(response.status === 401){
          //console.log('로그인 필요');
        }
      })
    } catch (error) {
      console.log('err: ', error);
    }
  }else {
    location.href = '/login';
  }
  
}


//회원탈퇴
withdrawal.addEventListener('click', () => {
  try {
    const confirmflag = confirm('정말 탈퇴하시겠습니까?');
    if(confirmflag){
      fetch('/api/v1/users/withdraw',{
        method: 'DELETE',
        headers:{
          "Content-Type": "application/json",
          "authorization": 'Bearer ' + localStorage.getItem('Token'),
        },
      })
      .then(async (response) => {
        const res = await response.json();
        //console.log('response2: ', res);
        if(response.status === 200){
          //console.log('성공');
          localStorage.removeItem('Token');
          return location.href = '/'
        }
      })
    }else{
      //console.log("취소");
    }
  } catch (error) {
    console.log('err2: ', error);
  }
})