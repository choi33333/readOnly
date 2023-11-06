const nameValue = document.getElementById('nameValue');
const emailValue = document.getElementById('emailValue');
const phoneValue = document.getElementById('phoneValue');
const addressValue = document.getElementById('addressValue');
const addressDetailValue = document.getElementById('addressDetailValue');
const postalCode = document.getElementById('postalCode');

//페이지 로딩되었을 때 회원정보 보이도록
window.onload = () => {
  try {
    fetch(URL_PATH.BACK_URL + '/api/users/me',{
      method: 'GET',
      headers:{
        "authorization": 'Bearer ' + localStorage.getItem('Token'),
      },
    })
    .then(async (response) => {
      const res = await response.json();
      console.log('response: ', res);
      if(response.status === 200){
        console.log('성공');
        nameValue.innerText = res.data.username;
        emailValue.innerHTML = res.data.email;
        phoneValue.innerHTML = res.data.phoneNumber;
        postalCode.innerHTML = res.data.postCode;
        addressValue.innerHTML = res.data.address;
        addressDetailValue.innerHTML = res.data.addressDetail;
      }else if(response.status === 401){
        console.log('로그인 필요');
      }
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  } catch (error) {
    console.log('err: ', error);
  }
}
