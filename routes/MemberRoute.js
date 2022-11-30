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


//2.
const router = express.Router();

//5. buat beberapa route
router.get('/member', getMember);
router.get('/member/:id', getMemberById);
router.post('/member', createMember);
router.patch('/member/:id',updateMember);
router.delete('/member/:id', deleteMember);

//3.
export default router;