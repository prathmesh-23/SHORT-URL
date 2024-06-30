import express from "express"
import URL from "./models/url.js";
import { connectMongo } from "./connection/connect.js";
import cookieParser from "cookie-parser";
import path from "path"
import { checkForOuthentication, restrictTo } from "./middlewares/auth.js"

//routes import
import router from "./routes/url.js";
import statRouter from "./routes/staticRoutes.js";
import Userrouter from "./routes/user.js";


const app = express();
const port = 8001;
const DBurl = "mongodb://127.0.0.1:27017/short-url"


//connection
connectMongo(DBurl).then(() => {
  console.log("MongoDB Connected")
})

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForOuthentication);


//View Engine Set 
app.set("view engine", "ejs");
app.set("views", path.resolve("./view")) //Declare my ejs files folder


//Routes

//NOTE Static Routers mean Frontend Pages Routers

app.use("/url", restrictTo(["NORMAL"]), router);
app.use("/user", Userrouter)
app.use('/', statRouter)


app.get("/url/:shortID", async (req, res) => {
  const short_id = req.params.shortID;
  try {
    const Entry = await URL.findOneAndUpdate(
      { shortId: short_id },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }  // This option ensures the updated document is returned
    );

    if (!Entry) {
      // If Entry is null, return a 404 Not Found response
      return res.status(404).send("URL not found");
    }

    // If Entry is found, redirect to the stored URL
    res.redirect(Entry.redirectURL);
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});






app.listen(port, () => {
  console.log(`Server Start On : ${port}`)
})