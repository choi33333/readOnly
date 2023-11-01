const { Router } = require('express');
const { User } = require('../models'); // user model
const hashPassword = require('../utils/hash-password');

const router = Router();


// sign-up
router.post('/auth/sign-up', async (req, res) => {
    const { email, password, username, phoneNumber, address, addressDetail } = req.body;
    
    // email이 존재하는지 확인
    try{
        let user = await User.findOne({ email });
        // user가 존재하면 반환
        if(user){
            return res
                    .status(409)
                    .json({ error: "이미 가입된 email 입니다."});
        }

        // user가 없다면 user에 다음을 생성
        user = await User.create({
            email,
            password : hashedPassword,
            username,
            phoneNumber,
            address,
            addressDetail,
        });
       
        // Password 암호화
        const hashedPassword = hashPassword(password);
        
        // 새로운 user를 db에 저장
        await user.save();
        res.redirect('/');

    }catch(e){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;