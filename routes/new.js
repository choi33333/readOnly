app.post("/auth/sign-in", async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    const hashedPassword = hashPassword(password);
  
    let user = await User.findOne({ email });
  
    // 만약 해당 이메일을 가진 유저가 없다면
    if (!user) {
      const error = new Error("이메일 또는 패스워드가 일치하지 않습니다.");
      error.statusCode = 400;
      next(error);
      return; // 필수!!
    }
  
    // 앞서 회원가입 때 생성한(bcrypt.hash로) 해시화된 패스워드와 req.body로 클라이언트에게 전달 받은 패스워드를 비교해서 같다면 true, 아니면 false를 반환한다.
    const isValidUser = await bcrypt.compare(password, hashedPassword); // password는 패스워드 원문, user.password는 bcrypt로 해시화된 패스워드!
  
    // 패스워드가 잘못되었다면
    if (!isValidUser) {
      // 위와 똑같이 이메일 또는 패스워드가 일치하지 않는다고 응답을 보낸다.
      const error = new Error("email 또는 패스워드가 일치하지 않습니다.");
      error.statusCode = 400;
      next(error);
      return; // 필수!!
    }
  
    // 이메일도 맞고 패스워드도 맞다면 인증 완료의 증서로 또 다시 새롭게 JWT 토큰을 발급한다.
    // 클라이언트는 이 새로 발급 받은 토큰을 가지고 제한된(a.k.a. 인증된 유저만 사용할 수 있는) API를 호출할 수 있다.
    // 주의: 이번에도 마찬가지로 1시간 동안만 사용 가능하며, 1시간이 지나면 다시 로그인해야한다.
    const token = jsonwebtoken.sign(
      {
        em: user.email, // 토큰 사이즈를 줄이기 위해 key 이름은 최대한 짧게 지어주는 것이 관례이다. em은 email, pe는 permission
        pe: user.permission,
      },
      secret,
      { expiresIn: "1h" }
    );
  });
  