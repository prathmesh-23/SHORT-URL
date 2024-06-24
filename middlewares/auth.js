import { getUser } from "../services/outh.js";

async function LoogedInUser(req, res, next) {
  const userUid = req.cookies?.uuid;

  if (!userUid) {
    return res.redirect("/login");
  }
  const user = getUser(userUid);
  if (!user) {
    return res.redirect("/login")
  }
  req.user = user
  next()
}
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uuid;
  const user = getUser(userUid);
  req.user = user;
  next()
}

export { LoogedInUser, checkAuth }