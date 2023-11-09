//관리자 페이지(상품 목록 조회) js
const userContainer = document.getElementById('userContainer');
const modifyBtn = document.getElementById('modifyBtn');

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
        productList(fetchData.data);
      }else if(fetchResult.status === 403){
        console.log('권한이 없습니다');
      }
    } catch (error) {
      console.log('err: ', error);
    }
  }
})

const productList = (data) => {
  userContainer.innerHTML = "";
  userContainer.innerHTML += `
    <tr class="userTableHeader">
      <th class='index'>index</th>
      <th class='bookId'>Id</th>
      <th class='bookname'>bookname</th>
      <th class='author'>author</th>
      <th class='category'>category</th>
      <th class='price'>price</th>
      <th class='releasedDate'>releasedDate</th>
      <th class='modify'></th>
      <th class='delete'></th>
    </tr>
  `
  for(i = 0; i < data.length; i ++) {
    const releasedDate = data[i].releasedDate.split("T");
    userContainer.innerHTML += `
      <tr id='${i}' class='userTableBody'> 
        <td class='indexValue'>${i+1}</td>
        <td class='bookIdValue'>${data[i]._id}</td>
        <td class='booknameValue'>${data[i].name}</td>
        <td class='authorValue'>${data[i].author}</td>
        <td class='categoryValue'>${data[i].categoryName}</td>
        <td class='priceValue'>${data[i].price}</td>
        <td class='releasedDateValue'>${releasedDate[0]}</td>
        <td><button onclick='productModify("${data[i]._id}")'>modify</button></td>
        <td><button onclick='productDelete(${i})'>delete</button></td>
      </tr>
    `
  }
}


//수정하기 버튼
const productModify = (index) => {
  location.href = '/adminProductModification' + '?_id=' + index;
}



//삭제하기 버튼
const productDelete = (index) => {
  console.log(index);
  try {
    const confirmflag = confirm('정말 삭제하시겠습니까?');
    if(confirmflag){
      fetch('/api/v1/admin/products/' + data[index]._id,{
        method: 'DELETE',
        headers:{
          "Content-Type": "application/json",
          "authorization": 'Bearer ' + localStorage.getItem('Token'),
        },
      })
      .then(async (response) => {
        const res = await response.json();
        console.log('response2: ', res);
        if(response.status === 200){
          console.log('삭제성공');
          location.replace(location.href);
        }
      })
    }else{
      console.log("취소");
    }
  } catch (error) {
    console.log('err2: ', error);
  }
}
