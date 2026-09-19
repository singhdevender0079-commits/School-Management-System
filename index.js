require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const app = express();
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: process.env.db_name,
    password: process.env.db_password
});
try {
    connection.query("SHOW TABLES", (err, result) => {
        if (err) throw err
        console.log(result);
    });
}
catch (err) {
    console.log(err);
};
let port = 8080;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.get("/home", (req, res) => {
    const q = "SELECT  COUNT(*) AS studentCount FROM students";
    const p = "SELECT  COUNT(*) AS teacherCount FROM teachers";
    const c = "SELECT  COUNT(*) AS classCount FROM classes";
    try {
        connection.query(q, (err, result1) => {
            if (err) throw err
            let count = result1[0].studentCount;
            connection.query(p, (err, result2) => {
                if (err) throw err
                let tcount = result2[0].teacherCount;

                connection.query(c, (err, result3) => {
                    if (err) throw err;
                    let ccount = result3[0].classCount;
                    res.render("home.ejs", { count, tcount, ccount });
                })
            })
        });
    }
    catch (err) {
        console.log(err);
    }
});
// ! Student data
app.get("/students/add", (req, res) => {
    res.render("studentadd.ejs");
});
app.post("/students/add/submit", (req, res) => {
    let { sname, father_name, class_name, gender, rool_no, registration_date, DOB, medium } = req.body;
    let q = "INSERT INTO students (name,class_id,gender,rool_no,registartion_date,dob,father_name,medium) VALUES(?,?,?,?,?,?,?,?)";
    try {
        connection.query(q, [sname, class_name, gender, rool_no, registration_date, DOB, father_name, medium], (err, result) => {
            if (err) throw err
            console.log(result);
        })
    }
    catch (err) {
        console.log(err);

    }
    res.redirect("/home");
});



app.get("/teachers/add", (req, res) => {
    res.render("teacheradd.ejs");
});

app.post("/teachers/add/submit", (req, res) => {
    let { tname, mob, sallary, sub, gender, date } = req.body;
    let q = "INSERT INTO teachers (name,subject,salary,m_number,date_joining,gender) VALUES(?,?,?,?,?,?)";
    try {
        connection.query(q, [tname, sub, sallary, mob, date, gender], (err, result) => {
            if (err) throw err
            console.log(result);
        })
    }
    catch (err) {
        console.log(err);
    }
    res.redirect("/home");
})
app.get("/class/add", (req, res) => {
    res.render("addclass.ejs");
});
















// ! view students
app.get("/students/view", (req, res) => {
    res.render("viewstudents.ejs");
});

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});

// app.get("/view/student",(req,res)=>{
// let q="SELECT * FROM students";
// try{
//     connection.query(q,(err,result)=>{
//         if(err) throw err
//         res.json(result);
// })
// }
// catch(err){
//     console.log(err);
// }
// })

// ! view teachers 
app.get("/view/teachers",(req,res)=>{
let q="SELECT * FROM teachers ";
try{
connection.query(q,(err,result)=>{
    if(err) throw err
    res.json(result)
})
}
catch(err){
console.log(err);
}
});