//관리자 페이지 js
let data;

//페이지가 로드되었을 때 관리자인지 확인
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