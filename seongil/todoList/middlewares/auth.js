const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const authMiddleware = (req, res, next) => {
   if (!req.headers.cookie) {
      return res.status(403).json({
         success: false,
         message: "로그인 된 적이 없습니다.",
      });
   }
   const cookies = cookie.parse(req.headers.cookie);
   const token = cookies.access_token;
   if (!token) {
      return res.status(403).json({
         success: false,
         message: "로그인 된 적이 없습니다.",
      });
   }

   const p = new Promise((resolve, reject) => {
      jwt.verify(token, req.app.get("jwt-secret"), (err, decoded) => {
         if (err) reject(err);
         resolve(decoded);
      });
   });

   const onError = (error) => {
      res.status(403).json({
         success: false,
         message: error.message,
      });
   };

   p.then((decoded) => {
      req.decoded = decoded;
      next();
   }).catch(onError);
};

module.exports = authMiddleware;
