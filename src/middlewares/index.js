require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
const secret = process.env.SECRET;

function isAuthenticated(req, res, next) {
  if (req.headers["authorization"] === undefined) {
    const error = new Error(
      "권한이 없거나 인증되지 않은 유저입니다. 본인의 권한을 체크하거나 로그인 해주세요"
    );
    error.status = 401;
    return next(error);
  }

  const token = req.headers["authorization"].slice(7);

  const userInfo = jsonwebtoken.verify(token, secret);
  res.locals.user = userInfo;
  next();
}

module.exports = isAuthenticated;
