import { getUser } from "../services/outh.js";

async function LoogedInUser(req, res, next) {
  // const userToken = req.cookies?.jwtoken;
  const token = req.headers('authorization');

  if (!token) {
    return res.redirect("/login");
  }
  //for mobile appliaction authentiaction
  const userToken = token.split("Bearer ")[1]; //[Bearer][fgryvgrvgrv] 
  const user = getUser(userToken);
  if (!user) {
    return res.redirect("/login")
  }
  req.user = user
  next()
}
async function checkAuth(req, res, next) {
  const userToken = req.cookies?.jwtoken;
  const user = getUser(userToken);
  req.user = user;
  next()
}

export { LoogedInUser, checkAuth }