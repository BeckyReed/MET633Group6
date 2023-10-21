
const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    user: 'postgres',
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: "test_exam_analysis"

});

/**Users*/

    const getUsers = () => {
        return new Promise(function(res, rej) {
            pool.query('SELECT * FROM users ORDER BY user_id ASC', (err, results) => {
                if (err) {
                    rej(error);
                }
                res(results.rows);
            })
        })
    };

    const createUser = (body) => {
        return new Promise(function(res, rej) {
            const {email, username} = body;
            pool.query('INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *', [email, username], (err, results) => {
                if (err) {
                    rej(err);
                }
                res(`A new user has been added added: ${results.rows[0]}`);
            })
        })
    };

    const deleteUser = () => {
        return new Promise(function(res, rej) {
            const id = parseInt(request.params.id);
            pool.query('DELETE FROM users WHERE user_id = $1', [id], (err, results) => {
                if (err) {
                    rej(err);
                }
                res(`User deleted with ID: ${id}`);
            })
        })
    }

module.exports = {
    pool,
    getUsers,
    createUser,
    deleteUser
}


/* 
pool.query(createTblQry).then((response) => {
    console.log("Table Created");
    console.log(response);
})
    .catch((err) => {
        console.log(err);
    });
 */
