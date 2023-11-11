const authService = require('../services/authService');

const authController = {
    // 회원가입
    async authSignUp(req, res){
        const user = await authService.authSignUp(req.body);

        res.status(201).json({
            error: null,
            data: user,
        });
    },

    // 로그인
    async authSignIn(req, res){
        const token = await authService.authSignIn(req.body);
        
        res.status(201).json({
            error: null,
            data: token,
        });
    },
};

module.exports = authController;