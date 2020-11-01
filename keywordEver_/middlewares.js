import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Evering";
  res.locals.routes = routes; //routes.js객체를 추가
  res.locals.session = req.session;
  // res.locals.user = {
  //   isAuthenticated: true,
  //   id: 1,
  // };
  next(); //미들웨어가 커넥션과 라우트들 사이에 있기 때문에 next(); 코드를 삽입해줘야함.
};
