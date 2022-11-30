//1. import express 
import express from "express";
//4. import controler dan panggil function nya
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";


//2.
const router = express.Router();

//5. buat beberapa route
router.get('/users',getUsers);
router.get('/users/:id',getUserById);
router.post('/users',createUser);
router.patch('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

//3.
export default router;