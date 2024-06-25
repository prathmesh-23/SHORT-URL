import jwt from "jsonwebtoken"
const privateKey = "#prathmesh$"
function setUser(user) {
  const payload = {
    name: user.name,
    Id: user._id
  }
  return jwt.sign(payload, privateKey)
}
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, privateKey)
  }
  catch {
    console.log("EROOR")
  }
}

export { setUser, getUser }