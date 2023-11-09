# 📖 readOnly - 지적 성장을 위한 도서 구매 플랫폼 

## 🌏 프로젝트 개요

　도서 쇼핑몰은 독서를 즐기는 사용자들을 위한 도서 구매 플랫폼입니다. 지적 성장을 돕기 위해 다양한 주제의 도서를 제공하며, 엘리스 1차 프로젝트-8팀이 함께 협업하여 서비스를 개발하고자 합니다.

## 🚀 프로젝트 목표

- 강의에서 학습한 내용을 실제 도서 쇼핑몰에 적용하여 구현한다.
- 팀원 간의 원활한 소통과 협업을 통해 프로젝트를 완성한다.
- 사용자에게 편리하고 유용한 도서 쇼핑 서비스를 제공한다.

## 📕 서비스 기능

- 사용자 회원가입 및 로그인
- 도서 목록 및 상세페이지 제공
- 장바구니 기능
- 주문 및 결제 시스템

## 🖥️ 기술 스택
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"/>
<img src="https://img.shields.io/badge/gitlab-FC6D26?style=flat-square&logo=gitlab&logoColor=white"/>

### 💻 Frontend

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=white"/>

### ⌨️ Backend

<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/postman-FF6C37?style=flat-square&logo=postman&logoColor=white"/>
<img src="https://img.shields.io/badge/mongoose-880000?style=flat-square&logo=mongoose&logoColor=white"/>

### 📝 dependencies
    "bcrypt": "^5.1.1",
    "dotenv": "^16.3.1",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.0",
    "multer": "^1.4.5-lts.1",
    
### ☁️ Cloud Server

<img src="https://img.shields.io/badge/amazonAWS-232F3E?style=flat-square&logo=amazonAWS&logoColor=white"/>

### 📂 Directory 
```
src
├── constrollers
│   ├── adminController.js
│   ├── authController.js
│   ├── categoryController.js
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── middlewares
│   └── validators
│       ├── auth.js
│       ├── objectId.js
│       ├── order.js
│       ├── product.js
│       ├── user.js
│       ├── validateError.js
│       └── index.js
│   ├── isAdmin.js
│   └── isAuthenticated.js
├── models
│   └── schemas
│       ├── category.js
│       ├── order.js
│       ├── product.js
│       ├── user.js
│       └── index.js
│   └── index.js
├── routes
│   └── v1
│       └── admin
│           ├── adminCategoryRouter.js
│           ├── adminOrderRouter.js
│           ├── adminProductRouter.js
│           ├── amdinUserRouter.js
│           └── index.js
│       ├── authRouter.js
│       ├── categoryRouter.js
│       ├── orderRouter.js
│       ├── productRouter.js
│       ├── uploadRouter.js
│       ├── userRouter.js
│       └── index.js
│   └── index.js
├── services
│       ├── adminService.js
│       ├── authService.js
│       ├── categoryService.js
│       ├── orderService.js
│       ├── productService.js
│       └── userService.js
├── utils
│       ├── asyncHandler.js
│       └── hash-password.js
├── views
└── app.js
```

### 🕑개발 기간
2023.10.30 ~ 2023.11.11

<table>
  <tbody>
    <tr>
      <td align="center"><a href=""><img src="width="100px;" alt=""/><br /><sub><b>프론트엔드 팀장 : 백의연</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>프론트엔드 팀원 : 장해라</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>프론트엔드 팀원 : 손우민</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="" width="100px;" alt=""/><br /><sub><b>프론트엔드 팀원 : 최재혁</b></sub></a><br /></td>
     <tr/>
      <td align="center"><a href=""><img src="https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f42d/u1f42d_u1f30d.png?fbx" width="100px;" alt=""/><br /><sub><b>백엔드 팀장 : 위동현</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="https://www.gstatic.com/android/keyboard/emojikitchen/20211115/u1f436/u1f436_u1f30d.png?fbx" width="100px;" alt=""/><br /><sub><b>백엔드 팀원 : 노소연</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>


라이센스
Copyright © 2023 readOnly
