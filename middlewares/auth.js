import { getUser } from "../services/outh.js";

async function LoogedInUser(req, res, next) {
  const userToken = req.cookies?.jwtoken;

  if (!userToken) {
    return res.redirect("/login");
  }
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