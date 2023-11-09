//상품 수정 페이지 js
const productNameValue = document.getElementById('productNameValue');
const authorValue = document.getElementById('authorValue');
const categoryValue = document.getElementById('categoryValue');
const priceValue = document.getElementById('priceValue');
const releasedDateValue = document.getElementById('releasedDateValue');
const productInfoValue = document.getElementById('productInfoValue');


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
        console.log('상품 조회 성공');
        console.log(fetchData.data);

        const urlParser = window.location.search;
        const urlSplit = urlParser.split('=');
        const urlSearchId = urlSplit[urlSplit.length-1];
        console.log(urlSearchId);
        const finded = fetchData.data.find((element) => element._id === urlSearchId);
        console.log(finded);

        const releasedDate = finded.releasedDate.split("T");

        productNameValue.value = finded.name;
        authorValue.value = finded.author;
        categoryValue.value = finded.categoryName;
        priceValue.value = finded.price;
        releasedDateValue.value = releasedDate[0];
        productInfoValue.value = finded.productInfo;

      }else if(fetchResult.status === 403){
        console.log('권한이 없습니다');
      }
    } catch (error) {
      console.log('err: ', error);
    }
  }
})


//이미지 띄우기
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