import express from "express"
const statRouter = express.Router();
import URL from "../models/url.js";
import { restrictTo } from "../middlewares/auth.js";

statRouter.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allURLS = await URL.find({});
  return res.render("index", {
    urls: allURLS
  }, () => {
    console.log("Hello")
  })
})

statRouter.get('/', restrictTo(["NORMAL"]), async (req, res) => {


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