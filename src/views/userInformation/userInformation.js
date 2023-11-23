const nameValue = document.getElementById('nameValue');
const emailValue = document.getElementById('emailValue');
const phoneValue = document.getElementById('phoneValue');
const addressValue = document.getElementById('addressValue');
const addressDetailValue = document.getElementById('addressDetailValue');
const postalCode = document.getElementById('postalCode');
const withdrawal = document.getElementById('withdrawal');


//페이지 로딩되었을 때 회원정보 보이도록
window.addEventListener('load', async () => {
  const token = localStorage.getItem('Token');
  if(token){
    try {
      const fetchResult = await fetchCustom('/api/v1/users/me','GET', token);
      const fetchData = await fetchResult.json();
      
      if(fetchResult.status == 200){
        // console.log(fetchData);
        nameValue.innerText = fetchData.data.username;
        emailValue.innerHTML = fetchData.data.email;
        phoneValue.innerHTML = fetchData.data.phoneNumber;
        postalCode.innerHTML = fetchData.data.postCode;
        addressValue.innerHTML = fetchData.data.address;
        addressDetailValue.innerHTML = fetchData.data.addressDetail;
      }else if(fetchResult.status === 401){
        location.href = '/login';
      }
    } catch (error) {
      console.log('err: ', error);
    }
  }else {
    location.href = '/login';
  }
})


//회원탈퇴
withdrawal.addEventListener('click', async () => {
  const token = localStorage.getItem('Token');
  try {
    const confirmflag = confirm('정말 탈퇴하시겠습니까?');

    const fetchResult = await fetchCustom('/api/v1/users/withdraw','DELETE', token);
    
    if(confirmflag){
      if(fetchResult.status === 204){
        //console.log('성공');
        localStorage.removeItem('Token');
        return location.href = '/mainpage';
      }
    }else {
      console.log("취소");
    }
  } catch (error) {
    console.log('err2: ', error);
  }
})