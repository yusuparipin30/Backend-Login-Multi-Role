//1. disini middelware adalah untuk memproteci endpoinya
import User from "../models/UserModel.js";

//2. membuat function middleware
export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun anda"});
        //3. jika terdapat session maka ambil usernya di dalam database
    }
    const user = await User.findOne({
        where: {
            //4.mencari data berdasarkan uuid, karena session berdasarkan uuid
            uuid:  req.session.userId
        }
    });
    //5.jika user tdk di temukan
    if(!user) return res.status(404).json({msg: "User tidak di temukan !"});
    //6.buat variabel jika user di temukan dan ngambil user dr user.id
    req.userId = user.id;
    //7.membutuhkan role agar nanti variabel ini dapat di gunakan di setiap controller kita(user itu adalah user yg di set pada  variable no3)
    req.role = user.role;
    //8. memanggil function next
    next();
}


export const adminOnly = async (req, res, next) =>{
        //9. mengambil usernya di dalam database
    const user = await User.findOne({
        where: {
            //10.mencari data berdasarkan uuid, karena session berdasarkan uuid
            uuid:  req.session.userId
        }
    });
    //11.jika user tdk di temukan
    if(!user) return res.status(404).json({msg: "User tidak di temukan !"});
    //12.menambahkan validasi jika user.role tidak sama dengan admin maka return.
    if(user.role !== "admin") return res.status(403).json({msg: "akses terlarang!"});
    //13. memanggil function next
    next();
}