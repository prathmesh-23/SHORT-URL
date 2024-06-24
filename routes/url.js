import express from "express"
import handleGenrateShortURL from "../controllers/url.js";

const router = express.Router();
router.post("/", handleGenrateShortURL);




export default router