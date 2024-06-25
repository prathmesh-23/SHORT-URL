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
    console.log("Null");
  }

  const JWTtoken = setUser(user)
  res.cookie("jwtoken", JWTtoken)


  return res.render("index")

}

export { handleUsersignUp, handleUserlogin } 
