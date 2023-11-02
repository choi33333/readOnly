//임시 데이터
let bookdata = [
    { bookname: '책이름1', author: '도라에몽', price: 3000, count: 1},
    { bookname: '책이름2', author: '진구', price: 4000, count: 1},
    { bookname: '책이름3', author: '비실이', price: 2000, count: 1},
]
let cartArr = JSON.parse(localStorage.getItem('bookdata'));
let sumPrice = 0;


// 만약 localStorage에서 받아온 값이 있으면 장바구니 표출, 아닐경우 카트가 비었다고 표시하기 위한 소스
if (cartArr?.length > 0) {
    cartArr.forEach((data,index) => {
        document.querySelector('.cart_product').innerHTML +=
    `<div id=${index} class="cart_card">
        <div class="card_imgDiv">
            <div>사진</div>
        </div>
        <div class="card_namePrice">
            <div class="bookname">${data.bookname}</div>
            <div class="bookprice">${data.price}원</div>
        </div>
        <div class="card_cntPrice">
            <div id='sum${index}' class="book_totalPrice">${data.price*data.count}원</div>
            <div class="book_cntbtn">
                <button class="minusbtn ${index}">-</button>
                <div id=count${index} class="countvalue">${data.count}  </div>
                <button class="plusbtn ${index}">+</button>
            </div>
        </div>
        <div class="card_del">
            <button class='carddelete ${index}'>삭제</button>
        </div>
    </div>`
    
    sumPrice += data.price * data.count;
    })
    // console.log(sumPrice);
    document.querySelector('.totalprice').innerHTML=`결제 예정금액 ${sumPrice}원`
    sumPrice=0;
}
else {
    document.querySelector('.cart_product').innerHTML = `<div>장바구니가 비었습니다!</div>`
}

const bookcard = document.querySelector('.cart_card');
//querySelector로 선택
const plusbtn = document.querySelectorAll('.plusbtn');
const minusbtn = document.querySelectorAll('.minusbtn');
const deletebtn = document.querySelectorAll('.carddelete');
const localbtn = document.querySelector('.setlocal');
const removebtn = document.querySelector('.remove');
//카운트 증가 소스
plusbtn.forEach(plusbtn => plusbtn.addEventListener
    ('click', function () {
        const id = plusbtn.classList[1];
        cartArr[id].count += 1;
        document.getElementById(`count${id}`).innerHTML = `${cartArr[id].count}`;
        localStorage.setItem('bookdata', JSON.stringify(cartArr))
        document.getElementById(`sum${id}`).innerHTML = `${cartArr[id].count*cartArr[id].price}원`
        totalsum();
        totalPrice=0;
    }))
//카운트 감소 소스
minusbtn.forEach(minusbtn=> minusbtn.addEventListener
('click',function(){
    const id = minusbtn.classList[1];
    console.log(id)
    cartArr[id].count -= 1;
    if(cartArr[id].count<=1){
        cartArr[id].count = 1;
    }
    console.log(cartArr[id].count)
    document.getElementById(`count${id}`).innerHTML = `${cartArr[id].count}`;
    localStorage.setItem('bookdata', JSON.stringify(cartArr))
    document.getElementById(`sum${id}`).innerHTML = `${cartArr[id].count*cartArr[id].price}원`
    totalsum();
    totalPrice=0;
}
))
//card 삭제 소스
deletebtn.forEach(deletebtn=>deletebtn.addEventListener('click',
function(){
    const id = deletebtn.classList[1];
    cartArr.splice(id,1);
    localStorage.setItem('bookdata', JSON.stringify(cartArr))
    totalsum();
    location.reload();
    totalPrice=0;
}))
//일단 임시 localStorage 사용을 위한 함수
const setLocal = () => {
    localStorage.setItem('bookdata', JSON.stringify(bookdata));
    console.log('성공');
    location.reload();
}
//localStorage 내부 청소 소스
const remove = () => {
    localStorage.clear();
}
//총 결제 예정금액
const totalsum = () => {
    cartArr.forEach(data=>{
        sumPrice += data.price*data.count;
    })
    console.log(sumPrice);
    const totalPrice=sumPrice;
    sumPrice =0;
    document.querySelector('.totalprice').innerHTML=`결제 예정금액 ${totalPrice}원`
    
}
//
localbtn.addEventListener('click', setLocal);
//장바구니 담기 소스
document.querySelector('.addbook').addEventListener('click',function(){
    cartArr.push({ bookname: '책이름1', author: '도라에몽', price: 3000, count: 1,},
    )
    localStorage.setItem('bookdata', JSON.stringify(cartArr))
    totalsum();
    location.reload();
})
//전체삭제 구현 소스
document.querySelector('.removeall').addEventListener('click',function(){
    cartArr=[];
    localStorage.setItem('bookdata',JSON.stringify(cartArr))
    location.reload();
})
document.querySelector('.test').addEventListener('click',function(){
    console.log(a[0].price)
})
//localstoregy 지우기 위한 용도
// removebtn.addEventListener('click', remove);
const changeprice = () =>{
    
}