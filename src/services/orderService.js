const { OrderModel } = require('../models');

const orderService = {
    
    // 주문하기
    async createOrder(orderData, em){
        const { orderedBy, postCode, address, addressDetail, phoneNumber, products } = orderData;
        const date = new Date();

        // 서버연결없이도 겹치지않는 난수만들기
        const orderNumber = date.getTime().toString().slice(5) + String(Math.floor(Math.random()*10000)).padStart(4,"0");

        const order = await OrderModel.create({
            orderNumber: orderNumber,
            orderedBy: orderedBy,
            postCode: postCode,
            address: address,
            addressDetail: addressDetail,
            phoneNumber: phoneNumber,
            orderStatus: "결제 완료",
            products: products,
            orderedEmail: em,
        });

        return order;
    },

    // 전체 주문조회
    async getOrders(em){
        const orders = await OrderModel.find({ orderedEmail : em }).lean();

        if (orders == 0) {
            const error = new Error("주문이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        };

        return orders;
    },

    // 주문조회(id)
    async getOneOrder(id){
        const order = await OrderModel.findById(id).lean();

        if (order == 0) {
            const error = new Error("주문이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        };

        return order;
    },

    // 주문조회(orderNumber)
    async getOrderByOrderNum(orderNumber){
        const order = await OrderModel.findOne({ orderNumber : orderNumber }).lean();

        if (order == 0) {
            const error = new Error("주문이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        };

        return order;
    },
    
    // 주문수정
    async updateOrder(id, orderData){
        const { orderedBy, postCode, address, addressDetail,phoneNumber } = orderData;

        const order = await OrderModel.findById(id).lean();

        if (!order) {
            const error = new Error("주문이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        };

        if (order.orderStatus != "결제 완료")
        {
            const error = new Error("주문수정이 불가능합니다.");
            error.status = 401;
            throw error;
        };

        const updatedOrder = await OrderModel.updateOne(
        { _id : id },     
        {
            orderedBy: orderedBy,
            postCode: postCode,
            address: address,
            addressDetail: addressDetail,
            phoneNumber: phoneNumber,
        });

        return updatedOrder;
    },

    // 주문수정(주문취소후 배송상태 변경 때문)
    async updateOrderStatus(id, orderStatus){
        const order = await OrderModel.findById(id).lean();

        if (!order) {
            const error = new Error("주문이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        };

        if (!order) {
            const error = new Error("주문이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        };

        const updatedOrderStatus = await OrderModel.updateOne(
        { _id : id },
        {
            orderStatus : orderStatus,
        });

        return updatedOrderStatus;
    },

    // 주문취소
    async deleteOrder(id){
        const order = await OrderModel.findById(id)
    .lean();

        if (!order) {
            const error = new Error("주문이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        }

        const deletedOrder = await OrderModel.findOneAndDelete({ _id : id });

        return deletedOrder;
    },

    // 비회원 주문하기
    async nonMemberOrder(orderData){
        const { orderedBy, postCode, address, addressDetail, phoneNumber, products } = orderData;

        const date = new Date();
        // 서버연결없이도 겹치지않는 난수만들기
        const orderNumber = date.getTime().toString().slice(5) + String(Math.floor(Math.random()*10000)).padStart(4,"0");

        const order = await OrderModel.create({
            orderNumber: orderNumber,
            orderedBy: orderedBy,
            postCode: postCode,
            address: address,
            addressDetail: addressDetail,
            phoneNumber: phoneNumber,
            orderStatus: "결제 완료",
            products: products,
            orderedEmail: "비회원",
        });

        return order;
    },

    // 비회원 주문번호로 조회
    async nonMemberGetOrder(orderKey){
        const { orderNumber, phoneNumber } = orderKey;

        const order = await OrderModel.findOne({ orderNumber : orderNumber }).lean();

        if (!order) {
            const error = new Error("주문이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        };

        if (order.phoneNumber != phoneNumber) {
            const error = new Error("전화번호가 일치하지 않습니다.");
            error.status = 401;
            throw error;
        };

        return order;
    },


};

module.exports = orderService;