//1.import modelnya Member yg berada di MemberModel.js
import Member from "../models/MemberModel.js";
//5.import User dr modelnya untuk menginclude
import User from "../models/UserModel.js";
//2.membuat beberapa function
export const getMember =async (req, res) => {
    try {
        let response;
        //3. membuat validasi query login admin dan login user
        //req.role berasal dari middleware, jika user login sebagai admin maka eksekusi
        if(req.role === "admin"){
            response = await Member.findAll({
                /*4.berikan opsi includekan Usernya yang dr model, kita menyertakan User di dalam tabel Member,
                 karena terdpat relasi antara tabel Member dg tabel User*/
                include:[{
                    model: User
                }]
            });
            /*5.jika user login selain dari admin ,maka eksekusi query yang lain*/
        }else{
            response = await Member.findAll({
                /*7. opsi, kita punya tabel id di dlm tabel Member, userId adalah foreignkeynya,
                carilah data Member berdasarkan userId*/
                where:{
                    userId: req.userId
                },
                /*6.berikan opsi includekan Usernya yang dr model, kita menyertakan User di dalam tabel Member,
                 karena terdpat relasi antara tabel Member dg tabel User*/
                include:[{
                    model: User
                }]
            });
        }
    }catch (error) {

    }
}

export const getMemberById = (req, res) => {
    
}

export const createMember = (req, res) => {
    
}

export const updateMember = (req, res) => {
    
}

export const deleteMember = (req, res) => {
    
}