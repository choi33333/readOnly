document.addEventListener('DOMContentLoaded', (event) => {
    const orderNumberInput = document.getElementById('orderNumber');
    const orderResultsTableBody = document.getElementById('orderResults');
    document.getElementById('searchButton').addEventListener('click', async function (event) {
     event.preventDefault();
     const orderNumber = orderNumberInput.value;
    
    try {
        const response = await fetch('/api/v1/orders/me', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('Token'),
            }
        });

        if (response.status === 200) {
            const res = await response.json();
            const orderData = res.data;

            orderResultsTableBody.innerHTML = '';

            let orderFound = false;
            for (const order of orderData) {
                if (order.orderNumber === orderNumber) {
                    orderFound = true;
                    for (const product of order.products) {
                        // 상품 정보 api 호출
                        const productResponse = await fetch('/api/v1/products/' , {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": 'Bearer ' + localStorage.getItem('Token'),
                            }
                        });

                        if (productResponse.ok) {
                            const productData = await productResponse.json();
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${order.orderNumber}</td>
                                <td>${productData.productId}</td> 
                                <td>${productData.quantity}</td> 
                                <td>${order.orderStatus}</td>
                                <td><button class="cancel-button" data-order-number="${order.orderNumber}">주문 취소</button></td>
                            `;
                            orderResultsTableBody.appendChild(row);
                        } else {
                            console.error('상품 정보 가져오기 실패: ', productResponse.status);
                        }
                    }
                    break;
                }
            }

            if (!orderFound) {
                const noOrderRow = document.createElement('tr');
                noOrderRow.innerHTML = '<td colspan="6">주문을 찾을 수 없습니다.</td>';
                orderResultsTableBody.appendChild(noOrderRow);
            }
        } else {
            console.error('API 요청 실패: ', response.status);
        }
    } catch (error) {
        console.error('주문 데이터 가져오기 오류: ', error);
    }
    });
});