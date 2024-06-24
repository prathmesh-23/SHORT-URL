import express from "express"
import { handleUsersignUp, handleUserlogin } from "../controllers/user.js";

const Userrouter = express.Router();

Userrouter.post('/', handleUsersignUp)
Userrouter.post('/login', handleUserlogin)


export default Userrouter