//회원 관리 페이지 js
const userContainer = document.getElementById('userContainer');
let data;

//페이지가 로드되었을 때 관리자인지 확인 후  fetch
window.onload = () => {
  const token = localStorage.getItem('Token');
  if(!isAdmin(token)){
    location.href = '/notAdmin';
  }else{
    try {
      fetch('/api/v1/admin/users',{
        method: 'GET',
        headers:{
          "authorization": 'Bearer ' + localStorage.getItem('Token'),
        },
      })
      .then(async (response) => {
        const res = await response.json();
        data = res.data;
        console.log('response: ', res);
        if(response.status === 200){
          console.log('조회성공');
          console.log(res.data);
          userList(res.data);
        }else if(response.status === 403){
          console.log('권한이 없습니다');
        }
      })
    } catch (error) {
      console.log('err: ', error);
    }
  }
}


//백에서 회원정보 불러오는 함수
const userList = () => {
  userContainer.innerHTML = "";
  userContainer.innerHTML += `
    <tr class="userTableHeader">
      <th class='index'>index</th>
      <th class='email'>email</th>
      <th class='username'>username</th>
      <th class='phoneNumber'>phoneNumber</th>
      <th class='address'>address</th>
      <th class='addressDetail'>addressDetail</th>
      <th class='delete'></th>
    </tr>
  `
  for(i = 0; i < data.length; i ++) {
    userContainer.innerHTML += `
      <tr id='${i}' class='userTableBody'> 
        <td class='indexValue'>${i+1}</td>
        <td class='emailValue'>${data[i].email}</td>
        <td class='usernameValue'>${data[i].username}</td>
        <td class='phoneNumberValue'>${data[i].phoneNumber}</td>
        <td class='addressValue'>${data[i].address}</td>
        <td class='addressDetailValue'>${data[i].addressDetail}</td>
        <td><button onclick='userDelete(${i})'>delete</button></td>
      </tr>
    `
  }
}

//삭제하기
const userDelete = (index) => {
  console.log(index);
  try {
    const confirmflag = confirm('정말 삭제하시겠습니까?');
    if(confirmflag){
      fetch('/api/v1/admin/users/' + data[index]._id,{
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
