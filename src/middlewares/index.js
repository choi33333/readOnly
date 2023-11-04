const jsonwebtoken = require("jsonwebtoken");
const secret = "bpD6HJhBWhGFmmnpB9tf"; 

function isAuthentificated(req, res, next) {
  console.log(req.headers["authorization"])

  if (req.headers["authorization"] === undefined) {
    return res.status(401).json({
      error:
        "권한이 없거나 인증되지 않은 유저입니다. 본인의 권한을 체크하거나 로그인 해주세요",
      data: null,
    });
  }

  const token = req.headers["authorization"].slice(7);

  const userInfo = jsonwebtoken.verify(token, secret);
  res.locals.user = userInfo;
  next();
}

module.exports =  isAuthentificated;
