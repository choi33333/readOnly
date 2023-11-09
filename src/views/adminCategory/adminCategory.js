//관리자 페이지(카테고리 조회) js
const categoryContainer = document.getElementById('categoryContainer');

//페이지가 로드되었을 때 관리자인지 확인 후  fetch
window.addEventListener('load', async () => { 
  const token = localStorage.getItem('Token');
  if(!isAdmin(token)){
    location.href = '/notAdmin';
  }else{
    try {
      const fetchResult = await fetchCustom('/api/v1/admin/categories','GET',token);
      const fetchData = await fetchResult.json();

      if(fetchResult.status === 200){
        console.log('카테고리 조회 성공');
        console.log(fetchData.data);
        categoryList(fetchData.data);
      }else if(fetchResult.status === 403){
        console.log('권한이 없습니다');
      }
    } catch (error) {
      console.log('err: ', error);
    }
  }
})

const categoryList = (data) => {
    categoryContainer.innerHTML = "";
    categoryContainer.innerHTML += `
    <tr class="categoryTableHeader">
      <th class='index'>index</th>
      <th class='categoryId'>categoryId</th>
      <th class='categoryName'>categoryName</th>
    </tr>
  `
  for(i = 0; i < data.length; i ++) {
    // const releasedDate = data[i].releasedDate.split("T");
    categoryContainer.innerHTML += `
      <tr id='${i}' class='categoryTableBody'> 
        <td class='indexValue'>${i+1}</td>
        <td class='categoryIdValue'>${data[i]._id}</td>
        <td class='categoryNameValue'>${data[i].name}</td>
      </tr>
    `
  }
}