//관리자 페이지(상품 목록 조회) js
const userContainer = document.getElementById('userContainer');

const imageValue = document.getElementById('imageValue');
const productNameValue = document.getElementById('productNameValue');
const authorValue = document.getElementById('authorValue');
const categoryValue = document.getElementById('categoryValue');
const priceValue = document.getElementById('priceValue');
const releasedDateValue = document.getElementById('releasedDateValue');
const productInfoValue = document.getElementById('productInfoValue');
const RegistrationBtn = document.getElementById('RegistrationBtn');
const imageUploader = document.getElementById('imageUploader');

//페이지가 로드되었을 때 관리자인지 확인 후  fetch
// window.addEventListener('load', async () => { 
//   const token = localStorage.getItem('Token');
//   if(!isAdmin(token)){
//     location.href = '/notAdmin';
//   }else{

//     const data = {
//       productName: productNameValue.value,
//       category: categoryValue.value,
//       author: authorValue.value,
//       price: priceValue.value,
//       image: imageValue.value,
//       releasedDate: releasedDateValue.value,
//       productInfo: productInfoValue.value,
//     }

//     try {
//       const fetchResult = await fetchCustom('/api/v1/admin/products','POST',token,data);
//       const fetchData = await fetchResult.json();

//       if(fetchResult.status === 200){
//         console.log('상품 조회 성공');
//         console.log(fetchData.data);
//       }else if(fetchResult.status === 403){
//         console.log('권한이 없습니다');
//       }
//     } catch (error) {
//       console.log('err: ', error);
//     }
//   }
// })



// //페이지가 로드되었을 때 관리자인지 확인 후  fetch
window.onload = () => {
  const token = localStorage.getItem('Token');

  if(!isAdmin(token)){
    location.href = '/notAdmin';
  }
}


RegistrationBtn.addEventListener('click', () => {
  const data = {
    name: productNameValue.value,
    category: categoryValue.value,
    author: authorValue.value,
    price: priceValue.value,
    imageUrl: imageValue.value,
    releasedDate: releasedDateValue.value,
    productInfo: productInfoValue.value,
  }

  try {
    fetch('/api/v1/admin/products',{
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        "authorization": 'Bearer ' + localStorage.getItem('Token'),
      },
      body: JSON.stringify(data),
    })
    .then(async (response) => {
      const res = await response.json();
      data = res.data;
      console.log('response: ', res);
      if(response.status === 201){
        console.log('201성공');
        console.log(res.data);
      }else if(response.status === 403){
        console.log('권한이 없습니다');
      }
    })
  } catch (error) {
    console.log('err: ', error);
  }
})

const readUrl = (input) => {
  if(input.files && input.files[0]){
    let reader = new FileReader();
    reader.onload = function(e) {
      console.log(e);
      document.getElementById('productImage').src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('productImage').src = "";
  }
}

const registrationImage = (input) => {
  let sendData = new FormData();
  sendData.append('image', input);

  fetch('~~~~', {
    headers: {
      "Content_Type": "multipart/form-data"
    },
    body: sendData
  })
}