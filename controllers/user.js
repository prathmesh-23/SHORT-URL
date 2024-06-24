import User from "../models/users.js";
import { v4 as uuidv4 } from 'uuid';
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

  const sessionID = uuidv4();
  setUser(sessionID, user)
  res.cookie("uuid", sessionID)


  return res.render("index")

}

export { handleUsersignUp, handleUserlogin } 
