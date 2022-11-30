//1. import sequelize
import {Sequelize} from "sequelize";
//2. import koneksi database
import db from "../config/Database.js";
//9. import user model
import Users from "./UserModel.js";

//3.
const {DataTypes} = Sequelize;
//4.
const Member = db.define('member',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },
    //5.
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    // price: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // }
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    marital_sts: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    category_people: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    active_state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    //6.untuk relasi dengan tabel user yang berada di file UserModel.js, 
    //7.bisa menggunakan asosiasi
    /*8.tipe data INTEGER karena mempunyai id yang di generate secara
     otomatis dr tabel user dengan tipe integer yang akan menjadi primary key
      ( defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true 
        })  dan di tabel member akan jadi foregin keynya*/
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

//10. membuat relasi one to many artinya satu user akan menginput banyak product
Users.hasMany(Member); 
Member.belongsTo(Users, {foreignKey: 'userId'});

//5. 
export default Member;