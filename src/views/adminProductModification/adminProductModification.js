//상품 수정 페이지 js
const productNameValue = document.getElementById('productNameValue');
const authorValue = document.getElementById('authorValue');
const categoryValue = document.getElementById('categoryValue');
const priceValue = document.getElementById('priceValue');
const releasedDateValue = document.getElementById('releasedDateValue');
const productInfoValue = document.getElementById('productInfoValue');

const productImage = document.getElementById('productImage');

const ModificationBtn = document.getElementById('ModificationBtn');

let uploadFile;
let imageUrl;
let findCompleteData;

//페이지가 로드되었을 때 관리자인지 확인 후  fetch
window.addEventListener('load', async () => { 
  const token = localStorage.getItem('Token');
  if(!isAdmin(token)){
    location.href = '/notAdmin';
  }else{
    try {
      const fetchResult = await fetchCustom('/api/v1/admin/products/','GET',token);
      const fetchData = await fetchResult.json();

      if(fetchResult.status === 200){
        //console.log('상품 조회 성공');
        //console.log(fetchData.data);
        // fetchDataList = fetchData.data

        const urlParser = window.location.search;
        const urlSplit = urlParser.split('=');
        const urlSearchId = urlSplit[urlSplit.length-1];
        //console.log(urlSearchId);
        const finded = fetchData.data.find((element) => element._id === urlSearchId);
        //console.log('finded', finded);
        findCompleteData = finded;
        const releasedDate = finded.releasedDate.split("T");

        productImage.src = finded.imageUrl;
        productNameValue.value = finded.name;
        authorValue.value = finded.author;
        categoryValue.value = finded.categoryName;
        priceValue.value = finded.price;
        releasedDateValue.value = releasedDate[0];
        productInfoValue.value = finded.productInfo;

      }else if(fetchResult.status === 403){
        //console.log('권한이 없습니다');
      }
    } catch (error) {
      console.log('err: ', error);
    }
  }
})

//수정하기 버튼 클릭했을 때
ModificationBtn.addEventListener('click', () => {
  const urlParser = window.location.search;
  const urlSplit = urlParser.split('=');
  const urlSearchId = urlSplit[urlSplit.length-1];
  //console.log('adadada', urlSearchId);
  let requestData = {
    name: productNameValue.value,
    category: categoryValue.value,
    author: authorValue.value,
    price: priceValue.value,
    imageUrl: imageUrl ? imageUrl : findCompleteData.imageUrl,
    productInfo: productInfoValue.value,
    releasedDate: releasedDateValue.value,
  };
  //console.log('request', requestData);
  try {
    fetch('/api/v1/admin/products/' + urlSearchId , {
      method: 'PUT',
      headers:{
        "Content-Type": "application/json", //(post,put,delete)항상 필수적으로 추가해야함!!
        "authorization": 'Bearer ' + localStorage.getItem('Token'),
      },
      body: JSON.stringify(requestData),
    })
    .then(async (response) => {
      const res = await response.json();
      //console.log('response: ', res);
      //백엔드에서 status 붙이지 않으면 default값으로 status 200 옴(ok)
      if(response.status === 200){
        //console.log('성공');
        location.href = '/adminDeleteProduct';
      }else if(response.status === 401){
        //console.log('로그인 필요');
      }
    })
  } catch (error) {
    console.log('err: ', error);
  }
})

//이미지 띄우기
const readUrl = (input) => {
  if(input.files && input.files[0]){
    let reader = new FileReader();
    reader.onload = function(e) {
      //console.log('eeeee', e);
      productImage.src = e.target.result;
      uploadFile = input.files[0];
    }
    reader.readAsDataURL(input.files[0]);
  } else {
    productImage.src = "";
  }
}

//이미지 서버에 저장하고 url 받기
imageSubmitBtn.addEventListener('click', (e) => {
  //console.log("asdasd",uploadFile);
  let sendData = new FormData();
  sendData.append('image', uploadFile);

  try{
    fetch('/api/v1/upload', {
      method: 'POST',
      headers: {
        "Content_Type": "multipart/form-data",
        "authorization": 'Bearer ' + localStorage.getItem('Token'),
      },
      body: sendData,
    })
    .then(async (response) => {
      const res = await response.json();
      data = res.data;
      //console.log('response: ', res);
      if(response.ok){
        //console.log('이미지 url 불러오기 성공');
        imageUrl = res.data;
        //console.log('imageUrl: ', imageUrl);
        alert('이미지가 변경 되었습니다');
      }else if(response.status === 403){
        //console.log('권한이 없습니다');
      }
    })
  }
  catch(error){
    console.log('error: ', error);
  }
})