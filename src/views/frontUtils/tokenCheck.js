const tokenCheckfunc =  () => {
  const token = localStorage.getItem('Token');
  if(token){
    location.href = '/';
  }
}