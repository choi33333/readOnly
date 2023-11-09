//상품 목록 수정 페이지 js
const userContainer = document.getElementById('userContainer');

const imageValue = document.getElementById('imageValue');
const productNameValue = document.getElementById('productNameValue');
const authorValue = document.getElementById('authorValue');
const categoryValue = document.getElementById('categoryValue');
const priceValue = document.getElementById('priceValue');
const releasedDateValue = document.getElementById('releasedDateValue');
const productInfoValue = document.getElementById('productInfoValue');

const productNameController = document.getElementById('productNameAlarm');
const authorController = document.getElementById('authorAlarm');
const categoryController = document.getElementById('categoryAlarm');
const priceController = document.getElementById('priceAlarm');
const releasedDateController = document.getElementById('releasedDateAlarm');
const productInfoController = document.getElementById('productInfoAlarm');

const RegistrationBtn = document.getElementById('RegistrationBtn');
const imageUploader = document.getElementById('imageUploader');
const imageSubmitBtn = document.getElementById('imageSubmitBtn');

let uploadFile;
let imageUrl;

//페이지가 로드되었을 때 관리자인지 확인
window.onload = () => {
  const token = localStorage.getItem('Token');

  if(!isAdmin(token)){
    location.href = '/notAdmin';
  }
}

//등록하기 버튼을 눌렀을 때 백엔드로 데이터 보내기
RegistrationBtn.addEventListener('click', () => {
  const checkValue = inputCheck();
  if(checkValue === 0){
    const data = {
      name: productNameValue.value,
      category: categoryValue.value,
      author: authorValue.value,
      price: priceValue.value,
      imageUrl: imageUrl,
      productInfo: productInfoValue.value,
      releasedDate: releasedDateValue.value,
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
  }
})


//모든 값이 입력되었는지 체크
const inputCheck = () => {
  productNameController.className='alarmoff';
  authorController.className='alarmoff';
  categoryController.className='alarmoff';
  priceController.className='alarmoff';
  releasedDateController.className='alarmoff';
  productInfoController.className='alarmoff';

  let toggle = 0;

  if(productNameValue.value == '') {
    productNameController.innerHTML = '도서명을 입력해주세요';
    productNameController.className = 'alarmon';
    toggle = 1;
  }
  if(authorValue.value == '') {
    authorController.innerHTML = '저자명을 입력해주세요';
    authorController.className = 'alarmon';
    toggle = 1;
  }
  if(categoryValue.value == '') {
    categoryController.innerHTML = '카테고리를 입력해주세요';
    categoryController.className = 'alarmon';
    toggle = 1;
  }
  if(priceValue.value == '') {
    priceController.innerHTML = '가격을 입력해주세요';
    priceController.className = 'alarmon';
    toggle = 1;
  }
  if(releasedDateValue.value == '') {
    releasedDateController.innerHTML = '도서 출시일을 입력해주세요';
    releasedDateController.className = 'alarmon';
    toggle = 1;
  } 
  if(productInfoValue.value == '') {
    productInfoController.innerHTML = '도서 내용을 입력해주세요';
    productInfoController.className = 'alarmon';
    toggle = 1;
  } 
  
  if(toggle === 1) { return 1; }
  else return 0;
}

//도서명 입력을 안했을 때
productNameValue.oninput = () => {
  productNameController.className='alarmoff';

  if(productNameValue.value == '') {
    productNameController.innerHTML = '도서명을 입력해주세요';
    productNameController.className = 'alarmon';
  }
}

//저자명 입력을 안했을 때
authorValue.oninput = () => {
  authorController.className='alarmoff';

  if(authorValue.value == '') {
    authorController.innerHTML = '저자명을 입력해주세요';
    authorController.className = 'alarmon';
  }
}

//카테고리 입력을 안했을 때
categoryValue.oninput = () => {
  categoryController.className='alarmoff';

  if(categoryValue.value == '') {
    categoryController.innerHTML = '카테고리를 입력해주세요';
    categoryController.className = 'alarmon';
  }
}

//가격 입력을 안했을 때
priceValue.oninput = () => {
  priceController.className='alarmoff';

  if(priceValue.value == '') {
    priceController.innerHTML = '가격을 입력해주세요';
    priceController.className = 'alarmon';
  }
}

//도서출시일 입력을 안했을 때
releasedDateValue.oninput = () => {
  releasedDateController.className='alarmoff';

  if(releasedDateValue.value == '') {
    releasedDateController.innerHTML = '도서 출시일을 입력해주세요';
    releasedDateController.className = 'alarmon';
  } 
}

//도서내용 입력을 안했을 때
productInfoValue.oninput = () => {
  productInfoController.className='alarmoff';

  if(productInfoValue.value == '') {
    productInfoController.innerHTML = '도서 내용을 입력해주세요';
    productInfoController.className = 'alarmon';
  } 
}


//이미지 띄우기
const readUrl = (input) => {
  if(input.files && input.files[0]){
    const reader = new FileReader();
    reader.onload = function(e) {
      console.log(e);
      document.getElementById('productImage').src = e.target.result;
      uploadFile = input.files[0];
    }
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('productImage').src = "";
  }
}


//이미지 서버에 저장하고 url 받기
imageSubmitBtn.addEventListener('click', (e) => {
  console.log("asdasd",uploadFile);
  const sendData = new FormData();
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
      console.log('response: ', res);
      if(response.ok){
        console.log('이미지 url 불러오기 성공');
        imageUrl = res.data;
        console.log('imageUrl: ', imageUrl);
      }else if(response.status === 403){
        console.log('권한이 없습니다');
      }
    })
  }
  catch(error){
    console.log('error: ', error);
  }
})


