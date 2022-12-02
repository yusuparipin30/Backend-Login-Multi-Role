//1. import express 
import express from "express";
//5. import controller function nya
import {login, logOut, Me} from "../controllers/Auth.js";


//2.
const router = express.Router();

//4. buat beberapa route
router.get('/me', Me);
router.post('/login', login);
router.delete('/logout', logOut);

//3.
export default router;