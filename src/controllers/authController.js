const authService = require('../services/authService');

const authController = {
    // 회원가입
    async authSignUp(req, res){
        const user = await authService.authSignUp(req.body);

        res.status(201).json({
            error: null,
            data: user,
            message: "회원가입에 성공했습니다",
        });
    },

    // 로그인
    async authSignIn(req, res){
        const token = await authService.authSignIn(req.body);
        
        res.status(201).json({
            error: null,
            data: token,
            message: "로그인에 성공했습니다",
        });
    },
};

module.exports = authController;