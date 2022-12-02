//1.import modelnya Member yg berada di MemberModel.js
import User from "../models/UserModel.js";
//3,import argor karna perlu untuk meng hash argon password
import argon2 from "argon2";

//2.membuat beberapa function
export const getUsers =async (req, res) => {
//4.memproses crud
    try{
        //12. menghilangkan password dan id supaya tdk terlihat tambahkan opsi yaitu atribute yg ingin di tampilkan pada findAll
        const response = await User.findAll({
            attributes: ['uuid','name','email','role']
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async (req, res) => {
    //5
    try{
        const response = await User.findOne({
            //13.
            attributes: ['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async (req, res) => {
    //6.
    const {name, email, password, confPassword, role} = req.body;
    //7.buat validasi kalo pass tdk cocok
    if(password !== confPassword) return res.status(400).json({msg: "Password dan conf Password tidak cocok!"});
    //8. validasi ketika pass cocok
    const hashPassword = await argon2.hash(password);
    //9. kalo cocok insert datanya kedalam database
    try {
        await User.create({
            name:name,
            email:email,
            password:hashPassword,
            role:role
        });
        //10. klo berhasil inser data berikan respon
        res.status(201).json({msg: "Register berhasil!"});
    } catch (error) {
        //11. jika error 
        res.status(400).json({msg: error.message});
    }
}

export const updateUser =async (req, res) => {
    //14.
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    //15.memberi respon 
    if(!user) return res.status(404).json({msg: "User tidak di temukan !"});
    const {name, email, password, confPassword, role} = req.body;
    /*16. lakukan validasi jika user mengirim password maka perlu-
     mengupdate passwordnya dan sebaliknya*/
     let hashPassword;
     //17.jika user mengirimkan pass empty string atau kosong 
     if(password === "" || password === null){
        //18. maka ambil pass dari database ket: user adalah dari variabel user pada no 14 yg telah di definisikan dan passwordnya adalah dr database
        hashPassword = user.password
        //19. jika user mengirimkan pass maka kita perlu mengupdate passwordnya dan perlu hash passwordnya
     }else{
        hashPassword = await argon2.hash(password);
     }
     //20. lakukan validasi lagi 
     if(password !== confPassword) return res.status(400).json({msg: "Password dan conf Password tidak cocok!"});
     //21. jika semua validasinya berhasil mka update ke database
     try {
        await User.update({
            name:name,
            email:email,
            password:hashPassword,
            role:role
        }, {
            where: {
                id: user.id
            }
        });
        //. klo berhasil inser data berikan respon
        res.status(200).json({msg: "User Updated!"});
    } catch (error) {
        //. jika error 
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async (req, res) => {
    //14.
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak di temukan !"});
     try {
        await User.destroy({
         where: {
                id: user.id
            }
        });
        //. klo berhasil inser data berikan respon
        res.status(200).json({msg: "User Deleted!"});
    } catch (error) {
        //. jika error 
        res.status(400).json({msg: error.message});
    }
}