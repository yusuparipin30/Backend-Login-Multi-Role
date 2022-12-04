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
/*6.setelah membuat function middleware yaitu variabel verifyUser pada file AuthUser.js maka buat
fungsi disini ketika seseorang mengakses users, users id,post user, update, delete mengharuskan untuk login*/
//7.import verifyUser
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

//2.
const router = express.Router();

//5. buat beberapa route
router.get('/users',verifyUser,adminOnly,getUsers); //8. parsing verifyUser di setiap router
router.get('/users/:id',verifyUser,adminOnly,getUserById);
router.post('/users',verifyUser,adminOnly,createUser);
router.patch('/users/:id',verifyUser,adminOnly,updateUser);
router.delete('/users/:id',verifyUser,adminOnly,deleteUser);

//3.
export default router;