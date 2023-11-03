const { Router } = require("express");
const { Order } = require("../models/index"); 
const router = Router();

// 전체 주문 조회 (해당유저의 주문기록만 가져오려면... 어쩌죠?)
router.get('/api/orders', async(req, res) => {
    const orders = await Order.find({});

    if(orders == 0){
        return res.status(401).json({ error: "주문목록이 없습니다." });
    }

    res.json({
        error: null,
        data: orders
    });
  })

// 특정 주문 조회
router.get('/api/orders/:id', async(req, res) => {
    const { id } = req.query;
    const order = await Order.findOne({ _id : id });

    if(!order){
        return res.status(401).json({ error: "해당 주문목록이 없습니다" });
    }

    res.json({
        error: null,
        data: order
    });
  });

// 특정 주문 수정
router.put('/api/orders/:id', async(req, res) => {
    const { id } = req.query;
    const order = await Order.findOne({ _id : id });

    if(!order){
        return res.status(401).json({ error: "주문이 존재하지 않습니다." });
    }

    res.json({
        error: null,
        data: order
    });
  });

// 특정 주문 삭제
router.put('/api/orders/:id', async(req, res) => {
    const { id } = req.query;
    const order = await Order.findOne({ _id: id });
    const deletedOrder = await Order.deleteOne(order);

    if(!order){
        return res.status(401).json({ error: "주문이 존재하지 않습니다" });
    }

    res.json({
        error: null,
        data: deletedOrder
    })
  });

module.exports = router;