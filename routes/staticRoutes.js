import express from "express"
const statRouter = express.Router();
import URL from "../models/url.js";

statRouter.get('/', async (req, res) => {

  if (!req.user) {
    return res.redirect("/login")
  }
  const allURLS = await URL.find({ genratedBy: req.user._id });
  return res.render("index", {
    urls: allURLS
  })
})

statRouter.get("/signup", (req, res) => {

  return res.render("signup")
});
statRouter.get("/login", (req, res) => {
  return res.render("login")
})





export default statRouter