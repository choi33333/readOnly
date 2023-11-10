const userService = require('../services/userService');

const userController = {
    // my page
    async userMe(req, res){
        const user = await userService.userMe(res.locals.user.em);

        res.json({
            error: null,
            data: user,
        });
    },

    // my page[수정 전 비밀번호 확인]
    async userMePassCheck(req, res){
        const { password } = req.body;
        await userService.userMePassCheck(res.locals.user.em, password);

        res.json({
            error: null,
            message: "비밀번호가 일치합니다."
        });
    },

    // my page 수정
    async updateUserMe(req, res){
        const updatedUser = await userService.updateUserMe(res.locals.user.em, req.body);

        res.json({
            error: null,
            data: updatedUser,
        });
    },

    // 탈퇴
    async deleteUserMe(req, res){
        const deletedUser = await userService.deleteUserMe(res.locals.user.em);

        res.json({
            error: null,
            data: deletedUser,
            message: "안녕히가세요. 다음에 또 만나요!",
        });
    }
};

module.exports = userController;