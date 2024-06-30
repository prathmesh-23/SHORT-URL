import { getUser } from "../services/outh.js";

function checkForOuthentication(req, res, next) {
  const tokenCoock = req.cookies?.jwtoken;
  req.user = null;
  if (!tokenCoock) {

    return next()
  }
  const userToken = tokenCoock;
  const user = getUser(userToken)

  req.user = user;
  return next()
}

//ADMIN , ROLES , USER
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login")
    }
    if (!roles.includes(req.user.role)) {
      return res.end("UnOuth");
    }

    return next();
  }
}

/*
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
  // const userToken = req.cookies?.jwtoken;
  const token = req.headers('authorization');
  const userToken = token.split("Bearer ")[1];

  const user = getUser(userToken);
  req.user = user;
  next()
}

export { LoogedInUser, checkAuth }

*/

export { checkForOuthentication, restrictTo }