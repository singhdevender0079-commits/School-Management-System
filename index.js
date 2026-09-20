require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const app = express();
const method_override=require("method-override");
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
app.use(express.urlencoded({ extended: true }));
app.use(method_override("_method"));
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
    let { sname, father_name, class_id, gender, rool_no, registration_date, DOB, medium } = req.body;
    let q = "INSERT INTO students (name,class_id,gender,rool_no,registartion_date,dob,father_name,medium) VALUES(?,?,?,?,?,?,?,?)";
    try {
        connection.query(q, [sname, class_id, gender, rool_no, registration_date, DOB, father_name, medium], (err, result) => {
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

    let sql = `
        SELECT students.*, classes.class_name
        FROM students
        JOIN classes
        ON students.class_id = classes.id
    `;

    connection.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        res.render("viewstudents.ejs", { students: result });
    });
});




app.get("/student/:id", (req, res) => {
    let { id } = req.params;

    let sql = `
        SELECT students.*, classes.class_name
        FROM students
        JOIN classes
        ON students.class_id = classes.id
        WHERE students.id = ?
    `;

    connection.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        res.render("studentdata.ejs", {
            student: result[0]
        })
        })

});


app.get("/student/edit/:id", (req, res) => {
    let { id } = req.params;

    let sql = `
        SELECT students.*, classes.class_name
        FROM students
        JOIN classes
        ON students.class_id = classes.id
        WHERE students.id = ?
    `;

    connection.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        res.render("studentEdit.ejs", {
            student: result[0]
        })
        })

});

app.put("/student/:id", (req, res) => {
    let { id } = req.params;

    let {
        sname,
        father_name,
        class_id,
        gender,
        rool_no,
        registration_date,
        DOB,
        medium
    } = req.body;

    let sql = `
        UPDATE students
        SET
            name = ?,
            father_name = ?,
            class_id = ?,
            gender = ?,
            rool_no = ?,
            registartion_date = ?,
            dob = ?,
            medium = ?
        WHERE id = ?
    `;

    connection.query(
        sql,
        [
            sname,
            father_name,
            class_id,
            gender,
            rool_no,
            registration_date,
            DOB,
            medium,
            id
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.send("Database error");
            }

            res.redirect("/students/view");
        }
    );
});








app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});




// ! view teachers 
app.get("/teachers/view", (req, res) => {
    let sql = "SELECT * FROM teachers";

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        res.render("viewteachers.ejs", { teachers: result });
    });
});
app.get("/teacher/:id", (req, res) => {

    let { id } = req.params;

    let sql = `
        SELECT *
        FROM teachers
        WHERE id = ?
    `;

    connection.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        res.render("teacherdata.ejs", {
            teacher: result[0]
        });
    });
});


app.get("/teacher/edit/:id", (req, res) => {
    let { id } = req.params;

    let sql = `
        SELECT *
        FROM teachers
        WHERE id = ?
    `;

    connection.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        res.render("teacheredit.ejs", {
            teacher: result[0]
        });
    });
});




app.put("/teachers/:id", (req, res) => {

    let { id } = req.params;

    let {
        tname,
        mob,
        salary,
        sub,
        gender,
        date
    } = req.body;

    let sql = `
        UPDATE teachers
        SET
            name = ?,
            m_number = ?,
            salary = ?,
            subject = ?,
            gender = ?,
            date_joining = ?
        WHERE id = ?
    `;

    connection.query(
        sql,
        [tname, mob, salary, sub, gender, date, id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.send("Database error");
            }

            res.redirect("/teachers/view");
        }
    );
});