//관리자 페이지(상품 목록 조회) js
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

//페이지가 로드되었을 때 관리자인지 확인 후  fetch
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

// const registrationImage = (input) => {
//   let sendData = new FormData();
//   sendData.append('image', input);

//   fetch('~~~~', {
//     headers: {
//       "Content_Type": "multipart/form-data"
//     },
//     body: sendData
//   })
// }