
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "db7532",
    host: "localhost",
    port: 5432,
    database: "test_exam_analysis"

})

const createDbQry = `CREATE DATABASE test_exam_analysis;`;

const createTblQry =
    `DROP TABLE IF EXISTS users, classes, exams CASCADE;

    CREATE TABLE users (
        user_id INT GENERATED ALWAYS AS IDENTITY,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        PRIMARY KEY(user_id)
    );

    CREATE TABLE classes (
        class_id INT GENERATED ALWAYS AS IDENTITY,
        course_number VARCHAR(10) NOT NULL,
        semester VARCHAR(20) NOT NULL,
        class_year NUMERIC(4,0) NOT NULL,
        user_id INT,
        PRIMARY KEY(class_id),
        CONSTRAINT fk_user
            FOREIGN KEY (user_id)
                REFERENCES users(user_id)
                ON DELETE CASCADE
    );

    CREATE TABLE exams (
        exam_id INT GENERATED ALWAYS AS IDENTITY,
        class_id INT,
        time_min NUMERIC NOT NULL,
        score NUMERIC(6,2) NOT NULL,
        is_outlier BOOLEAN NOT NULL,
        PRIMARY KEY(exam_id),
        CONSTRAINT fk_class
            FOREIGN KEY (class_id)
                REFERENCES classes(class_id)
                ON DELETE CASCADE
    );`;


/* 
pool.query(createTblQry).then((response) => {
    console.log("Table Created");
    console.log(response);
})
    .catch((err) => {
        console.log(err);
    });
 */
module.exports = pool;