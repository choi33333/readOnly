/**
 * 관리자인지 확인하는 유틸
 * @author uiyeon
 * @param {String} token 
 * @returns {Boolean} isAdmin true:관리자,false:일반회원
 */
function isAdmin(token){
  const payload = decodeURIComponent(atob(token.split('.')[1]));
  const role = JSON.parse(payload).ro;
  if(role === 'customer'){
    return false;
  }else {
    return true;
  }
}