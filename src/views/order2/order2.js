/* 주문완료페이지이동 */
function newPage()  {
  window.open('http://127.0.0.1:5500/ordercomplete.html');
}
/*배송지*/
function execDaumPostcode() {
new daum.Postcode( {
  oncomplete: function( data ) {
     document.getElementById( 'zip-code' ).value = data.zonecode;
     document.getElementById( 'address-1' ).value = data.address;
    }
  }).open();
}
