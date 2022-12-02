//1. import express
import express from "express";
//2. import cors
import cors from "cors";
//3. import session
import session from "express-session";
//8.inport .env 
import dotenv from "dotenv";
//9.panggil function dotenv
dotenv.config();
//11. impor userroute
import UserRoute from "./routes/UserRoute.js"
//12.
import MemberRoute from "./routes/MemberRoute.js"
/*15. import db agar dapat sync modalnya untuk mengenerate tabelnya 
secara otomatis dan setelah tergenerate  non aktifkan kmbali import db dan sync nya karna telah membuat tabel secara otomatis*/
//import db from "./config/Database.js";
//16. import AuthRoute
import AuthRoute from "./routes/AuthRoute.js";
//18.
import SequelizeStore from "connect-session-sequelize";


//4. buat variabel app express function
const app = express();

//16.function sinc untuk mengeksekusi query untuk membuat tabel user dan member secara otomatis
// (async()=>{
//     await db.sync()
// })();
/*10. mendefinisikan session sebelumnya buat variable di file-
 .env : SESS_SECRET = 25374jhjlg4b5jjhhn7b8zf2bvdv58695845cafnhdmknhvehbj45747shgf*/
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));
/*6.tambahkan midleware.
a. credentials: true berfungsi agar frontend 
nanti dapat mengirimkan rekues beserta cokie dengan menyertakan credetialnya
b. origin : adalah domain yang kita ijinkan untuk dapat mengakses API nantinya-
 bisa berupa array[] apabila nantinya memiliki banyak domain, tetapi apabila-
 hanya mengijinkan 1 domain bisa menggunakan string(''), domain yg di ijinkan adalah frontend kita*/
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000 '
}));
//7.midleware untuk menerima data dengan format json
app.use(express.json());
//13.
app.use(UserRoute);
//14.
app.use(MemberRoute);
//17.
app.use(AuthRoute);
//5. membuat port pesan mengambil dari envimen variable, buat file .env
app.listen(process.env.APP_PORT, ()=>{
    console.log('Server up and running...');
});