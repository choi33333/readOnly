require("dotenv").config();
const { UserModel } = require('../models');
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.SECRET;


const authService = {
    // 회원가입 
    async authSignUp({ email, password, username, phoneNumber, postCode, address, addressDetail }){
        let users = await UserModel.findOne({ email }).lean();

        if (users) {
            const error = new Error("이미 가입된 email 입니다.");
            error.status = 409;
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        users = await UserModel.create({
            email: email,
            password: hashedPassword,
            username: username,
            phoneNumber: phoneNumber,
            postCode: postCode,
            address: address,
            addressDetail: addressDetail,
            role: "customer",
        });

        return ;
    },

    // 로그인
    async authSignIn({ email, password }){
        const users = await UserModel.findOne({ email }).lean();

        if (!users) {
            const error = new Error("이메일이나 비밀번호가 올바르지 않습니다.");
            error.status = 401;
            return next(error);
        }

        let isValidUser = await bcrypt.compare(password, users.password);

        if (!isValidUser) {
            const error = new Error("이메일이나 비밀번호가 올바르지 않습니다.");
            error.status = 401;
            return next(error);
        }

        const token = jsonwebtoken.sign(
            {
            em: users.email,
            ro: users.role,
            },
            secret,
            { expiresIn: "10h" }
        );
        
        return token;
    },
};

module.exports = authService;