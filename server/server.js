const PORT = process.env.PORT ?? 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./database.js");
const pool = require('./database.js').pool;

//middleware
app.use(cors());
app.use(express.json());


app.get('/classes', async (req, res) => {
    try {
       const classes = await pool.query('SELECT * FROM classes');
       res.json(classes.rows);
    } catch (err) {
        console.log(err);
    }
});

app.get('/exams/:classID', async (req, res) => {

    //TEST
    console.log(req);
    const { classID }  = req.params;
    const classIDint = parseInt(classID);
    console.log( `CLASS ID: ${classID}` );
    try {
        const exams = await pool.query('SELECT * FROM exams WHERE class_id = $1', [classID]);
        res.json(exams.rows)
    } catch (err) {
        console.log(err);
    }
})



/* 
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    database.getUsers()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

app.post('/users', (req, res) => {
    database.createUser(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

app.delete('/users/:id', (req, res) => {
    database.deleteUser(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

 */

/** GETs */
/* app.get("/api", (req, res) => {
    res.json({ "usersTest": ["uOne", "uTwo", "uThree"] });
});
 */


/** POSTs */
/* app.post("/adduser", (req, res) => {
    const username = req.body["username"];
    const email = req.body["email"];
    console.log("Username: " + username);
    console.log("Email: " + email);

    const insertSTMT = `INSERT INTO users (username, email) VALUES ('${username}', '${email}');`;
    pool.query(insertSTMT).then((response) => {
        console.log("Data Saved");
        console.log(response);
    })
        .catch((err) => {
            console.log(err);
        })

    console.log(req.body);
    res.send("Response RCVD: " + req.body);
});


app.post("/addclass", (req, res) => {
    const course_number = req.body["course_number"];
    const semester = req.body["semester"];
    const class_year = req.body["class_year"];
    const user_id = req.body["user_id"];
    console.log("Course_Number: " + course_number);
    console.log("Semester: " + semester);
    console.log("Class_Year: " + class_year);
    console.log("User_id: " + user_id);

    const insertSTMT = `INSERT INTO classes (course_number, semester, class_year, user_id) VALUES ('${course_number}', '${semester}', '${class_year}', '${user_id}');`;
    pool.query(insertSTMT).then((response) => {
        console.log("Data Saved");
        console.log(response);
    })
        .catch((err) => {
            console.log(err);
        })

    console.log(req.body);
    res.send("Response RCVD: " + req.body);
});


app.post("/addexam", (req, res) => {
    const class_id = req.body["class_id"];
    const time_min = req.body["time_min"];
    const score = req.body["score"];
    const is_outlier = req.body["is_outlier"];
    console.log("Class_id: " + class_id);
    console.log("Time_Min: " + time_min);
    console.log("Score: " + score);
    console.log("Is_Outlier: " + is_outlier);

    const insertSTMT = `INSERT INTO exams (class_id, time_min, score, is_outlier) VALUES ('${class_id}', '${time_min}', '${score}', '${is_outlier}');`;
    pool.query(insertSTMT).then((response) => {
        console.log("Data Saved");
        console.log(response);
    })
        .catch((err) => {
            console.log(err);
        })

    console.log(req.body);
    res.send("Response RCVD: " + req.body);
}); */

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});