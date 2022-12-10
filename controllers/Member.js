//1.import modelnya Member yg berada di MemberModel.js
import Member from "../models/MemberModel.js";
//5.import User dr modelnya untuk menginclude
import User from "../models/UserModel.js";
//24. import operator Op
import {Op} from "sequelize";



//2.membuat beberapa function
export const getMember =async (req, res) => {
    try {
        let response;
        //3. membuat validasi query login admin dan login user
        //req.role berasal dari middleware, jika user login sebagai admin maka eksekusi
        if(req.role === "admin"){
            response = await Member.findAll({
                //15.reques atribut yang di tampilkan
                attributes:['uuid','name', 'address', 'gender', 'marital_sts', 'category_people', 'active_state'],
                /*4.berikan opsi includekan Usernya yang dr model, kita menyertakan User di dalam tabel Member,
                 karena terdpat relasi antara tabel Member dg tabel User*/
                include:[{
                    //16.tambahkan juga atribut pada user nya
                    model: User,
                    attributes:['name','email']
                }]
            });
            /*5.jika user login selain dari admin ,maka eksekusi query yang lain */
        }else{
            response = await Member.findAll({
                //17. reques atribut yang di tampilkan
                attributes:['uuid','name', 'address', 'gender', 'marital_sts', 'category_people', 'active_state'],
                /*7. opsi, kita punya tabel id di dlm tabel Member, userId adalah foreignkeynya,
                carilah data Member berdasarkan userId*/
                //8.req.userId adalah dr mileware sama seperti role
                where:{
                    userId: req.userId
                },
                /*6.berikan opsi, includekan Usernya yang dr model, kita menyertakan User di dalam tabel Member,
                 karena terdpat relasi antara tabel Member dg tabel User*/
                include:[{
                    model: User,
                    //18.tambahkan juga atribut pada user nya
                    attributes:['name','email']
                }]
            });
        }
        //9.berikan respon jika benar
        res.status(200).json(response);
    }catch (error) {
        //10. respon jika salah
        res.status(500).json({msg: error.message});
    }
}

export const getMemberById = async(req, res) => {
    //19.
    try {
        //20.new cek id yang di kirim oleh user, buat variabel member, 
        const member = await Member.findOne({
            where:{
                uuid: req.params.id
            }
        });
        //21.new, jika tidak terdapat data dengan id yg di kirimkan user maka berikan respon
        if(!member) return res.status(404).json({msg: "Data tidak di temukan!"}); 
        let response;
        //. membuat validasi query login admin dan login user
        //req.role berasal dari middleware, jika user login sebagai admin maka eksekusi
        if(req.role === "admin"){
            //22. findOne karena single data
            response = await Member.findOne({
                //.reques atribut yang di tampilkan
                attributes:['uuid','name', 'address', 'gender', 'marital_sts', 'category_people', 'active_state'],
                //23. query yang di eksekusi
                where:{
                    id: member.id
                },
                /*.berikan opsi includekan Usernya yang dr model, kita menyertakan User di dalam tabel Member,
                 karena terdpat relasi antara tabel Member dg tabel User*/
                include:[{
                    //16.tambahkan juga atribut pada user nya
                    model: User,
                    attributes:['name','email']
                }]
            });
            /*.jika user login selain dari admin ,maka eksekusi query yang lain */
        }else{
            response = await Member.findOne({
                //. reques atribut yang di tampilkan
                attributes:['uuid','name', 'address', 'gender', 'marital_sts', 'category_people', 'active_state'],
                /*. opsi, kita punya tabel id di dlm tabel Member, userId adalah foreignkeynya,
                carilah data Member berdasarkan userId*/
                //.req.userId adalah dr mileware sama seperti role
                where:{
                    //25. tambahkan fungsi operator , gunakan operator and, field nya id kmudian ngambil dr variabel member, userId nya ngambil dr req.userId
                    [Op.and]:[{id: member.id},{ userId: req.userId} ]
                },
                /*.berikan opsi, includekan Usernya yang dr model, kita menyertakan User di dalam tabel Member,
                 karena terdpat relasi antara tabel Member dg tabel User*/
                include:[{
                    model: User,
                    //.tambahkan juga atribut pada user nya
                    attributes:['name','email']
                }]
            });
        }
        //.berikan respon jika benar
        res.status(200).json(response);
    }catch (error) {
        //. respon jika salah
        res.status(500).json({msg: error.message});
    }
}

