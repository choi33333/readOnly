//상품 목록 수정 페이지 js
const userContainer = document.getElementById('userContainer');

const categoryNameValue = document.getElementById('categoryNameValue');
const categoryNameController = document.getElementById('categoryNameAlarm');
const RegistrationBtn = document.getElementById('RegistrationBtn');


// let uploadFile;
// let imageUrl;

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
      name: categoryNameValue.value,
    }
  
    try {
      fetch('/api/v1/admin/categories',{
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

    alert("등록되었습니다.");
  }
})


//모든 값이 입력되었는지 체크
const inputCheck = () => {
  categoryNameController.className='alarmoff';

  let toggle = 0;

  if(categoryNameValue.value == '') {
    categoryNameController.innerHTML = '카테고리명을 입력해주세요';
    categoryNameController.className = 'alarmon';
    toggle = 1;
  }
  
  if(toggle === 1) { return 1; }
  else return 0;
}

//카테고리명 입력을 안했을 때
categoryNameValue.oninput = () => {
    categoryNameController.className='alarmoff';

  if(categoryNameValue.value == '') {
    categoryNameController.innerHTML = '카테고리명을 입력해주세요';
    categoryNameController.className = 'alarmon';
  }
}





