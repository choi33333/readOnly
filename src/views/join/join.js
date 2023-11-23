const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const username = document.getElementById('username');
const phoneNumber = document.getElementById('phoneNumber');
const address = document.getElementById('address');
const addressDetail = document.getElementById('addressDetail');
const postalCode = document.getElementById('postalCode');
const joinBtn = document.getElementById('joinBtn');


window.addEventListener('load', tokenCheckfunc);


joinBtn.addEventListener('click', async () => {
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
      const fetchResult = await fetchCustom('/api/v1/auth/sign-up','POST', '', data);
      
      if(fetchResult.status == 201){
        location.href = '/joinSuccess';
      }else if(fetchResult.status === 409){
        location.href = '/joinOverlap';
      }
    } catch (error) {
      console.log('err: ', error);
    }
  }
});