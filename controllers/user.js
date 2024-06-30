import User from "../models/users.js";
import { setUser } from "../services/outh.js";


async function handleUsersignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });

  return res.render("login")

}
async function handleUserlogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login")
  }

  const JWTtoken = setUser(user);
  res.cookie("jwtoken", JWTtoken)
  // return res.redirect("/")
  /* res.cookie("jwtoken", JWTtoken, {

    domain: '.prathmesh-indulkar.vercel.app' //Domain Specific
    Real use like googale if you  have gmail you automatically login in googale other subdomains

  }) */
  //cookies in we just use in browser

  return res.render("index")

}

export { handleUsersignUp, handleUserlogin } 
