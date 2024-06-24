import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenrateShortURL(req, res) {

  const shortID = nanoid(8);
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      error: "url is required"
    })
  }
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    genratedBy: req.user._id,

  });
  return res.render("index", {
    id: shortID,

  })

}

export default handleGenrateShortURL