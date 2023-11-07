function redirectToShoppingCartPage() {
  // 장바구니 페이지 URL로 리다이렉트
  window.location.href = "http://localhost:3000/cart/"; // 장바구니 페이지의 실제 경로로 수정
}
function redirectToOrderCompletePage() {
  // 주문 완료 페이지 URL로 리다이렉트
  window.location.href = "http://localhost:3000/ordercomplete/"; // 주문 완료 페이지의 실제 경로로 수정
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