export const createMember = async (req, res) => {
    //11.distrack request.body
    const {name, address, gender, marital_sts, category_people, active_state} = req.body;
    //12. simpan data Member
    try{
        await Member.create({
            name:name,
            address:address,
            gender:gender,
            marital_sts:marital_sts,
            category_people:category_people,
            active_state:active_state,
            userId:req.userId
        });
        //13. jika data berhasil tersimpan maka berikan respon
        res.status(201).json({msg: "Member Created Successfuly!"});
    } catch(error) {
        //14. jika terdapat error
        res.status(500).json({msg: error.message});
    }
}

export const updateMember =async (req, res) => {
    try {
        // cek id yang di kirim oleh user, buat variabel member, 
        const member = await Member.findOne({
            where:{
                uuid: req.params.id
            }
        });
        //jika tidak terdapat data dengan id yg di kirimkan user maka berikan respon
        if(!member) return res.status(404).json({msg: "Data tidak di temukan!"}); 
        //26.
        const {name, address, gender, marital_sts, category_people, active_state} = req.body;
        //. membuat validasi query login admin dan login user
        //req.role berasal dari middleware, jika user login sebagai admin maka eksekusi
        if(req.role === "admin"){
           //27. data yang mau di update berdasarkan id
           await Member.update({name, address, gender, marital_sts, category_people, active_state},{
           where:{
             id: member.id
           }
           });
            /*.jika user login selain dari admin ,maka eksekusi query yang lain */
        }else{
            //29. jika userId tidak sama dengan member.userId
            if(req.userId !== member.userId) return res.status(403).json({msg: "Akses Terlarang!"});
            //30. jika sama maka eksekusi update ini
            await Member.update({name, address, gender, marital_sts, category_people, active_state},{
                where:{
                    //28. tambahkan fungsi operator , gunakan operator and, field nya id kmudian ngambil dr variabel member, userId nya ngambil dr req.userId
                    [Op.and]:[{id: member.id},{ userId: req.userId} ]
                }
                });
        }
        //31.berikan respon jika benar berikan respon
        res.status(200).json({msg: "Member updated successfuly!"});
    }catch (error) {
        //.32 respon jika salah
        res.status(500).json({msg: error.message});
    }
}

export const deleteMember = async (req, res) => {
    try {
        // cek id yang di kirim oleh user, buat variabel member, 
        const member = await Member.findOne({
            where:{
                uuid: req.params.id
            }
        });
        //jika tidak terdapat data dengan id yg di kirimkan user maka berikan respon
        if(!member) return res.status(404).json({msg: "Data tidak di temukan!"}); 
        //.
        const {name, address, gender, marital_sts, category_people, active_state} = req.body;
        //. membuat validasi query login admin dan login user
        //req.role berasal dari middleware, jika user login sebagai admin maka eksekusi
        if(req.role === "admin"){
           // data yang mau di update berdasarkan id
           await Member.destroy({
           where:{
             id: member.id
           }
           });
            /*.jika user login selain dari admin ,maka eksekusi query yang lain */
        }else{
            // jika userId tidak sama dengan member.userId
            if(req.userId !== member.userId) return res.status(403).json({msg: "Akses Terlarang!"});
            // jika sama maka eksekusi update ini
            await Member.destroy({
                where:{
                    //tambahkan fungsi operator , gunakan operator and, field nya id kmudian ngambil dr variabel member, userId nya ngambil dr req.userId
                    [Op.and]:[{id: member.id},{ userId: req.userId} ]
                }
                });
        }
        //berikan respon jika benar berikan respon
        res.status(200).json({msg: "Member deleted successfuly!"});
    }catch (error) {
        //respon jika salah
        res.status(500).json({msg: error.message});
    }
}