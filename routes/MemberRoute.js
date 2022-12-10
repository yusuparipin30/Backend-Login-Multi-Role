//1. import express 
import express from "express";
//4. import controler dan panggil function nya
import {
    getMember,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
} from "../controllers/Member.js";
//6. import verifyUser yang dr midleware karena ingin member hanya bisa di akses oleh user yang login
import {verifyUser} from "../middleware/AuthUser.js";

//2.
const router = express.Router();

//5. buat beberapa route
router.get('/member',verifyUser, getMember);
router.get('/member/:id',verifyUser, getMemberById);
router.post('/member',verifyUser, createMember);
router.patch('/member/:id',verifyUser, updateMember);
router.delete('/member/:id',verifyUser, deleteMember);

//3.
export default router;