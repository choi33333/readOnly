const orderService = require('../services/orderService');

const orderController = {
    
    // 주문하기
    async createOrder(req, res){   
        const orderData = req.body;
        const em = res.locals.user.em;
        const order = await orderService.createOrder(orderData, em);

        res.json({
            error: null,
            data: order.toObject(),
        });
    },

    // 전체 주문조회
    async getOrders(req, res){
        const em = res.locals.user.em;
        const orders = await orderService.getOrders(em);

        res.json({
            error: null,
            data: orders,
        });
    },

    // 주문조회(id)
    async getOneOrder(req, res){
        const { id } = req.params;
        const order = await orderService.getOneOrder(id);

        res.json({
            error: null,
            data: order,
        });
    },

    // 주문조회(orderNumber)
    async getOrderByOrderNum(req, res){
        const { orderNumber } = req.params;
        const order = await orderService.getOrderByOrderNum(orderNumber);

        res.json({
            error: null,
            data: order,
        });
    },

    // 주문수정
    async updateOrder(req, res){
        const { id } = req.params;
        const orderData = req.body;
        const updatedOrder = await orderService.updateOrder(id, orderData);

        res.status(201).json({
            error: null,
            data: updatedOrder,
        });
    },

    // 주문수정(주문취소후 배송상태 변경 때문)
    async updateOrderStatus(req, res){
        const { id } = req.params;
        const { orderStatus } = req.body;
        const updatedOrderStatus = await orderService.updateOrderStatus(id, orderStatus);

        res.status(201).json({
            error: null,
            data: updatedOrderStatus,
        });
    },

    // 주문취소
    async deleteOrder(req, res){
        const { id } = req.params;
        const deletedOrder = await orderService.deleteOrder(id);

        res.status(204).json({
            error: null,
            data: deletedOrder,
          });
        // 주문이 취소되었습니다. ?
    },

    // 비회원 주문하기
    async nonMemberOrder(req, res){
        const orderData = req.body;
        const order = await orderService.nonMemberOrder(orderData);

        res.status(201).json({
            error: null,
            data: order.toObject(),
        });
    },
    // 비회원 주문번호로 조회
    async nonMemberGetOrder(req, res){
        const orderKey = req.body;
        const order = await orderService.nonMemberGetOrder(orderKey);

        res.json({
            error: null,
            data: order,
        });

    },
};

module.exports = orderController;