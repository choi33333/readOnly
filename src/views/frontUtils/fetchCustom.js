/**
 * 
 * @param {string} url api_url
 * @param {string} method GET | POST | PUT | DELETE
 * @param {object} data 백엔드에 보내기 위한 데이터(default = null)
 * @param {string} token jwt_token(default = '') 토큰이 없는경우, 3번째 인자에 '' 넣어줄것!
 * @returns 
 */
async function fetchCustom(url,method,token = '',data = null) {
  const headers = {
    "Content-Type": "application/json",
  }
  if(token){
    headers["authorization"] = 'Bearer ' + token;
  }
  const option = {
    method: method,
    headers:headers
  };
  if(method == 'GET'){
    if(data){
      url += '?' + ( new URLSearchParams( params ) ).toString();
    }
  }else if(method == 'POST' || method == 'PUT' || method == 'DELETE'){
    option.body = JSON.stringify(data);
  }
  return fetch(url,option);
}