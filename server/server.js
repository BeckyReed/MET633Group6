const PORT = process.env.PORT ?? 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./database.js");
const pool = require('./database.js').pool;

//middleware
app.use(cors());
app.use(express.json());


app.get('/classes/:userID', async (req, res) => {

    //TEST
    console.log(req);
    const { userID } = req.params;
    const userIDint = parseInt(userID);
    console.log(`USER ID:  ${userID}`)
    try {
       const classes = await pool.query('SELECT * FROM classes WHERE user_id = $1', [userID]);
       res.json(classes.rows);
    } catch (err) {
        console.log(err);
    }
});

//TRying to check for matching class rows in the thable
//DOES NOT WORK
app.get('/class_match/:className', async (req, res) => {
     console.log(req);
    console.log("TEST");
    const {className} = req.params;
    console.log(`Match Course Name: ${className}`); 
    const params = req.params;
    console.log(`params: ${params}`);

    try {
        const classes = await pool.query('SELECT * FROM classes WHERE $1', [className]);
        
        //const classes = await pool.query(`SELECT (classes.class_name) FROM classes WHERE (classes.class_name) = $1`, [`${className}`]);
        console.log(`class match result: `);
        console.log(classes);
        res.json(classes.rows);
    } catch (err) {
        console.log(err);
    }
})


app.get('/exams/:courseName', async (req, res) => {

    //TEST
    console.log(req);
    const { courseName }  = req.params;
    //const classIDint = parseInt(classID);
    console.log( `CLASS ID: ${courseName}` );
    try {
        const exams = await pool.query('SELECT * FROM exams WHERE class_name = $1', [courseName]);
        res.json(exams.rows)
    } catch (err) {
        console.log(err);
    }
})


app.get('/exams', async (req, res) => {

    //TEST
    console.log(req);
    //const { courseName }  = req.params;
    //const classIDint = parseInt(classID);
    //console.log( `CLASS ID: ${courseName}` );
    try {
        const exams = await pool.query('SELECT * FROM exams');
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
/*  app.post("/adduser", (req, res) => {
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
}); */



app.post("/addclass", (req, res) => {
/*     const { userID } = req.params;
    const userIDint = parseInt(userID);
    console.log(`USER ID:  ${userID}`) */
    const class_name = req.body["className"];
    const course_number = req.body["courseNumber"];
    const semester = req.body["semester"];
    const class_year = req.body["year"];
    //const user_id = req.body["user_id"];

    //TESTING
    const user_id = 1;

    console.log("Class_Name: " + class_name);
    console.log("Course_Number: " + course_number);
    console.log("Semester: " + semester);
    console.log("Class_Year: " + class_year);
    console.log("User_id: " + user_id);

    const insertSTMT = `INSERT INTO classes 
    (class_name, course_number, semester, class_year, user_id) 
    VALUES ('${class_name}', '${course_number}', '${semester}', '${class_year}', '${user_id}')
    ON CONFLICT ON CONSTRAINT class_name
    DO UPDATE ;`;
    pool.query(insertSTMT).then((response) => {
        console.log("Data Saved CLASS");
        console.log(response);
    })
        .catch((err) => {
            console.log(err);
        })

    console.log(req.body);
    res.send("Response RCVD: " + req.body);
});


app.post("/addexam", (req, res) => {
    const class_name = req.body["courseName"];
    const time_min = req.body["time"];
    const score = req.body["score"];
    const is_outlier = req.body["outlier"];

    
    
    //TESTING
    //const class_name = 1;


    console.log("class_name: " + class_name);
    console.log("Time_Min: " + time_min);
    console.log("Score: " + score);
    console.log("Is_Outlier: " + is_outlier);

    const insertSTMT = `INSERT INTO exams (class_name, time_min, score, is_outlier) VALUES ('${class_name}', '${time_min}', '${score}', '${is_outlier}');`;
    pool.query(insertSTMT).then((response) => {
        console.log("Data Saved EXAM");
        console.log(response);
    })
        .catch((err) => {
            console.log(err);
        })

    console.log(req.body);
    res.send("Response RCVD: " + req.body);
}); 

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});