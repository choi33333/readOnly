const { Router, json } = require('express');
const { User } = require('../models'); // user model
const hashPassword = require('../utils/hash-password');

const router = Router();


router.get('/', (req, res, next) => {
    res.render('user/auth/sign-up');
  });

// sign-up
router.post('/auth/sign-up', async (req, res) => {
    const { email, password, username, address, addressDetail } = req.body;
    // Password 암호화
    const hashedPassword = hashPassword(password);
    console.log('실행성공');
    console.log(req.body);
    
    // email이 존재하는지 확인
    
        let user = await User.findOne({ email });
        //user가 존재하면 반환

        if(user){
            return res
                .status(409)
                .json({ error: "이미 가입된 email 입니다."});
        }

        // user가 없다면 user에 다음을 생성
        user = await User.create({
            email,
            password: hashedPassword,
            username,
            phoneNumber,
            address,
            addressDetail,
        });
        
      
        
        // 새로운 user를 db에 저장
        console.log('db저장?');
        res.json(user);
        res.redirect('/');
});

module.exports = router;