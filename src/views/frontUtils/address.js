//카카오 API를 활용하여 주소창 띄우기
address.addEventListener('click', (e) => {
  e.preventDefault();
  addressDetail.focus();
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
  addressDetail.focus();
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
  addressDetail.focus();
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
