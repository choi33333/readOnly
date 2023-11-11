//카테고리 select 불러오기

const categoryS = document.getElementById('categoryValue');

window.addEventListener('load', async () => {
  const token = localStorage.getItem('Token');

  if(!isAdmin(token)){
    location.href = '/notAdmin';
  } else {
    try {
      const fetchResult = await fetchCustom('/api/v1/admin/categories','GET', token);
      const fetchData = await fetchResult.json();
      
      if(fetchResult.status == 200){
        const categoryData = fetchData.data;
        for(let i =0; i < categoryData.length; i++){
          const selectdata = categoryData[i].name;
          categoryValue.innerHTML += `
            <option value=${selectdata}>${selectdata}</option>
          `
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
});