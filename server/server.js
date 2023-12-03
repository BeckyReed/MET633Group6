const PORT = process.env.DBPORT ?? 4000;
//const PORT = 4000;
//const PORT = process.env.DBConnLink ?? 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./database.js').pool;

//middleware
app.use(cors());
app.use(express.json());



app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});



app.get('/classes/:userID', async (req, res) => {
    //TEST
    console.log(req);
    const { userID } = req.params;
    console.log(`USER ID:  ${userID}`)
    try {
       const classes = await pool.query('SELECT * FROM classes WHERE user_id = $1', [userID]);
       res.json(classes.rows);
    } catch (err) {
        console.log(err);
    }
});

//Trying to check for matching class rows in the table
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

    try {
        const exams = await pool.query('SELECT * FROM exams');
        res.json(exams.rows)
    } catch (err) {
        console.log(err);
    }
})


app.post("/addclass", (req, res) => {

    const class_name = req.body["className"];
    const course_number = req.body["courseNumber"];
    const semester = req.body["semester"];
    const class_year = req.body["year"];

    //TESTING
    const user_id = 1;

    console.log("Class_Name: " + class_name);
    console.log("Course_Number: " + course_number);
    console.log("Semester: " + semester);
    console.log("Class_Year: " + class_year);
    console.log("User_id: " + user_id);

    /** Function that checkes for existing class entry
     *  Removes and replaces if present (associated exams cascade deleted)
     *  Inserts if not present
     */
    const insertSTMT = `SELECT fn_replace_on_conflict( '${class_name}', '${course_number}', '${semester}', '${class_year}', '${user_id}' )`;
    
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
    const project_group = req.body["projectGroup"];
    const time_min = req.body["time"];
    const score = req.body["score"];
    const experience = req.body["experience"];
    const stressor = req.body["stressor"]
    const is_outlier = req.body["outlier"];


    console.log("class_name: " + class_name);
    console.log("Time_Min: " + time_min);
    console.log("Score: " + score);
    console.log("Is_Outlier: " + is_outlier);

    const insertSTMT = `INSERT INTO exams (class_name, project_group, time_min, score, experience, stressor, is_outlier) VALUES ('${class_name}', '${project_group}', '${time_min}', '${score}', '${experience}', '${stressor}', '${is_outlier}');`;
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

