//membuat beberapa function login dan logout
//1. import user yg ada di file UserModel
import User from "../models/UserModel.js";
//2. import argon
import argon2 from "argon2";

//3. membuat function login
export const login = async (req, res) => {
    const user = await User.findOne({
        where: {
            //4.mencari data berdasarkan email, karena login berdasarkan email
            email: req.body.email
        }
    });
    //5.jika user tdk di temukan
    if(!user) return res.status(404).json({msg: "User tidak di temukan !"});
    //6.jika user di temukan maka verifikasi password. (user.password =  password yg dr database) (req.body.password = password yang di kirimkan oleh user)
    const match = await argon2.verify(user.password, req.body.password);
    //7.kondisi, jika password yang di kirimkan user tidak cocok dengan yang ada di database
    if(!match) return res.status(400).json({msg: "Wrong Password!"});
    //8.jika passwordnya cocok maka set session nya , nama session nya userId dan valuenya ambil dari user.uuid
    req.session.userId = user.uuid
    //9.
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    //10.berikan respon
    res.status(200).json({uuid, name, email, role});
}

//13. membuat function untuk get user login yang berguna nanti di font end
export const Me = async (req, res) => {
    //14. cek jika tidak terdapat session userIdnya maka return 
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun anda"});
        //15. jika terdapat session maka ambil usernya di dalam database
    }
    const user = await User.findOne({
        attributes:['uuid', 'name', 'email', 'role'],
        where: {
            //16.mencari data berdasarkan uuid, karena session berdasarkan uuid
            uuid:  req.session.userId
        }
    });
    //17.jika user tdk di temukan
    if(!user) return res.status(404).json({msg: "User tidak di temukan !"});
    //18 jika terdapat user maka parsing dr variabel user
    res.status(200).json(user);
}

//11. membuat function untuk logout
export const logOut = (req, res) =>{
    //12.hapus sessionnya
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tudak dapat Logout!"});
        res.status(200).json({msg: "Anda Telah Logout"})
    });

}