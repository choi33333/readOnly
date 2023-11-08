const authService = require('../services/authServise');

const authController = {
    // 회원가입
    async signUp(req, res){
        console.log(req.body);
        const user = await authService.authSignUp(req.body);

        res.status(201).json({
            error: null,
            data: user,
            message: "회원가입에 성공했습니다",
        });
    },

    // 로그인
    async signIn(req, res){
        const token = await authService.authSignIn(req.body);

        res.status(201).json({
            error: null,
            data: token,
            message: "로그인에 성공했습니다",
        });
    }
};

module.exports = authController;